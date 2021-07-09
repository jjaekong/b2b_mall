<template>
    <div>
        <Header title="2단계 인증" />
        <main>
            <div class="container py-4">
                <div class="guide" v-if="userData" style="word-break: keep-all">
                    <h4>인증번호를 입력하세요.</h4>
                    <div v-if="userData.towFactorAuthCode == 'EMAIL'">
                        회원님의 이메일({{userData.emailId}})로 2단계 인증번호가 발송되었습니다.<br>
                        인증번호를 입력하여 2단계 인증을 완료해주세요.
                    </div>
                    <div v-else-if="userData.towFactorAuthCode == 'MOBILE_PHONE'">
                        회원님의 휴대폰 번호({{userData.mobileTelno}})로 2단계 인증번호가 발송되었습니다.<br>
                        인증번호를 입력하여 2단계 인증을 완료해주세요.
                    </div>
                </div>
                <form @submit.prevent="confirmCertNum">
                    <div class="mb-4 position-relative">
                        <label for="cert-num" class="form-label mb-1">2단계 인증번호</label>
                        <input type="text" class="form-control" id="cert-num" placeholder="000000" v-model="certNum">
                        <span id="cert-limit" class="position-absolute">{{certNumTimeLimitMinSec}}</span>
                    </div>
                    <div class="btn-row">
                        <button class="btn btn-lg btn-primary w-100 rounded-0 fw-bolder">인증완료</button>
                    </div>
                </form>
            </div>
        </main>
    </div>
</template>

<script>
import axios from 'axios'

    export default {
        beforeRouteEnter(to, from, next) {
            if (to.params.userData) {
                next(vm => {
                    vm.userData = to.params.userData
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
                userData: null,
                certNumTimeLimit: 180,
                certNum: null,
                certNumTimer: null,
            }
        },
        computed: {
            certNumTimeLimitMinSec: function() {
                return Math.floor(this.certNumTimeLimit / 60) + ':' + (this.certNumTimeLimit % 60 < 10 ? '0'+ this.certNumTimeLimit % 60 : this.certNumTimeLimit % 60);
            }
        },
        mounted: function() {
            if (this.userData) {
                this.sendCertNum()
            }
        },
        methods: {
            sendCertNum: function() {

                // 타이머가 있다면 초기화
                if (this.certNumTimer) {
                    clearInterval(this.certNumTimer);
                }

                // 타이머 제한시간 리셋
                this.certNumTimeLimit = 180;

                axios({
                    method: 'post',
                    url: 'https://tmall-backend.coufun.kr/auth/send',
                    data: {
                        "authKey": this.userData.towFactorAuthCode == 'EMAIL' ?  this.userData.emailId : this.userData.towFactorAuthCode == 'MOBILE_PHONE' ? this.userData.mobileTelno : null,
                        "authReqCode": "TOW_FACTOR_AUTH"
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
                    }
                    alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
                    // 인증번호 발송 오류 시, 뒤로가기
                    this.$router.back();
                })
            },
            confirmCertNum: function() {
                if (!this.certNum) {
                    alert('인증번호를 입력해주세요.');
                    document.querySelector('#cert-num').focus();
                    return;
                }

                // 인증번호 확인
                axios({
                    method: 'post',
                    url: 'https://tmall-backend.coufun.kr/auth/check',
                    data: {
                        "authKey": this.userData.towFactorAuthCode == 'EMAIL' ?  this.userData.emailId : this.userData.towFactorAuthCode == 'MOBILE_PHONE' ? this.userData.mobileTelno : null,
                        "authNo": this.certNum,
                        "authReqCode": "TOW_FACTOR_AUTH"
                    }
                })
                .then(res => {
                    if (res.status == 200 || res.status == 204) {
                        // 타이머 정지
                        clearInterval(this.certNumTimer);
                        // 타이머 감추기
                        document.querySelector('#cert-limit').style.display = 'none';
                        // 인증완료 시, 저장소에 사용자 데이터 저장 및 페이지 이동
                        this.$store.commit('setUserData', this.userData);
                        this.$router.push('/');
                    } else {
                        const err = new Error();
                        err.response = res;
                        throw err;
                    }
                })
                .catch(err => {
                    if (err.response.data.status == 400) {
                        alert(`${err.response.data.message}`);
                    } else if (err.response.data.status == 500) {
                        alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .guide {
        margin-top: 5px;
        margin-bottom: 60px;
        text-align: center;
        h4 {
            margin-bottom: 15px;
            font-size: 15px;
            color: #365df0;
            font-weight: 800;
        }
        div {
            color: #888d96;
            font-weight: 800;
        }
    }
    #cert-limit {
        display: none;
        bottom: 0.2rem;
        right: 0;
        line-height: 2;
        color: #f58220;
    }
</style>