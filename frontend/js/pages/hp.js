/**
 * HP運用画面
 */
window.App = window.App || {};
App.Pages = App.Pages || {};

App.Pages.hp = (function () {
  var U = App.Utils;
  var C = App.Components;

  function pageRowHtml(p) {
    var isImprovement = p.pv >= 3000 && p.cvRate < 1;
    return (
      '<tr>' +
        '<td>' + U.escapeHtml(p.title) + (isImprovement ? ' <span class="tag-improve">改善候補</span>' : '') + '</td>' +
        '<td>' + U.formatNumber(p.pv) + '</td>' +
        '<td>' + U.formatPercent(p.cvRate) + '</td>' +
      '</tr>'
    );
  }

  function html() {
    var hp = App.Data.hp;
    var k = hp.kpis;
    var cvRate = (k.inquiries / k.pv) * 100;
    var improvementCandidates = hp.topPages.filter(function (p) { return p.pv >= 3000 && p.cvRate < 1; });

    return (
      '<div class="page-header"><div><div class="page-title">HP運用</div><div class="page-subtitle">アクセス状況とコンテンツの改善候補</div></div></div>' +

      '<div class="section stat-grid">' +
        C.renderStatCard('PV', U.formatNumber(k.pv)) +
        C.renderStatCard('UU', U.formatNumber(k.uu)) +
        C.renderStatCard('問い合わせ', U.formatNumber(k.inquiries), '目標 ' + U.formatNumber(k.targetInquiries) + '件', k.inquiries < k.targetInquiries ? 'trend-up' : '') +
        C.renderStatCard('CV率', U.formatPercent(cvRate)) +
      '</div>' +

      (k.inquiries < k.targetInquiries
        ? '<div class="section"><div class="alert-item level-bad"><div class="alert-icon">🛑</div><div class="alert-body"><div class="alert-message">問い合わせ数が目標未達です（目標' + k.targetInquiries + '件 → 実績' + k.inquiries + '件）。</div></div></div></div>'
        : '') +

      '<div class="section stat-grid">' +
        C.renderStatCard('記事数', U.formatNumber(hp.content.articleCount)) +
        C.renderStatCard('今月公開数', U.formatNumber(hp.content.publishedThisMonth)) +
        C.renderStatCard('更新予定数', U.formatNumber(hp.content.scheduled)) +
      '</div>' +

      '<div class="section section-card">' +
        C.renderSectionHeader('人気ページランキング', 'PVは多いがCV率が低いページは「改善候補」として表示しています', '', '📄') +
        '<div class="table-wrap"><table class="data-table">' +
          '<thead><tr><th>ページ</th><th>PV</th><th>CV率</th></tr></thead>' +
          '<tbody>' + hp.topPages.map(pageRowHtml).join('') + '</tbody>' +
        '</table></div>' +
        (improvementCandidates.length
          ? '<div class="phase-note" style="margin-top:14px">💡 改善候補が' + improvementCandidates.length + '件あります。CTA配置やコンテンツ内容の見直しを検討してください。</div>'
          : '') +
      '</div>'
    );
  }

  function mount(container) {
    container.innerHTML = html();
  }

  return { mount: mount };
})();
