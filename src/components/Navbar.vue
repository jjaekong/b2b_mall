<template>
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
        <router-link to="/cart">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
                <g fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M6 6 L30 6 27 19 9 19 M27 23 L10 23 5 2 2 2" />
                    <circle cx="25" cy="27" r="2" />
                    <circle cx="12" cy="27" r="2" />
                </g>
            </svg>
            <span>장바구니</span>
        </router-link>
        <router-link to="/mypage">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
                <g fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11 C22 16 19 20 16 20 13 20 10 16 10 11 10 6 12 3 16 3 20 3 22 6 22 11 Z M4 30 L28 30 C28 21 22 20 16 20 10 20 4 21 4 30 Z" />
                </g>
            </svg>
            <span>마이페이지</span>
        </router-link>
        <router-link to="/more">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
                <g fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="7" cy="16" r="2" />
                    <circle cx="16" cy="16" r="2" />
                    <circle cx="25" cy="16" r="2" />
                </g>
            </svg>
            <span>더보기</span>
        </router-link>
    </nav>
</template>

<style lang="scss" scoped>
#navbar {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    height: 50px;
    a {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        font-size: 11px;
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
</style>