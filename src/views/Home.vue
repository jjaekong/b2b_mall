<template>
    <div class="home">
        <Header>
            <template v-slot:right>
                <router-link class="btn-cart position-relative" to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
                        <g fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M6 6 L30 6 27 19 9 19 M27 23 L10 23 5 2 2 2" />
                            <circle cx="25" cy="27" r="2" />
                            <circle cx="12" cy="27" r="2" />
                        </g>
                    </svg>
                    <span class="position-absolute translate-middle top-10 start-100 badge rounded-pill">
                        99+
                    </span>
                </router-link>
            </template>
        </Header>
        <section class="search">
            <div class="container">
                <div class="position-relative">
                    <input class="keyword" type="text" placeholder="브랜드, 상품명 검색">
                    <button class="btn" type="submit"><i class="bi bi-search"></i></button>
                </div>
            </div>
        </section>
        <!-- 사용자 데이터 및 로그인 관련 메뉴 확인 영역 -->
        <div class="container pt-4" v-if="userData">
            <div class="card">
                <div class="card-header">
                    로그인 후
                </div>
                <div class="card-body">
                    userData: {{userData}}
                </div>
                <div class="card-body">
                    <ul class="mb-0">
                        <li><router-link :to="{ name: 'invite_user', params: { userData: userData } }">회원가입 초대</router-link></li>
                        <li><router-link to="/account/edit_user_info">회원정보 수정</router-link></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="container pt-4" v-else>
            <div class="card">
                <div class="card-header">
                    로그인 전
                </div>
                <div class="card-body">
                    <ul class="mb-0">
                        <li><router-link to="/account/login">로그인</router-link></li>
                        <li><router-link to="/account/find_id">아이디 찾기</router-link></li>
                        <li><router-link to="/account/find_pw">비밀번호 찾기</router-link></li>
                        <li><router-link to="/account/join">회원가입</router-link></li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- // 사용자 데이터 및 로그인 관련 메뉴 확인 영역 -->
        <component :is="userData ? 'HomeWithUser' : 'HomeWithoutUser'" />
        <Navbar />
    </div>
</template>

<script>
import { maskMobile } from '@/util';
import { mapState } from 'vuex';

    export default {
        components: {
            Header: () => import('@/components/Header.vue'),
            Navbar: () => import('@/components/Navbar.vue'),
            ProductItem: () => import('@/components/ProductItem.vue'),
            HomeWithUser: () => import('@/views/HomeWithUser.vue'),
            HomeWithoutUser: () => import('@/views/HomeWithoutUser.vue'),
        },
        data: function() {
            return {
            }
        },
        computed: {
            ...mapState({
                userData: state => state.userData
            }),
        },
        methods: {
        }
    }
</script>

<style lang="scss" scoped>
.btn-cart {
    text-decoration: none;
    svg {
        width: 24px;
        height: 24px;
        g {
            stroke: white;
        }
    }
    .badge {
        font-size: 10px;
        background-color: white;
        color: #365df0;
        padding: 0.15em 0.25em;
    }
}
.search {
    padding-top: 10px;
    height: 60px;
    background: rgb(103,23,205);
    background: linear-gradient(90deg, rgba(103,23,205,1) 0%, rgba(23,109,225,1) 100%);
    .keyword {
        padding-left: 10px;
        padding-right: 10px;
        width: 100%;
        border: 0;
        height: 36px;
        line-height: 36px;
        color: #222;
        font-size: 14px;
        font-weight: 900;
        &::placeholder {
            font-size: 12px;
            color: #a3a5a8;
        }
    }
    .btn {
        position: absolute;
        top: 0;
        right: 0;
        border-radius: 0;
        width: 36px;
        height: 36px;
        color: #a3a5a8;
        z-index: 1;
        font-size: 14px;
        line-height: 14px;
        box-shadow: none;
        &:focus {
            background-color: rgba(0, 0, 0, .1);
        }
    }
}
</style>