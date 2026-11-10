# GDG On Campus NCUE Page

Next.js 15 App Router 專案，含數位證書核發／驗證系統。

## 架構重點

- 資料庫是 **SQLite**，用 Node.js 內建的 `node:sqlite`（不是 better-sqlite3，沒有原生模組要編譯）。
  連線在 `src/lib/db.js`，掛在 `globalThis` 上避免開發模式重複開檔。
- 所有狀態（`gdg.db` + 證書 PNG）都在 `DATA_DIR` 底下，正式站是 Mac 上 Zeabur 的 Volume `/app/data`（PVC `website-gdg-data`）。
- 身分驗證是**自己寫的** Google OAuth（`src/lib/auth.js`），不是 next-auth；
  session 是 HMAC 簽章的 httpOnly cookie，`AUTH_SECRET` 同時用來簽證書的防竄改簽章。
- **不要加回 `export const runtime = 'edge'`**。全站需要 Node runtime（`node:sqlite`、`node:crypto`、fs）。
- 後台 UI 元件在 `src/app/admin/_components/`（共用）與 `src/app/admin/dashboard/_components/`（頁面）。
- 全站固定深色，前台、後台、驗證頁共用 `src/app/globals.css` 的 `@theme` token（`bg-bg`、`bg-surface`、`border-line`、`text-ink`、`text-ink-muted`、`text-brand-soft`…），
  按鈕一律用 `src/components/ui/Button.jsx`。不要再寫 `slate-*`／`bg-white` 或 `dark:` 分支。
- 獎助學金平台的文案、架構圖與截圖清單在 `src/content/scholarship.js`，與 ming-website、io-sw-website 同源，改內容時三邊一起改。

## 部署

2026-11-09 從 Zeabur 雲端（東京）搬到 Mac；雲端上的專案、服務 ID 與 `npx zeabur` 指令都已失效。

- 跑在 Mac mini 的 Lima 虛擬機 `mac-a`（K3s ＋ Zeabur 開源版，也叫 Ming's Server，但不是 Zeabur 雲端），Zeabur 介面只能透過 Tailscale 開。
- Kubernetes namespace `gdg-website`，服務 `website`：建置 GitHub `GDG-on-campus-NCUE/gdg-website` 的 `production` 分支，用 Dockerfile。換版是先停再開（Recreate），會停幾秒。
- 網域 `gdg.ncuesa.org.tw`：DNS 在另一個 Cloudflare 帳號，CNAME 指向該帳號的 Cloudflare Tunnel `gdg-mac-a`（Proxied），沒有公開的源站 IP。
- 資料：PVC `website-gdg-data` 掛在 `/app/data`，每天 03:45 由 vol-daily 備份到 Cloudflare R2（restic）。
- 環境變數在 Zeabur 介面設定（存成 Secret `website-env`）。建置階段不會自動帶入服務的環境變數。

**推上 `main`（或合併 PR）就會部署**：CI（`.github/workflows/ci.yml`：build、Docker build、secret scan）全部通過後，
promote job 把 `production` 快轉到該 commit，Mac 約 1 分鐘內建好 arm64 映像並換上。CI 沒過就不會上線，main 上失敗會發 Discord。

```bash
# 查建置／部署狀態與日誌（也可以在 Zeabur 介面看）
limactl shell mac-a -- sudo k3s kubectl -n gdg-website get builds.builder.zeabur.com,deploy,pods
limactl shell mac-a -- sudo k3s kubectl -n gdg-website logs deploy/website

# 緊急上線（跳過 CI）
git push origin <commit>:production
# 退回（或在 Zeabur 介面 → 服務 → 重新啟動與回滾）
limactl shell mac-a -- sudo k3s kubectl -n gdg-website set image deploy/website website=zot.zot.svc:5000/gdg-website/website:<舊 tag>
```
