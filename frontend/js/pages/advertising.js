/**
 * 広告販促画面
 */
window.App = window.App || {};
App.Pages = App.Pages || {};

App.Pages.advertising = (function () {
  var U = App.Utils;
  var C = App.Components;

  function computeStatus(a) {
    var monthsElapsed = 6; // 4月〜9月time
    var expectedUsedRate = (monthsElapsed / 12) * 100;
    var usedRate = (a.used / a.annualBudget) * 100;
    var paceOver = usedRate - expectedUsedRate;
    var yearEndForecast = a.used + a.secondHalfForecast;
    var overBudget = yearEndForecast > a.annualBudget;
    return { usedRate: usedRate, paceOver: paceOver, yearEndForecast: yearEndForecast, overBudget: overBudget };
  }

  function html() {
    var a = App.Data.advertising;
    var s = computeStatus(a);
    var remaining = a.annualBudget - a.used;

    return (
      '<div class="page-header"><div><div class="page-title">広告販促</div><div class="page-subtitle">年間予算の消化状況と媒体別実績</div></div></div>' +

      '<div class="section stat-grid">' +
        C.renderStatCard('年間予算', U.formatYen(a.annualBudget)) +
        C.renderStatCard('消化額', U.formatYen(a.used)) +
        C.renderStatCard('残予算', U.formatYen(remaining), s.overBudget ? '年間予算超過の見込み' : '') +
        C.renderStatCard('消化率', U.formatPercent(s.usedRate), s.paceOver > 3 ? '計画より速いペース' : '計画通りのペース', s.paceOver > 3 ? 'trend-up' : '') +
      '</div>' +

      '<div class="section section-card">' +
        C.renderSectionHeader('予算消化サマリー', '年間予算 → 上期実績 → 下期予測 → 年間着地予測 → 残予算', '', '💰') +
        (s.overBudget
          ? '<div class="alert-item level-bad" style="margin-bottom:16px"><div class="alert-icon">🛑</div><div class="alert-body"><div class="alert-message">現在のペースだと年間着地予測は ' + U.formatYen(s.yearEndForecast) + ' となり、年間予算 ' + U.formatYen(a.annualBudget) + ' を超過する見込みです。</div></div></div>'
          : '<div class="alert-item level-good" style="margin-bottom:16px"><div class="alert-icon">✅</div><div class="alert-body"><div class="alert-message">現在のペースであれば年間予算内に着地する見込みです。</div></div></div>') +
        '<div class="table-wrap"><table class="data-table" style="min-width:520px">' +
          '<thead><tr><th>年間予算</th><th>上期実績</th><th>下期予測</th><th>年間着地予測</th><th>残予算</th></tr></thead>' +
          '<tbody><tr>' +
            '<td>' + U.formatYen(a.annualBudget) + '</td>' +
            '<td>' + U.formatYen(a.firstHalfActual) + '</td>' +
            '<td>' + U.formatYen(a.secondHalfForecast) + '</td>' +
            '<td class="' + (s.overBudget ? 'priority-high' : '') + '">' + U.formatYen(s.yearEndForecast) + '</td>' +
            '<td>' + U.formatYen(remaining) + '</td>' +
          '</tr></tbody>' +
        '</table></div>' +
      '</div>' +

      '<div class="section grid-2">' +
        '<div class="section-card">' +
          C.renderSectionHeader('月別推移（予算 vs 実績）', null, '', '📈') +
          '<div class="chart-container"><canvas id="adBudgetTrendChart"></canvas></div>' +
        '</div>' +
        '<div class="section-card">' +
          C.renderSectionHeader('媒体別実績', null, '', '🧩') +
          '<div class="chart-container chart-sm"><canvas id="adChannelChart"></canvas></div>' +
        '</div>' +
      '</div>'
    );
  }

  function mount(container) {
    container.innerHTML = html();
    var a = App.Data.advertising;
    App.Charts.createBudgetTrendChart('adBudgetTrendChart', a.monthly);
    App.Charts.createDoughnut('adChannelChart', a.channels);
  }

  return { mount: mount };
})();
