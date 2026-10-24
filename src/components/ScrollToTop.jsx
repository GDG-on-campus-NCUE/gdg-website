'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/hooks/useLanguage';
import { cx } from '@/components/ui/Button';

// 捲過 Hero 的 60% 才出現；在頁首時「回到頂端」沒有意義
const SHOW_AFTER_RATIO = 0.6;
const MOBILE_BREAKPOINT = 768;

/**
 * 右下角的回到頂端按鈕，外圈是閱讀進度環。
 * 外觀與懸浮導覽列同一套（毛玻璃圓形、細邊框）；進度環用 CSS mask 畫連續的 Google 四色漸層
 * （見 globals.css 的 .progress-ring），進度直接寫進 CSS 變數，捲動時不觸發 React 重新渲染。
 * 手機和導覽列一樣：往下捲收起、往上捲出現，避免一直蓋住內文。
 */
export default function ScrollToTop() {
    const { language } = useLanguage();
    const ringRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let lastY = window.scrollY;
        let frame = 0;

        const update = () => {
            frame = 0;
            const y = window.scrollY;
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
            ringRef.current?.style.setProperty('--progress', progress.toFixed(4));

            const pastHero = y > window.innerHeight * SHOW_AFTER_RATIO;
            const dy = y - lastY;
            if (!pastHero) {
                setVisible(false);
            } else if (window.innerWidth >= MOBILE_BREAKPOINT) {
                setVisible(true);
            } else if (dy > 4) {
                setVisible(false);
            } else if (dy < -4) {
                setVisible(true);
            }
            lastY = y;
        };

        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);

    const label = language === 'zh' ? '回到頂端' : 'Back to top';

    return (
        <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label={label}
            title={label}
            tabIndex={visible ? 0 : -1}
            aria-hidden={!visible}
            className={cx(
                'group fixed right-4 z-30 flex size-11 items-center justify-center rounded-full md:right-6 md:size-12',
                'bottom-[max(1rem,env(safe-area-inset-bottom))] md:bottom-6',
                'border border-white/10 bg-surface/75 text-ink shadow-xl shadow-black/40 backdrop-blur-xl',
                'transition-[opacity,translate,scale,background-color] duration-300 ease-out hover:bg-raised',
                'outline-none focus-visible:ring-2 focus-visible:ring-brand-soft focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
                visible ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-3 scale-90 opacity-0',
            )}
        >
            {/* 軌道：極淡的整圈，讓進度有參照 */}
            <span aria-hidden="true" className="absolute inset-[3px] rounded-full border-[2.5px] border-white/[0.07]" />
            {/* 進度：Google 四色連續漸層 */}
            <span ref={ringRef} aria-hidden="true" className="progress-ring absolute inset-[3px] rounded-full" />
            <ArrowUpIcon className="relative size-[18px] stroke-2 transition-transform duration-200 group-hover:-translate-y-0.5 md:size-5" />
        </button>
    );
}
