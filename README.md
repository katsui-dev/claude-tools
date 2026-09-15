# 経営ダッシュボード（Management Dashboard）

毎朝3分見るだけで「会社の状況・問題・今日やるべきこと・判断が必要なこと」が分かる、
経営者専用のWebダッシュボードです。

## 全体構成

```
PC / iPhone / タブレット (ブラウザ)
        ↓
Webダッシュボード (HTML / CSS / JS, Chart.js)
        ↓  google.script.run
Google Apps Script (Web App)
        ↓  SpreadsheetApp
Googleスプレッドシート（データベース）
```

詳細は `docs/ARCHITECTURE.md` を参照してください。

## 開発フェーズ

| Phase | 内容 | 状態 |
|---|---|---|
| 1 | フロントエンドUI（ダミーデータ） | ✅ 実装中 |
| 2 | Googleスプレッドシート連携設計 | 未着手 |
| 3 | GAS連携（実データ取得） | 未着手 |
| 4 | タスク・相談の登録／更新（GAS経由） | 未着手 |
| 5 | 認証・権限・セキュリティ | 未着手 |
| 6 | 運用改善 | 未着手 |

詳細は `docs/ROADMAP.md` を参照してください。

## フォルダ構成

```
frontend/   ブラウザで動く画面一式（Phase1の成果物）
gas/        Google Apps Script プロジェクト（clasp管理・Phase3〜）
docs/       設計ドキュメント
```

## Phase 1 の動かし方

`frontend/index.html` を直接ブラウザで開くだけで動作します（外部サーバー不要）。
現在はすべてダミーデータ（`frontend/js/data/dummyData.js`）で動作しており、
Googleスプレッドシートには一切接続していません。

タスク・相談・活動履歴の「新規登録／編集」はPhase1では画面内メモリ上にのみ保存され、
リロードするとダミーデータに戻ります（Phase2でスプレッドシート保存に置き換えます）。

```bash
# ローカルでブラウザ確認する場合（任意）
cd frontend
python3 -m http.server 8080
# → http://localhost:8080 を開く
```

## デザインコンセプト

- ベースカラー：白 / メインカラー：ネイビー / アクセント：グリーン
- 警告表示にオレンジ・赤を使用
- カード型UI、余白を十分に確保した高級感のあるSaaS風デザイン
- 「何が順調か」「何が危険か」「何をすべきか」が一目でわかることを最優先
