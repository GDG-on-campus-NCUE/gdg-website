import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from '@/hooks/useLanguage';
import { ThemeProvider } from '@/hooks/useTheme';

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ['300', '400', '600', '700'],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#111214",
  colorScheme: "dark",
};

const DESCRIPTION = "國立彰化師範大學的 Google 開發者社群（GDG On Campus NCUE）。我們舉辦 AI 與網頁開發工作坊，打造獎助學金資訊平台等校園系統，和熱愛技術的你一起學習、一起做出真正上線的產品。";

export const metadata = {
  metadataBase: new URL("https://gdg.ncuesa.org.tw"),
  title: "GDG On Campus NCUE",
  description: DESCRIPTION,
  keywords: ["GDG On Campus NCUE", "Build with AI", "GDG", "NCUE 社團", "彰師 社團", "彰化師範大學 社團", "彰師 Google", "GDG NCUE", "彰師", "Google Developer Group", "ncue", "中部 技術社群", "開發者社群", "NCUE GDG", "獎助學金資訊平台"],

  // PWA & Web App
  manifest: "/manifest.json",

  // Open Graph (OG)
  openGraph: {
    title: "GDG On Campus NCUE",
    description: DESCRIPTION,
    url: "https://gdg.ncuesa.org.tw",
    siteName: "GDG On Campus NCUE",
    images: [
      {
        url: "https://gdg.ncuesa.org.tw/GDG_icon.png",
        width: 1920,
        height: 390,
        alt: "GDG On Campus NCUE",
      },
    ],
    locale: "zh_TW",
    type: "website",
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "GDG On Campus NCUE",
    description: "國立彰化師範大學的 Google 開發者社群。舉辦 AI 與網頁開發工作坊，打造真正上線的校園系統。",
    images: ["https://gdg.ncuesa.org.tw/GDG_icon.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    // 全站固定深色：直接在伺服器端輸出 data-theme，避免先閃一下淺色再切換
    <html lang="zh-TW" data-theme="dark" className="dark" suppressHydrationWarning>
      <head>
        {/* 在載入前設定語言 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var lang = localStorage.getItem('language');
                  if (!lang) {
                    var userLang = navigator.language || 'en';
                    lang = userLang.startsWith('zh') ? 'zh' : 'en';
                    localStorage.setItem('language', lang);
                  }
                  document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-TW' : 'en');
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${sourceSans.variable} antialiased`}>
        <ThemeProvider>
          <LanguageProvider>
            <div aria-hidden="true" className="site-grid pointer-events-none fixed inset-0 -z-10" />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
