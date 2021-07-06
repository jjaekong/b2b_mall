<template>
    <div>
        <Header title="로그인" />
        <main>
            <div class="container py-4">
                <form @submit.prevent="login">
                    <div class="mb-4">
                        <label for="email" class="form-label mb-1">아이디 (이메일)</label>
                        <input type="email" class="form-control" id="email" placeholder="email@address.com" v-model="email">
                    </div>
                    <div class="mb-4">
                        <label for="password" class="form-label mb-1">비밀번호</label>
                        <input type="password" class="form-control" id="password" placeholder="●●●●●●●●●●" autocomplete="false" v-model="password">
                    </div>
                    <div class="btn-row">
                        <button type="submit" class="btn btn-lg btn-primary w-100 rounded-0 fw-bolder">로그인</button>
                    </div>
                    <div class="find-pw d-flex justify-content-center">
                        <router-link to="/account/find_id"><span>아이디 찾기</span></router-link>
                        <router-link to="/account/find_pw"><span>비밀번호 찾기</span></router-link>
                        <router-link to="/account/join"><span>회원가입</span></router-link>
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
                regExpEmail: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i, // 이메일 정규식
                email: null,
                password: null,
            }
        },
        methods: {
            login: function() {
                if (!this.regExpEmail.test(this.email)) {
                    alert('아이디를 이메일 양식에 맞게 입력해주세요.');
                    return;
                }
                if (!this.password) {
                    alert('비밀번호를 입력해주세요.');
                    return;
                }
                axios({
                    method: "post",
                    url: "https://tmall-backend.coufun.kr/login",
                    data: {
                        "emailId": this.email,
                        "userPwd": this.password
                    },
                    header: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                })
                .then(res => {
                    if (res.status == 200) {
                        this.$store.commit('setUserData', res.data);
                        // 임시 비밀번호를 발급받은 사용자
                        if (res.data.temppwdYn == 'Y') {
                            this.$router.push('/account/reset_pw');
                        } else {
                            // 2단계 인증 사용여부에 따라 페이지 이동
                            if (res.data.towFactorAuthCode == "NONE") { // 사용안함: 메인페이지 이동
                                this.$router.push('/');
                            } else { // 사용함: 2단계 인증페이지로 이동
                                this.$router.push('/account/cert');
                            }
                        }
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
.btn-row {
    margin-top: 30px;
}
.find-pw {
    margin-top: 25px;
    text-align: center;
    a {
        text-decoration: none;
        font-size: 15px;
        color: #333;
        line-height: 1;
        span {
            display: block;
            height: 15px;
            padding-left: 3vw;
            padding-right: 3vw;
        }
        & + a {
            span {
                border-left: 2px solid #333;
            }
        }
    }
}
</style>