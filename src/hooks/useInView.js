'use client';

import { useEffect, useState } from 'react';

/**
 * 元素是否在視窗內。once 為 true 時進來一次就不再變回 false（進場動畫用）；
 * 為 false 時會跟著進出更新（輪播、動畫在畫面外暫停用）。
 */
export function useInView(ref, { once = false, threshold = 0.2, rootMargin = '0px' } = {}) {
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return undefined;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    if (once) observer.disconnect();
                } else if (!once) {
                    setInView(false);
                }
            },
            { threshold, rootMargin },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [ref, once, threshold, rootMargin]);

    return inView;
}

/** 使用者是否開啟「減少動態效果」 */
export function usePrefersReducedMotion() {
    const [reduce, setReduce] = useState(false);

    useEffect(() => {
        const query = window.matchMedia('(prefers-reduced-motion: reduce)');
        const sync = () => setReduce(query.matches);
        sync();
        query.addEventListener('change', sync);
        return () => query.removeEventListener('change', sync);
    }, []);

    return reduce;
}
