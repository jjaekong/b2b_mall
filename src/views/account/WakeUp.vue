<template>
    <div>
        <Header title="휴면계정 해제" />
        <main>
            <div class="container py-4">
                <div class="guide">
                    <h4>계정이 휴면 상태입니다.</h4>
                    <div>
                        1년간 서비스 이용 내역이 없어 계정이 휴면 상태이며, 이메일 혹은 휴대폰 인증을 통해 휴면 해제 후 서비스를 이용하실 수 있습니다.
                    </div>
                </div>
                <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#cert-email" type="button"><span>이메일 인증</span></button>
                        <button class="nav-link" data-bs-toggle="tab" data-bs-target="#cert-mobile" type="button"><span>휴대폰 인증</span></button>
                    </div>
                </nav>
                <form @submit.prevent="wakeUp">
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane show active" id="cert-email">
                            <div class="mb-4 position-relative">
                                <label for="email" class="form-label mb-1">아이디(이메일)</label>
                                <input type="email" class="form-control" id="email" placeholder="gdhong@tscientific.co.kr" v-model="email">
                                <button class="btn btn-sm position-absolute" @click.prevent="sendCertNum('email')">인증번호 발송</button>
                            </div>
                        </div>
                        <div class="tab-pane" id="cert-mobile">
                            <div class="mb-4 position-relative">
                                <label for="mobile" class="form-label mb-1">휴대폰번호</label>
                                <input type="text" class="form-control" id="mobile" placeholder="010-1234-4567" v-model="mobile">
                                <button class="btn btn-sm position-absolute" @click.prevent="sendCertNum('mobile')">인증번호 발송</button>
                            </div>
                        </div>
                    </div>
                    <div class="mb-4 position-relative">
                        <label for="cert-num" class="form-label mb-1">이메일 인증번호</label>
                        <input type="text" class="form-control" id="cert-num" placeholder="000000" v-model="certNum">
                        <span id="cert-limit" class="position-absolute">{{certNumTimeLimitMinSec}}</span>
                    </div>
                    <div class="row btn-row">
                        <div class="col col-4">
                            <button class="btn btn-lg btn-secondary w-100 rounded-0 fw-bolder" @click="goBack">취소</button>
                        </div>
                        <div class="col col-8">
                            <button type="submit" class="btn btn-lg btn-primary w-100 rounded-0 fw-bolder">휴면해제</button>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    </div>
</template>

<script>
    export default {
        beforeRouteEnter(to, from, next) {
            if (to.params.userData) {
                next(vm => {
                    if (to.params.userData.drmncyUserYn == 'Y') {
                        vm.userData = to.params.userData
                    } else {
                        vm.$router.replace("/account/login");
                    }
                });
            } else {
                next(vm => {
                    vm.$router.replace("/account/login");
                });
            }
        },
        components: {
            Header: () => import('@/components/Header.vue'),
        },
        data: function() {
            return {
                email: null,
                mobile: null,
                certNum: null,
                certNumTimer: null,
                certNumTimeLimit: 180
            }
        },
        computed: {
            certNumTimeLimitMinSec: function() {
                return Math.floor(this.certNumTimeLimit / 60) + ':' + (this.certNumTimeLimit % 60 < 10 ? '0'+ this.certNumTimeLimit % 60 : this.certNumTimeLimit % 60);
            }
        },
        methods: {
            goBack: function() {
                this.$router.back();
            },
            wakeUp: function() {
                console.log('휴면해제')
            },
            sendCertNum: function(certType) {
                alert(`인증번호 발송 ${certType}`);
            }
        }
    }
</script>

<style lang="scss" scoped>
.guide {
    margin-top: 5px;
    margin-bottom: 20px;
    h4 {
        margin-bottom: 15px;
        font-size: 18px;
        color: #365df0;
        text-align: center;
        font-weight: 800 !important;
    }
    div {
            color: #888d96;
            font-weight: 800;
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
    bottom: 0.2rem;
    right: 0;
    line-height: 2;
    color: #f58220;
}
.btn-row {
    margin-top: 30px;
}
</style>