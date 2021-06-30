<template>
    <div>
        <Header title="아이디 찾기" />
        <main>
            <div class="container py-4">
                <form @submit.prevent="submit">
                    <div class="mb-4">
                        <label for="name" class="form-label mb-1">이름</label>
                        <input type="text" class="form-control" id="name" placeholder="홍길동">
                    </div>
                    <div class="mb-4">
                        <label for="phone" class="form-label mb-1">휴대폰 번호</label>
                        <input type="text" class="form-control" id="phone" placeholder="010-0000-0000">
                    </div>
                    <div class="row btn-row">
                        <div class="col col-4">
                            <button class="btn btn-lg btn-secondary w-100 rounded-0 fw-bolder">취소</button>
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
    export default {
        components: {
            Header: () => import('@/components/Header.vue'),
        },
        methods: {
            submit: function() {
                alert('아이디 찾기')
                this.$router.push("/account/find_id_result")
            }
        }
    }
</script>

<style lang="scss" scoped>
.btn-row {
    margin-top: 30px;
}
</style>