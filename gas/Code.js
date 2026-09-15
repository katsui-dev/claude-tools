/**
 * GAS Webアプリのエントリーポイント。
 * フロントエンドから ?action=xxx でGETすると、対応するデータ取得関数を呼び、
 * JSON（{success, data}または{success:false, message}）を返す。
 *
 * デプロイ方法は docs/GAS_DESIGN.md および PHASE2セットアップ手順を参照。
 */

// セキュリティ：呼び出せる関数を許可リストに限定する（任意の関数を実行させない）
var ACTION_HANDLERS = {
  getDashboardData: getDashboardData
  // Phase3以降、他の画面のデータ取得関数をここに追加していく
};

function doGet(e) {
  var action = e && e.parameter && e.parameter.action;

  if (!action) {
    return errorResponse_('actionパラメータが指定されていません。例: ?action=getDashboardData');
  }

  var handler = ACTION_HANDLERS[action];
  if (!handler) {
    return errorResponse_('不明なaction、またはまだ実装されていません: ' + action);
  }

  try {
    var data = handler();
    return successResponse_(data);
  } catch (err) {
    logError_('doGet:' + action, err);
    return errorResponse_(err.message || String(err));
  }
}
