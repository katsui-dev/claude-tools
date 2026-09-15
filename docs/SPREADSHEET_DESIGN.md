# Googleスプレッドシート設計

Googleスプレッドシートを1つ作成し（例：`経営ダッシュボードDB`）、その中に以下の
10枚のシートを作成します。**1行目は必ずヘッダー行**にし、**A列は必ずid**にします。

> **Phase 2の対象範囲**：今回のPhase2で実際にGAS経由の取得処理を実装するのは
> **`dashboard`シートのみ**です（HOME画面のKPIカード7枚分）。
> 他の9シートは将来のPhase（3以降）でそれぞれの画面に接続するための「置き場所」として
> 先に構成だけ用意しておきます（データは入れておいても構いません）。
> **すべてダミー・テスト用データであり、本番データではありません。**

## 1. dashboard（Phase2で接続）

HOME画面のKPIカード用データ。1行 = KPIカード1枚。

| 列 | データ型 | 内容 | 例 |
|---|---|---|---|
| id | 文字列（半角英数） | KPIの識別子。フロントエンドのルート名と一致させる | `advertising` |
| label | 文字列 | カードに表示する名前 | `広告販促` |
| progress | 数値（空可） | 進捗率（%）。count方式のカードは空欄でよい | `82` |
| count | 数値（空可） | 件数表示するカード用（相談など）。progress方式は空欄 | `3` |
| unit | 文字列（空可） | countの単位 | `件` |
| status | 文字列 | `good` / `warn` / `bad` のいずれか | `good` |
| updated_at | 日時（空可） | 最終更新日時（任意、GAS側で自動セットでも可） | `2026-09-15 10:00` |

idは以下の7種類のいずれかにしてください（フロントエンドのメニュー・ルートと対応しています）。
`advertising` / `leads` / `hp` / `recruiting` / `activityPlan` / `tasks` / `consultations`

## 2. advertising（広告販促）※Phase3以降で接続
| 列 | データ型 | 内容 |
|---|---|---|
| id | 文字列 | 一意のID |
| year | 数値 | 年度 |
| annual_budget | 数値 | 年間予算（円） |
| used_amount | 数値 | 消化額（円） |
| month | 文字列 | 対象月（例：4月） |
| channel | 文字列 | Google広告 / Meta広告 / 求人媒体 / その他 |
| monthly_amount | 数値 | その月・媒体の実績額 |
| memo | 文字列 | 備考 |
| updated_at | 日時 | 更新日時 |

## 3. leads（集客）※Phase3以降
| id | month | inquiries(数値) | applications(数値) | negotiations(数値) | contracts(数値) | source(文字列) | memo | updated_at |

## 4. hp（HP運用）※Phase3以降
| id | month | pv(数値) | uu(数値) | inquiries(数値) | cv_rate(数値) | article_count(数値) | published_this_month(数値) | page_title(文字列) | page_views(数値) | page_cv_rate(数値) | updated_at |

## 5. recruiting（人材紹介）※Phase3以降
| id | month | companies(数値) | candidates(数値) | interviews_internal(数値) | recommendations(数値) | interviews(数値) | offers(数値) | joined(数値) | target(数値) | actual(数値) | updated_at |

## 6. activity_plan（活動計画）※Phase3以降
| id | month | item(文字列) | plan(数値) | actual(数値) | forecast(数値) | updated_at |

## 7. tasks（タスク）※Phase4で登録・更新を接続
| id | task_name(文字列) | description(文字列) | owner(文字列) | due_date(日付) | priority(文字列: high/mid/low) | status(文字列: todo/in_progress/done/on_hold) | progress(数値) | category(文字列) | memo(文字列) | created_at(日時) | updated_at(日時) |

## 8. consultations（相談）※Phase4で登録・更新を接続
| id | title | background | current_situation | problem | options(文字列・改行区切り) | recommendation | decision_point | priority(high/mid/low) | status(pending/in_review/on_hold/done) | due_date(日付) | created_at | updated_at |

## 9. activity_log（活動履歴）※Phase4で登録を接続
| id | date(日付) | category(文字列) | content(文字列) | owner(文字列) | result(文字列) | next_action(文字列) | memo(文字列) | created_at(日時) |

## 10. settings（設定値）※Phase5以降
| key | value | memo |
|---|---|---|
| company_name | ○○株式会社 | |
| fiscal_year_start_month | 4 | 会計年度開始月 |
| owner_email | (承認者メール) | アクセス制御用 |

ハードコードを避けるため、担当者一覧・優先度の選択肢・カテゴリ一覧なども
将来的にこのsettingsシートに追加していきます。

## Phase 2で用意したテスト用スプレッドシート

Phase2では、上記10シートの構成をすべて満たし、`dashboard`シートにはPhase1の
ダミーKPI値と同じ値を入れた**テスト用スプレッドシート**をGoogleドライブ上に
作成しました（本番データではありません）。詳細は `docs/PHASE2_SETUP.md` を
参照してください。
