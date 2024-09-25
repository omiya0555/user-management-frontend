<template>
    <div>
    <h2>Users List</h2>
    <ul>
        <li v-for="user in users" :key="user.id">{{ user.name }}</li>
    </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
    return {
        users: [],
    };
    },
    mounted() {
    // トークンをlocalStorageから取得
    const token = localStorage.getItem('token');
    axios.get('http://localhost/api/users', {
        headers: {
        Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        this.users = response.data;
    })
    .catch(error => {
        console.error('Error fetching users:', error);
    });
    },
};
</script>