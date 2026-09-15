/**
 * 活動計画画面
 */
window.App = window.App || {};
App.Pages = App.Pages || {};

App.Pages.activityPlan = (function () {
  var U = App.Utils;
  var C = App.Components;

  function rowHtml(item) {
    var rate = (item.actual / item.plan) * 100;
    var forecast = Math.round(item.actual * (12 / 9)); // 9ヶ月経過想定の単純な月末/年度末予測
    var status = rate >= 90 ? 'good' : rate >= 70 ? 'warn' : 'bad';
    return (
      '<tr>' +
        '<td>' + U.escapeHtml(item.item) + '</td>' +
        '<td>' + U.formatNumber(item.plan) + '</td>' +
        '<td>' + U.formatNumber(item.actual) + '</td>' +
        '<td style="min-width:160px">' + C.renderProgressBar(Math.round(rate), status) + '</td>' +
        '<td>' + U.formatNumber(forecast) + '</td>' +
      '</tr>'
    );
  }

  function html() {
    var plan = App.Data.activityPlan;
    return (
      '<div class="page-header"><div><div class="page-title">活動計画</div><div class="page-subtitle">月間計画と実績の比較</div></div></div>' +
      '<div class="section section-card">' +
        C.renderSectionHeader('計画 vs 実績', null, '', '🗓️') +
        '<div class="table-wrap"><table class="data-table">' +
          '<thead><tr><th>項目</th><th>計画</th><th>実績</th><th>達成率</th><th>月末予測</th></tr></thead>' +
          '<tbody>' + plan.items.map(rowHtml).join('') + '</tbody>' +
        '</table></div>' +
      '</div>'
    );
  }

  function mount(container) {
    container.innerHTML = html();
  }

  return { mount: mount };
})();
