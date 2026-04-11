# OKR Tracker

個人向け OKR 管理ツール。

## 技術スタック

| レイヤー | 技術 |
|---------|------|
| Backend | Ruby 4.0.2 / Rails 8.1（API モード） |
| GraphQL | graphql-ruby |
| Frontend | Next.js（App Router / TypeScript） |
| DB | PostgreSQL 18 |
| インフラ | Docker Compose |

## 起動方法

```bash
docker compose up
```

| サービス | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend (GraphQL) | http://localhost:3001/graphql |

## 機能（MVP）

- **OKR 管理**: Objective の CRUD、Objective に紐づく Key Result の管理（progress: 0〜100）
- **ダッシュボード**: Objective 一覧・Key Results のネスト表示・進捗の可視化
- **週間レビュー**: done / issues / nextFocus の記録
