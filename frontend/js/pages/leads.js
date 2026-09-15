/**
 * 集客画面
 */
window.App = window.App || {};
App.Pages = App.Pages || {};

App.Pages.leads = (function () {
  var U = App.Utils;
  var C = App.Components;

  function html() {
    var l = App.Data.leads;
    var k = l.kpis;
    var cvRate = (k.applications / k.inquiries) * 100;
    var negotiationRate = (k.negotiations / k.applications) * 100;
    var contractRate = (k.contracts / k.negotiations) * 100;

    return (
      '<div class="page-header"><div><div class="page-title">集客</div><div class="page-subtitle">問い合わせから成約までのファネルと流入元</div></div></div>' +

      '<div class="section stat-grid">' +
        C.renderStatCard('問い合わせ数', U.formatNumber(k.inquiries)) +
        C.renderStatCard('応募数', U.formatNumber(k.applications)) +
        C.renderStatCard('商談数', U.formatNumber(k.negotiations)) +
        C.renderStatCard('成約数', U.formatNumber(k.contracts)) +
        C.renderStatCard('CV率', U.formatPercent(cvRate)) +
        C.renderStatCard('商談化率', U.formatPercent(negotiationRate)) +
        C.renderStatCard('成約率', U.formatPercent(contractRate)) +
      '</div>' +

      '<div class="section grid-2">' +
        '<div class="section-card">' +
          C.renderSectionHeader('ファネル', '問い合わせ → 応募 → 商談 → 成約', '', '🔻') +
          C.renderFunnel(l.funnel) +
        '</div>' +
        '<div class="section-card">' +
          C.renderSectionHeader('流入元', null, '', '🧭') +
          '<div class="chart-container chart-sm"><canvas id="leadSourceChart"></canvas></div>' +
        '</div>' +
      '</div>' +

      '<div class="section section-card">' +
        C.renderSectionHeader('月別推移', '問い合わせ数と成約数の推移', '', '📈') +
        '<div class="chart-container"><canvas id="leadTrendChart"></canvas></div>' +
      '</div>'
    );
  }

  function mount(container) {
    container.innerHTML = html();
    var l = App.Data.leads;
    App.Charts.createDoughnut('leadSourceChart', l.sources);
    App.Charts.createLineTrend(
      'leadTrendChart',
      l.monthly.map(function (m) { return m.month; }),
      [
        { label: '問い合わせ', data: l.monthly.map(function (m) { return m.inquiries; }) },
        { label: '成約', data: l.monthly.map(function (m) { return m.contracts; }) }
      ]
    );
  }

  return { mount: mount };
})();
