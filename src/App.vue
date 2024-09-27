<template>
  <div id="app">
    <!-- ナビゲーションバー -->
    <nav  v-if="isAuthenticated" class="bg-white shadow-md mb-10">
      <ul class="flex justify-center space-x-6 py-4">
        <li><router-link class="text-gray-700 hover:text-black transition" to="/userlist">Home</router-link></li>
        <li class="cursor-pointer text-gray-700 hover:text-black transition" @click="logout">Logout</li>
      </ul>
    </nav>
    <!-- ルートで指定されたコンポーネントを表示 -->
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAuthenticated: !!localStorage.getItem('token') // ログインしているかどうかの状態を確認
    };
  },
  methods: {
    logout() {
      // 誤操作によるログアウトを防止する確認フォーム
      if(confirm("ログアウトしますか？")){
        // ログアウト処理
        localStorage.removeItem('token'); // トークンを削除
        this.isAuthenticated = false; // 認証状態を更新
        this.$router.push('/'); // ログインページにリダイレクト
      }
    }
  },
  watch: {
    // 認証状態が変わったときに再評価
    $route() {
      this.isAuthenticated = !!localStorage.getItem('token');
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
