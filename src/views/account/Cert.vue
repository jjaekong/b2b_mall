<template>
    <div>
        <Header title="2단계 인증" />
        <main>
            <div class="container py-4">
                <div class="guide">
                    <h4>인증번호를 입력하세요.</h4>
                    <div>
                        회원님의 이메일(email@address.com)로<br>
                        2단계 인증번호가 발송되었습니다.<br>
                        인증번호를 입력하여 2단계 인증을 완료해주세요.
                    </div>
                </div>
                <form @submit.prevent="submit">
                    <div class="mb-4 position-relative">
                        <label for="cert-num" class="form-label mb-1">2단계 인증번호</label>
                        <input type="text" class="form-control" id="cert-num" placeholder="123456">
                        <span id="cert-limit" class="position-absolute">2:49</span>
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
    export default {
        components: {
            Header: () => import('@/components/Header.vue'),
        },
        methods: {
            submit: function() {
                alert('인증하기')
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
            bottom: 0.375rem;
            right: 0;
            line-height: 2;
            color: #f58220;
        }
</style>