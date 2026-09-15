/**
 * 設定値・シート名を集約するファイル。ハードコードを避けるためここにまとめる。
 *
 * ★Phase2セットアップ手順★
 * 1. Googleスプレッドシート（docs/SPREADSHEET_DESIGN.md参照）を開く
 * 2. アドレスバーのURLから「/d/」と「/edit」の間の文字列（スプレッドシートID）をコピー
 * 3. 下の SPREADSHEET_ID にそのIDを貼り付ける
 */
var SPREADSHEET_ID = ''; // ここにスプレッドシートIDを貼り付けてください（Phase2セットアップ手順②）

var SHEET_NAMES = {
  DASHBOARD: 'dashboard',
  ADVERTISING: 'advertising',
  LEADS: 'leads',
  HP: 'hp',
  RECRUITING: 'recruiting',
  ACTIVITY_PLAN: 'activity_plan',
  TASKS: 'tasks',
  CONSULTATIONS: 'consultations',
  ACTIVITY_LOG: 'activity_log',
  SETTINGS: 'settings'
};
