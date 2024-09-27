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
                console.log(this.users)
            } catch (error) {
                console.error('Failed to fetch users', error);
            }
        },
        methods: {
            // mountedにまったく同じ処理があるので、後で共通化したい。
            async fetchUsers() {
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

            // User情報を更新
            async editUser(id) {
                // 
                try{
                    const token = localStorage.getItem('token');
                    // 更新する値を格納
                    const data  = { name: "test-update", email: "test-update@mail", password: "testupdate"}
                    
                    // ユーザIDの情報を上で格納した値に更新
                    await axios.put(`http://localhost/api/users/${id}`, data, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    });
                    this.fetchUsers(); //更新後のUser情報を表示
                }catch (error){
                    console.error('Failed to update user', error);
                }
            },

            // Userを削除
            async deleteUser(id) {
                // 誤操作による削除を防止するための確認フォーム
                if(confirm("削除しますか？")){
                    try {
                        const token = localStorage.getItem('token');
                        await axios.delete(`http://localhost/api/users/${id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });
                    // 削除後にリストから削除
                    // パフォーマンスとコードの簡易さから、フィルターで隠す処理を実装した。
                    // （または、様々な実装方法を試したいから）
                    // ほかのユーザーの処理が行われている可能性もあるので、最新のＤＢの情報とは限らない。
                    this.users = this.users.filter(user => user.id !== id); 
                    } catch (error) {
                        console.error('Failed to delete user', error);
                    }
                }
            },
        },
    };
</script>
