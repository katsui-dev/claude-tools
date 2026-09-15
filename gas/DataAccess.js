/**
 * スプレッドシートからのデータ取得処理。
 * Phase2では getDashboardData() のみ実装。他はPhase3以降で実装する。
 */

/**
 * dashboardシートを読み、HOME画面のKPIカード用データを返す。
 * シートの列: id, label, progress, count, unit, status, updated_at
 */
function getDashboardData() {
  var sheet = getSheet_(SHEET_NAMES.DASHBOARD);
  var rows = sheetToObjects_(sheet);

  var kpis = rows.map(function (row) {
    var kpi = {
      id: String(row.id),
      label: String(row.label),
      status: String(row.status)
    };
    if (row.progress !== '' && row.progress !== null && row.progress !== undefined) {
      kpi.progress = Number(row.progress);
    }
    if (row.count !== '' && row.count !== null && row.count !== undefined) {
      kpi.count = Number(row.count);
      kpi.unit = row.unit ? String(row.unit) : '';
    }
    return kpi;
  });

  logInfo_('getDashboardData', { count: kpis.length });
  return { kpis: kpis };
}

// ---- Phase3以降で実装予定 ----
function getAdvertisingData() { throw new Error('Phase3で実装予定です'); }
function getLeadData() { throw new Error('Phase3で実装予定です'); }
function getHpData() { throw new Error('Phase3で実装予定です'); }
function getRecruitingData() { throw new Error('Phase3で実装予定です'); }
function getActivityPlanData() { throw new Error('Phase3で実装予定です'); }
function getTasks() { throw new Error('Phase3で実装予定です'); }
function getConsultations() { throw new Error('Phase3で実装予定です'); }
function getActivityLogs() { throw new Error('Phase3で実装予定です'); }

// ---- Phase4で実装予定（登録・更新） ----
function createTask(taskObject) { throw new Error('Phase4で実装予定です'); }
function createConsultation(consultationObject) { throw new Error('Phase4で実装予定です'); }
function createActivityLog(logObject) { throw new Error('Phase4で実装予定です'); }
function updateTask(id, patch) { throw new Error('Phase4で実装予定です'); }
function updateConsultation(id, patch) { throw new Error('Phase4で実装予定です'); }
