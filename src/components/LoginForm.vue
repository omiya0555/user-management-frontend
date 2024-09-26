<template>
    
    <p class="text-lg mb-4">Login</p>
    <form @submit.prevent="login" class="bg-gray-200 p-4 w-64 m-auto rounded-sm">
        
        <input v-model="email" type="email" class="mb-2 p-1 rounded-sm" placeholder="Email">
        <input v-model="password" type="password" class="mb-2 p-1 rounded-sm" placeholder="Password">
        <button type="submit" class="bg-gray-400 hover:bg-gray-600 text-white p-1 rounded-sm">Login</button>
    
    </form>
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

<style>

</style>