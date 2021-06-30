<template>
    <div>
        <Header title="비밀번호 찾기" />
        <main>
            <div class="container py-4">
                <form @submit.prevent="submit">
                    <div class="mb-4">
                        <label for="email" class="form-label mb-1">아이디(이메일)</label>
                        <input type="email" class="form-control" id="email" placeholder="gdhong@tscientific.co.kr">
                    </div>
                    <div class="mb-3 position-relative">
                        <label for="phone" class="form-label mb-1">휴대폰번호</label>
                        <input type="text" class="form-control" id="phone" placeholder="010-0000-0000">
                        <button class="btn btn-sm position-absolute" @click="sendCertNum">인증번호 발송</button>
                    </div>
                    <div class="mb-3 position-relative">
                        <label for="cert-num" class="form-label mb-1">인증번호</label>
                        <input type="text" class="form-control" id="cert-num" placeholder="000000">
                        <span id="cert-limit" class="position-absolute">2:49</span>
                        <button class="btn btn-sm position-absolute" @click="confirmCertNum">인증번호 확인</button>
                    </div>
                    <div class="row btn-row">
                        <div class="col col-4">
                            <button class="btn btn-lg btn-secondary w-100 rounded-0 fw-bolder">취소</button>
                        </div>
                        <div class="col col-8">
                            <button class="btn btn-lg btn-primary w-100 rounded-0 fw-bolder">비밀번호 찾기</button>
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
            sendCertNum: function() {
                alert('인증번호 발송')
                return;
            },
            confirmCertNum: function() {
                alert('인증번호 확인')
                return;
            },
            submit: function() {
                alert('찾기')
            }
        }
    }
</script>

<style lang="scss" scoped>
.btn-sm {
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
.btn-row {
    margin-top: 30px;
}
</style>