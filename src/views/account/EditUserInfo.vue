<template>
    <div>
        <Header title="회원정보 수정" />
        <main>
            <div class="container py-4">
                <form @submit.prevent="submit">
                    <div class="step first">
                        <div class="mb-4">
                            <label for="email" class="form-label mb-1">아이디(이메일)</label>
                            <input type="email" class="form-control" id="email" placeholder="gdhong@tscientific.co.kr">
                        </div>
                        <div class="mb-4">
                            <label for="password" class="form-label mb-1">새 비밀번호</label>
                            <input type="password" class="form-control" id="password" placeholder="영문, 숫자, 특수문자 포함 8~20자" autocomplete="false">
                        </div>
                        <div class="mb-4">
                            <label for="re-password" class="form-label mb-1">새 비밀번호 확인</label>
                            <input type="password" class="form-control" id="re-password" placeholder="영문, 숫자, 특수문자 포함 8~20자" autocomplete="false">
                        </div>
                        <div class="mb-4 position-relative">
                            <label for="phone" class="form-label mb-1">휴대폰번호</label>
                            <input type="text" class="form-control" id="phone" placeholder="010-0000-0000">
                            <button class="btn btn-sm position-absolute" @click="sendCertNum">인증번호 발송</button>
                        </div>
                        <div class="mb-4 position-relative">
                            <label for="cert-num" class="form-label mb-1">인증번호</label>
                            <input type="text" class="form-control" id="cert-num" placeholder="000000">
                            <span id="cert-limit" class="position-absolute">2:49</span>
                            <button class="btn btn-sm position-absolute" @click="confirmCertNum">인증번호 확인</button>
                        </div>
                        <div class="mb-4">
                            <label for="name" class="form-label mb-1">이름</label>
                            <input type="text" class="form-control" id="name" placeholder="홍길동">
                        </div>
                        <div class="mb-4">
                            <label for="team" class="form-label mb-1">소속</label>
                            <input type="text" class="form-control" id="team" placeholder="00팀">
                        </div>
                    </div>
                    <div class="step second">
                        <h6><b>2단계 인증</b></h6>
                        <div class="mb-3 noti">
                            2단계 인증은 아이디, 비밀번호 입력 후 이메일 또는 휴대폰 인증을 통해 
                            로그인을 완료하는 이중 보안 절차입니다.
                        </div>
                        <div class="mb-3 d-flex justify-content-between flex-wrap">
                            <div class="d-flex align-items-center">
                                <input type="radio" name="cert-type" id="cert-type-0"><label for="cert-type-0" class="form-label ms-2 mb-0">진행안함</label>
                            </div>
                            <div class="d-flex align-items-center">
                                <input type="radio" name="cert-type" id="cert-type-1"><label for="cert-type-1" class="form-label ms-2 mb-0">이메일 인증</label>
                            </div>
                            <div class="d-flex align-items-center">
                                <input type="radio" name="cert-type" id="cert-type-2"><label for="cert-type-2" class="form-label ms-2 mb-0">휴대폰 인증</label>
                            </div>
                        </div>
                    </div>
                    <div class="row btn-row">
                        <div class="col col-4">
                            <button class="btn btn-lg btn-secondary w-100 rounded-0 fw-bolder">취소</button>
                        </div>
                        <div class="col col-8">
                            <button class="btn btn-lg btn-primary w-100 rounded-0 fw-bolder">저장</button>
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
                alert('저장')
            }
        }
    }
</script>

<style lang="scss" scoped>
.step {
    &.first {
        .btn {
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
    }
    &.second {
        margin-top: 30px;
        h6 {
            font-size: 14px;
            font-weight: 800;
        }
        .noti {
            color: #827878;
        }
        label {
            font-size: 15px;
        }
    }
}
.btn-row {
    margin-top: 30px;
}
</style>