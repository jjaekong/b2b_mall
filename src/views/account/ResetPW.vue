<template>
    <div>
        <Header title="비밀번호 재설정" />
        <main>
            <div class="container py-4">
                <div class="guide">
                    임시 비밀번호로 로그인 시<br>
                    새 비밀번호 설정 후 서비스 이용이 가능합니다.
                </div>
                <form @submit.prevent="resetPw">
                    <div class="mb-4">
                        <label for="temp-pwd" class="form-label mb-1">임시 비밀번호</label>
                        <input type="password" class="form-control" id="temp-pwd" v-model="tempPwd" autocomplete="false" placeholder="●●●●●●●●●●">
                    </div>
                    <div class="mb-4">
                        <label for="new-pwd" class="form-label mb-1">새 비밀번호</label>
                        <input type="password" class="form-control" id="new-pwd" v-model="newPwd" autocomplete="false" placeholder="●●●●●●●●●●">
                    </div>
                    <div class="mb-4">
                        <label for="confirm-pwd" class="form-label mb-1">새 비밀번호 확인</label>
                        <input type="password" class="form-control" id="confirm-pwd" v-model="confirmPwd" autocomplete="false" placeholder="●●●●●●●●●●">
                    </div>
                    <div class="btn-row">
                        <button class="btn btn-lg btn-primary w-100 rounded-0 fw-bolder">비밀번호 재설정</button>
                    </div>
                </form>
            </div>
        </main>
    </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
    export default {
        components: {
            Header: () => import('@/components/Header.vue'),
        },
        data: function() {
            return {
                
            }
        },
        computed: {
            ...mapState({
                userData: state => state.userData
            })
        },
        data: function() {
            return {
                tempPwd: null,
                newPwd: null,
                confirmPwd: null
            }
        },
        methods: {
            resetPw: function() {
                if (!this.tempPwd) {
                    alert('임시 비밀번호를 입력해주세요.');
                    return;
                }
                if (!this.newPwd) {
                    alert('새 비밀번호를 입력해주세요.');
                    return;
                }
                axios({
                    method: "PATCH",
                    url: `https://tmall-backend.coufun.kr//users/${this.userData.userNo}/pwd`,
                    data: {
                        "userPwd": this.tempPwd,
                        "newPwd": this.newPwd,
                        "newPwdConfirm": this.confirmPwd
                    }
                })
                .then(res => {
                    if (res.status == 200 || res.status == 204) {
                        // console.log('비번 재설정 성공', res)
                        alert('비밀번호가 변경되었습니다. 새 비밀번호로 로그인해주세요.');
                        this.$store.commit('setUserData', null);
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
        margin-bottom: 60px;
        text-align: center;
        color: #888d96;
        font-weight: 800;
    }
</style>