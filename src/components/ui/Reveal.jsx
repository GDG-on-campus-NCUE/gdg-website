'use client';

import { useRef } from 'react';
import { useInView } from '@/hooks/useInView';
import { cx } from './Button';

/**
 * 進入視窗時淡入上移，只播一次（離開再回來不會重播，避免捲動時內容一直閃）。
 * 減少動態效果時 globals.css 會讓 .reveal 直接顯示。
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className, style, children, ...props }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    return (
        <Tag
            ref={ref}
            className={cx('reveal', inView && 'is-visible', className)}
            style={{ ...style, '--reveal-delay': `${delay}s` }}
            {...props}
        >
            {children}
        </Tag>
    );
}
