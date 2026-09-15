/**
 * 再利用可能なUIコンポーネント（HTML文字列を返す関数群）とモーダル/トースト制御。
 */
window.App = window.App || {};

App.Components = (function () {
  var U = App.Utils;

  function renderBadge(status, customLabel) {
    var meta = U.statusMeta(status);
    return '<span class="badge ' + meta.badgeClass + '">' + U.escapeHtml(customLabel || meta.label) + '</span>';
  }

  function renderProgressBar(percent, status) {
    var p = U.clamp(Number(percent) || 0, 0, 100);
    var statusClass = status ? ('status-' + status) : (p >= 80 ? 'status-good' : p >= 60 ? 'status-warn' : 'status-bad');
    return (
      '<div class="progress-row">' +
        '<div class="progress-track"><div class="progress-fill ' + statusClass + '" style="width:' + p + '%"></div></div>' +
        '<div class="progress-label">' + p + '%</div>' +
      '</div>'
    );
  }

  function renderKpiCard(kpi) {
    var meta = U.statusMeta(kpi.status);
    var valueHtml = kpi.count !== undefined
      ? U.escapeHtml(String(kpi.count)) + '<span class="unit">' + U.escapeHtml(kpi.unit || '') + '</span>'
      : U.escapeHtml(String(kpi.progress)) + '<span class="unit">%</span>';

    return (
      '<div class="kpi-card status-' + meta.level + '" data-route="' + kpi.id + '">' +
        '<div class="kpi-card-top">' +
          '<div class="kpi-card-label"><span>' + (kpi.icon || '') + '</span><span>' + U.escapeHtml(kpi.label) + '</span></div>' +
          renderBadge(kpi.status) +
        '</div>' +
        '<div class="kpi-card-value">' + valueHtml + '</div>' +
        (kpi.progress !== undefined ? renderProgressBar(kpi.progress, kpi.status) : '') +
      '</div>'
    );
  }

  function renderAlertItem(alert) {
    var iconMap = { good: '✅', warn: '⚠️', bad: '🛑' };
    return (
      '<div class="alert-item level-' + alert.level + '">' +
        '<div class="alert-icon">' + (iconMap[alert.level] || '⚠️') + '</div>' +
        '<div class="alert-body">' +
          '<div class="alert-category">' + U.escapeHtml(alert.category) + '</div>' +
          '<div class="alert-message">' + U.escapeHtml(alert.message) + '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function renderSectionHeader(title, subtitle, actionHtml, icon) {
    return (
      '<div class="section-header">' +
        '<div>' +
          '<div class="section-title">' + (icon ? '<span class="section-title-icon">' + icon + '</span>' : '') + U.escapeHtml(title) + '</div>' +
          (subtitle ? '<div class="section-subtitle">' + U.escapeHtml(subtitle) + '</div>' : '') +
        '</div>' +
        (actionHtml || '') +
      '</div>'
    );
  }

  function renderEmptyState(message) {
    return '<div class="empty-state">' + U.escapeHtml(message) + '</div>';
  }

  function renderStatCard(label, value, sub, trendClass) {
    return (
      '<div class="stat-card">' +
        '<div class="stat-label">' + U.escapeHtml(label) + '</div>' +
        '<div class="stat-value ' + (trendClass || '') + '">' + value + '</div>' +
        (sub ? '<div class="stat-sub">' + sub + '</div>' : '') +
      '</div>'
    );
  }

  function renderFunnel(steps) {
    var max = Math.max.apply(null, steps.map(function (s) { return s.value; }));
    return (
      '<div class="funnel">' +
      steps.map(function (s, i) {
        var widthPct = max ? Math.max(12, Math.round((s.value / max) * 100)) : 0;
        var rate = i === 0 ? '' : Math.round((s.value / steps[i - 1].value) * 1000) / 10 + '%';
        return (
          '<div class="funnel-row">' +
            '<div class="funnel-label">' + U.escapeHtml(s.label) + '</div>' +
            '<div class="funnel-bar-wrap"><div class="funnel-bar" style="width:' + widthPct + '%">' + U.formatNumber(s.value) + '</div></div>' +
            '<div class="funnel-rate">' + rate + '</div>' +
          '</div>'
        );
      }).join('') +
      '</div>'
    );
  }

  // ---------- Modal ----------
  function openModal(innerHtml, options) {
    closeModal();
    var overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'activeModalOverlay';
    overlay.innerHTML = '<div class="modal-box">' + innerHtml + '</div>';
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay && !(options && options.persistent)) closeModal();
    });
    document.getElementById('modalRoot').appendChild(overlay);
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    var existing = document.getElementById('activeModalOverlay');
    if (existing) existing.remove();
    document.body.style.overflow = '';
  }

  // ---------- Toast ----------
  var toastTimer = null;
  function showToast(message) {
    var el = document.getElementById('appToast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'appToast';
      el.className = 'toast';
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2400);
  }

  return {
    renderBadge: renderBadge,
    renderProgressBar: renderProgressBar,
    renderKpiCard: renderKpiCard,
    renderAlertItem: renderAlertItem,
    renderSectionHeader: renderSectionHeader,
    renderEmptyState: renderEmptyState,
    renderStatCard: renderStatCard,
    renderFunnel: renderFunnel,
    openModal: openModal,
    closeModal: closeModal,
    showToast: showToast
  };
})();
