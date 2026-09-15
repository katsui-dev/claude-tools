/**
 * 共通処理：シート取得・行→オブジェクト変換・レスポンス整形・ログ・ID生成。
 */

/**
 * シート名を指定してSheetオブジェクトを取得する。
 * SPREADSHEET_IDが未設定、またはシートが見つからない場合は例外を投げる。
 */
function getSheet_(sheetName) {
  if (!SPREADSHEET_ID) {
    throw new Error('SPREADSHEET_IDが設定されていません。Config.jsを確認してください。');
  }
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    throw new Error('シートが見つかりません: ' + sheetName);
  }
  return sheet;
}

/**
 * シートの全データを、1行目をヘッダーとしたオブジェクトの配列に変換する。
 * 空行（id相当の1列目が空）はスキップする。
 */
function sheetToObjects_(sheet) {
  var values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];

  var headers = values[0];
  var rows = values.slice(1);

  return rows
    .filter(function (row) { return row[0] !== '' && row[0] !== null; })
    .map(function (row) {
      var obj = {};
      headers.forEach(function (header, i) {
        obj[header] = row[i];
      });
      return obj;
    });
}

/** 成功レスポンスをJSON文字列（ContentService用）として返す。 */
function successResponse_(data) {
  return ContentService
    .createTextOutput(JSON.stringify({ success: true, data: data }))
    .setMimeType(ContentService.MimeType.JSON);
}

/** 失敗レスポンスをJSON文字列として返す。フロントには詳細を出しすぎない。 */
function errorResponse_(message) {
  return ContentService
    .createTextOutput(JSON.stringify({ success: false, message: String(message) }))
    .setMimeType(ContentService.MimeType.JSON);
}

/** 操作ログ・エラーログをApps Scriptの実行ログに残す（表示: 実行数 > 実行ログ）。 */
function logInfo_(action, detail) {
  Logger.log('[INFO] ' + action + ' ' + (detail !== undefined ? JSON.stringify(detail) : ''));
}

function logError_(action, err) {
  Logger.log('[ERROR] ' + action + ' ' + (err && err.stack ? err.stack : err));
}

/** ID生成：日付＋連番風のユニークID（例: t-20260915-93f2a1） */
function generateId_(prefix) {
  var d = new Date();
  var datePart = Utilities.formatDate(d, 'Asia/Tokyo', 'yyyyMMdd');
  var randPart = Math.random().toString(36).slice(2, 8);
  return (prefix || 'id') + '-' + datePart + '-' + randPart;
}

/** 入力値バリデーション：必須項目チェック（Phase4で使用） */
function requireFields_(obj, fields) {
  var missing = fields.filter(function (f) { return obj[f] === undefined || obj[f] === null || obj[f] === ''; });
  if (missing.length > 0) {
    throw new Error('必須項目が未入力です: ' + missing.join(', '));
  }
}
