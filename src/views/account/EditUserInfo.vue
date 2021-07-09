<template>
    <div>
        <Header title="회원정보 수정" />
        <main>
            <div class="container py-4">
                <form @submit.prevent="editUserInfo">
                    <div class="step first">
                        <div class="mb-4">
                            <label for="email" class="form-label mb-1">아이디(이메일)</label>
                            <input type="email" class="form-control" id="email" placeholder="gdhong@tscientific.co.kr" :value="userData.emailId || ''" readonly>
                        </div>
                        <div class="mb-4">
                            <label for="password" class="form-label mb-1">새 비밀번호</label>
                            <input type="password" class="form-control" id="password" placeholder="영문, 숫자, 특수문자 포함 8~20자" autocomplete="false" v-model="password">
                        </div>
                        <div class="mb-4">
                            <label for="re-password" class="form-label mb-1">새 비밀번호 확인</label>
                            <input type="password" class="form-control" id="re-password" placeholder="영문, 숫자, 특수문자 포함 8~20자" autocomplete="false" v-model="pwConfirm">
                        </div>
                        <div class="mb-4 position-relative">
                            <label for="mobile" class="form-label mb-1">휴대폰번호</label>
                            <input type="text" class="form-control" id="mobile" placeholder="010-0000-0000" v-model="mobile">
                            <button class="btn btn-sm position-absolute" @click.prevent="sendCertNum">인증번호 발송</button>
                        </div>
                        <div class="mb-4 position-relative">
                            <label for="cert-num" class="form-label mb-1">인증번호</label>
                            <input type="text" class="form-control" id="cert-num" placeholder="000000" v-model="certNum">
                            <span id="cert-limit" class="position-absolute">{{certNumTimeLimitMinSec}}</span>
                            <button class="btn btn-sm position-absolute" @click.prevent="confirmCertNum">인증번호 확인</button>
                        </div>
                        <div class="mb-4">
                            <label for="name" class="form-label mb-1">이름</label>
                            <input type="text" class="form-control" id="name" placeholder="홍길동" v-model="name" readonly>
                        </div>
                        <div class="mb-4">
                            <label for="team" class="form-label mb-1">소속</label>
                            <input type="text" class="form-control" id="team" placeholder="00팀" v-model="team" readonly>
                        </div>
                    </div>
                    <div class="step second">
                        <h6><b>2단계 인증</b></h6>
                        <div class="mb-3 noti">
                            2단계 인증은 아이디, 비밀번호 입력 후 이메일 또는 휴대폰 인증을 통해 
                            로그인을 완료하는 이중 보안 절차입니다.
                        </div>
                        <div class="mb-3 d-flex justify-content-between flex-wrap">
                            <div class="d-flex align-items-center">
                                <input type="radio" name="cert-type" id="cert-type-0" value="NONE" v-model="certType"><label for="cert-type-0" class="form-label ms-2 mb-0">진행안함</label>
                            </div>
                            <div class="d-flex align-items-center">
                                <input type="radio" name="cert-type" id="cert-type-1" value="EMAIL" v-model="certType"><label for="cert-type-1" class="form-label ms-2 mb-0">이메일 인증</label>
                            </div>
                            <div class="d-flex align-items-center">
                                <input type="radio" name="cert-type" id="cert-type-2" value="MOBILE_PHONE" v-model="certType"><label for="cert-type-2" class="form-label ms-2 mb-0">휴대폰 인증</label>
                            </div>
                        </div>
                    </div>
                    <div class="row btn-row">
                        <div class="col col-4">
                            <button class="btn btn-lg btn-secondary w-100 rounded-0 fw-bolder" @click.prevent="goBack">취소</button>
                        </div>
                        <div class="col col-8">
                            <button class="btn btn-lg btn-primary w-100 rounded-0 fw-bolder">저장</button>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
    export default {
        components: {
            Header: () => import('@/components/Header.vue'),
        },
        data: function() {
            return {
                password: null,             // 비밀번호
                pwConfirm: null,            // 비밀번호 확인
                mobile: null,               // 휴대전화 번호
                name: null,                 // 이름
                team: null,                 // 소속
                certNum: null,              // 인증번호
                certType: null,             // 2단계 인증 타입
                regExpPassword: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{3,20}$/, // 비밀번호 정규식
                regExpMobile: /^(\d{3}-\d{3,4}-\d{4}|\d{10,11})$/, // 휴대전화번호 정규식
                certNumTimer: null,         // 인증 타이머
                certNumTimeLimit: 180,      // 인증 제한 시간(3분)
                isCertifiedMobile: false,   // 휴대전화번호 인증여부
            }
        },
        computed: {
            ...mapState({
                userData: state => state.userData
            }),
            certNumTimeLimitMinSec: function() {
                return Math.floor(this.certNumTimeLimit / 60) + ':' + (this.certNumTimeLimit % 60 < 10 ? '0'+ this.certNumTimeLimit % 60 : this.certNumTimeLimit % 60);
            }
        },
        created: function() {
            this.name = this.userData.userName;
            this.certType = this.userData.towFactorAuthCode;
        },
        methods: {
            goBack: function() {
                this.$router.back();
            },
            sendCertNum: function() {
                if (!this.mobile) {
                    alert('휴대폰번호를 입력해주세요.');
                    document.querySelector('#email').focus();
                    return;
                }
                if (!this.regExpMobile.test(this.mobile)) {
                    alert('휴대폰번호를 양식에 맞게 입력해주세요.');
                    document.querySelector('#email').focus();
                    return;
                }

                // 타이머가 있다면 초기화
                if (this.certNumTimer) {
                    clearInterval(this.certNumTimer);
                }

                // 타이머 제한시간 리셋
                this.certNumTimeLimit = 180;

                // 인증번호 발송
                axios({
                    method: 'post',
                    url: 'https://tmall-backend.coufun.kr/auth/send',
                    data: {
                        "authKey": this.mobile,
                        "authReqCode": "USER_UPDATE"
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
                        alert('입력하신 휴대폰번호로 인증번호가 발송되었습니다.');
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
            },
            confirmCertNum: function() {
                if (!this.certNum) {
                    alert('인증번호를 정확히 입력해주세요.');
                    document.querySelector('#cert-num').focus();
                    return;
                }

                // 인증번호 확인
                axios({
                    method: 'post',
                    url: 'https://tmall-backend.coufun.kr/auth/check',
                    data: {
                        "authKey": this.mobile,
                        "authNo": this.certNum,
                        "authReqCode": "USER_UPDATE"
                    }
                })
                .then(res => {
                    if (res.status == 200 || res.status == 204) {
                        // 타이머 정지
                        clearInterval(this.certNumTimer);
                        // 타이머 감추기
                        document.querySelector('#cert-limit').style.display = 'none';
                        // 인증여부 저장
                        this.isCertifiedMobile = true;
                        alert('인증번호가 확인되었습니다.');
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
            },
            editUserInfo: function() {
                if (this.password && this.pwConfirm) {
                    if (!this.regExpPassword.test(this.password)) {
                        alert('비밀번호는 영문, 숫자, 특수문자 포함 8~20자를 입력해주세요.');
                        return;
                    }
                    if (!this.regExpPassword.test(this.pwConfirm)) {
                        alert('비밀번호는 영문, 숫자, 특수문자 포함 8~20자를 입력해주세요.');
                        return;
                    }
                    if (this.password != this.pwConfirm) {
                        alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
                        return;
                    }
                } else if (!this.password) {
                    alert('비밀번호를 입력해주세요.');
                    return;
                } else if (!this.pwConfirm) {
                    alert('비밀번호 확인을 입력해주세요.');
                    return;
                }
                if (!this.isCertifiedMobile) {
                    alert('휴대폰 인증을 완료해주세요.');
                    return;
                }
                axios({
                    method: "patch",
                    url: `https://tmall-backend.coufun.kr/users/${this.userData.userNo}`,
                    data: {
                        "mobileTelno": this.mobile,
                        "newPwd": this.password,
                        "newPwdConfirm": this.pwConfirm,
                        "towFactorAuthCode": this.certType
                    }
                })
                .then(res => {
                    if (res.status == 200 || res.status == 204) {
                        alert('회원정보 수정이 완료되었습니다.');
                        this.$router.push("/");
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
.step {
    &.first {
        .btn {
            bottom: 0.375rem;
            right: 0;
            font-weight: 800;
            background: #333;
            color: #fff;
            width: 100px;
            border-radius: 0;
        }
        #cert-limit {
            bottom: 0.375rem;
            right: 110px;
            line-height: 2;
            color: #f58220;
        }
    }
    &.second {
        margin-top: 30px;
        h6 {
            font-size: 14px;
            font-weight: 800;
        }
        .noti {
            color: #827878;
        }
        label {
            font-size: 15px;
        }
    }
}
.btn-row {
    margin-top: 30px;
}
#cert-limit {
    display: none;
    bottom: 0.2rem;
    right: 110px;
    line-height: 2;
    color: #f58220;
}
</style>