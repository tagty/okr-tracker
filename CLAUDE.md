# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

個人向け OKR 管理ツール。

- **Backend**: Ruby 4.0.2 / Rails 8.1（API モード）+ graphql-ruby — `POST /graphql` のみ提供
- **Frontend**: Next.js（App Router / TypeScript）+ Apollo Client
- **DB**: PostgreSQL 18
- **インフラ**: Docker Compose（開発環境）

## アーキテクチャ

```
frontend (Next.js) → POST /graphql → backend (Rails API) → PostgreSQL
```

- `backend/` — Rails API。MVP では REST ルートなし、GraphQL のみ。
- `frontend/` — Next.js App Router。Apollo Client で GraphQL を呼び出す。
- `docker-compose.yml` — `db` / `backend` / `frontend` の 3 サービスを管理。

ポート割り当て：
- frontend → ホスト 3000
- backend → ホスト 3001（コンテナ内 3000）
- db → ホスト 5432

`db` サービスに healthcheck を設定済み。`backend` は `service_healthy` を待ってから起動する。

## よく使うコマンド

すべてリポジトリルートから Docker Compose 経由で実行する。

```bash
# 全サービス起動
docker compose up

# backend のみ起動（db も一緒に立ち上がる）
docker compose up backend

# イメージ再ビルド（Gemfile や package.json 変更後）
docker compose build backend
docker compose build frontend

# Rails コマンド
docker compose run --rm backend rails db:migrate
docker compose run --rm backend rails db:seed
docker compose run --rm backend rails generate model Foo bar:string
docker compose run --rm backend rails console

# テスト（Minitest）
docker compose run --rm backend rails test
docker compose run --rm backend rails test test/models/objective_test.rb

# Lint
docker compose run --rm backend bin/rubocop
docker compose run --rm backend bin/brakeman
```

## データモデル（設計）

| モデル | 主なカラム |
|--------|-----------|
| `Objective` | `title`, `description`, `period` |
| `KeyResult` | `objective_id`, `title`, `progress`（0〜100） |
| `WeeklyReview` | `week_start`（ユニーク日付）, `done`, `issues`, `next_focus` |

`Objective` has many `KeyResult`。`WeeklyReview` は Objective と独立した全体レビュー。

## GraphQL

- エンドポイント: `POST /graphql`
- `Objective` の `averageProgress` はサーバー側で `KeyResult#progress` の平均を算出して返す
- `WeeklyReview` は `week_start` をキーとした upsert mutation を使う
- CORS は `config/initializers/cors.rb` で設定（現在コメントアウト済み）。frontend と接続する際は `rack-cors` gem を追加して有効化する

## 画面構成（Frontend）

```
/ (ダッシュボード)
  └─ Objective 一覧
       └─ 各 Objective カード
            ├─ タイトル・期間
            ├─ 平均進捗バー
            └─ Key Result 一覧（進捗スライダー or 数値）

/objectives/new       → Objective 作成
/objectives/:id       → Objective 詳細 + Key Result 管理
/weekly-review        → 週間レビュー（done / issues / nextFocus）
```

### コンポーネント構成

```
app/
├─ page.tsx                  # ダッシュボード
├─ objectives/
│   ├─ new/page.tsx
│   └─ [id]/page.tsx
└─ weekly-review/page.tsx

components/
├─ ObjectiveCard.tsx          # 進捗バー込み
├─ KeyResultItem.tsx          # 進捗入力付き
├─ ObjectiveForm.tsx
└─ WeeklyReviewForm.tsx
```

## コードスタイル

Ruby は `rubocop-rails-omakase`（Rails デフォルトの omakase スタイル）。`bin/rubocop` で確認。
