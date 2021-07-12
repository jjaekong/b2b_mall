<template>
    <div>
        <Header title="휴면계정 해제" />
        <main>
            <div class="container py-4">
                <div class="guide">
                    <h4>계정이 휴면 상태입니다.</h4>
                    <div>
                        1년간 서비스 이용 내역이 없어 계정이 휴면 상태이며, 이메일 혹은 휴대폰 인증을 통해 휴면 해제 후 서비스를 이용하실 수 있습니다.
                    </div>
                </div>
                <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#cert-email" type="button" @click="selectCertType('email')"><span>이메일 인증</span></button>
                        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#cert-mobile" type="button" @click="selectCertType('mobile')"><span>휴대폰 인증</span></button>
                    </div>
                </nav>
                <form @submit.prevent="wakeUp">
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane show active" id="cert-email">
                            <div class="mb-4 position-relative">
                                <label for="email" class="form-label mb-1">아이디(이메일)</label>
                                <input type="email" class="form-control" id="email" placeholder="gdhong@tscientific.co.kr" v-model="email" readonly>
                                <button class="btn btn-sm position-absolute" @click.prevent="sendCertNum">인증번호 발송</button>
                            </div>
                        </div>
                        <div class="tab-pane" id="cert-mobile">
                            <div class="mb-4 position-relative">
                                <label for="mobile" class="form-label mb-1">휴대폰번호</label>
                                <input type="text" class="form-control" id="mobile" placeholder="010-1234-4567" v-model="mobile" readonly>
                                <button class="btn btn-sm position-absolute" @click.prevent="sendCertNum">인증번호 발송</button>
                            </div>
                        </div>
                    </div>
                    <div class="mb-4 position-relative">
                        <label for="cert-num" class="form-label mb-1">이메일 인증번호</label>
                        <input type="text" class="form-control" id="cert-num" placeholder="000000" v-model="certNum">
                        <span id="cert-limit" class="position-absolute">{{certNumTimeLimitMinSec}}</span>
                    </div>
                    <div class="row btn-row">
                        <div class="col col-4">
                            <button class="btn btn-lg btn-secondary w-100 rounded-0 fw-bolder" @click="cancel">취소</button>
                        </div>
                        <div class="col col-8">
                            <button type="submit" class="btn btn-lg btn-primary w-100 rounded-0 fw-bolder">휴면해제</button>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    </div>
</template>

