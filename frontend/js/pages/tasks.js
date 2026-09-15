/**
 * タスク管理画面
 * Phase1: 登録・編集はブラウザメモリ内のみ（App.State）。
 * Phase2でスプレッドシート保存（createTask/updateTask）に置き換える。
 */
window.App = window.App || {};
App.Pages = App.Pages || {};

App.Pages.tasks = (function () {
  var U = App.Utils;
  var C = App.Components;

  var STATUS_OPTIONS = [
    { value: 'todo', label: '未着手' },
    { value: 'in_progress', label: '進行中' },
    { value: 'done', label: '完了' },
    { value: 'on_hold', label: '保留' }
  ];
  var PRIORITY_OPTIONS = [
    { value: 'high', label: '高' },
    { value: 'mid', label: '中' },
    { value: 'low', label: '低' }
  ];
  var CATEGORY_OPTIONS = ['広告販促', '集客', 'HP', '人材紹介', '活動計画', 'その他'];

  var filters = { owner: '', status: '', priority: '', category: '' };

  function statusLabel(v) { var f = STATUS_OPTIONS.filter(function (o) { return o.value === v; })[0]; return f ? f.label : v; }
  function statusBadgeLevel(v) { return v === 'done' ? 'good' : v === 'on_hold' ? 'neutral' : v === 'in_progress' ? 'warn' : 'neutral'; }

  function ownerList() {
    var owners = App.State.getTasks().map(function (t) { return t.owner; });
    return Array.from(new Set(owners));
  }

  function filteredTasks() {
    return App.State.getTasks().filter(function (t) {
      if (filters.owner && t.owner !== filters.owner) return false;
      if (filters.status && t.status !== filters.status) return false;
      if (filters.priority && t.priority !== filters.priority) return false;
      if (filters.category && t.category !== filters.category) return false;
      return true;
    }).sort(function (a, b) { return new Date(a.dueDate) - new Date(b.dueDate); });
  }

  function optionsHtml(list, selected, labelKey, valueKey) {
    return list.map(function (item) {
      var value = valueKey ? item[valueKey] : item;
      var label = labelKey ? item[labelKey] : item;
      return '<option value="' + U.escapeHtml(value) + '"' + (value === selected ? ' selected' : '') + '>' + U.escapeHtml(label) + '</option>';
    }).join('');
  }

  function filterBarHtml() {
    return (
      '<div class="filter-bar">' +
        '<select id="filterOwner"><option value="">担当者: すべて</option>' + optionsHtml(ownerList(), filters.owner) + '</select>' +
        '<select id="filterStatus"><option value="">ステータス: すべて</option>' + optionsHtml(STATUS_OPTIONS, filters.status, 'label', 'value') + '</select>' +
        '<select id="filterPriority"><option value="">優先度: すべて</option>' + optionsHtml(PRIORITY_OPTIONS, filters.priority, 'label', 'value') + '</select>' +
        '<select id="filterCategory"><option value="">カテゴリ: すべて</option>' + optionsHtml(CATEGORY_OPTIONS, filters.category) + '</select>' +
      '</div>'
    );
  }

  function rowHtml(t) {
    var pr = U.priorityMeta(t.priority);
    return (
      '<tr data-task-id="' + t.id + '">' +
        '<td>' + U.escapeHtml(t.taskName) + '</td>' +
        '<td>' + U.escapeHtml(t.category) + '</td>' +
        '<td>' + U.escapeHtml(t.owner) + '</td>' +
        '<td>' + U.formatDate(t.dueDate) + '</td>' +
        '<td class="priority-tag ' + pr.className + '">' + pr.label + '</td>' +
        '<td style="min-width:150px">' + C.renderProgressBar(t.progress) + '</td>' +
        '<td>' + C.renderBadge(statusBadgeLevel(t.status), statusLabel(t.status)) + '</td>' +
      '</tr>'
    );
  }

  function html() {
    var tasks = filteredTasks();
    return (
      '<div class="page-header">' +
        '<div><div class="page-title">タスク管理</div><div class="page-subtitle">全' + App.State.getTasks().length + '件</div></div>' +
        '<button class="btn btn-accent" id="btnNewTask">＋ 新しいタスク</button>' +
      '</div>' +
      '<div class="phase-note">※ Phase1: 登録・編集はブラウザ上にのみ保存されます（リロードで初期状態に戻ります）。Phase2でGoogleスプレッドシート保存に対応します。</div>' +
      '<div class="section section-card">' +
        filterBarHtml() +
        '<div class="table-wrap"><table class="data-table">' +
          '<thead><tr><th>タスク名</th><th>カテゴリ</th><th>担当</th><th>期限</th><th>優先度</th><th>進捗</th><th>ステータス</th></tr></thead>' +
          '<tbody id="taskTableBody">' + (tasks.map(rowHtml).join('') || '<tr><td colspan="7">' + C.renderEmptyState('条件に一致するタスクはありません。') + '</td></tr>') + '</tbody>' +
        '</table></div>' +
      '</div>'
    );
  }

  function taskFormHtml(task) {
    task = task || { taskName: '', description: '', owner: '', dueDate: '', priority: 'mid', status: 'todo', progress: 0, category: CATEGORY_OPTIONS[0], memo: '' };
    return (
      '<div class="modal-header"><div class="modal-title">' + (task.id ? 'タスクを編集' : '新しいタスク') + '</div><button class="modal-close" id="taskModalClose">&times;</button></div>' +
      '<div class="modal-body">' +
        '<div class="form-group"><label class="form-label">タスク名</label><input class="form-control" id="fTaskName" value="' + U.escapeHtml(task.taskName) + '"></div>' +
        '<div class="form-group"><label class="form-label">詳細</label><textarea class="form-control" id="fDescription">' + U.escapeHtml(task.description) + '</textarea></div>' +
        '<div class="form-row">' +
          '<div class="form-group"><label class="form-label">担当者</label><input class="form-control" id="fOwner" value="' + U.escapeHtml(task.owner) + '"></div>' +
          '<div class="form-group"><label class="form-label">期限</label><input type="date" class="form-control" id="fDueDate" value="' + U.escapeHtml(task.dueDate) + '"></div>' +
        '</div>' +
        '<div class="form-row">' +
          '<div class="form-group"><label class="form-label">優先度</label><select class="form-control" id="fPriority">' + optionsHtml(PRIORITY_OPTIONS, task.priority, 'label', 'value') + '</select></div>' +
          '<div class="form-group"><label class="form-label">ステータス</label><select class="form-control" id="fStatus">' + optionsHtml(STATUS_OPTIONS, task.status, 'label', 'value') + '</select></div>' +
        '</div>' +
        '<div class="form-row">' +
          '<div class="form-group"><label class="form-label">進捗率（%）</label><input type="number" min="0" max="100" class="form-control" id="fProgress" value="' + task.progress + '"></div>' +
          '<div class="form-group"><label class="form-label">関連カテゴリ</label><select class="form-control" id="fCategory">' + optionsHtml(CATEGORY_OPTIONS, task.category) + '</select></div>' +
        '</div>' +
        '<div class="form-group"><label class="form-label">メモ</label><textarea class="form-control" id="fMemo">' + U.escapeHtml(task.memo) + '</textarea></div>' +
      '</div>' +
      '<div class="modal-footer">' +
        '<button class="btn btn-outline" id="taskCancelBtn">キャンセル</button>' +
        '<button class="btn btn-primary" id="taskSaveBtn">保存</button>' +
      '</div>'
    );
  }

  function openTaskModal(taskId) {
    var task = taskId ? App.State.getTasks().filter(function (t) { return t.id === taskId; })[0] : null;
    C.openModal(taskFormHtml(task));
    U.qs('#taskModalClose').addEventListener('click', C.closeModal);
    U.qs('#taskCancelBtn').addEventListener('click', C.closeModal);
    U.qs('#taskSaveBtn').addEventListener('click', function () {
      var payload = {
        id: task ? task.id : undefined,
        taskName: U.qs('#fTaskName').value.trim(),
        description: U.qs('#fDescription').value.trim(),
        owner: U.qs('#fOwner').value.trim(),
        dueDate: U.qs('#fDueDate').value,
        priority: U.qs('#fPriority').value,
        status: U.qs('#fStatus').value,
        progress: U.clamp(Number(U.qs('#fProgress').value) || 0, 0, 100),
        category: U.qs('#fCategory').value,
        memo: U.qs('#fMemo').value.trim()
      };
      if (!payload.taskName) { C.showToast('タスク名を入力してください'); return; }
      App.State.upsertTask(payload);
      C.closeModal();
      C.showToast(task ? 'タスクを更新しました' : 'タスクを登録しました');
      App.Router.rerender();
    });
  }

  function bind(container) {
    U.qs('#btnNewTask', container).addEventListener('click', function () { openTaskModal(null); });
    ['Owner', 'Status', 'Priority', 'Category'].forEach(function (key) {
      var el = U.qs('#filter' + key, container);
      el.addEventListener('change', function () {
        filters[key.toLowerCase()] = el.value;
        App.Router.rerender();
      });
    });
    U.qsa('#taskTableBody tr[data-task-id]', container).forEach(function (row) {
      row.addEventListener('click', function () { openTaskModal(row.getAttribute('data-task-id')); });
    });
  }

  function mount(container) {
    container.innerHTML = html();
    bind(container);
  }

  return { mount: mount, openTaskModal: openTaskModal };
})();
