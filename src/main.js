import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 부트스트랩
import 'bootstrap'

// 부트스트랩 아이콘
import 'bootstrap-icons/font/bootstrap-icons.css'

// 나눔스퀘어라운 폰트
import '@/assets/fonts/nanumsquareround.min.css'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
