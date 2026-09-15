/**
 * HOME / 経営ダッシュボード画面
 * 最重要画面：KPI・要対応事項・今週やること・相談・最近の活動を1画面に集約する。
 */
window.App = window.App || {};
App.Pages = App.Pages || {};

App.Pages.home = (function () {
  var U = App.Utils;
  var C = App.Components;

  function weekTasks() {
    return App.State.getTasks()
      .filter(function (t) { return t.status !== 'done'; })
      .sort(function (a, b) { return new Date(a.dueDate) - new Date(b.dueDate); })
      .slice(0, 5);
  }

  function pendingConsultations() {
    return App.State.getConsultations().filter(function (c) { return c.status !== 'done'; }).slice(0, 3);
  }

  function recentLogs() {
    return App.State.getActivityLogs().slice(0, 5);
  }

  function consultationStatusMeta(status) {
    var map = {
      pending: { label: '判断待ち', cls: 'bad' },
      in_review: { label: '検討中', cls: 'warn' },
      on_hold: { label: '保留', cls: 'neutral' },
      done: { label: '完了', cls: 'good' }
    };
    return map[status] || { label: status, cls: 'neutral' };
  }

  function taskRowHtml(t) {
    var pr = U.priorityMeta(t.priority);
    return (
      '<tr data-open-task="' + t.id + '">' +
        '<td>' + U.escapeHtml(t.taskName) + '</td>' +
        '<td>' + U.escapeHtml(t.owner) + '</td>' +
        '<td>' + U.formatDate(t.dueDate) + '</td>' +
        '<td class="priority-tag ' + pr.className + '">' + pr.label + '</td>' +
        '<td style="min-width:140px">' + C.renderProgressBar(t.progress) + '</td>' +
      '</tr>'
    );
  }

  function consultationCardHtml(c) {
    var meta = consultationStatusMeta(c.status);
    return (
      '<div class="list-card" data-open-consultation="' + c.id + '">' +
        '<div>' +
          '<div class="list-card-title">' + U.escapeHtml(c.title) + '</div>' +
          '<div class="list-card-meta"><span>優先度: ' + U.priorityMeta(c.priority).label + '</span><span>期限: ' + U.formatDate(c.dueDate) + '</span></div>' +
        '</div>' +
        '<div class="list-card-right">' + C.renderBadge(meta.cls, meta.label) + '</div>' +
      '</div>'
    );
  }

  function logItemHtml(l) {
    return (
      '<div class="timeline-item">' +
        '<div class="timeline-date">' + U.formatDate(l.date) + '</div>' +
        '<div class="timeline-content">' +
          '<div class="timeline-title">[' + U.escapeHtml(l.category) + '] ' + U.escapeHtml(l.content) + '</div>' +
          '<div class="timeline-detail">結果: ' + U.escapeHtml(l.result) + '</div>' +
          '<div class="timeline-sub">担当: ' + U.escapeHtml(l.owner) + ' ／ 次のアクション: ' + U.escapeHtml(l.nextAction) + '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function html() {
    var kpiCards = App.Data.kpis.map(C.renderKpiCard).join('');
    var alerts = App.Data.alerts.map(C.renderAlertItem).join('');
    var tasks = weekTasks().map(taskRowHtml).join('');
    var consultations = pendingConsultations().map(consultationCardHtml).join('');
    var logs = recentLogs().map(logItemHtml).join('');

    return (
      '<div class="page-header">' +
        '<div><div class="page-title">経営ダッシュボード</div><div class="page-date">' + U.todayLabel() + '</div></div>' +
      '</div>' +

      '<div class="section kpi-grid">' + kpiCards + '</div>' +

      '<div class="section section-card">' +
        C.renderSectionHeader('要対応事項', '数値の裏にある「何が問題か」をまとめています', '', '⚠️') +
        '<div class="alert-list">' + (alerts || C.renderEmptyState('現在、要対応の事項はありません。')) + '</div>' +
      '</div>' +

      '<div class="section grid-2">' +
        '<div class="section-card">' +
          C.renderSectionHeader('今週やること', null,
            '<button class="btn btn-outline btn-sm" data-route="tasks">すべてのタスクを見る</button>', '📋') +
          '<div class="table-wrap"><table class="data-table">' +
            '<thead><tr><th>タスク</th><th>担当</th><th>期限</th><th>優先度</th><th>進捗</th></tr></thead>' +
            '<tbody>' + (tasks || '<tr><td colspan="5">' + C.renderEmptyState('タスクはありません。') + '</td></tr>') + '</tbody>' +
          '</table></div>' +
        '</div>' +
        '<div class="section-card">' +
          C.renderSectionHeader('相談・判断待ち', null,
            '<button class="btn btn-outline btn-sm" data-route="consultations">すべて見る</button>', '💬') +
          (consultations || C.renderEmptyState('判断待ちの相談はありません。')) +
        '</div>' +
      '</div>' +

      '<div class="section section-card">' +
        C.renderSectionHeader('最近の活動', null,
          '<button class="btn btn-outline btn-sm" data-route="activityLog">活動履歴を見る</button>', '🕒') +
        '<div class="timeline">' + (logs || C.renderEmptyState('活動履歴はありません。')) + '</div>' +
      '</div>'
    );
  }

  function bind(container) {
    U.qsa('[data-open-task]', container).forEach(function (row) {
      row.addEventListener('click', function () {
        App.Pages.tasks.openTaskModal(row.getAttribute('data-open-task'));
      });
    });
    U.qsa('[data-open-consultation]', container).forEach(function (row) {
      row.addEventListener('click', function () {
        App.Router.navigate('consultations');
        setTimeout(function () {
          App.Pages.consultations.openDetail(row.getAttribute('data-open-consultation'));
        }, 30);
      });
    });
  }

  function mount(container) {
    container.innerHTML = html();
    bind(container);
  }

  return { mount: mount };
})();
