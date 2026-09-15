# GAS プロジェクト（Phase 3〜で実装）

このフォルダはPhase3で実装するGoogle Apps Scriptプロジェクトの置き場所です。
Phase1時点では雛形のみを置いています（実際のスプレッドシート接続はまだ行いません）。

## clasp連携（Phase3で設定）

1. `npm install -g @google/clasp`
2. `clasp login`
3. Apps Script側でスクリプトIDを取得し、このフォルダで `clasp clone <scriptId>`
   または `.clasp.json` を作成して `clasp push` / `clasp pull`
4. `.clasp.json` にはスクリプトIDが入るため、Gitには含めません（`.gitignore`済み）
