# Googleスプレッドシート設計

Googleスプレッドシートを1つ作成し（例：`経営ダッシュボードDB`）、その中に以下の
10枚のシートを作成してください。**1行目は必ずヘッダー行**にし、**A列は必ずid**にします。

## 1. dashboard
KPIカードのステータス（HOME画面表示用のサマリー）
| 列 | 内容 |
|---|---|
| id | 一意のID |
| category | advertising / leads / hp / recruiting / activity_plan / tasks / consultations |
| label | 表示名（例：広告販促） |
| progress | 進捗率（数値） |
| status | good / warn / bad |
| status_label | 順調 / 注意 / 要対応 |
| updated_at | 更新日時 |

## 2. advertising（広告販促）
| id | year | annual_budget | used_amount | month | channel | monthly_amount | memo | updated_at |

## 3. leads（集客）
| id | month | inquiries | applications | negotiations | contracts | source | memo | updated_at |

## 4. hp（HP運用）
| id | month | pv | uu | inquiries | cv_rate | article_count | published_this_month | page_title | page_views | page_cv_rate | updated_at |

## 5. recruiting（人材紹介）
| id | month | companies | candidates | interviews_internal | recommendations | interviews | offers | joined | target | actual | updated_at |

## 6. activity_plan（活動計画）
| id | month | item | plan | actual | forecast | updated_at |

## 7. tasks（タスク）※本文で例示された列構成
| id | task_name | description | owner | due_date | priority | status | progress | category | memo | created_at | updated_at |

## 8. consultations（相談）
| id | title | background | current_situation | problem | options | recommendation | decision_point | priority | status | due_date | created_at | updated_at |

## 9. activity_log（活動履歴）
| id | date | category | content | owner | result | next_action | memo | created_at |

## 10. settings（設定値）
| key | value | memo |
|---|---|---|
| company_name | ○○株式会社 | |
| fiscal_year_start_month | 4 | 会計年度開始月 |
| owner_email | (承認者メール) | アクセス制御用 |

ハードコードを避けるため、担当者一覧・優先度の選択肢・カテゴリ一覧なども
将来的にこのsettingsシートに追加していきます。

## 次にやっていただくこと（Phase 2の準備）

1. Googleドライブで新規スプレッドシートを作成し、名前を `経営ダッシュボードDB` にする
2. 上記10シートをこの名前で作成する（シート名は半角英数字・アンダースコアのまま）
3. 各シートの1行目に、上記の列名をそのまま入力する
4. tasks・consultations・activity_logシートには、動作確認用に2〜3行サンプルデータを入れておく
5. スプレッドシートのURL（またはID）を教えてください → Phase2でGAS側から接続します
