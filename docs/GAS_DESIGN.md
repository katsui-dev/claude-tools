# GAS（Google Apps Script）設計

Phase 3以降で `gas/` 配下に実装します。現時点では関数の役割定義のみです。

## データ取得系

- `getDashboardData()` — HOME画面のKPI・要対応事項用データ一式
- `getAdvertisingData()` — 広告販促画面
- `getLeadData()` — 集客画面
- `getHpData()` — HP運用画面
- `getRecruitingData()` — 人材紹介画面
- `getActivityPlanData()` — 活動計画画面
- `getTasks()` — タスク一覧
- `getConsultations()` — 相談一覧
- `getActivityLogs()` — 活動履歴一覧

## データ登録系

- `createTask(taskObject)`
- `createConsultation(consultationObject)`
- `createActivityLog(logObject)`

## データ更新系

- `updateTask(id, patchObject)`
- `updateConsultation(id, patchObject)`

## 共通処理（Utils.js / Config.js を想定）

- スプレッドシート取得（シート名指定でシートオブジェクトを返す共通関数）
- ID生成（例：`t-20250915-0001` のような連番＋日付ベース）
- 日付処理（表示用フォーマット・保存用ISO文字列変換）
- エラーハンドリング（try/catchで例外をキャッチしログに残し、フロントには
  `{ success: false, message: ... }` の形で返す）
- ログ出力（操作ログをスプレッドシートまたはStackdriverログに記録）
- 入力値バリデーション（必須項目チェック・文字数チェック・XSS対策のエスケープ）

## フロントエンドとの連携方針

- 可能な限りGASのWeb App（`doGet`）+ `HtmlService` + `google.script.run` で完結させる
- 外部APIサーバーは作らない
- スプレッドシートの認証情報・APIキーはフロントエンドJSに書かない
  （GAS側のみがスプレッドシートにアクセスする）
