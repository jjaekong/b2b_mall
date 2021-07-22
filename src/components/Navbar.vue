<template>
    <div>
        <nav id="navbar">
            <router-link to="/">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
                    <g fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M6 6 L30 6 27 19 9 19 M27 23 L10 23 5 2 2 2" />
                        <circle cx="25" cy="27" r="2" />
                        <circle cx="12" cy="27" r="2" />
                    </g>
                </svg>
                <span>홈</span>
            </router-link>
            <router-link to="/inquiry">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
                    <g fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M2 26 L30 26 30 6 2 6 Z M2 6 L16 16 30 6" />
                    </g>
                </svg>
                <span>대량발송문의</span>
            </router-link>
            <router-link to="/cart" class="position-relative">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
                    <g fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M6 6 L30 6 27 19 9 19 M27 23 L10 23 5 2 2 2" />
                        <circle cx="25" cy="27" r="2" />
                        <circle cx="12" cy="27" r="2" />
                    </g>
                </svg>
                <span class="position-absolute translate-middle top-20 start-70 badge rounded-pill">99+</span>
                <span>장바구니</span>
            </router-link>
            <router-link to="/account/login">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
                    <g fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 11 C22 16 19 20 16 20 13 20 10 16 10 11 10 6 12 3 16 3 20 3 22 6 22 11 Z M4 30 L28 30 C28 21 22 20 16 20 10 20 4 21 4 30 Z" />
                    </g>
                </svg>
                <span>마이페이지</span>
            </router-link>
            <a href="#" @click.prevent="toggleMore">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
                    <g fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="7" cy="16" r="2" />
                        <circle cx="16" cy="16" r="2" />
                        <circle cx="25" cy="16" r="2" />
                    </g>
                </svg>
                <span>더보기</span>
            </a>
        </nav>
        <aside id="aside" :style="{ 'display': showAside ? 'block' : 'none' }" @click.prevent="closeMore">
            <div class="aside-content">
                <router-link to="/usage">이용안내</router-link>
                <a target="_blank" href="https://cs.tscientific.co.kr">온라인 고객센터</a>
            </div>
        </aside>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            showAside: false
        }
    },
    methods: {
        toggleMore: function() {
            this.showAside = !this.showAside
        },
        closeMore: function($event) {
            if ($event.target.getAttribute('id') == 'aside') {
                this.showAside = false
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#navbar {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    height: var(--navbar-height);
    background-color: var(--bs-light);
    background-color: white;
    z-index: 9000;
    a {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        font-size: 11px;
        line-height: 11px;
        color: #383d42;
        font-weight: bold;
        svg {
            margin-bottom: 4px;
            width: 20px;
            height: 20px;
            g {
                stroke: #383d42;
            }
        }
        .badge {
            background-color: #2f74f5;
        }
        &.router-link-active {
            color: #2f74f5;
            svg {
                g {
                    stroke: #2f74f5;
                }
            }
        }
    }
}
#aside {
    z-index: 9000;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: var(--navbar-height);
    background: rgba(0, 0, 0, .2);
    .aside-content {
        position: absolute;
        width: 100%;
        bottom: 0;
        background: white;
    }
    a {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        font-size: 15px;
        color: #383d42;
        font-weight: 900;
        border-bottom: 1px solid #eee;
        text-decoration: none;
    }
}
</style>