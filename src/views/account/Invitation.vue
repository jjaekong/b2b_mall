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
                <form @submit.prevent="submit">
                    <div class="mb-4">
                        <label for="email" class="form-label mb-1">이메일 주소</label>
                        <input type="email" class="form-control" id="email" placeholder="gdhong@tscientific.co.kr">
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
    export default {
        components: {
            Header: () => import('@/components/Header.vue'),
        },
        methods: {
            submit: function() {
                alert('초대메일 발송')
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