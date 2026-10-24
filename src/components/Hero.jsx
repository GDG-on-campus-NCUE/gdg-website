'use client';

import Image from 'next/image';
import { ArrowDownIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/hooks/useLanguage';
import { buttonClass } from '@/components/ui/Button';
import gdgIcon from '@/images/icon/GDG_icon.png';
import MatrixBackground from './MatrixBackground';

const COMMUNITY_URL = 'https://gdg.community.dev/gdg-on-campus-national-changhua-university-of-education-changhua-city-taiwan/';

// 背景程式碼雨的字元來源：就是這個元件本身的樣子
const heroComponentCode = `
'use client';
import { useLanguage } from '@/hooks/useLanguage';
import MatrixBackground from './MatrixBackground';

export default function Hero() {
    const { language } = useLanguage();
    return (
        <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden">
            <MatrixBackground codeString={heroComponentCode} />
            <h1 className="text-google-gradient">Build with AI</h1>
            <p>Go Fast Alone, Go Far Together</p>
            <a href={COMMUNITY_URL}>{language === 'zh' ? '加入社群' : 'Join the community'}</a>
        </section>
    );
}
`;

export default function Hero() {
    const { language } = useLanguage();
    const zh = language === 'zh';

    return (
        <section id="top" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
            <MatrixBackground codeString={heroComponentCode} />

            {/* 壓暗程式碼雨，並在底部漸層接回頁面底色 */}
            <div aria-hidden="true" className="absolute inset-0 z-10 bg-black/65" />
            <div aria-hidden="true" className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgb(17_18_20/0.75),transparent)]" />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-b from-transparent to-bg" />

            <div className="relative z-20 mx-auto max-w-4xl px-5 pb-16 pt-28 text-center md:px-8">
                <p className="mx-auto inline-flex animate-rise-in items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.06] py-1.5 pl-1.5 pr-4 text-sm text-ink-muted backdrop-blur">
                    <span className="flex size-6 items-center justify-center rounded-full bg-white p-1">
                        <Image src={gdgIcon} alt="" width={20} height={20} className="h-auto w-full" />
                    </span>
                    {zh ? '國立彰化師範大學 · Google 開發者社群' : 'Google Developer Group on Campus · NCUE'}
                </p>

                {/* 漸層流動與進場是兩組動畫，分放在 h1 與內層 span，不互相覆蓋 */}
                <h1
                    className="mt-7 animate-rise-in pb-2 text-6xl font-bold leading-none tracking-tight sm:text-7xl md:text-8xl lg:text-[8.5rem]"
                    style={{ animationDelay: '0.1s' }}
                >
                    <span className="text-google-gradient">Build with AI</span>
                </h1>
                <p className="mt-5 animate-rise-in text-2xl font-semibold text-ink md:text-4xl" style={{ animationDelay: '0.2s' }}>
                    Go Fast Alone, Go Far Together
                </p>
                <p className="mx-auto mt-6 max-w-2xl animate-rise-in text-balance text-base leading-relaxed text-ink-muted md:text-lg" style={{ animationDelay: '0.3s' }}>
                    {zh
                        ? '我們是彰師大的 Google 開發者社群。從 AI 工作坊到校園系統開發，陪你把想法做成真正上線、真正有人在用的產品。'
                        : 'We are the Google Developer Group at NCUE. From AI workshops to campus systems, we help you turn ideas into products that ship and get used.'}
                </p>

                <div className="mt-10 flex animate-rise-in flex-col items-center justify-center gap-3 sm:flex-row" style={{ animationDelay: '0.4s' }}>
                    <a href={COMMUNITY_URL} target="_blank" rel="noopener noreferrer" className={buttonClass('primary', 'lg', 'w-full sm:w-auto')}>
                        {zh ? '加入社群' : 'Join the community'}
                        <ArrowUpRightIcon className="size-4" />
                    </a>
                    <a href="#vision" className={buttonClass('glass', 'lg', 'w-full sm:w-auto')}>
                        {zh ? '認識我們' : 'Get to know us'}
                        <ArrowDownIcon className="size-4" />
                    </a>
                </div>
            </div>

            <a
                href="#vision"
                aria-label={zh ? '往下捲動' : 'Scroll down'}
                className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 rounded-full p-2 text-ink-faint transition-colors hover:text-ink"
            >
                <ArrowDownIcon className="size-5 animate-bounce" />
            </a>
        </section>
    );
}
