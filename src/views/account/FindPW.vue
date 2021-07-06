<template>
    <div>
        <Header title="비밀번호 찾기" />
        <main>
            <div class="container py-4">
                <form @submit.prevent="findPw">
                    <div class="mb-4">
                        <label for="email" class="form-label mb-1">아이디(이메일)</label>
                        <input type="email" class="form-control" id="email" placeholder="gdhong@tscientific.co.kr" v-model="email">
                    </div>
                    <div class="mb-3 position-relative">
                        <label for="mobile" class="form-label mb-1">휴대폰번호</label>
                        <input type="text" class="form-control" id="mobile" placeholder="010-0000-0000" v-model="mobile">
                        <button class="btn btn-sm position-absolute" @click.prevent="sendCertNum">인증번호 발송</button>
                    </div>
                    <div class="mb-3 position-relative">
                        <label for="cert-num" class="form-label mb-1">인증번호</label>
                        <input type="text" class="form-control" id="cert-num" placeholder="000000" v-model="certNum">
                        <span id="cert-limit" class="position-absolute">{{certNumTimeLimitMinSec}}</span>
                        <!-- <button class="btn btn-sm position-absolute" @click.prevent="confirmCertNum">인증번호 확인</button> -->
                    </div>
                    <div class="row btn-row">
                        <div class="col col-4">
                            <button type="button" class="btn btn-lg btn-secondary w-100 rounded-0 fw-bolder" @click.prevent="goBack">취소</button>
                        </div>
                        <div class="col col-8">
                            <button type="submit" class="btn btn-lg btn-primary w-100 rounded-0 fw-bolder">비밀번호 찾기</button>
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
        components: {
            Header: () => import('@/components/Header.vue'),
        },
        data: function() {
            return {
                email: null,
                mobile: null,
                certNum: null,
                certNumTimer: null,
                certNumTimeLimit: 180,
                regExpEmail: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i, // 이메일 정규식
                regExpMobile: /^(\d{3}-\d{3,4}-\d{4}|\d{10,11})$/, // 휴대전화번호 정규식
            }
        },
        computed: {
            certNumTimeLimitMinSec: function() {
                return Math.floor(this.certNumTimeLimit / 60) + ':' + (this.certNumTimeLimit % 60 < 10 ? '0'+ this.certNumTimeLimit % 60 : this.certNumTimeLimit % 60);
            }
        },
        methods: {
            goBack: function() {
                this.$router.back();
            },
            sendCertNum: function() {
                if (!this.email) {
                    alert('이메일주소를 입력해주세요.');
                    document.querySelector('#email').focus();
                    return;
                }
                if (!this.regExpEmail.test(this.email)) {
                    alert('이메일주소를 양식에 맞게 입력해 주세요.');
                    document.querySelector('#email').focus();
                    return;
                }
                if (!this.regExpMobile.test(this.mobile)) {
                    alert('휴대폰번호를 양식에 맞게 입력해 주세요.');
                    document.querySelector('#mobile').focus();
                    return;
                }

                // 타이머가 있다면 초기화
                if (this.certNumTimer) {
                    clearInterval(this.certNumTimer);
                }

                // 타이머 제한시간 리셋
                this.certNumTimeLimit = 180;

                // 가입여부 체크
                axios({
                    method: 'post',
                    url: 'https://tmall-backend.coufun.kr/users/email',
                    data: {
                        "emailId": this.email,
                        "mobileTelno": this.mobile.replace(/[^\d]/gi, ""),
                    }
                })
                .then(res => {
                    if (res.status == 200 || res.status == 204) {
                        // 가입된 휴대전화번호로 인증번호 발송
                        axios({
                            method: "post",
                            url: "https://tmall-backend.coufun.kr/auth/send",
                            data: {
                                "authKey": this.mobile.replace(/[^\d]/gi, ""),
                                "authReqCode": "FIND_PWD"
                            }
                        })
                        .then(resSend => {
                            if (resSend.status == 200 || resSend.status == 204) {
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
                                err.response = resSend;
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
            },
            findPw: function() {
                if (!this.regExpEmail.test(this.email)) {
                    alert('이메일주소를 양식에 맞게 입력해 주세요.');
                    document.querySelector('#email').focus();
                    return;
                }
                if (!this.certNum) {
                    alert('인증번호를 입력해 주세요.');
                    document.querySelector('#cert-num').focus();
                    return;
                }
                axios({
                    method: 'post',
                    url: 'https://tmall-backend.coufun.kr/users/pwd',
                    data: {
                        "authNo": this.certNum,
                        "emailId": this.email,
                        "mobileTelno": this.mobile.replace(/[^\d]/gi, ""),
                    }
                })
                .then(res => {
                    if (res.status == 200 || res.status == 204) {
                        alert('임시 비밀번호가 고객님의 이메일로 전송되었습니다.');
                        this.$router.push('/account/login');
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