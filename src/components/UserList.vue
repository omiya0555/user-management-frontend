<template>
    <div>
        <p class="mb-10">Users List</p>
        <table class="table-auto w-4/5 m-auto text-left border-collapse">
            <thead>
                <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th class="py-3 px-6">ID</th>
                    <th class="py-3 px-6">Name</th>
                    <th class="py-3 px-6">Email</th>
                    <th class="py-3 px-6">Actions</th>
                </tr>
            </thead>
            <tbody class="text-gray-600 text-sm font-light">
                <tr v-for="user in users" :key="user.id" class="border-b border-gray-200 hover:bg-gray-100">
                    <td class="py-3 px-6">{{ user.id }}</td>
                    <td class="py-3 px-6">{{ user.name }}</td>
                    <td class="py-3 px-6">{{ user.email }}</td>
                    <td class="py-3 px-6 flex justify-between max-w-48">
                    <button 
                        @click="editUser(user.id)" 
                        class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
                    >
                        編集
                    </button>
                    <button 
                        @click="deleteUser(user.id)" 
                        class="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500 transition"
                    >
                        削除
                    </button>
                    </td>
                </tr>
            </tbody>
        </table>
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
        async mounted() {
            try {
                // ローカルストレージからトークンを取得
                const token = localStorage.getItem('token');

                // ユーザー一覧を取得
                const response = await axios.get('http://localhost/api/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                });
                this.users = response.data;
            } catch (error) {
                console.error('Failed to fetch users', error);
            }
        },
        methods: {
            editUser(id) {
                // 編集処理のロジック
                console.log('Edit user', id);
            },
            async deleteUser(id) {
                    // 誤操作による削除を防止するためのかくにんフォーム
                    if(confirm("削除しますか？")){
                    try {
                        const token = localStorage.getItem('token');
                        await axios.delete(`http://localhost/api/users/${id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });
                    // 削除後にリストから削除
                    this.users = this.users.filter(user => user.id !== id); 
                    } catch (error) {
                        console.error('Failed to delete user', error);
                    }
                }
            },
        },
    };
</script>
