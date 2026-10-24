# GDG On Campus NCUE Page

Next.js 15 App Router 專案，含數位證書核發／驗證系統。

## 架構重點

- 資料庫是 **SQLite**，用 Node.js 內建的 `node:sqlite`（不是 better-sqlite3，沒有原生模組要編譯）。
  連線在 `src/lib/db.js`，掛在 `globalThis` 上避免開發模式重複開檔。
- 所有狀態（`gdg.db` + 證書 PNG）都在 `DATA_DIR` 底下，正式站是 Zeabur Volume `/app/data`。
- 身分驗證是**自己寫的** Google OAuth（`src/lib/auth.js`），不是 next-auth；
  session 是 HMAC 簽章的 httpOnly cookie，`AUTH_SECRET` 同時用來簽證書的防竄改簽章。
- **不要加回 `export const runtime = 'edge'`**。全站需要 Node runtime（`node:sqlite`、`node:crypto`、fs）。
- 後台 UI 元件在 `src/app/admin/_components/`（共用）與 `src/app/admin/dashboard/_components/`（頁面）。
- 全站固定深色，前台、後台、驗證頁共用 `src/app/globals.css` 的 `@theme` token（`bg-bg`、`bg-surface`、`border-line`、`text-ink`、`text-ink-muted`、`text-brand-soft`…），
  按鈕一律用 `src/components/ui/Button.jsx`。不要再寫 `slate-*`／`bg-white` 或 `dark:` 分支。
- 獎助學金平台的文案、架構圖與截圖清單在 `src/content/scholarship.js`，與 ming-website、io-sw-website 同源，改內容時三邊一起改。

## Zeabur 部署

2026-10-23 搬遷到新專案，舊的 ID（`6a7f18c2…`）已不存在。

- Project：`gdg-website`（`6adb920096dc52ce4a85ffb5`）
- Service：`website`（`6adb9200c375e0e40c0249ee`），網域 `gdg.ncuesa.org.tw`

這個服務綁定 GitHub `GDG-on-campus-NCUE/gdg-website` 的 `main`：**推上 `main` 就會自動以 Dockerfile 建置部署**。
不要再對它跑 `npx zeabur deploy` 上傳本機目錄，會把它從 Git 部署改掉。

```bash
# 查部署狀態與日誌
npx zeabur@latest deployment list --service-id 6adb9200c375e0e40c0249ee -i=false
npx zeabur@latest deployment log --service-id 6adb9200c375e0e40c0249ee -t build -i=false
```
