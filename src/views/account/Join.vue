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
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="business-title">
                        <form @submit.prevent="joinAsBusinessTitle">
                            <div class="mb-4">
                                <label for="bsn-title" class="form-label mb-1">상호명</label>
                                <input type="text" class="form-control" id="bsn-title" placeholder="티사이언티픽" v-model="bsnTitle" required>
                            </div>
                            <div class="mb-4 position-relative">
                                <label for="bsn-num" class="form-label mb-1">사업자등록번호</label>
                                <input type="text" class="form-control" id="bsn-num" placeholder="220-81-54389" v-model="bsnNum" required>
                                <button class="btn btn-sm position-absolute" @click.prevent="certBsnNum" :disabled="isInvited">사업자 실명인증</button>
                            </div>
                            <div class="mb-4 position-relative">
                                <label for="email" class="form-label mb-1">아이디(이메일)</label>
                                <input type="email" class="form-control" id="email" placeholder="gdhong@tscientific.co.kr" v-model="email" required>
                                <button class="btn btn-sm position-absolute" @click.prevent="sendCertNum">인증번호 발송</button>
                            </div>
                            <div class="mb-4 position-relative">
                                <label for="cert-num" class="form-label mb-1">이메일 인증번호</label>
                                <input type="text" class="form-control" id="cert-num" placeholder="000000" v-model="certNum">
                                <span id="cert-limit" class="position-absolute">{{certNumTimeLimitMinSec}}</span>
                                <button class="btn btn-sm position-absolute" @click.prevent="confirmCertNum">인증번호 확인</button>
                            </div>
                            <div class="mb-4">
                                <label for="password" class="form-label mb-1">비밀번호</label>
                                <input type="password" class="form-control" id="password" placeholder="영문, 숫자, 특수문자 포함 8~20자" autocomplete="false" required>
                            </div>
                            <div class="mb-4">
                                <label for="re-password" class="form-label mb-1">비밀번호 확인</label>
                                <input type="password" class="form-control" id="re-password" placeholder="영문, 숫자, 특수문자 포함 8~20자" autocomplete="false" required>
                            </div>
                            <div class="mb-4">
                                <label for="name" class="form-label mb-1">이름</label>
                                <input type="text" class="form-control" id="name" placeholder="휴대폰번호 인증 시 자동입력" required>
                            </div>
                            <div class="mb-4 position-relative">
                                <label for="mobile" class="form-label mb-1">휴대폰번호</label>
                                <input type="text" class="form-control" id="mobile" placeholder="010-1234-4567" required>
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
                    <div class="tab-pane fade" id="business-license">
                        <form @submit.prevent="joinAsBusinessLicense">
                            <button type="submit">회원가입</button>
                        </form>
                    </div>
                </div>
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
                email: null,                // 아이디(이메일)
                certNum: null,              // 인증번호
                resCertNum: null,           // 응답받은 인증번호
                password: null,             // 비밀번호
                pwConfirm: null,            // 비밀번호 확인
                name: null,                 // 이름
                mobile: null,               // 휴대폰번호
                isInvited: false,           // 기업관리자의 초대 여부
                isBsnCertified: false,      // 사업자 실명인증 여부
                isEmailCertified: false,    // 이메일 인증 여부
                isMobileCertified: false,   // 휴대폰 인증 여부
                regBsnNUm: /^(\d{3}-\d{2}-\d{5}|\d{10})$/, // 사업자번호 정규식
                regEmail: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i, // 이메일 정규식
                emailToCertified: null,     // 인증할 이메일 주소
                certNumTimer: null,         // 인증 타이머
                certNumTimeLimit: 180,      // 인증 제한 시간(3분)
                certNumRequestTimes: 0,     // 인증 요청 횟수
                sentCertNum: null,          // 발송된 인증번호
                lastCertRequestTime: null,  // 마지막 인증요청 시간
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
                if (!this.regBsnNUm.test(this.bsnNum)) {
                    alert('사업자등록번호 10자리를 형식에 맞게 입력해 주세요.');
                    document.querySelector('#bsn-num').focus();
                    return;
                }

                if (certBusiness(this.bsnTitle, this.bsnNum)) {
                    this.isBsnCertified = true;
                    alert('사업자 실명인증이 성공하였습니다.');
                } else {
                    this.isBsnCertified = false;
                    alert('사업자 실명인증에 실패하였습니다. 사업자 정보를 다시 확인해주세요.');
                }
                
            },
            sendCertNum: function() {
                if (!this.email) {
                    alert('이메일주소를 입력해주세요.');
                    document.querySelector('#email').focus();
                    return;
                }
                if (!this.regEmail.test(this.email)) {
                    alert('이메일주소를 양식에 맞게 입력해 주세요.');
                    document.querySelector('#email').focus();
                    return;
                }
                // 인증번호 3회 요청 체크
                if (this.certNumRequestTimes > 3) {
                    // 인증번호 3회 요청 후 5분이 경과하지 않았을 때
                    if (this.lastCertRequestTime + 300 > Math.floor(new Date().getTime() / 1000)) {
                        alert('이메일 인증번호를 3회 이상 요청하여 5분간 인증번호 요청이 제한되었습니다.');
                        return;
                    } else {
                        this.certNumRequestTimes = 0;
                    }
                }
                // 동일한 이메일 주소 & 1분 이내 재요청인지 체크
                if (this.email == this.emailToCertified && this.certNumTimeLimit > 120) {
                    alert('동일한 이메일 주소로 인증번호 추가발송 요청 시 1분 경과 후 진행 가능합니다.');
                    return;
                }
                // 인증 요청횟수 카운트
                this.certNumRequestTimes++;
                // 타이머 리셋
                this.certNumTimeLimit = 180;
                // 인증 받을 이메일
                this.emailToCertified = this.email;
                // 마지막 인증시간
                this.lastCertRequestTime = Math.floor(new Date().getTime() / 1000);
                // 타이머 시작 전 초기화
                clearInterval(this.certNumTimer);
                // 타이머 시작
                this.certNumTimer = setInterval(() => {
                    if (this.certNumTimeLimit > 0) {
                        this.certNumTimeLimit--;
                    } else {
                        clearInterval(this.certNumTimer);
                    }
                }, 1000)
                // 제한 시간 보이기
                document.querySelector('#cert-limit').style.display = 'block'
                
                // this.resCertNum = "123123";

                // 인증번호 발송
                axios({
                    method: 'post',
                    url: 'https://tmall-backend.coufun.kr/auth/send',
                    data: {
                        "authKey": this.email,
                        "authReqCode": "SIGN_UP"
                    },
                    headers: {
                        "accept": '*/*',
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    }
                })
                .then((res) => {
                    console.log('인증번호 발송 성공', res)
                })
                .catch(error => {
                    console.log('인증번호 발송 실패', error)
                })
            },
            confirmCertNum: function() {
                if (!this.certNum) {
                    alert('인증번호를 입력해주세요.');
                    document.querySelector('#cert-num').focus();
                    return;
                }
                if (this.certNum !== this.resCertNum) {
                    alert('인증번호를 확인해주세요.');
                    document.querySelector('#cert-num').focus();
                    return;
                }
                if (this.lastCertRequestTime) {
                    if (this.lastCertRequestTime + 180 < Math.floor(new Date().getTime() / 1000)) {
                        alert('인증번호가 만료되었습니다. 인증번호 재발송 후 인증을 진행헤주세요.');
                        return;
                    }
                }
                axios({
                    method: 'post',
                    url: 'https://tmall-backend.coufun.kr/auth/check',
                    data: {
                        "authKey": this.email,
                        "authNo": this.certNum,
                        "authReqCode": "SIGN_UP"
                    },
                    headers: {
                        "accept": '*/*',
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    }
                })
                .then((res) => {
                    console.log('인증번호 인증 성공', res)
                })
                .catch(error => {
                    console.log('인증번호 인증 실패', error)
                })
            },
            certMobile: function() {
                alert('인증하기')
            },
            joinAsBusinessTitle: function() {
                alert('회원가입 1')
            },
            joinAsBusinessLicense: function() {
                alert('회원가입 2')
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
    bottom: 0.375rem;
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