<template>
    <div>
        <Header title="회원가입 초대" />
        <main>
            <div class="container py-4">
                <div class="guide">
                    <h4>INVITATION</h4>
                    <div>
                        회원가입 초대 시 초대받은 고객님의 이메일로<br>
                        회원가입 링크가 발송됩니다.<br>
                        해당 링크를 통해 회원가입 완료 시<br>
                        초대자가 지정한 그룹에 배정됩니다.
                    </div>
                </div>
                <form @submit.prevent="invite">
                    <div class="mb-4">
                        <label for="email" class="form-label mb-1">이메일 주소</label>
                        <input type="email" class="form-control" id="email" placeholder="gdhong@tscientific.co.kr" v-model="email">
                    </div>
                    <div class="row btn-row">
                        <div class="col col-4">
                            <button class="btn btn-lg btn-secondary w-100 rounded-0 fw-bolder">취소</button>
                        </div>
                        <div class="col col-8">
                            <button class="btn btn-lg btn-primary w-100 rounded-0 fw-bolder">초대메일 발송</button>
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
        beforeRouteEnter: function(to, from, next) {
            if (to.params.userData) {
                next(vm => {
                    vm.userNo = to.params.userData.userNo;
                });
            } else {
                next(vm => {
                    vm.$router.replace("/");
                });
            }
        },
        components: {
            Header: () => import('@/components/Header.vue'),
        },
        data: function() {
            return {
                userNo: null,
                email: null,
                regExpEmail: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i, // 이메일 정규식
            }
        },
        methods: {
            invite: function() {
                if (!this.email) {
                    alert('이메일 주소를 입력해주세요.');
                    return;
                }
                if (!this.regExpEmail.test(this.email)) {
                    alert('이메일 주소가 양식에 맞지 않습니다.');
                    return;
                }
                axios({
                    method: "POST",
                    url: `https://tmall-backend.coufun.kr/invitations/${this.userNo}`,
                    data: {
                        "email": this.email
                    }
                })
                .then(res => {
                    if (res.status == 200 || res.status == 204) {
                        alert('초대메일을 발송했습니다.');
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
    .guide {
        margin-top: 5px;
        margin-bottom: 60px;
        text-align: center;
        h4 {
            margin-bottom: 15px;
            font-size: 20px;
            font-family: 'Montserrat', sans-serif;
            letter-spacing:  2px;
            color: #365df0;
            font-weight: 800;
        }
        div {
            color: #888d96;
            font-weight: 800;
        }
    }
</style>