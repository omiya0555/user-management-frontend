# プロジェクト名 - User Management App

## 概要
このプロジェクトは、Vue.jsを使用したフロントエンドと、Laravelを使用したバックエンドで構成されたユーザー管理アプリケーションです。ユーザーの一覧表示、詳細情報の表示、更新、削除が行えるCRUDアプリです。

バックエンドはAPIとして提供されており、フロントエンドからAxiosを使用してAPIリクエストを送信し、ユーザーデータを取得、操作します。

## 機能
- ユーザーの登録
- ユーザー一覧の取得（未認証でもアクセス可能）
- ユーザーの詳細表示
- ユーザーの更新・削除（認証が必要）
- ログイン機能（APIトークン認証）

## 使用技術
### フロントエンド
- Vue.js 3
- Axios
- Tailwind CSS（または他のスタイリング）

### バックエンド
- Laravel 10
- Laravel Sanctum（APIトークン認証）
- MySQL（データベース）

## インストール手順

### バックエンド（Laravel API）
1. **プロジェクトのクローン**:
    ```bash
    git clone https://github.com/omiya0555/user-management-api.git
    cd backend
    ```

2. **依存関係のインストール**:
    ```bash
    composer install
    ```

3. **環境ファイルの設定**:
    `.env.example`をコピーして`.env`ファイルを作成し、必要なデータベースやAPIキーの設定を行います。
    ```bash
    cp .env.example .env
    ```

4. **データベースの設定とマイグレーション**:
    `.env`ファイルにデータベース情報を設定した後、マイグレーションを実行してテーブルを作成します。
    ```bash
    php artisan migrate --seed
    ```

5. **アプリケーションの起動**:
    ```bash
    php artisan serve
    ```

### フロントエンド（Vue.js）
1. **プロジェクトのクローン**:
    ```bash
    git clone https://github.com/omiya0555/user-management-frontend.git
    cd frontend
    ```

2. **依存関係のインストール**:
    ```bash
    npm install
    ```

3. **Vue.jsアプリケーションの起動**:
    ```bash
    npm run serve
    ```

## APIエンドポイント

### 認証が必要なエンドポイント
- **GET** `/api/users` - ユーザーの一覧を取得します。
- **GET** `/api/users/{id}` - ユーザーの詳細情報を取得します。
- **POST** `/api/users` - ユーザーを追加します。
- **PUT** `/api/users/{id}` - ユーザーの情報を更新します。
- **DELETE** `/api/users/{id}` - ユーザーを削除します。

## APIトークンの発行方法
ユーザーのログイン時にトークンを発行するには、次の手順を実行します。

1. **ログインリクエスト**:
    ```bash
    curl -X POST http://localhost/api/login \
    -H "Content-Type: application/json" \
    -d '{"email": "testuser@gmail.com", "password": "testuser"}'
    ```

2. **レスポンス例**:
    ```json
    {
        "token": "api_token_value"
    }
    ```

このトークンを使用して、認証が必要なAPIにアクセスします。

## 使用例

- **ユーザー一覧の取得**:
    ```bash
    curl -X GET http://localhost/api/users
    ```

- **ユーザーの詳細表示（認証付き）**:
    ```bash
    curl -X GET http://localhost/api/users/1 \
    -H "Authorization: Bearer api_token_value"
    ```