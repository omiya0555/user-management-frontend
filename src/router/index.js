import { createRouter, createWebHistory } from 'vue-router';
import LoginFrom from '../components/LoginForm.vue'; // ログインページ
import UserList from '../components/UserList.vue'; // ユーザー一覧ページ

const routes = [
    {
        path: '/',
        name: 'LoginForm',
        component: LoginFrom,
    },
    {
        path: '/userlist',
        name: 'UserList',
        component: UserList,
        meta: { requiresAuth: true }, //認証が必要なルート
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

//認証済みでない場合、ルートをガードする。
router.beforeEach(( to, from, next ) => {
    // Localstrageにtokenがあるかで判定
    const isAuthenticated = !!localStorage.getItem('token'); 
    if(to.meta.requiresAuth && !isAuthenticated){
        next({ name: 'Login'});
    }else{
        next();
    }
});

export default router;