/**
 * Phase2設定。
 * GASをWebアプリとしてデプロイした後に発行される「ウェブアプリURL」をここに貼り付ける。
 * （このファイルにはIDやURLのみを置き、パスワードやAPIキー等の機密情報は置かない）
 *
 * 空のままにしておけば、これまで通りダミーデータで動作する（Phase1と同じ挙動）。
 */
window.App = window.App || {};

App.Config = {
  GAS_WEB_APP_URL: '' // 例: 'https://script.google.com/macros/s/xxxxx/exec'
};
