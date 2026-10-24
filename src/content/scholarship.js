/**
 * 獎助學金資訊平台（精選專案）的內容。
 * 結構與架構圖移植自 ming-website 的 src/content/scholarship.ts、diagrams.ts；
 * 中文文案採用 io Software 官網（io-sw-website 的 src/content/works.ts）較口語的行銷版本；
 * 架構圖依 io-software-ai/NCUE-Scholarship 的程式碼整理。改內容時三個網站一起改。
 * 截圖放在 public/project/scholarship/，與 io Software 官網的 WebP 同一批。
 *
 * 每段文字都是 { zh, en }，元件用 pick(value, language) 取出。
 */

export function pick(value, language) {
    if (!value) return '';
    return value[language] ?? value.zh;
}

const SHOT = '/project/scholarship';

export const scholarship = {
    url: 'https://scholarship.ncuesa.org.tw',
    domain: 'scholarship.ncuesa.org.tw',
    github: 'https://github.com/io-software-ai/NCUE-Scholarship',
    year: '2026',

    eyebrow: { zh: '精選專案', en: 'Featured project' },
    name: { zh: '獎助學金資訊平台', en: 'NCUE Scholarship Platform' },
    client: { zh: '國立彰化師範大學 學務處', en: 'NCUE Office of Student Affairs' },
    category: { zh: '校園資訊平台', en: 'Campus information platform' },
    title: {
        zh: '讓學生查得到、看得懂、來得及申請。',
        en: 'Scholarships students can find, understand and apply for in time.',
    },
    summary: {
        zh: '校內外的獎助學金公告集中在一個平台。公告一上架，AI 助理就能照著回答；網頁、Android App、LINE 共用同一個帳號與資料；要訂提醒或記住學生資料，都先問過學生。',
        en: 'Every on- and off-campus scholarship notice in one place. Publish a notice and the AI assistant answers from it. Web, Android app and LINE share one account and one dataset, and the assistant asks before it sets a reminder or remembers anything.',
    },
    stat: {
        value: '98%',
        label: { zh: '回覆獎助學金詢問的時間減少（生輔組估算）', en: 'less time spent answering scholarship inquiries (office estimate)' },
    },
    recognition: {
        title: 'COMPUTEX 2026',
        desc: { zh: '受資策會邀請參展', en: 'Invited exhibitor' },
    },

    /* ------------------------------ 目標・做法・成果 ------------------------------ */
    goal: [
        {
            label: { zh: '對學生', en: 'For students' },
            text: {
                zh: '不用再在公文和公告之間翻找。打開一頁，就看到有哪些獎學金、哪天截止、自己符不符合；還有疑問，直接問 AI。',
                en: 'No more digging through memos and notices. One page shows what is open, when it closes and whether they qualify. Anything else, they ask the AI.',
            },
        },
        {
            label: { zh: '對學務處', en: 'For the office' },
            text: {
                zh: '同樣的問題不必一再回答。公告發出去，AI 就照著答；哪些問題答得不好，系統會整理出來。',
                en: 'No more answering the same question twice. Publish the notice and the AI answers from it. Where the AI falls short, the system lists the gaps.',
            },
        },
    ],
    approach: [
        {
            zh: '資料生命週期為 AI 而設計：公告建立或更新的當下就寫進知識庫，下架自動移除；AI 回答前一定先檢索，查不到才上網並標註來源。',
            en: 'The data lifecycle is built for AI: a notice enters the knowledge base the moment it is created or updated and leaves when unpublished; the AI always searches first, goes online only as a last resort and cites its sources.',
        },
        {
            zh: '答不好的問題會回流：學生按 👎 的對話進入知識缺口分析，AI 擬 FAQ 草稿，學務處審核後發布。',
            en: 'Weak answers flow back: replies students thumb down feed a knowledge-gap analysis, the AI drafts FAQ entries and the office approves them before publishing.',
        },
        {
            zh: '三個介面共用帳號與資料：網頁、Android App、LINE 登入同一個帳號，提醒和 AI 對話在各介面之間接得上。',
            en: 'Three interfaces, one account: web, Android app and LINE sign in to the same account, and reminders and AI conversations carry across all of them.',
        },
        {
            zh: 'AI 的每一步都看得見：用了哪些工具、怎麼想、引用哪些來源全部顯示；訂提醒或寫入記憶庫都要學生按確認。',
            en: 'Every AI step is visible: the tools used, the reasoning and the sources are all shown; a reminder or a memory entry happens only after the student confirms.',
        },
    ],
    result: [
        {
            zh: '平台已上線，全校都能用；校外使用者用自己的 Gemini 金鑰註冊，用量算在自己帳上。',
            en: 'Live for the whole university; outside users sign up with their own Gemini key, billed to their own account.',
        },
        {
            zh: '學生用 Google 帳號登入，綁定 LINE 之後在聊天室就能問。',
            en: 'Students sign in with Google and, once LINE is linked, ask right in the chat.',
        },
        {
            zh: '學務處在後台看得到每一則 LINE 對話，以及 AI 答不好的主題。',
            en: 'The office sees every LINE conversation in the back office, along with the topics the AI answered poorly.',
        },
        {
            zh: '程式碼開源，非商業使用免費。',
            en: 'Open source, free for non-commercial use.',
        },
    ],
    deliverables: [
        { zh: '網頁版：公告瀏覽、訂閱提醒、AI 助理、文件檢核', en: 'Web: notices, reminders, AI assistant, document review' },
        { zh: 'Android App：推播、離線快取、深連結', en: 'Android app: push, offline cache, deep links' },
        { zh: 'LINE 官方帳號：綁定、AI 回覆、圖文選單', en: 'LINE official account: linking, AI replies, rich menu' },
        { zh: '管理後台：公告、LINE、FAQ、AI 品質、統計', en: 'Back office: notices, LINE, FAQ, AI quality, analytics' },
        { zh: '知識庫同步與 FAQ 草稿審核流程', en: 'Knowledge-base sync and FAQ draft review flow' },
    ],
    stack: ['Next.js', 'React', 'PostgreSQL', 'Supabase', 'Gemini', 'LINE', 'Expo', 'nginx', 'Cloudflare'],

    /* ------------------------------ 產品導覽（桌機截圖） ------------------------------ */
    tour: [
        {
            key: 'notices',
            path: '/',
            title: { zh: '公告一覽', en: 'Notice list' },
            desc: {
                zh: '一打開就看到開放申請、7 天內截止和公告總數；用分類代碼、關鍵字和截止狀態快速篩選。',
                en: 'Open, closing-within-seven-days and total counts up top; category codes with keyword search and deadline filters.',
            },
            shot: { src: `${SHOT}/site.webp`, width: 1440, height: 900, alt: { zh: '獎助學金資訊平台首頁：公告一覽表與統計', en: 'Scholarship platform home: notice list and stats' } },
        },
        {
            key: 'detail',
            path: '/',
            title: { zh: '公告詳情', en: 'Notice detail' },
            desc: {
                zh: '截止倒數、送件方式、能不能兼領，一眼看清楚；往下是申請資格與完整內容，還能一鍵加入 Google 日曆或下載 PDF。',
                en: 'Countdown, how to submit and stacking rules first, then eligibility and the full notice; add it to Google Calendar or download the PDF.',
            },
            shot: { src: `${SHOT}/detail.webp`, width: 1440, height: 900, alt: { zh: '公告詳情：截止倒數、申請資格、加入日曆、下載 PDF', en: 'Notice detail: countdown, eligibility, calendar, PDF' } },
        },
        {
            key: 'admin',
            path: '/manage',
            title: { zh: '公告管理', en: 'Notice management' },
            desc: {
                zh: '在後台搜尋、新增公告，一鍵同步知識庫；表格列出分類、瀏覽數、截止日和上下架狀態。',
                en: 'Search, add notices and sync the knowledge base in one click; the table lists category, views, deadline, status and actions.',
            },
            shot: { src: `${SHOT}/admin-notices.webp`, width: 1440, height: 919, alt: { zh: '後台公告管理：搜尋、同步知識庫、新增公告，表格列狀態、截止日、瀏覽數與操作', en: 'Notice management: search, sync knowledge base, add notice; the table lists status, deadline, views and actions' } },
        },
        {
            key: 'line',
            path: '/manage',
            title: { zh: 'LINE 管理', en: 'LINE management' },
            desc: {
                zh: 'LINE 的 AI 自動回覆和網頁版用同一個知識庫，還能設定回應時段，以及時段外的提示訊息。',
                en: 'LINE auto-replies share the web knowledge base, with response hours and an out-of-hours message.',
            },
            shot: { src: `${SHOT}/admin-line.webp`, width: 1440, height: 890, alt: { zh: '後台 LINE 管理：AI 自動回覆與網頁版共用知識庫，可設回應時段與非回應時間提示', en: 'LINE management: AI auto-replies share the web knowledge base, with response hours and an out-of-hours message' } },
        },
    ],

    /* ------------------------------ 資料生命週期 ------------------------------ */
    // 文案原則：一句一件事，先講結果再講機制；卡片標題四到八個字，附註一行
    lifecycle: {
        heading: { zh: '資料怎麼在系統裡流動', en: 'How the data flows' },
        intro: {
            zh: '公告不是丟給 AI 的附件，而是一個會自己修正的循環。學務處照常發公告，AI 照最新內容回答；答不好的問題整理成 FAQ，再回到知識庫。',
            en: 'A notice is not an attachment handed to an AI. It is one turn of a loop that corrects itself: the office publishes as usual, the AI answers from the latest version, and the questions it gets wrong come back as FAQs.',
        },
        steps: [
            { title: { zh: '公告建立或更新', en: 'Notice created or updated' }, note: { zh: '學務處照平常的方式發', en: 'The office publishes as it always has' } },
            { title: { zh: '知識庫即時同步', en: 'Knowledge base syncs' }, note: { zh: '下架自動移除，每天校正一次', en: 'Removed on unpublish, reconciled daily' } },
            { title: { zh: 'AI 先檢索再回答', en: 'AI searches, then answers' }, note: { zh: '查不到才上網，並標註來源', en: 'Goes online only as a last resort, with sources' } },
            { title: { zh: '學生評價回答', en: 'Students rate the reply' }, note: { zh: '按 👎 的對話留下紀錄', en: 'Thumbs-down replies are kept on record' } },
            { title: { zh: '找出知識缺口', en: 'Knowledge-gap analysis' }, note: { zh: '常問但 FAQ 沒答的主題', en: 'Repeated questions the FAQ misses' } },
            { title: { zh: 'FAQ 審核後發布', en: 'FAQ reviewed, published' }, note: { zh: 'AI 擬草稿，管理員決定', en: 'AI drafts, staff decide' } },
        ],
        loopLabel: { zh: 'FAQ 回到知識庫', en: 'FAQs flow back' },
        loop: {
            zh: '發布後的 FAQ 回到知識庫。之後 AI 回答制度問題，優先引用這些 FAQ。',
            en: 'Published FAQs return to the knowledge base. From then on, the AI cites them first for policy questions.',
        },
    },

    /* ------------------------------ 系統架構 ------------------------------ */
    // 依 io-software-ai/NCUE-Scholarship（apps/web、apps/mobile、deploy.sh、lib/ai/*）整理。
    // icon：TechIcon 的技術名稱，或 FlowDiagram 內建的 clock / bell / globe / database。
    architecture: {
        heading: { zh: '系統架構', en: 'System architecture' },
        intro: {
            zh: '一個 Next.js 16 應用同時負責網頁、管理後台、API 和 LINE Webhook，部署在 VPS 上（PM2、nginx、Cloudflare）；Android App 也呼叫同一組 API。資料和登入用自架的 Supabase，AI 助理則是 Gemini 函式呼叫搭配 pgvector 知識庫。',
            en: 'A single Next.js 16 app serves the website, the back office, the API and the LINE webhook on a VPS (PM2, nginx, Cloudflare), and the Android app calls the same API. Data and authentication run on a self-hosted Supabase, and the AI assistant combines Gemini function calling with a pgvector knowledge base.',
        },
        // 欄由左到右：使用者介面 → 應用層 → AI 與資料 → 知識與外部
        columns: [
            { zh: '介面', en: 'Clients' },
            { zh: '應用層', en: 'Application' },
            { zh: 'AI 與資料', en: 'AI & data' },
            { zh: '知識與外部服務', en: 'Knowledge & external' },
        ],
        cols: 4,
        rows: 3,
        nodes: [
            { id: 'web', col: 1, row: 1, icon: 'Next.js', label: { zh: '網頁與管理後台', en: 'Web & back office' }, sub: { zh: 'Next.js 16・/manage 後台', en: 'Next.js 16 · /manage console' } },
            { id: 'app', col: 1, row: 2, icon: 'Android', label: { zh: 'Android App', en: 'Android app' }, sub: { zh: 'Expo・React Native', en: 'Expo · React Native' } },
            { id: 'line', col: 1, row: 3, icon: 'LINE', label: { zh: 'LINE 官方帳號', en: 'LINE official account' }, sub: { zh: 'Webhook・6 位數綁定碼', en: 'Webhook · 6-digit linking' } },
            { id: 'cron', col: 2, row: 1, icon: 'clock', label: { zh: '排程', en: 'Scheduler' }, sub: { zh: '截止提醒・知識庫校正', en: 'Reminders · KB reconcile' } },
            { id: 'api', col: 2, row: 2, icon: 'Node.js', tone: 'brand', label: { zh: 'Next.js API', en: 'Next.js API' }, sub: { zh: 'Route Handlers・PM2・nginx', en: 'Route handlers · PM2 · nginx' } },
            { id: 'notify', col: 2, row: 3, icon: 'bell', label: { zh: '通知', en: 'Notifications' }, sub: { zh: 'FCM 推播・Email・LINE', en: 'FCM push · email · LINE' } },
            { id: 'agent', col: 3, row: 2, icon: 'Gemini', tone: 'brand', label: { zh: 'Gemini AI 助理', en: 'Gemini assistant' }, sub: { zh: '函式呼叫・18 項工具', en: 'Function calling · 18 tools' } },
            { id: 'db', col: 3, row: 3, icon: 'Supabase', label: { zh: 'Supabase PostgreSQL', en: 'Supabase PostgreSQL' }, sub: { zh: '自架・Google 登入・RLS', en: 'Self-hosted · Google sign-in · RLS' } },
            { id: 'web-search', col: 4, row: 1, icon: 'globe', tone: 'muted', label: { zh: '網路搜尋', en: 'Web search' }, sub: { zh: 'SerpApi・讀取網頁', en: 'SerpApi · page reader' } },
            { id: 'kb', col: 4, row: 2, icon: 'database', label: { zh: 'AI 知識庫', en: 'AI knowledge base' }, sub: { zh: 'pgvector・關鍵字＋向量檢索', en: 'pgvector · keyword + vector' } },
        ],
        edges: [
            { from: 'web', to: 'api' },
            { from: 'app', to: 'api', label: { zh: '串流回應', en: 'streaming' } },
            { from: 'line', to: 'api', label: { zh: '簽章驗證', en: 'signed' } },
            { from: 'cron', to: 'api' },
            { from: 'api', to: 'agent', label: { zh: '對話', en: 'chat' } },
            { from: 'api', to: 'notify' },
            { from: 'api', to: 'db', label: { zh: '讀寫', en: 'read / write' } },
            { from: 'agent', to: 'kb', label: { zh: '混合檢索', en: 'hybrid search' } },
            { from: 'agent', to: 'web-search', dashed: true, label: { zh: '查不到時', en: 'fallback' } },
            { from: 'agent', to: 'db', label: { zh: 'FAQ・訂閱・記憶', en: 'FAQ · subscriptions · memory' } },
            { from: 'db', to: 'kb', label: { zh: '公告同步', en: 'notice sync' } },
        ],
    },

    /* ------------------------------ 重點設計 ------------------------------ */
    // 順序：資料生命週期 → 跨平台 → AI 導入設計；每塊一句導言加條列
    highlights: [
        {
            key: 'lifecycle',
            title: { zh: '知識庫跟著公告走', en: 'A knowledge base in sync with notices' },
            body: {
                zh: '學務處照平常的方式發公告，AI 就照最新內容回答。',
                en: 'The office publishes notices the way it always has, and the AI answers from the latest version.',
            },
            points: [
                {
                    zh: '公告一建立或更新，就整理成 AI 易讀的內容寫進知識庫；下架或刪除自動移除，每天再校正一次。',
                    en: 'The moment a notice is created or updated it is rewritten into AI-readable form and stored; unpublishing or deleting removes it, and a daily job reconciles the rest.',
                },
                {
                    zh: 'AI 回答前一定先查知識庫，查不到才上網，並標註來源。',
                    en: 'The AI always searches the knowledge base first, and goes online, citing the source, only when nothing is found.',
                },
                {
                    zh: '學生按 👎 的對話進入知識缺口分析，AI 擬 FAQ 草稿，學務處審核後發布，之後回答制度問題就以 FAQ 為準。',
                    en: 'Replies students thumb down feed a knowledge-gap analysis; the AI drafts FAQ entries, the office approves and publishes them, and those FAQs become the first reference for policy questions.',
                },
                {
                    zh: '發公告時上傳辦法檔或貼上網址，AI 先把欄位填好，並提醒可能重複的公告。',
                    en: 'When creating a notice, upload the regulation file or paste a URL: the AI pre-fills the fields and flags likely duplicates.',
                },
            ],
            shots: [
                { src: `${SHOT}/admin-ai-quality.webp`, width: 1440, height: 823, alt: { zh: '後台 AI 品質：每晚找出重複詢問但 FAQ 未涵蓋的主題，AI 產草稿，管理員審核後發布', en: 'Back office AI quality: nightly analysis finds repeated questions the FAQ misses; the AI drafts, staff approve before publishing' } },
            ],
        },
        {
            key: 'cross-platform',
            title: { zh: '網頁、App、LINE 共用同一個帳號', en: 'One account across web, app and LINE' },
            body: {
                zh: '學生哪裡方便，就在哪裡用：網頁看完整公告，App 收推播，LINE 直接問。',
                en: 'Students use whatever is at hand: full notices on the web, push alerts in the app, a quick question on LINE.',
            },
            points: [
                { zh: '三個介面登入同一個帳號，看到同一份資料。', en: 'All three sign in to the same account and see the same data.' },
                { zh: '在網頁訂的截止提醒，App 和 LINE 都收得到。', en: 'A reminder set on the web arrives in the app and on LINE.' },
                { zh: '跟 AI 的對話在網頁和 LINE 之間接著講，不必重述背景。', en: 'A conversation with the AI carries on between web and LINE without repeating the background.' },
                {
                    zh: 'LINE 輸入 6 位數驗證碼就完成綁定；App 有推播、離線快取、深連結和長按捷徑。',
                    en: 'LINE links with a six-digit code; the app adds push, offline cache, deep links and a long-press shortcut.',
                },
                {
                    zh: '學務處在後台管理 LINE：聊天紀錄、AI 自動回覆、回應時段、圖文選單。',
                    en: 'The office manages LINE from the back office: chat history, AI auto-reply, response hours and the rich menu.',
                },
            ],
            shots: [
                { src: `${SHOT}/app-notices.webp`, width: 780, height: 1587, frame: 'phone', alt: { zh: 'App 公告分頁：搜尋、狀態篩選、開放中與七日內截止統計，卡片標示分類、剩餘天數與已看過', en: 'App Notices tab: search, status filters, counts of open and closing within seven days; cards show category, days left and seen marks' } },
                { src: `${SHOT}/app-assistant.webp`, width: 780, height: 1587, frame: 'phone', alt: { zh: 'Android App 助理分頁：建議問題、@ 指定公告、上傳文件檢核', en: 'Android app Assistant tab: suggested questions, @ to pick a notice, upload documents for review' } },
                { src: `${SHOT}/line-chat.webp`, width: 780, height: 1587, frame: 'phone', alt: { zh: 'LINE 官方帳號：同一個 AI 助理純文字回覆，圖文選單直達平台、社群、學務處與綁定', en: 'LINE official account: the same assistant replies in plain text; the rich menu opens the platform, community, office and linking' } },
            ],
        },
        {
            key: 'ai-design',
            title: { zh: '負責任的 AI 應用', en: 'Responsible AI, by design' },
            body: {
                zh: 'AI 說的有來源，做的要確認。學生看得到 AI 從哪裡找答案，也決定 AI 能替自己做什麼。',
                en: 'Every answer is cited and every action is confirmed. Students see where the AI gets its answers, and decide what it may do on their behalf.',
            },
            points: [
                {
                    zh: '搜知識庫、查 FAQ、確認日期、讀網頁，每一步都列出來；思路可以展開。',
                    en: 'Search the knowledge base, check the FAQ, confirm the date, read a page: every step is listed, and the reasoning can be expanded.',
                },
                { zh: '回覆附上公告卡片、來源、免責聲明和 👍👎。', en: 'Each reply carries notice cards, sources, a disclaimer and thumbs up or down.' },
                {
                    zh: 'AI 提議訂閱提醒或寫入記憶庫，學生按確認才生效；記憶庫可以看、可以改、可以清空。',
                    en: 'A reminder or a memory entry the AI proposes happens only after the student confirms; the memory can be viewed, edited or cleared.',
                },
                { zh: '自傳和申請表交給 AI 檢核，原檔不保存。', en: 'Essays and application forms are checked by the AI for that conversation only and never stored.' },
                {
                    zh: '校外使用者自備 Gemini 金鑰，AES-256-GCM 加密保管或只存在自己的裝置；每分鐘最多 10 次請求，後台一鍵關閉 AI。',
                    en: 'Outside users bring their own Gemini key, encrypted with AES-256-GCM or kept only on their device; requests are capped at ten per minute, and staff can switch the AI off with one click.',
                },
            ],
            shots: [
                { src: `${SHOT}/assistant-chat.webp`, width: 1143, height: 857, alt: { zh: '網頁版 AI 助理：先搜知識庫與常見問題，再依設籍地、成績、身分列出可申請的獎學金', en: 'Web AI assistant: searches the knowledge base and FAQ first, then lists scholarships by residence, grades and status' } },
                { src: `${SHOT}/assistant-memory.webp`, width: 1117, height: 838, alt: { zh: 'AI 提議把設籍地、身分、成績加入記憶庫，學生按「同意加入」才寫入', en: 'The AI offers to remember residence, status and grades; nothing is saved until the student taps Agree' } },
            ],
        },
    ],
};

/** 區塊內的小標與按鈕文字 */
export const scholarshipLabels = {
    visit: { zh: '前往平台', en: 'Visit the platform' },
    source: { zh: '原始碼', en: 'Source code' },
    goal: { zh: '目標', en: 'Goal' },
    approach: { zh: '做法', en: 'Approach' },
    result: { zh: '成果', en: 'Result' },
    deliverables: { zh: '交付內容', en: 'Deliverables' },
    stack: { zh: '技術', en: 'Stack' },
    year: { zh: '年份', en: 'Year' },
    client: { zh: '合作單位', en: 'Client' },
    tour: { zh: '產品導覽', en: 'Product tour' },
    highlights: { zh: '重點設計', en: 'Design highlights' },
    swipe: { zh: '← 左右滑動看完整架構 →', en: '← Swipe to see the whole architecture →' },
    planned: { zh: '規劃中', en: 'Planned' },
    fallbackLegend: { zh: '虛線：查不到資料時才走的備援路徑', en: 'Dashed: fallback path, used only when nothing is found' },
};
