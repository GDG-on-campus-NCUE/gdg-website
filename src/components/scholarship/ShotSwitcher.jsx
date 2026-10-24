'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { cx } from '@/components/ui/Button';
import { useInView, usePrefersReducedMotion } from '@/hooks/useInView';
import { pick } from '@/content/scholarship';

/**
 * 重點設計區塊的截圖：
 * - 兩三張手機截圖直接並排，一次看完；
 * - 其他情況一次一張，捲進視窗後每幾秒換下一張，圖下的細進度條標示第幾張、還有多久換。
 * 分頁在背景、區塊捲出視窗或開啟減少動態效果時不自動換；點進度條可直接跳到該張。
 */
export default function ShotSwitcher({ shots, language, intervalMs = 4000 }) {
    const root = useRef(null);
    const [active, setActive] = useState(0);
    const inView = useInView(root, { threshold: 0.4 });
    const reduce = usePrefersReducedMotion();
    const phones = shots.every((shot) => shot.frame === 'phone');
    const sideBySide = phones && shots.length >= 2 && shots.length <= 3;
    const rotating = shots.length > 1 && !sideBySide;
    const running = rotating && inView && !reduce;

    useEffect(() => {
        if (!running) return undefined;
        const timer = setInterval(() => {
            if (!document.hidden) setActive((a) => (a + 1) % shots.length);
        }, intervalMs);
        return () => clearInterval(timer);
    }, [running, intervalMs, shots.length, active]);

    if (sideBySide) {
        return (
            <div ref={root} className="flex items-start justify-center gap-3 sm:gap-5">
                {shots.map((shot) => (
                    <figure key={shot.src} className="w-full max-w-[13.5rem] overflow-hidden rounded-[1.4rem] border-[3px] border-[#3c4043] bg-bg-sunken shadow-2xl shadow-black/40">
                        <Image
                            src={shot.src}
                            alt={pick(shot.alt, language)}
                            width={shot.width}
                            height={shot.height}
                            sizes="(min-width: 1024px) 14rem, 30vw"
                            className="h-auto w-full"
                        />
                    </figure>
                ))}
            </div>
        );
    }

    const selected = shots[active] ?? shots[0];

    return (
        <div ref={root}>
            <div className="relative overflow-hidden rounded-2xl border border-line bg-bg-sunken shadow-2xl shadow-black/40">
                {/* key 讓換圖時換一個新的 img，不會先看到舊圖被拉成新圖的比例 */}
                <Image
                    key={selected.src}
                    src={selected.src}
                    alt={pick(selected.alt, language)}
                    width={selected.width}
                    height={selected.height}
                    sizes="(min-width: 1024px) 55vw, 90vw"
                    className="h-auto w-full animate-fade-in"
                />
            </div>

            {rotating && (
                <div className="mt-4 flex gap-1.5">
                    {shots.map((shot, i) => (
                        <button
                            key={shot.src}
                            type="button"
                            onClick={() => setActive(i)}
                            aria-label={`${i + 1} / ${shots.length}`}
                            aria-current={i === active ? 'true' : undefined}
                            className="group relative h-4 flex-1"
                        >
                            <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-line group-hover:bg-line-strong">
                                {i < active && <span className="absolute inset-0 bg-ink-faint" />}
                                {i === active && (
                                    <span
                                        key={`${active}-${running}`}
                                        className={cx('absolute inset-0 bg-brand', running && 'tour-progress')}
                                        style={running ? { animationDuration: `${intervalMs}ms` } : undefined}
                                    />
                                )}
                            </span>
                        </button>
                    ))}
                </div>
            )}

            <p className="mt-3 text-sm leading-relaxed text-ink-faint">{pick(selected.alt, language)}</p>
        </div>
    );
}
