/**
 * アプリの実行時state（画面上の一時的なデータ）。
 * Phase1では App.Data のディープコピーをメモリ上に保持し、
 * タスク・相談・活動履歴の追加/更新はここに対して行う。
 * リロードするとApp.Dataの内容に戻る（＝スプレッドシートには保存されない）。
 * Phase2以降は、この読み書きをgoogle.script.runの呼び出しに置き換える。
 */
window.App = window.App || {};

App.State = (function () {
  var U = App.Utils;

  function clone(obj) { return JSON.parse(JSON.stringify(obj)); }

  var data = {
    tasks: clone(App.Data.tasks),
    consultations: clone(App.Data.consultations),
    activityLogs: clone(App.Data.activityLogs)
  };

  // ---- Tasks ----
  function getTasks() { return data.tasks; }

  function upsertTask(task) {
    if (task.id) {
      var idx = data.tasks.findIndex(function (t) { return t.id === task.id; });
      if (idx > -1) {
        data.tasks[idx] = Object.assign({}, data.tasks[idx], task, { updatedAt: new Date().toISOString() });
        return data.tasks[idx];
      }
    }
    var newTask = Object.assign({
      id: U.uid('t'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }, task);
    data.tasks.unshift(newTask);
    return newTask;
  }

  // ---- Consultations ----
  function getConsultations() { return data.consultations; }

  function upsertConsultation(item) {
    if (item.id) {
      var idx = data.consultations.findIndex(function (c) { return c.id === item.id; });
      if (idx > -1) {
        data.consultations[idx] = Object.assign({}, data.consultations[idx], item, { updatedAt: new Date().toISOString() });
        return data.consultations[idx];
      }
    }
    var newItem = Object.assign({
      id: U.uid('c'),
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }, item);
    data.consultations.unshift(newItem);
    return newItem;
  }

  // ---- Activity logs ----
  function getActivityLogs() { return data.activityLogs; }

  function addActivityLog(log) {
    var newLog = Object.assign({
      id: U.uid('a'),
      createdAt: new Date().toISOString()
    }, log);
    data.activityLogs.unshift(newLog);
    return newLog;
  }

  return {
    getTasks: getTasks,
    upsertTask: upsertTask,
    getConsultations: getConsultations,
    upsertConsultation: upsertConsultation,
    getActivityLogs: getActivityLogs,
    addActivityLog: addActivityLog
  };
})();
