'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/20/solid';
import { useLanguage } from '@/hooks/useLanguage';
import { buttonClass, cx } from '@/components/ui/Button';
import bracketsAnim from '@/images/stickers/brackets.webp';
import LanguageSwitcher from './LanguageSwitcher';

const SECTIONS = ['vision', 'events', 'projects', 'calendar', 'join'];

// 捲過這個高度後，往下捲就收起導覽列
const HIDE_AFTER = 160;

/**
 * 懸浮膠囊導覽列（仿獎助學金資訊平台的 header-pill）：
 * 離視窗邊緣留一點距離、圓角膠囊、毛玻璃底；往下捲時收起，往上捲立刻出現。
 * 手機選單是膠囊下方另一張浮動卡片。選單開著、或鍵盤焦點在導覽列裡時不會收起。
 */
export default function Navbar() {
    const { language } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [activeId, setActiveId] = useState(null);
    const lastY = useRef(0);

    const labels = language === 'zh'
        ? { vision: '社群願景', events: '活動回顧', projects: '校園專案', calendar: '社群行程', join: '加入我們', login: '管理登入' }
        : { vision: 'Vision', events: 'Events', projects: 'Projects', calendar: 'Schedule', join: 'Join Us', login: 'Admin' };

    // 往下捲收起、往上捲出現；4px 以內的抖動不理
    useEffect(() => {
        lastY.current = window.scrollY;
        const onScroll = () => {
            const y = window.scrollY;
            const dy = y - lastY.current;
            if (y < HIDE_AFTER) setHidden(false);
            else if (dy > 4) setHidden(true);
            else if (dy < -4) setHidden(false);
            lastY.current = y;
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // 目前讀到哪一段：取視窗上緣往下 30% 那條線所在的區塊
    useEffect(() => {
        const targets = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean);
        const visible = new Map();
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => visible.set(entry.target.id, entry.isIntersecting));
                const current = SECTIONS.find((id) => visible.get(id));
                setActiveId(current ?? null);
            },
            { rootMargin: '-30% 0px -69% 0px' },
        );
        targets.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    // 手機選單：Esc 關閉，開啟時鎖住背景捲動
    useEffect(() => {
        if (!isMenuOpen) return undefined;
        const onKeyDown = (event) => {
            if (event.key === 'Escape') setIsMenuOpen(false);
        };
        document.addEventListener('keydown', onKeyDown);
        const previous = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = previous;
        };
    }, [isMenuOpen]);

    const collapsed = hidden && !isMenuOpen;

    return (
        <>
            <header
                className={cx(
                    'fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-transform duration-300 ease-out md:px-5 md:pt-4',
                    collapsed ? '-translate-y-[calc(100%+0.5rem)] focus-within:translate-y-0' : 'translate-y-0',
                )}
            >
                <nav
                    aria-label={language === 'zh' ? '主要導覽' : 'Main'}
                    className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 rounded-full border border-white/10 bg-surface/75 pl-3 pr-2 shadow-xl shadow-black/40 backdrop-blur-xl md:h-16 md:pl-4"
                >
                    <Link href="/" className="flex shrink-0 items-center gap-2.5 rounded-full" aria-label="GDG On Campus NCUE">
                        <Image src={bracketsAnim} alt="" width={64} height={36} unoptimized className="h-auto w-10 md:w-12" priority />
                        <span className="leading-tight">
                            <span className="block text-sm font-semibold text-ink md:text-[15px]">Google Developer Group</span>
                            <span className="block text-[11px] text-ink-muted md:text-xs">On Campus NCUE</span>
                        </span>
                    </Link>

                    <div className="hidden items-center gap-1 lg:flex">
                        {SECTIONS.map((id) => (
                            <a
                                key={id}
                                href={`#${id}`}
                                aria-current={activeId === id ? 'true' : undefined}
                                className={cx(
                                    'rounded-full px-3.5 py-2 text-[15px] font-semibold transition-colors',
                                    activeId === id ? 'bg-white/[0.08] text-ink' : 'text-ink-muted hover:bg-white/[0.04] hover:text-ink',
                                )}
                            >
                                {labels[id]}
                            </a>
                        ))}
                    </div>

                    <div className="hidden items-center gap-2 lg:flex">
                        <LanguageSwitcher />
                        <Link href="/admin/login" className={buttonClass('ghost', 'sm')}>
                            <ArrowRightEndOnRectangleIcon className="size-4" />
                            {labels.login}
                        </Link>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsMenuOpen((open) => !open)}
                        className={buttonClass('ghost', 'iconMd', 'lg:hidden')}
                        aria-label={isMenuOpen ? (language === 'zh' ? '關閉選單' : 'Close menu') : (language === 'zh' ? '開啟選單' : 'Open menu')}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu"
                    >
                        {isMenuOpen ? <XMarkIcon className="size-6" /> : <Bars3Icon className="size-6" />}
                    </button>
                </nav>

                {/* 手機選單：膠囊下方的浮動卡片 */}
                <div
                    id="mobile-menu"
                    className={cx(
                        'mx-auto grid max-w-7xl transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden',
                        isMenuOpen ? 'grid-rows-[1fr] opacity-100' : 'pointer-events-none grid-rows-[0fr] opacity-0',
                    )}
                >
                    <div className="min-h-0 overflow-hidden" inert={!isMenuOpen ? true : undefined}>
                        <div className="mt-2 rounded-3xl border border-white/10 bg-surface/95 p-3 shadow-xl shadow-black/40 backdrop-blur-xl">
                            <ul className="grid">
                                {SECTIONS.map((id) => (
                                    <li key={id}>
                                        <a
                                            href={`#${id}`}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={cx(
                                                'flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-semibold transition-colors',
                                                activeId === id ? 'bg-white/[0.06] text-ink' : 'text-ink-muted hover:text-ink',
                                            )}
                                        >
                                            {labels[id]}
                                            {activeId === id && <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-2 flex items-center justify-between gap-3 border-t border-line px-1 pt-3">
                                <LanguageSwitcher />
                                <Link href="/admin/login" onClick={() => setIsMenuOpen(false)} className={buttonClass('secondary', 'sm')}>
                                    <ArrowRightEndOnRectangleIcon className="size-4" />
                                    {labels.login}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {isMenuOpen && (
                <div aria-hidden="true" className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] lg:hidden" onClick={() => setIsMenuOpen(false)} />
            )}
        </>
    );
}
