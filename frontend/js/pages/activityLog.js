/**
 * 活動履歴画面
 */
window.App = window.App || {};
App.Pages = App.Pages || {};

App.Pages.activityLog = (function () {
  var U = App.Utils;
  var C = App.Components;

  function itemHtml(l) {
    return (
      '<div class="timeline-item">' +
        '<div class="timeline-date">' + U.formatDateFull(l.date) + '</div>' +
        '<div class="timeline-content">' +
          '<div class="timeline-title">[' + U.escapeHtml(l.category) + '] ' + U.escapeHtml(l.content) + '</div>' +
          '<div class="timeline-detail">結果: ' + U.escapeHtml(l.result) + '</div>' +
          '<div class="timeline-sub">担当: ' + U.escapeHtml(l.owner) + ' ／ 次のアクション: ' + U.escapeHtml(l.nextAction) + (l.memo ? ' ／ メモ: ' + U.escapeHtml(l.memo) : '') + '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function formHtml() {
    return (
      '<div class="modal-header"><div class="modal-title">活動を記録</div><button class="modal-close" id="logModalClose">&times;</button></div>' +
      '<div class="modal-body">' +
        '<div class="form-row">' +
          '<div class="form-group"><label class="form-label">日付</label><input type="date" class="form-control" id="lDate"></div>' +
          '<div class="form-group"><label class="form-label">カテゴリ</label><input class="form-control" id="lCategory" placeholder="例：広告販促"></div>' +
        '</div>' +
        '<div class="form-group"><label class="form-label">活動内容</label><textarea class="form-control" id="lContent"></textarea></div>' +
        '<div class="form-row">' +
          '<div class="form-group"><label class="form-label">担当者</label><input class="form-control" id="lOwner"></div>' +
          '<div class="form-group"><label class="form-label">結果</label><input class="form-control" id="lResult"></div>' +
        '</div>' +
        '<div class="form-group"><label class="form-label">次のアクション</label><input class="form-control" id="lNextAction"></div>' +
        '<div class="form-group"><label class="form-label">メモ</label><textarea class="form-control" id="lMemo"></textarea></div>' +
      '</div>' +
      '<div class="modal-footer">' +
        '<button class="btn btn-outline" id="lCancel">キャンセル</button>' +
        '<button class="btn btn-primary" id="lSave">登録</button>' +
      '</div>'
    );
  }

  function openNewModal() {
    C.openModal(formHtml());
    U.qs('#logModalClose').addEventListener('click', C.closeModal);
    U.qs('#lCancel').addEventListener('click', C.closeModal);
    U.qs('#lSave').addEventListener('click', function () {
      var content = U.qs('#lContent').value.trim();
      if (!content) { C.showToast('活動内容を入力してください'); return; }
      App.State.addActivityLog({
        date: U.qs('#lDate').value || new Date().toISOString().slice(0, 10),
        category: U.qs('#lCategory').value.trim() || 'その他',
        content: content,
        owner: U.qs('#lOwner').value.trim(),
        result: U.qs('#lResult').value.trim(),
        nextAction: U.qs('#lNextAction').value.trim(),
        memo: U.qs('#lMemo').value.trim()
      });
      C.closeModal();
      C.showToast('活動履歴を登録しました');
      App.Router.rerender();
    });
  }

  function html() {
    var logs = App.State.getActivityLogs();
    return (
      '<div class="page-header">' +
        '<div><div class="page-title">活動履歴</div><div class="page-subtitle">重要な活動を時系列で記録</div></div>' +
        '<button class="btn btn-accent" id="btnNewLog">＋ 活動を記録</button>' +
      '</div>' +
      '<div class="section section-card"><div class="timeline">' +
        (logs.map(itemHtml).join('') || C.renderEmptyState('活動履歴はありません。')) +
      '</div></div>'
    );
  }

  function bind(container) {
    U.qs('#btnNewLog', container).addEventListener('click', openNewModal);
  }

  function mount(container) {
    container.innerHTML = html();
    bind(container);
  }

  return { mount: mount };
})();
