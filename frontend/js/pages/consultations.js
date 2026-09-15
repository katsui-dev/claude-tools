/**
 * 相談管理画面
 * Phase1: 登録・ステータス変更はブラウザメモリ内のみ。
 */
window.App = window.App || {};
App.Pages = App.Pages || {};

App.Pages.consultations = (function () {
  var U = App.Utils;
  var C = App.Components;

  var STATUS_OPTIONS = [
    { value: 'pending', label: '判断待ち' },
    { value: 'in_review', label: '検討中' },
    { value: 'on_hold', label: '保留' },
    { value: 'done', label: '完了' }
  ];
  var PRIORITY_OPTIONS = [
    { value: 'high', label: '高' },
    { value: 'mid', label: '中' },
    { value: 'low', label: '低' }
  ];

  function statusMeta(v) {
    var map = { pending: 'bad', in_review: 'warn', on_hold: 'neutral', done: 'good' };
    var found = STATUS_OPTIONS.filter(function (o) { return o.value === v; })[0];
    return { level: map[v] || 'neutral', label: found ? found.label : v };
  }

  function optionsHtml(list, selected) {
    return list.map(function (o) {
      return '<option value="' + o.value + '"' + (o.value === selected ? ' selected' : '') + '>' + o.label + '</option>';
    }).join('');
  }

  function listItemHtml(c) {
    var meta = statusMeta(c.status);
    return (
      '<div class="list-card" data-consultation-id="' + c.id + '">' +
        '<div>' +
          '<div class="list-card-title">' + U.escapeHtml(c.title) + '</div>' +
          '<div class="list-card-meta"><span>優先度: ' + U.priorityMeta(c.priority).label + '</span><span>期限: ' + U.formatDate(c.dueDate) + '</span></div>' +
        '</div>' +
        '<div class="list-card-right">' + C.renderBadge(meta.level, meta.label) + '</div>' +
      '</div>'
    );
  }

  function html() {
    var list = App.State.getConsultations();
    return (
      '<div class="page-header">' +
        '<div><div class="page-title">相談・判断待ち</div><div class="page-subtitle">経営者が判断すべき事項の一覧</div></div>' +
        '<button class="btn btn-accent" id="btnNewConsultation">＋ 新しく相談する</button>' +
      '</div>' +
      '<div class="phase-note">※ Phase1: 登録・ステータス変更はブラウザ上にのみ保存されます。Phase2でGoogleスプレッドシート保存に対応します。</div>' +
      '<div class="section" id="consultationList">' +
        (list.map(listItemHtml).join('') || C.renderEmptyState('相談事項はありません。')) +
      '</div>'
    );
  }

  function detailHtml(c) {
    var meta = statusMeta(c.status);
    return (
      '<div class="modal-header"><div class="modal-title">' + U.escapeHtml(c.title) + '</div><button class="modal-close" id="detailClose">&times;</button></div>' +
      '<div class="modal-body">' +
        '<div style="display:flex;gap:10px;margin-bottom:18px;flex-wrap:wrap">' +
          C.renderBadge(meta.level, meta.label) +
          '<span class="badge badge-neutral">優先度: ' + U.priorityMeta(c.priority).label + '</span>' +
          '<span class="badge badge-neutral">期限: ' + U.formatDate(c.dueDate) + '</span>' +
        '</div>' +
        '<div class="detail-block"><div class="detail-block-label">背景</div><div class="detail-block-body">' + U.escapeHtml(c.background) + '</div></div>' +
        '<div class="detail-block"><div class="detail-block-label">現状</div><div class="detail-block-body">' + U.escapeHtml(c.currentSituation) + '</div></div>' +
        '<div class="detail-block"><div class="detail-block-label">問題</div><div class="detail-block-body">' + U.escapeHtml(c.problem) + '</div></div>' +
        '<div class="detail-block"><div class="detail-block-label">選択肢</div><div class="option-list">' +
          c.options.map(function (o) { return '<div class="option-item">' + U.escapeHtml(o) + '</div>'; }).join('') +
        '</div></div>' +
        '<div class="detail-block"><div class="detail-block-label">推奨案</div><div class="detail-block-body">' + U.escapeHtml(c.recommendation) + '</div></div>' +
        '<div class="detail-block"><div class="detail-block-label">判断してほしいこと</div><div class="detail-block-body">' + U.escapeHtml(c.decisionPoint) + '</div></div>' +
      '</div>' +
      '<div class="modal-footer" style="justify-content:space-between;flex-wrap:wrap;gap:10px">' +
        '<div style="display:flex;gap:8px">' +
          '<button class="btn btn-outline btn-sm" data-decision="on_hold">保留</button>' +
          '<button class="btn btn-danger btn-sm" data-decision="rejected">却下</button>' +
          '<button class="btn btn-accent btn-sm" data-decision="done">承認</button>' +
        '</div>' +
        '<button class="btn btn-outline" id="detailCloseBtn">閉じる</button>' +
      '</div>'
    );
  }

  function openDetail(id) {
    var c = App.State.getConsultations().filter(function (x) { return x.id === id; })[0];
    if (!c) return;
    C.openModal(detailHtml(c));
    U.qs('#detailClose').addEventListener('click', C.closeModal);
    U.qs('#detailCloseBtn').addEventListener('click', C.closeModal);
    U.qsa('[data-decision]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var decision = btn.getAttribute('data-decision');
        var newStatus = decision === 'rejected' ? 'done' : decision;
        App.State.upsertConsultation({ id: c.id, status: newStatus });
        C.closeModal();
        C.showToast('ステータスを更新しました');
        App.Router.rerender();
      });
    });
  }

  function newFormHtml() {
    return (
      '<div class="modal-header"><div class="modal-title">新しく相談する</div><button class="modal-close" id="newModalClose">&times;</button></div>' +
      '<div class="modal-body">' +
        '<div class="form-group"><label class="form-label">タイトル</label><input class="form-control" id="ncTitle"></div>' +
        '<div class="form-group"><label class="form-label">背景</label><textarea class="form-control" id="ncBackground"></textarea></div>' +
        '<div class="form-group"><label class="form-label">現状</label><textarea class="form-control" id="ncSituation"></textarea></div>' +
        '<div class="form-group"><label class="form-label">問題</label><textarea class="form-control" id="ncProblem"></textarea></div>' +
        '<div class="form-group"><label class="form-label">選択肢（1行に1つ）</label><textarea class="form-control" id="ncOptions" placeholder="案A：...&#10;案B：..."></textarea></div>' +
        '<div class="form-group"><label class="form-label">推奨案</label><textarea class="form-control" id="ncRecommendation"></textarea></div>' +
        '<div class="form-group"><label class="form-label">判断してほしいこと</label><textarea class="form-control" id="ncDecisionPoint"></textarea></div>' +
        '<div class="form-row">' +
          '<div class="form-group"><label class="form-label">優先度</label><select class="form-control" id="ncPriority">' + optionsHtml(PRIORITY_OPTIONS, 'mid') + '</select></div>' +
          '<div class="form-group"><label class="form-label">期限</label><input type="date" class="form-control" id="ncDueDate"></div>' +
        '</div>' +
      '</div>' +
      '<div class="modal-footer">' +
        '<button class="btn btn-outline" id="ncCancel">キャンセル</button>' +
        '<button class="btn btn-primary" id="ncSave">登録</button>' +
      '</div>'
    );
  }

  function openNewModal() {
    C.openModal(newFormHtml());
    U.qs('#newModalClose').addEventListener('click', C.closeModal);
    U.qs('#ncCancel').addEventListener('click', C.closeModal);
    U.qs('#ncSave').addEventListener('click', function () {
      var title = U.qs('#ncTitle').value.trim();
      if (!title) { C.showToast('タイトルを入力してください'); return; }
      App.State.upsertConsultation({
        title: title,
        background: U.qs('#ncBackground').value.trim(),
        currentSituation: U.qs('#ncSituation').value.trim(),
        problem: U.qs('#ncProblem').value.trim(),
        options: U.qs('#ncOptions').value.split('\n').map(function (s) { return s.trim(); }).filter(Boolean),
        recommendation: U.qs('#ncRecommendation').value.trim(),
        decisionPoint: U.qs('#ncDecisionPoint').value.trim(),
        priority: U.qs('#ncPriority').value,
        dueDate: U.qs('#ncDueDate').value,
        status: 'pending'
      });
      C.closeModal();
      C.showToast('相談事項を登録しました');
      App.Router.rerender();
    });
  }

  function bind(container) {
    U.qs('#btnNewConsultation', container).addEventListener('click', openNewModal);
    U.qsa('[data-consultation-id]', container).forEach(function (card) {
      card.addEventListener('click', function () { openDetail(card.getAttribute('data-consultation-id')); });
    });
  }

  function mount(container) {
    container.innerHTML = html();
    bind(container);
  }

  return { mount: mount, openDetail: openDetail };
})();
