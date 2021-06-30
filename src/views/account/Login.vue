<template>
    <div>
        <Header title="로그인" />
        <main>
            <div class="container py-4">
                <form @submit.prevent="submit">
                    <div class="mb-4">
                        <label for="email" class="form-label mb-1">아이디 (이메일)</label>
                        <input type="email" class="form-control" id="email" placeholder="email@address.com">
                    </div>
                    <div class="mb-4">
                        <label for="password" class="form-label mb-1">비밀번호</label>
                        <input type="password" class="form-control" id="password" placeholder="●●●●●●●●●●" autocomplete="false">
                    </div>
                    <div class="btn-row">
                        <button class="btn btn-lg btn-primary w-100 rounded-0 fw-bolder">로그인</button>
                    </div>
                    <div class="find-pw d-flex justify-content-center">
                        <router-link to="/account/find_id"><span>아이디 찾기</span></router-link>
                        <router-link to="/account/find_password"><span>비밀번호 찾기</span></router-link>
                        <router-link to="/account/join"><span>회원가입</span></router-link>
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