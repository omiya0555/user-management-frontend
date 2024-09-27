import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles.css'  // tailwindのファイルをインポート
import router from './router' // routerのインポート

const app = createApp(App);
app.use(router);
app.mount('#app')

