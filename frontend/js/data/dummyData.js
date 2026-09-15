/**
 * Phase1用ダミーデータ。
 * ★重要：これは実データではありません。Phase2でGoogleスプレッドシートに
 * 接続する際は、この App.Data と同じ形のオブジェクトを
 * google.script.run.getXxxData() の戻り値として組み立てます。
 * （＝画面側のコードはPhase2以降もほぼ変更不要な設計）
 */
window.App = window.App || {};

App.Data = {
  isDummy: true, // 実データ接続後は false にする（Phase3で切替）

  kpis: [
    { id: 'advertising', label: '広告販促', icon: '📢', progress: 82, status: 'good' },
    { id: 'leads', label: '集客', icon: '🧲', progress: 74, status: 'warn' },
    { id: 'hp', label: 'HP', icon: '🌐', progress: 83, status: 'good' },
    { id: 'recruiting', label: '人材紹介', icon: '🧑‍💼', progress: 68, status: 'bad' },
    { id: 'activityPlan', label: '活動計画', icon: '🗓️', progress: 72, status: 'warn' },
    { id: 'tasks', label: 'タスク', icon: '✅', progress: 85, status: 'good' },
    { id: 'consultations', label: '相談', icon: '💬', count: 3, unit: '件', status: 'bad' }
  ],

  alerts: [
    { id: 1, level: 'bad', category: '人材紹介', message: '面接実施数が計画比 -18% で推移しています。今月の目標達成には巻き返しが必要です。' },
    { id: 2, level: 'warn', category: '集客', message: '広告経由のCPAが前月比 +12% に上昇しています。クリエイティブまたは配信先の見直しを検討してください。' },
    { id: 3, level: 'bad', category: 'HP', message: '問い合わせ数が目標未達です（目標30件 → 実績21件、達成率70%）。' },
    { id: 4, level: 'warn', category: '広告販促', message: '広告予算の消化ペースが計画より速く、このままのペースだと年間予算を約8%超過する見込みです。' }
  ],

  tasks: [
    { id: 't-001', taskName: 'LP改善', description: '広告経由LPのファーストビュー改善とCTA配置の見直し', owner: '山田', dueDate: '2026-09-16', priority: 'high', status: 'in_progress', progress: 80, category: '広告販促', memo: '' },
    { id: 't-002', taskName: '求人企業開拓', description: '新規求人企業への提案リスト作成とアポ獲得', owner: '鈴木', dueDate: '2026-09-18', priority: 'mid', status: 'in_progress', progress: 60, category: '人材紹介', memo: '' },
    { id: 't-003', taskName: 'HP記事作成', description: '採用ブランディング記事の執筆・入稿', owner: '田中', dueDate: '2026-09-20', priority: 'mid', status: 'in_progress', progress: 40, category: 'HP', memo: '' },
    { id: 't-004', taskName: '広告改善', description: 'Meta広告のクリエイティブA/Bテスト実施', owner: '山田', dueDate: '2026-09-21', priority: 'high', status: 'in_progress', progress: 90, category: '広告販促', memo: '' },
    { id: 't-005', taskName: '商談資料アップデート', description: '求人媒体向け提案資料の実績数値を更新', owner: '鈴木', dueDate: '2026-09-19', priority: 'low', status: 'todo', progress: 10, category: '集客', memo: '' },
    { id: 't-006', taskName: '月次レポート作成', description: '経営会議向け月次サマリーの作成', owner: '田中', dueDate: '2026-09-25', priority: 'mid', status: 'todo', progress: 0, category: '活動計画', memo: '' },
    { id: 't-007', taskName: '面接日程調整', description: '候補者3名分の面接スケジュール調整', owner: '鈴木', dueDate: '2026-09-17', priority: 'high', status: 'in_progress', progress: 55, category: '人材紹介', memo: '' },
    { id: 't-008', taskName: 'SEOキーワード見直し', description: '流入上位ページのメタ情報最適化', owner: '田中', dueDate: '2026-09-12', priority: 'low', status: 'done', progress: 100, category: 'HP', memo: '完了済み' }
  ],

  consultations: [
    {
      id: 'c-001',
      title: '広告予算を追加するか？',
      background: '下期の求人受注を強化するため、現在Meta広告とGoogle広告を運用中。',
      currentSituation: '直近3ヶ月のCPAは横ばいだが、上期の予算消化ペースが計画よりやや速い。一方で商談化率は改善傾向。',
      problem: '現行予算のままだと下期に予算切れが発生し、11〜12月の繁忙期に広告を止めざるを得なくなる可能性がある。',
      options: [
        '案A：年間予算を150万円増額し、下期も現状ペースで配信を継続する',
        '案B：予算は据え置き、CPAの高い媒体への配分を絞って延命する',
        '案C：一旦広告を減速し、紹介・SEO経由の強化にリソースを振る'
      ],
      recommendation: '商談化率が改善傾向にあるため、案A（増額）を推奨。ただしMeta広告の配分は見直す。',
      decisionPoint: '150万円の追加予算を承認するかどうか、今月中にご判断ください。',
      priority: 'high',
      status: 'pending',
      dueDate: '2026-09-20'
    },
    {
      id: 'c-002',
      title: 'HP制作会社を変更するか？',
      background: '現行のHP制作・保守は外部A社に委託。契約更新が10月に迫っている。',
      currentSituation: 'A社の更新頻度が月1回程度と少なく、記事公開までのリードタイムが長い。競合はより高頻度で更新している。',
      problem: 'HP経由の問い合わせが目標未達の状態が続いており、コンテンツ更新速度の遅さが一因と考えられる。',
      options: [
        '案A：A社と契約を継続し、更新頻度アップを条件交渉する',
        '案B：更新頻度の高いB社に切り替える（コストは月3万円増）',
        '案C：内製化し、社内でHP更新を巻き取る'
      ],
      recommendation: 'まずは案A（A社との条件交渉）を試し、改善が見られなければ案Bへ切り替えを推奨。',
      decisionPoint: 'A社との条件交渉を進めてよいか、それとも先にB社へ切り替えるか、方針をご判断ください。',
      priority: 'mid',
      status: 'in_review',
      dueDate: '2026-09-30'
    },
    {
      id: 'c-003',
      title: '求人媒体を変更するか？',
      background: '現在利用中の求人媒体Xは応募数は多いが、内定承諾率が低い。',
      currentSituation: '媒体X経由の応募は月間ボリュームが大きい一方、入社に至る割合が他媒体の半分以下。',
      problem: '採用コストパフォーマンスが悪化しており、人材紹介全体の達成率を下げる要因になっている。',
      options: [
        '案A：媒体Xの掲載プランを見直し、ターゲティングを絞る',
        '案B：媒体Xを解約し、実績の良い媒体Yに予算を集中する',
        '案C：媒体X・Yを併用しつつ、比重をYに寄せる'
      ],
      recommendation: '案C（併用しつつYへ比重シフト）でリスクを抑えつつ改善するのが現実的。',
      decisionPoint: '媒体Xを継続するか、どの程度Yへ予算をシフトするかご判断ください。',
      priority: 'high',
      status: 'pending',
      dueDate: '2026-09-22'
    }
  ],

  activityLogs: [
    { id: 'a-001', date: '2026-09-14', category: '人材紹介', content: 'A社への求人企業訪問、追加求人2件を受注', owner: '鈴木', result: '成功', nextAction: '求人票の作成・掲載', memo: '' },
    { id: 'a-002', date: '2026-09-13', category: '広告販促', content: 'Meta広告のクリエイティブ差し替え', owner: '山田', result: 'CTR +0.8pt改善', nextAction: '1週間様子を見て予算配分を調整', memo: '' },
    { id: 'a-003', date: '2026-09-12', category: 'HP', content: '採用ブランディング記事を1本公開', owner: '田中', result: '公開完了', nextAction: 'SNSでの拡散', memo: '' },
    { id: 'a-004', date: '2026-09-11', category: '集客', content: '大手クライアントB社と商談', owner: '鈴木', result: '前向きな反応、見積提出待ち', nextAction: '見積書を9/15までに送付', memo: '' },
    { id: 'a-005', date: '2026-09-10', category: '人材紹介', content: '候補者2名の一次面接を実施', owner: '鈴木', result: '1名通過、1名見送り', nextAction: '通過者の二次面接調整', memo: '' },
    { id: 'a-006', date: '2026-09-09', category: '活動計画', content: '9月度の活動計画レビュー会議', owner: '田中', result: '計画達成率72%で合意', nextAction: '未達項目の巻き返し施策検討', memo: '' },
    { id: 'a-007', date: '2026-09-08', category: '広告販促', content: '月次広告レポートを作成・共有', owner: '山田', result: '消化率59.6%を確認', nextAction: '予算増額の要否を検討（相談事項へ）', memo: '' },
    { id: 'a-008', date: '2026-09-05', category: 'HP', content: 'SEOキーワードの棚卸し', owner: '田中', result: '上位20キーワードを特定', nextAction: 'メタ情報の最適化', memo: '' }
  ],

  advertising: {
    annualBudget: 12000000,
    used: 7150000,
    firstHalfActual: 6800000,
    secondHalfForecast: 5900000,
    channels: [
      { name: 'Google広告', amount: 3200000 },
      { name: 'Meta広告', amount: 1900000 },
      { name: '求人媒体', amount: 1550000 },
      { name: 'その他', amount: 500000 }
    ],
    monthly: [
      { month: '4月', budget: 950000, actual: 900000 },
      { month: '5月', budget: 950000, actual: 980000 },
      { month: '6月', budget: 1000000, actual: 1120000 },
      { month: '7月', budget: 1000000, actual: 1050000 },
      { month: '8月', budget: 1050000, actual: 1180000 },
      { month: '9月', budget: 1050000, actual: 920000 }
    ]
  },

  leads: {
    kpis: { inquiries: 128, applications: 64, negotiations: 31, contracts: 14 },
    funnel: [
      { label: '問い合わせ', value: 128 },
      { label: '応募', value: 64 },
      { label: '商談', value: 31 },
      { label: '成約', value: 14 }
    ],
    sources: [
      { name: '広告', value: 58 },
      { name: 'SEO', value: 34 },
      { name: '紹介', value: 24 },
      { name: 'その他', value: 12 }
    ],
    monthly: [
      { month: '4月', inquiries: 96, contracts: 9 },
      { month: '5月', inquiries: 104, contracts: 11 },
      { month: '6月', inquiries: 118, contracts: 12 },
      { month: '7月', inquiries: 122, contracts: 13 },
      { month: '8月', inquiries: 131, contracts: 15 },
      { month: '9月', inquiries: 128, contracts: 14 }
    ]
  },

  hp: {
    kpis: { pv: 48200, uu: 21500, inquiries: 21, targetInquiries: 30 },
    content: { articleCount: 186, publishedThisMonth: 6, scheduled: 4 },
    topPages: [
      { title: '求人紹介サービスとは', pv: 6200, cvRate: 2.4 },
      { title: '導入事例：株式会社〇〇', pv: 5400, cvRate: 0.2 },
      { title: 'よくある質問', pv: 4800, cvRate: 0.4 },
      { title: '料金プラン', pv: 3900, cvRate: 3.1 },
      { title: '会社概要', pv: 3100, cvRate: 0.1 }
    ]
  },

  recruiting: {
    funnel: [
      { label: '求人企業', value: 42 },
      { label: '候補者', value: 210 },
      { label: '面談', value: 96 },
      { label: '推薦', value: 58 },
      { label: '面接', value: 34 },
      { label: '内定', value: 12 },
      { label: '入社', value: 8 }
    ],
    target: 12,
    actual: 8
  },

  activityPlan: {
    items: [
      { item: '企業訪問', plan: 40, actual: 29 },
      { item: '商談', plan: 30, actual: 22 },
      { item: '求人開拓', plan: 20, actual: 15 },
      { item: 'HP記事', plan: 8, actual: 6 },
      { item: '広告改善', plan: 6, actual: 5 }
    ]
  }
};
