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
                <router-link to="/account/added_cert">2단계 인증</router-link><br>
                <router-link to="/account/wake_up">휴면계정 해제</router-link><br>
                <router-link :to="{ name: 'invite_user', params: { userData: userData }}">회원가입 초대</router-link><br>
                <router-link to="/account/find_pw">비밀번호 찾기</router-link><br>
                <router-link to="/account/join">회원가입</router-link><br>
                <router-link to="/account/reset_pw">비밀번호 재설정</router-link><br>
                <div><button @click="deleteAllUsers">전체 사용자 삭제</button></div>
            </div>
        </main>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

    export default {
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
        },
        methods: {
            deleteAllUsers: function() {
                axios({
                    method: 'post',
                    url: 'https://tmall-backend.coufun.kr/test/user/all-delete'
                })
                .then(res => {
                    console.log('전체사용자 삭제 => ', res)
                })
                .catch(err => {
                    console.log('전체사용자 삭제 에러 => ', err)
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>