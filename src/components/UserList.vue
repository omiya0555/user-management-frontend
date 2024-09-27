<template>
    <div>
        <p class="mb-10">Users List</p>
        <button @click="openModal('create')" class="bg-blue-500 text-white px-4 py-2 rounded mb-4">新規作成</button>
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
                            @click="openModal('edit', user)" 
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
        <UserModal
            v-if="isModalOpen"
            :is-edit-mode="isEditMode"
            :user="currentUser"
            @close="closeModal"
            @save="handleSave"
        />
    </div>
</template>

<script>
    import axios from 'axios';
    import UserModal from '@/components/UserModal.vue';

    export default {
        components: {
            UserModal, 
        },
        data() {
            return {
                userData: { ...this.user }, // 新しいオブジェクトを作成
                users: [],
                isModalOpen: false, // モーダルが開いているかどうか
                isEditMode: false, // 作成か更新かを判別
                currentUser: null, // 現在編集中のユーザー
            };
        },
        async mounted() {
                // async 内で await をつける
                await this.fetchUsers();
            },

        methods: {
            openModal(mode, user = null) {
                // modeと'edit'を評価し、真偽値を格納
                this.isEditMode = mode === 'edit';
                // 編集中のユーザーが空（編集でなく作成）なら、
                // 各プロパティが空のオブジェクトを格納しておく
                this.currentUser = user ? { ...user } : { name: '', email: '', password: '' };
                this.isModalOpen = true;
            },
            closeModal() {
                this.isModalOpen = false;
            },

            // mountedにも利用
            // this.fetchUsers() だけでなく await が必要だった。
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

            // save イベントが発生すると実行
            // isEditModeの値に応じてメソッドを実行
            async handleSave(userData) {
                if (this.isEditMode) {
                    await this.editUser(userData.id, userData);
                } else {
                    await this.createUser(userData);
                }
                this.fetchUsers(); // ユーザーリストを再取得
                this.closeModal();
            },

            // User情報を更新
            async editUser(id, userData) {
                try {
                    const token = localStorage.getItem('token');
                    await axios.put(`http://localhost/api/users/${id}`, userData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                } catch (error) {
                    console.error('Failed to update user', error);
                }
            },

            async createUser(userData) {
                // ！！！フロント側でもバリデーションを行う必要あり！！！
                try {
                    const token = localStorage.getItem('token');
                    await axios.post('http://localhost/api/users', userData, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                } catch (error) {
                    console.error('Failed to create user', error);
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
