<template>
    <div>
        <Header title="아이디 찾기" />
        <main>
            <div class="container py-4">
                <form @submit.prevent="findId">
                    <div class="mb-4">
                        <label for="name" class="form-label mb-1">이름</label>
                        <input type="text" class="form-control" id="name" placeholder="홍길동" v-model="name">
                    </div>
                    <div class="mb-4">
                        <label for="phone" class="form-label mb-1">휴대폰 번호</label>
                        <input type="text" class="form-control" id="phone" placeholder="010-0000-0000" v-model="mobile">
                    </div>
                    <div class="row btn-row">
                        <div class="col col-4">
                            <button class="btn btn-lg btn-secondary w-100 rounded-0 fw-bolder" @click="goBack">취소</button>
                        </div>
                        <div class="col col-8">
                            <button class="btn btn-lg btn-primary w-100 rounded-0 fw-bolder">아이디 찾기</button>
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
                name: null,
                mobile: null,
                regExpMobile: /^(\d{3}-\d{3,4}-\d{4}|\d{10,11})$/, // 휴대전화번호 정규식
            }
        },
        methods: {
            findId: function() {
                if (!this.name) {
                    alert('이름을 입력해주세요.');
                    return;
                }
                if (!this.regExpMobile.test(this.mobile)) {
                    alert('휴대폰번호를 양식에 맞게 입력해주세요.');
                    return;
                }
                axios({
                    method: 'post',
                    url: 'https://tmall-backend.coufun.kr/users/id',
                    data: {
                        "mobileTelno": this.mobile.replace(/[^\d]/gi, ""),
                        "userName": this.name
                    }
                })
                .then(res => {
                    console.log(res)
                    if (res.status == 200) {
                        this.$router.push({ name: 'find_id_result', params: { emailId: res.data.emailId }});
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
            goBack: function() {
                this.$router.back();
            }
        }
    }
</script>

<style lang="scss" scoped>
.btn-row {
    margin-top: 30px;
}
</style>