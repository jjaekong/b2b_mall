<template>
    <div>
        <Header title="아이디 찾기" />
        <main>
            <div class="container py-4">
                <div class="result">
                    <h4>고객님의 아이디 찾기가 완료되었습니다.</h4>
                    <dl class="d-flex mb-0 justify-content-center">
                        <dt>아이디</dt>
                        <dd class="mb-0">tsc*******@email.com</dd>
                    </dl>
                </div>
                <form @submit.prevent="submit">
                    <div class="mb-4">
                        <label for="email" class="form-label mb-1">아이디</label>
                        <input type="email" class="form-control" id="email" placeholder="email@address.com">
                    </div>
                    <div class="mb-4">
                        <label for="password" class="form-label mb-1">비밀번호</label>
                        <input type="password" class="form-control" id="password" placeholder="●●●●●●●●●●" autocomplete="false">
                    </div>
                    <div class="btn-row">
                        <button class="btn btn-lg btn-primary w-100 rounded-0 fw-bolder">로그인</button>
                    </div>
                    <div class="find-pw">
                        <router-link to="/account/find_password">비밀번호 찾기</router-link>
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
                alert('로그인')
            }
        }
    }
</script>

<style lang="scss" scoped>
.result {
    margin-top: 5px;
    margin-bottom: 20px;
    h4 {
        margin-bottom: 15px;
        font-size: 18px;
        color: #365df0;
        text-align: center;
        font-weight: 800 !important;
    }
    dl {
        color: #888d96;
        font-weight: 800;
        dt {
            &::after {
                margin-left: 5px;
                margin-right: 5px;
                content: ":";
            }
        }
        dt, dd {
            font-weight: 800 !important;
        }
    }
}
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
    }
}
</style>