<template>
    <p class="text-lg mt-20 mb-4">Login</p>
    <form @submit.prevent="login" class="p-4 w-64 m-auto border rounded-md">
        <input v-model="email" type="email" class="mb-2 p-1 border hover:border-gray-400 rounded-sm transition" placeholder="Email" required>
        <input v-model="password" type="password" class="mb-2 p-1 border hover:border-gray-400 rounded-sm transition" placeholder="Password" required>
        <button type="submit" class="bg-gray-500 hover:bg-gray-700 text-white p-1 rounded-sm transition">Login</button>
    </form>
</template>

<script>
import axios from 'axios';

    export default {
        data() {
            return {
            email: '',
            password: '',
            };
        },
        methods: {
            async login() {
                try {
                    // 非同期でログインを試みるpostリクエストを送信
                    // 成功したら response.data.token にトークンが格納さ
                    const response = await axios.post('http://localhost/api/login', {
                    email: this.email,
                    password: this.password,
                    });

                    // トークンをローカルストレージに保存
                    localStorage.setItem('token', response.data.token);

                    // 認証後にユーザー一覧ページに遷移
                    this.$router.push({ name: 'UserList' });
                } catch (error) {
                    console.error('Login failed', error);
                    alert('Email又はPasswordが間違っています。');
                }
            },
        },
    };
</script>