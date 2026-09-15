/**
 * 共通ユーティリティ（App名前空間配下）。
 * Phase3でGAS側の値をそのまま使えるよう、フォーマット関数をここに集約する。
 */
window.App = window.App || {};

App.Utils = (function () {
  function formatNumber(n) {
    if (n === null || n === undefined || isNaN(n)) return '-';
    return Number(n).toLocaleString('ja-JP');
  }

  function formatYen(n) {
    if (n === null || n === undefined || isNaN(n)) return '-';
    return '¥' + Number(n).toLocaleString('ja-JP');
  }

  function formatPercent(n, digits) {
    if (n === null || n === undefined || isNaN(n)) return '-';
    return Number(n).toFixed(digits === undefined ? 1 : digits) + '%';
  }

  function formatDate(dateLike) {
    if (!dateLike) return '-';
    var d = dateLike instanceof Date ? dateLike : new Date(dateLike);
    if (isNaN(d.getTime())) return String(dateLike);
    var m = d.getMonth() + 1;
    var day = d.getDate();
    return m + '/' + day;
  }

  function formatDateFull(dateLike) {
    if (!dateLike) return '-';
    var d = dateLike instanceof Date ? dateLike : new Date(dateLike);
    if (isNaN(d.getTime())) return String(dateLike);
    return d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
  }

  function todayLabel() {
    var d = new Date();
    var week = ['日', '月', '火', '水', '木', '金', '土'];
    return d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日（' + week[d.getDay()] + '）';
  }

  // XSS対策：ユーザー入力を画面に描画する際は必ず通す
  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function uid(prefix) {
    return (prefix || 'id') + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
  }

  function statusMeta(status) {
    var map = {
      good: { label: '順調', badgeClass: 'badge-good', level: 'good' },
      warn: { label: '注意', badgeClass: 'badge-warn', level: 'warn' },
      bad: { label: '要対応', badgeClass: 'badge-bad', level: 'bad' }
    };
    return map[status] || { label: status || '-', badgeClass: 'badge-neutral', level: 'neutral' };
  }

  function priorityMeta(priority) {
    var map = {
      high: { label: '高', className: 'priority-high' },
      mid: { label: '中', className: 'priority-mid' },
      low: { label: '低', className: 'priority-low' }
    };
    return map[priority] || { label: priority || '-', className: '' };
  }

  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

  return {
    formatNumber: formatNumber,
    formatYen: formatYen,
    formatPercent: formatPercent,
    formatDate: formatDate,
    formatDateFull: formatDateFull,
    todayLabel: todayLabel,
    escapeHtml: escapeHtml,
    uid: uid,
    statusMeta: statusMeta,
    priorityMeta: priorityMeta,
    qs: qs,
    qsa: qsa,
    clamp: clamp
  };
})();
