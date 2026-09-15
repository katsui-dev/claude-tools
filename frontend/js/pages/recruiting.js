/**
 * 人材紹介画面
 */
window.App = window.App || {};
App.Pages = App.Pages || {};

App.Pages.recruiting = (function () {
  var U = App.Utils;
  var C = App.Components;

  function html() {
    var r = App.Data.recruiting;
    var achievementRate = (r.actual / r.target) * 100;
    var status = achievementRate >= 90 ? 'good' : achievementRate >= 75 ? 'warn' : 'bad';

    return (
      '<div class="page-header"><div><div class="page-title">人材紹介</div><div class="page-subtitle">採用ファネルと今月の目標達成状況</div></div></div>' +

      '<div class="section stat-grid">' +
        C.renderStatCard('今月目標', U.formatNumber(r.target) + '名') +
        C.renderStatCard('実績', U.formatNumber(r.actual) + '名') +
        C.renderStatCard('達成率', U.formatPercent(achievementRate), '', status === 'bad' ? 'trend-up' : '') +
      '</div>' +

      '<div class="section section-card">' +
        C.renderSectionHeader('達成率', null, C.renderBadge(status), '🎯') +
        C.renderProgressBar(Math.round(achievementRate), status) +
      '</div>' +

      '<div class="section section-card">' +
        C.renderSectionHeader('採用ファネル', '求人企業 → 候補者 → 面談 → 推薦 → 面接 → 内定 → 入社', '', '🧑‍💼') +
        C.renderFunnel(r.funnel) +
      '</div>'
    );
  }

  function mount(container) {
    container.innerHTML = html();
  }

  return { mount: mount };
})();
