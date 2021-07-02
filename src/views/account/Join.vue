<template>
    <div>
        <Header title="회원가입" />
        <main>
            <div class="container py-4">
                <div class="agree-area">
                    <div class="form-check">
                        <input class="visually-hidden" type="checkbox" id="agree-terms" v-model="agreeTerms">
                        <label class="form-check-label" for="agree-terms">
                            <i class="bi bi-check-lg"></i>
                            만 14세 이상이며, 이용약관 동의
                        </label>
                        <a href="#modal-terms" data-bs-toggle="modal">상세보기 ▶</a>
                    </div>
                    <div class="form-check">
                        <input class="visually-hidden" type="checkbox" id="agree-privacy" v-model="agreePrivacy">
                        <label class="form-check-label" for="agree-privacy">
                            <i class="bi bi-check-lg"></i>
                            개인정보 수집 및 이용 동의
                        </label>
                        <a href="#modal-privacy" data-bs-toggle="modal">상세보기 ▶</a>
                    </div>
                </div>
                <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#business-title" type="button"><span>기업 실명인증</span></button>
                        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#business-license" type="button"><span>사업자등록증 업로드</span></button>
                    </div>
                </nav>
                <form @submit.prevent="join">
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="business-title">
                            <div class="mb-4">
                                <label for="bsn-title" class="form-label mb-1">상호명</label>
                                <input type="text" class="form-control" id="bsn-title" placeholder="티사이언티픽" v-model="bsnTitle" :disabled="isCertifiedBusiness">
                            </div>
                            <div class="mb-4 position-relative">
                                <label for="bsn-num" class="form-label mb-1">사업자등록번호</label>
                                <input type="text" class="form-control" id="bsn-num" placeholder="220-81-54389" v-model="bsnNum" :disabled="isCertifiedBusiness">
                                <button class="btn btn-sm position-absolute" @click.prevent="certBsnNum" :disabled="isCertifiedBusiness">사업자 실명인증</button>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="business-license">
                            <div class="mb-4">
                                <label for="bsn-file" class="form-label mb-1">사업자등록증(pdf, jpg)</label>
                                <input type="file" class="form-control" id="bsn-file" placeholder="티사이언티픽">
                            </div>
                        </div>
                    </div>
                    <div class="mb-4 position-relative">
                        <label for="email" class="form-label mb-1">아이디(이메일)</label>
                        <input type="email" class="form-control" id="email" placeholder="gdhong@tscientific.co.kr" v-model="email" :disabled="isCertifiedEmail">
                        <button class="btn btn-sm position-absolute" @click.prevent="sendCertNum" :disabled="isCertifiedEmail">인증번호 발송</button>
                    </div>
                    <div class="mb-4 position-relative">
                        <label for="cert-num" class="form-label mb-1">이메일 인증번호</label>
                        <input type="text" class="form-control" id="cert-num" placeholder="000000" v-model="certNum" :disabled="isCertifiedEmail">
                        <span id="cert-limit" class="position-absolute">{{certNumTimeLimitMinSec}}</span>
                        <button class="btn btn-sm position-absolute" @click.prevent="confirmCertNum" :disabled="isCertifiedEmail">인증번호 확인</button>
                    </div>
                    <div class="mb-4">
                        <label for="password" class="form-label mb-1">비밀번호</label>
                        <input type="password" class="form-control" id="password" placeholder="영문, 숫자, 특수문자 포함 8~20자" autocomplete="false" v-model="password">
                    </div>
                    <div class="mb-4">
                        <label for="re-password" class="form-label mb-1">비밀번호 확인</label>
                        <input type="password" class="form-control" id="re-password" placeholder="영문, 숫자, 특수문자 포함 8~20자" autocomplete="false" v-model="pwConfirm">
                    </div>
                    <div class="mb-4">
                        <label for="name" class="form-label mb-1">이름</label>
                        <input type="text" class="form-control" id="name" placeholder="휴대폰번호 인증 시 자동입력" readonly v-model="name">
                    </div>
                    <div class="mb-4 position-relative">
                        <label for="mobile" class="form-label mb-1">휴대폰번호</label>
                        <input type="text" class="form-control" id="mobile" placeholder="010-1234-4567" readonly v-model="mobile">
                        <button class="btn btn-sm position-absolute" @click.prevent="certMobile">인증하기</button>
                    </div>
                    <div class="row btn-row">
                        <div class="col col-4">
                            <button class="btn btn-lg btn-secondary w-100 rounded-0 fw-bolder">취소</button>
                        </div>
                        <div class="col col-8">
                            <button class="btn btn-lg btn-primary w-100 rounded-0 fw-bolder">회원가입</button>
                        </div>
                    </div>
                </form>
            </div>
        </main>
        <ModalTerms />
        <ModalPrivacy />
    </div>
</template>

