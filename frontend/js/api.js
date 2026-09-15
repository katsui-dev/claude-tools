/**
 * GAS Webアプリ（Phase2で接続）への取得ラッパー。
 * GAS_WEB_APP_URLが未設定、またはGAS呼び出しが失敗した場合は例外を投げる。
 * 呼び出し側（各ページ）でダミーデータへのフォールバックとエラー表示を行う。
 */
window.App = window.App || {};

App.Api = (function () {
  function isConfigured() {
    return !!(App.Config && App.Config.GAS_WEB_APP_URL);
  }

  function call(action) {
    if (!isConfigured()) {
      return Promise.reject(new Error('GAS_WEB_APP_URL が未設定です（js/config.js）。ダミーデータを表示しています。'));
    }
    var url = App.Config.GAS_WEB_APP_URL + '?action=' + encodeURIComponent(action);
    return fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error('通信エラー（HTTP ' + res.status + '）');
        return res.json();
      })
      .then(function (json) {
        if (!json || json.success !== true) {
          throw new Error((json && json.message) || 'データの取得に失敗しました。');
        }
        return json.data;
      });
  }

  function getDashboardData() {
    return call('getDashboardData');
  }

  return {
    isConfigured: isConfigured,
    getDashboardData: getDashboardData
  };
})();
