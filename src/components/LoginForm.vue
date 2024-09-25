<template>
    <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email">
        <input v-model="password" type="password" placeholder="Password">
        <button type="submit">Login</button>
    </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
    return {
        email: '',
        password: ''
    };
    },
    methods: {
    login() {
        axios.post('http://localhost/api/login', {
        email: this.email,
        password: this.password
        })
        .then(response => {
        // トークンをlocalStorageに保存
        localStorage.setItem('token', response.data.token);
        alert('Logged in successfully!');
        })
        .catch(error => {
        console.error('Login failed:', error);
        });
    }
    }
};
</script>