<script>
import axios from "axios";
import { certBusiness } from '@/account';

    export default {
        components: {
            Header: () => import('@/components/Header.vue'),
            ModalTerms: () => import('@/views/account/ModalTerms.vue'),
            ModalPrivacy: () => import('@/views/account/ModalPrivacy.vue'),
        },
        data: function() {
            return {
                agreeTerms: true,           // 이용약관 동의
                agreePrivacy: true,         // 개인정보수집 동의
                bsnTitle: null,             // 상호명
                bsnNum: null,               // 사업자 등록번호
                bsnFile: null,              // 사업자 등록증 파일
                email: null,                // 아이디(이메일)
                certNum: null,              // 인증번호
                password: null,             // 비밀번호
                pwConfirm: null,            // 비밀번호 확인
                name: null,                 // 이름
                mobile: null,               // 휴대폰번호
                isInvited: false,           // 기업관리자의 초대 여부
                isCertifiedBusiness: false,      // 사업자 실명인증 여부
                isCertifiedEmail: false,    // 이메일 인증 여부
                isCertifiedMobile: false,   // 휴대폰 인증 여부
                regExpBsnNum: /^(\d{3}-\d{2}-\d{5}|\d{10})$/, // 사업자번호 정규식
                regExpEmail: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i, // 이메일 정규식
                regExpPassword: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{3,20}$/, // 비밀번호 정규식
                emailToCertified: null,     // 인증할 이메일 주소
                certNumTimer: null,         // 인증 타이머
                certNumTimeLimit: 180,      // 인증 제한 시간(3분)
            }
        },
        computed: {
            certNumTimeLimitMinSec: function() {
                return Math.floor(this.certNumTimeLimit / 60) + ':' + (this.certNumTimeLimit % 60 < 10 ? '0'+ this.certNumTimeLimit % 60 : this.certNumTimeLimit % 60);
            }
        },
        methods: {
            certBsnNum: function() {
                if (!this.bsnTitle) {
                    alert('상호명을 입력해주세요.');
                    document.querySelector('#bsn-title').focus();
                    return;
                }
                if (!this.bsnNum) {
                    alert('사업자등록번호 10자리를 입력해 주세요.');
                    document.querySelector('#bsn-num').focus();
                    return;
                }
                if (!this.regExpBsnNum.test(this.bsnNum)) {
                    alert('사업자등록번호 10자리를 형식에 맞게 입력해 주세요.');
                    document.querySelector('#bsn-num').focus();
                    return;
                }

                if (certBusiness(this.bsnTitle, this.bsnNum)) {
                    this.isCertifiedBusiness = true;
                    alert('사업자 실명인증이 성공하였습니다.');
                } else {
                    this.isCertifiedBusiness = false;
                    alert('사업자 실명인증에 실패하였습니다. 사업자 정보를 다시 확인해주세요.');
                }
                
            },
            sendCertNum: function() {
                if (!this.email) {
                    alert('이메일주소를 입력해주세요.');
                    document.querySelector('#email').focus();
                    return;
                }
                if (!this.regExpEmail.test(this.email)) {
                    alert('이메일주소를 양식에 맞게 입력해 주세요.');
                    document.querySelector('#email').focus();
                    return;
                }

                // 타이머가 있다면 초기화
                if (this.certNumTimer) {
                    clearInterval(this.certNumTimer);
                }

                // 타이머 제한시간 리셋
                this.certNumTimeLimit = 180;

                // 인증번호 발송
                axios({
                    method: 'post',
                    url: 'https://tmall-backend.coufun.kr/auth/send',
                    data: {
                        "authKey": this.email,
                        "authReqCode": "SIGN_UP"
                    }
                })
                .then(res => {
                    if (res.status == 200 || res.status == 204) {
                        // 제한 시간 보이기
                        document.querySelector('#cert-limit').style.display = 'block';
                        // 타이머 시작
                        this.certNumTimer = setInterval(() => {
                            if (this.certNumTimeLimit > 0) {
                                this.certNumTimeLimit--;
                            } else {
                                clearInterval(this.certNumTimer);
                            }
                        }, 1000);
                        alert('입력하신 이메일 주소로 인증번호가 발송되었습니다');
                    } else if (res.status == 400) {
                        alert(`${res.message}`);
                    } else if (res.status == 500) {
                        alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
                    }
                })
            },
            confirmCertNum: function() {
                if (!this.certNum) {
                    alert('인증번호를 입력해주세요.');
                    document.querySelector('#cert-num').focus();
                    return;
                }

                // 인증번호 확인
                axios({
                    method: 'post',
                    url: 'https://tmall-backend.coufun.kr/auth/check',
                    data: {
                        "authKey": this.email,
                        "authNo": this.certNum,
                        "authReqCode": "SIGN_UP"
                    }
                })
                .then(res => {
                    if (res.status == 200 || res.status == 204) {
                        this.isCertifiedEmail = true;
                        // 타이머 정지
                        clearInterval(this.certNumTimer);
                        // 타이머 감추기
                        document.querySelector('#cert-limit').style.display = 'none';
                        // 인증여부 저장
                        this.isCertifiedEmail = true;
                        alert('이메일 인증이 완료되었습니다.');
                    } else if (res.status == 400) {
                        alert(`${res.message}`);
                    } else if (res.status == 500) {
                        alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
                    }
                })
            },
            certMobile: function() {
                this.name = '김재홍';
                this.mobile = '010-4744-5544';
                this.isCertifiedMobile = true;
            },
            join: function() {
                if (!this.agreeTerms) {
                    alert('이용약관에 동의해주세요.');
                    return;
                }
                if (!this.agreePrivacy) {
                    alert('개인정보 수집 및 이용에 동의해주세요.');
                    return;
                }
                if (!this.isCertifiedBusiness) {
                    alert('사업자 실명인증을 완료해주세요.');
                    return;
                }
                if (!this.isCertifiedEmail) {
                    alert('이메일 인증을 완료해주세요.');
                    return;
                }
                if (this.password && this.pwConfirm) {
                    if (!this.regExpPassword.test(this.password)) {
                        alert('비밀번호는 영문, 숫자, 특수문자 포함 8~20자를 입력해주세요.');
                        return;
                    }
                    if (!this.regExpPassword.test(this.pwConfirm)) {
                        alert('비밀번호는 영문, 숫자, 특수문자 포함 8~20자를 입력해주세요.');
                        return;
                    }
                    if (this.password != this.pwConfirm) {
                        alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
                        return;
                    }
                } else if (!this.password) {
                    alert('비밀번호를 입력해주세요.');
                    return;
                } else if (!this.pwConfirm) {
                    alert('비밀번호 확인을 입력해주세요.');
                    return;
                }
                if (!this.name) {
                    alert('이름을 입력해주세요.');
                    return;
                }
                if (!this.isCertifiedMobile) {
                    alert('휴대폰 인증을 완료해주세요.');
                    return;
                }

                var formData = new FormData();
                formData.append("companyName", this.bsnTitle);
                formData.append("companyRegnum", this.bsnNum.replace(/[^\d]/ig, ""));
                formData.append("emailId", this.email);
                formData.append("mobileTelno", this.mobile.replace(/[^\d]/ig, ""));
                formData.append("userName", this.name);
                formData.append("userPwd", this.password);

                // 가입절차 진행
                axios({
                    method: 'post',
                    url: 'https://tmall-backend.coufun.kr/signUp/manager',
                    data: formData,
                    headers: {
                        "Content-Type": "multipart/form-data; charset=UTF-8"
                    }
                })
                .then(res => {
                    if (res.status == 200 || res.status == 204) {
                        alert('회원가입이 완료되었습니다.');
                        this.$router.push('/account/login');
                    } else {
                        const err = new Error();
                        err.response = res;
                        throw err;
                    }
                })
                .catch(err => {
                    if (err.response.data.status == 400) {
                        alert(`${err.response.data.message}`);
                    } else if (err.response.data.status == 500) {
                        alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.agree-area {
    margin-bottom: 20px;
    .form-check {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        padding-left: 0;
    }
    input {
        margin-right: 5px;
        &:checked + label {
            i {
                color: white;
            }
        }
    }
    label {
        display: flex;
        align-items: center;
        margin-right: 10px;
        font-size: 14px;
        i {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 5px;
            width: 20px;
            height: 20px;
            background: #6717cd;
            background: linear-gradient(135deg, #6717cd 0%, #176de1 100%);
            color: transparent;
        }
    }
    a {
        color: #827878;
    }
}
.nav-tabs {
    margin-bottom: 20px;
    border-bottom-color: #333;
    .nav-link {
        flex: 1;
        border-radius: 0;
        border-top: 1px solid #e4e4e4;
        border-left: 1px solid #e4e4e4;
        border-right: 1px solid #e4e4e4;
        color: #827878;
        font-weight: 800;
        font-size: 14px;
        &.active {
            // border-bottom: 1px solid white;
            border-top: 1px solid #333;
            border-left: 1px solid #333;
            border-right: 1px solid #333;
            // border-color: #333;
            color: #176de1;
        }
        &:not(.active):hover {
            border-bottom-color: #333;
        }
        & + .nav-link {
            margin-left: 4px;
        }
    }
}
.btn-sm {
    bottom: 0.2rem;
    right: 0;
    font-weight: 800;
    background: #333;
    color: #fff;
    width: 100px;
    border-radius: 0;
}
#cert-limit {
    display: none;
    bottom: 0.375rem;
    right: 110px;
    line-height: 2;
    color: #f58220;
}
.btn-row {
    margin-top: 30px;
}
</style>