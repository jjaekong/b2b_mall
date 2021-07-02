<template>
    <div class="home">
        <Header />
        <main>
            <div class="container">
                <div>userData: {{userData}}</div>
                <router-link to="/account/find_id">아이디 찾기</router-link><br>
                <router-link to="/account/find_id_result">아이디 찾기(결과화면)</router-link><br>
                <router-link to="/account/edit_user_info">회원정보 수정</router-link><br>
                <router-link to="/account/login">로그인</router-link><br>
                <router-link to="/account/cert">2단계 인증</router-link><br>
                <router-link to="/account/invitation">회원가입 초대</router-link><br>
                <router-link to="/account/find_pw">비밀번호 찾기</router-link><br>
                <router-link to="/account/join">회원가입</router-link><br>
            </div>
        </main>
    </div>
</template>

<script>
import { mapState } from 'vuex';

    export default {
        name: 'Home',
        components: {
            Header: () => import('@/components/Header.vue'),
            // Navber: () => import('@/components/navbar.vue'),
        },
        data: function() {
            return {}
        },
        computed: {
            ...mapState({
                userData: state => state.userData
            })
        }
    }
</script>

<style lang="scss" scoped>

</style>