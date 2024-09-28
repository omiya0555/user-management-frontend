<template>
    <div class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="modal-content bg-white rounded-lg shadow-lg w-96 p-6 relative">
            <h2 class="text-2xl font-semibold mb-6 text-center">{{ isEditMode ? 'Edit User' : 'Create User' }}</h2>
            <form @submit.prevent="submitForm" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Name:</label>
                    <input v-model="userData.name" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Email:</label>
                    <input v-model="userData.email" type="email" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Password <span v-if="isEditMode" class="text-xs">(空で最新の状態を保持)</span>:</label>
                    <input v-model="userData.password" type="password" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
                </div>
                <div class="flex justify-between mt-6">
                    <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none transition">
                        保存
                    </button>
                    <button type="button" @click="$emit('close')" class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md focus:outline-none transition">
                        <span class="text-xs">キャンセル</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
// !!! 入力中のバリデーションも行いたい !!!
export default {
    props: {
        // 編集か作成か判断するフラグを
        // props によって親コンポーネントから受け取る
        isEditMode: {
            type: Boolean,
            required: true,
        },
        // 選択されたユーザーのデータ
        user: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            userData: { ...this.user },  // スプレッド構文-propsで渡されたuserオブジェクトのコピー
        };
    },
    methods: {
        // emitで、親コンポーネントと通信し userData object を送信
        // 入力フォームの値を含む
        submitForm() {
            this.$emit('save', this.userData);
        },
    },
    
    watch: {
        // user データの変更を監視し、変更時には指定された処理を行う。
        user: {
            // 監視が開始された時、即座に監視対象の現在の値で handler を実行
            // 通常は変更時のみだが、immediate を true にすることで上が実現できる。
            immediate: true,
            // 変更された値 newValue を引数に持つ handler 関数
            // user の新しい値をスプレッド構文を用いて userData にコピー
            handler(newValue) {
                this.userData = { ...newValue };
            },
        },
    },
};
</script>

<style scoped>
/* モーダル全体を中央に配置するためのスタイル */
.modal-overlay {
    z-index: 50;
}
.modal-content {
    z-index: 100;
}
</style>