<script>
import axios from 'axios';

    export default {
        beforeRouteEnter(to, from, next) {
            if (to.params.userData) {
                next(vm => {
                    if (to.params.userData.drmncyUserYn == 'Y') {
                        vm.userNo = to.params.userData.userNo;
                        vm.email = to.params.userData.emailId;
                        vm.mobile = to.params.userData.mobileTelno;
                    } else {
                        vm.$router.replace("/account/login");
                    }
                });
            } else {
                next(vm => {
                    vm.$router.replace("/account/login");
                });
            }
        },
        components: {
            Header: () => import('@/components/Header.vue'),
        },
        data: function() {
            return {
                certType: 'email',
                userNo: null,
                email: null,
                mobile: null,
                certNum: null,
                certNumTimer: null,
                certNumTimeLimit: 180,
                regExpMobile: /^(\d{3}-\d{3,4}-\d{4}|\d{10,11})$/, // 휴대전화번호 정규식
            }
        },
        computed: {
            certNumTimeLimitMinSec: function() {
                return Math.floor(this.certNumTimeLimit / 60) + ':' + (this.certNumTimeLimit % 60 < 10 ? '0'+ this.certNumTimeLimit % 60 : this.certNumTimeLimit % 60);
            }
        },
        methods: {
            cancel: function() {
                if (confirm('취소 시 입력된 정보는 저장되지 않습니다. 휴면해제를 취소하시겠습니까?')) {
                    this.$router.back();
                }
            },
            selectCertType: function(certType) {
                this.certType = certType;
            },
            wakeUp: function() {
                
                if (!this.certNum) {
                    alert('인증번호를 입력해주세요.');
                    document.querySelector('#cert-num').focus();
                    return;
                }

                axios({
                    method: 'DELETE',
                    url: `https://tmall-backend.coufun.kr/drmncy/${this.userNo}`,
                    data: {
                        "authKey": this.certType == 'email' ? this.email : this.certType == 'mobile' ? this.mobile : null,
                        "authNo": this.certNum
                    }
                })
                .then(res => {
                    if (res.status == 200 || res.status == 204) {
                        // 타이머 정지
                        clearInterval(this.certNumTimer);
                        // 타이머 감추기
                        document.querySelector('#cert-limit').style.display = 'none';
                        alert('계정 휴면이 해제되었습니다.');
                        this.$router.push('/account/login');
                    } else {
                        const err = new Error();
                        err.response = res;
                        throw err;        
                    }
                })
                .catch(err => {
                    if (err &&
                        err.response &&
                        err.response.data &&
                        err.response.data.status &&
                        err.response.data.status == 400) {
                        alert(`${err.response.data.message}`);
                        return;
                    }
                    alert('오류가 발생했습니다.1 잠시 후 다시 시도해주세요.');
                })

            },
            sendCertNum: function() {

                // 타이머가 있다면 초기화
                if (this.certNumTimer) {
                    clearInterval(this.certNumTimer);
                }

                // 타이머 제한시간 리셋
                this.certNumTimeLimit = 180;

                axios({
                    method: "POST",
                    url: "https://tmall-backend.coufun.kr/auth/send",
                    data: {
                        "authKey": this.certType == 'email' ? this.email : this.certType == 'mobile' ? this.mobile : null,
                        "authReqCode": "DRMNCY_CANCEL"
                    }
                })
                .then(res => {
                    if (res.status == 200 || res.status == 204) {

                        // 제한 시간 보이기
                        document.querySelector('#cert-limit').style.display = 'block';
                        // 타이머 시작
                        this.certNumTimer = setInterval(() => {
                            if (this.certNumTimeLimit > 0) {
                                this.certNumTimeLimit--;
                            } else {
                                clearInterval(this.certNumTimer);
                            }
                        }, 1000);

                        if (this.certType == 'email') {
                            alert('고객님의 이메일 주소로 인증번호가 발송되었습니다.');
                        } else if (this.certType == 'mobile') {
                            alert('고객님의 휴대폰 번호로 인증번호가 발송되었습니다.');
                        } else {
                            alert('인증번호가 발송되었습니다.');
                        }
                    } else {
                        const err = new Error();
                        err.response = res;
                        throw err;
                    }
                })
                .catch(err => {
                    if (err &&
                        err.response &&
                        err.response.data &&
                        err.response.data.status &&
                        err.response.data.status == 400) {
                        alert(`${err.response.data.message}`);
                        return;
                    }
                    alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.guide {
    margin-top: 5px;
    margin-bottom: 20px;
    h4 {
        margin-bottom: 15px;
        font-size: 18px;
        color: #365df0;
        text-align: center;
        font-weight: 800 !important;
    }
    div {
            color: #888d96;
            font-weight: 800;
        }
}
.nav-tabs {
    margin-bottom: 20px;
    border-bottom-color: #333;
    .nav-link {
        flex: 1;
        border-radius: 0;
        border-top: 1px solid #e4e4e4;
        border-left: 1px solid #e4e4e4;
        border-right: 1px solid #e4e4e4;
        color: #827878;
        font-weight: 800;
        font-size: 14px;
        &.active {
            // border-bottom: 1px solid white;
            border-top: 1px solid #333;
            border-left: 1px solid #333;
            border-right: 1px solid #333;
            // border-color: #333;
            color: #176de1;
        }
        &:not(.active):hover {
            border-bottom-color: #333;
        }
        & + .nav-link {
            margin-left: 4px;
        }
    }
}
.btn-sm {
    bottom: 0.2rem;
    right: 0;
    font-weight: 800;
    background: #333;
    color: #fff;
    width: 100px;
    border-radius: 0;
}
#cert-limit {
    display: none;
    bottom: 0.2rem;
    right: 0;
    line-height: 2;
    color: #f58220;
}
.btn-row {
    margin-top: 30px;
}
</style>