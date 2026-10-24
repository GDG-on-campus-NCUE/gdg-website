'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/20/solid';
import { useLanguage } from '@/hooks/useLanguage';
import { buttonClass, cx } from '@/components/ui/Button';
import bracketsAnim from '@/images/stickers/brackets.webp';
import LanguageSwitcher from './LanguageSwitcher';

const SECTIONS = ['vision', 'events', 'projects', 'calendar', 'join'];

export default function Navbar() {
    const { language } = useLanguage();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeId, setActiveId] = useState(null);

    const labels = language === 'zh'
        ? { vision: '社群願景', events: '活動回顧', projects: '校園專案', calendar: '社群行程', join: '加入我們', login: '管理登入' }
        : { vision: 'Vision', events: 'Events', projects: 'Projects', calendar: 'Schedule', join: 'Join Us', login: 'Admin' };

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 10);
        onScroll();
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

    const solid = isScrolled || isMenuOpen;

    return (
        <>
            <header
                className={cx(
                    'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300',
                    solid ? 'border-b border-line bg-bg/85 backdrop-blur-xl' : 'border-b border-transparent bg-transparent',
                )}
            >
                <nav aria-label={language === 'zh' ? '主要導覽' : 'Main'} className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 md:h-20 md:px-8">
                    <Link href="/" className="flex shrink-0 items-center gap-2.5 rounded-lg" aria-label="GDG On Campus NCUE">
                        <Image src={bracketsAnim} alt="" width={64} height={36} unoptimized className="h-auto w-12 md:w-14" priority />
                        <span className="leading-tight">
                            <span className="block text-[15px] font-semibold text-ink md:text-base">Google Developer Group</span>
                            <span className="block text-xs text-ink-muted md:text-[13px]">On Campus NCUE</span>
                        </span>
                    </Link>

                    <div className="hidden items-center gap-1 lg:flex">
                        {SECTIONS.map((id) => (
                            <a
                                key={id}
                                href={`#${id}`}
                                aria-current={activeId === id ? 'true' : undefined}
                                className={cx(
                                    'relative rounded-full px-3.5 py-2 text-[15px] font-semibold transition-colors',
                                    activeId === id ? 'text-ink' : 'text-ink-muted hover:text-ink',
                                )}
                            >
                                {labels[id]}
                                <span
                                    aria-hidden="true"
                                    className={cx(
                                        'absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-brand transition-transform duration-300',
                                        activeId === id ? 'scale-x-100' : 'scale-x-0',
                                    )}
                                />
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

                {/* 手機選單 */}
                <div
                    id="mobile-menu"
                    className={cx(
                        'grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out lg:hidden',
                        isMenuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                    )}
                >
                    <div className="min-h-0" inert={!isMenuOpen ? true : undefined}>
                        <div className="border-t border-line px-5 pb-6 pt-3">
                            <ul className="grid">
                                {SECTIONS.map((id) => (
                                    <li key={id}>
                                        <a
                                            href={`#${id}`}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={cx(
                                                'flex items-center justify-between rounded-xl px-3 py-3.5 text-base font-semibold transition-colors',
                                                activeId === id ? 'bg-white/[0.05] text-ink' : 'text-ink-muted hover:text-ink',
                                            )}
                                        >
                                            {labels[id]}
                                            {activeId === id && <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-4">
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
                <div aria-hidden="true" className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setIsMenuOpen(false)} />
            )}
        </>
    );
}
