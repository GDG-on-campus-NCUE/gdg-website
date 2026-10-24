'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import { cx } from '@/components/ui/Button';
import { useInView, usePrefersReducedMotion } from '@/hooks/useInView';
import { pick } from '@/content/scholarship';

const INTERVAL = 5000;

/**
 * 產品導覽：左側（手機在上方）是分頁，右側是瀏覽器外框裡的截圖。
 * 取代原本的「捲動劇場」：不必捲過好幾個螢幕高才看得完，想看哪一頁直接點。
 * 進入視窗後自動輪播，滑鼠停在區塊上、分頁在背景、捲出視窗或開啟減少動態效果時暫停；
 * 使用者點過分頁就不再自動切換，避免看到一半被換走。
 * 分頁支援方向鍵（WAI-ARIA tabs pattern）。
 */
export default function ProductTour({ items, domain, language, label }) {
    const root = useRef(null);
    const tabRefs = useRef([]);
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    const [touched, setTouched] = useState(false);
    const inView = useInView(root, { threshold: 0.35 });
    const reduce = usePrefersReducedMotion();
    const running = inView && !paused && !touched && !reduce;
    const current = items[active];

    useEffect(() => {
        if (!running) return undefined;
        const timer = setTimeout(() => {
            if (!document.hidden) setActive((a) => (a + 1) % items.length);
        }, INTERVAL);
        return () => clearTimeout(timer);
    }, [running, active, items.length]);

    const select = (index) => {
        setActive(index);
        setTouched(true);
    };

    const onKeyDown = (event) => {
        const last = items.length - 1;
        const next = { ArrowRight: active + 1, ArrowDown: active + 1, ArrowLeft: active - 1, ArrowUp: active - 1, Home: 0, End: last }[event.key];
        if (next === undefined) return;
        event.preventDefault();
        const index = (next + items.length) % items.length;
        select(index);
        tabRefs.current[index]?.focus();
    };

    return (
        <div
            ref={root}
            className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* 分頁：手機橫向捲動、桌機直排並展開說明 */}
            <div className="min-w-0 lg:col-span-4">
                <p className="mb-3 text-xs font-semibold text-ink-faint">{label}</p>
                <div
                    role="tablist"
                    aria-label={label}
                    aria-orientation="vertical"
                    onKeyDown={onKeyDown}
                    className="grid grid-cols-2 gap-2 lg:flex lg:flex-col"
                >
                    {items.map((item, i) => {
                        const selected = i === active;
                        return (
                            <button
                                key={item.key}
                                ref={(el) => {
                                    tabRefs.current[i] = el;
                                }}
                                type="button"
                                role="tab"
                                id={`tour-tab-${item.key}`}
                                aria-selected={selected}
                                aria-controls="tour-panel"
                                tabIndex={selected ? 0 : -1}
                                onClick={() => select(i)}
                                className={cx(
                                    'relative min-w-0 overflow-hidden rounded-xl border px-3 py-2.5 text-center text-sm font-semibold transition-colors',
                                    'lg:rounded-2xl lg:px-5 lg:py-4 lg:text-left',
                                    selected
                                        ? 'border-brand/50 bg-brand/10 text-ink'
                                        : 'border-line bg-surface/60 text-ink-muted hover:border-line-strong hover:text-ink',
                                )}
                            >
                                <span className="flex items-baseline justify-center gap-3 lg:justify-start">
                                    <span className={cx('hidden font-mono text-xs tabular-nums lg:inline', selected ? 'text-brand-soft' : 'text-ink-faint')}>
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    <span className="lg:text-base">{pick(item.title, language)}</span>
                                </span>
                                {/* 桌機：選中的分頁展開一行說明 */}
                                <span
                                    className={cx(
                                        'hidden text-sm font-normal leading-relaxed text-ink-muted lg:grid lg:transition-[grid-template-rows,opacity] lg:duration-300',
                                        selected ? 'lg:grid-rows-[1fr] lg:opacity-100' : 'lg:grid-rows-[0fr] lg:opacity-0',
                                    )}
                                >
                                    <span className="overflow-hidden">
                                        <span className="block pt-2 pl-8">{pick(item.desc, language)}</span>
                                    </span>
                                </span>
                                {/* 自動輪播時，選中分頁底部的進度條 */}
                                {selected && running && (
                                    <span
                                        key={`p-${active}`}
                                        aria-hidden="true"
                                        className="tour-progress absolute inset-x-0 bottom-0 hidden h-0.5 bg-brand lg:block"
                                        style={{ animationDuration: `${INTERVAL}ms` }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* 瀏覽器外框 */}
            <div className="min-w-0 lg:col-span-8">
                <div
                    id="tour-panel"
                    role="tabpanel"
                    aria-labelledby={`tour-tab-${current.key}`}
                    className="overflow-hidden rounded-2xl border border-line bg-raised shadow-2xl shadow-black/50"
                >
                    <div className="flex items-center gap-2 border-b border-line bg-surface px-4 py-2.5">
                        <span className="flex gap-1.5" aria-hidden="true">
                            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                            <span className="size-2.5 rounded-full bg-[#febc2e]" />
                            <span className="size-2.5 rounded-full bg-[#28c840]" />
                        </span>
                        <span className="mx-auto flex h-6 w-full max-w-sm items-center justify-center gap-1.5 rounded-md bg-bg px-3 text-xs text-ink-muted">
                            <LockClosedIcon className="size-3 shrink-0 text-ink-faint" />
                            <span className="truncate">
                                {domain}
                                <span className="text-ink-faint">{current.path === '/' ? '' : current.path}</span>
                            </span>
                        </span>
                        <span className="w-[42px]" aria-hidden="true" />
                    </div>
                    <div className="relative aspect-[16/10] bg-white">
                        {items.map((item, i) => (
                            <Image
                                key={item.key}
                                src={item.shot.src}
                                alt={pick(item.shot.alt, language)}
                                fill
                                sizes="(min-width: 1024px) 60vw, 100vw"
                                aria-hidden={i !== active}
                                className={cx(
                                    'object-cover object-top transition-[opacity,transform] duration-500 ease-out',
                                    i === active ? 'scale-100 opacity-100' : 'scale-[1.015] opacity-0',
                                )}
                            />
                        ))}
                    </div>
                </div>

                {/* 手機與平板：說明放在截圖下方 */}
                <div key={current.key} className="mt-4 animate-rise-in lg:hidden">
                    <p className="font-semibold text-ink">{pick(current.title, language)}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">{pick(current.desc, language)}</p>
                </div>
            </div>
        </div>
    );
}
