'use client';

import { useRef, useEffect } from 'react';

/**
 * Hero 背景的程式碼雨。
 * 只在畫面內、分頁在前景時才跑動畫，捲走就停；減少動態效果時只畫出靜止的一幅。
 */
const MatrixBackground = ({ codeString }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!codeString) return undefined;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let animationFrameId = 0;
        let running = false;
        let visible = true;

        const styles = getComputedStyle(document.documentElement);
        const colors = {
            background: styles.getPropertyValue('--matrix-bg').trim(),
            head: styles.getPropertyValue('--matrix-head').trim(),
            brackets: styles.getPropertyValue('--matrix-brackets').trim(),
        };

        const codeChars = codeString.replace(/\s/g, '');
        const codeLength = codeChars.length;

        const fontSize = 14;
        const speed = 18;
        const columnWidth = fontSize + 4;

        let rainDrops = [];

        const setup = () => {
            canvas.width = canvas.offsetWidth || window.innerWidth;
            canvas.height = canvas.offsetHeight || window.innerHeight;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const columns = Math.floor(canvas.width / columnWidth);
            rainDrops = Array.from({ length: columns }).map(() => ({
                y: Math.random() * canvas.height,
                charIndex: Math.floor(Math.random() * codeLength),
            }));
        };

        const step = () => {
            ctx.fillStyle = colors.background;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = `${fontSize}px 'Roboto Mono', monospace`;

            for (let i = 0; i < rainDrops.length; i++) {
                const drop = rainDrops[i];
                const text = codeChars[drop.charIndex];
                ctx.fillStyle = '{}[]()'.includes(text) ? colors.brackets : colors.head;
                ctx.fillText(text, i * columnWidth, drop.y);

                if (drop.y > canvas.height && Math.random() > 0.98) {
                    drop.y = 0;
                    drop.charIndex = Math.floor(Math.random() * codeLength);
                } else {
                    drop.y += speed;
                }
                drop.charIndex = (drop.charIndex + 1) % codeLength;
            }
        };

        const loop = () => {
            step();
            animationFrameId = window.requestAnimationFrame(loop);
        };

        const start = () => {
            if (running || reduce || !visible || document.hidden) return;
            running = true;
            animationFrameId = window.requestAnimationFrame(loop);
        };

        const stop = () => {
            running = false;
            window.cancelAnimationFrame(animationFrameId);
        };

        // 靜止版：先跑一段讓畫面佈滿字，再停住
        const paintStill = () => {
            for (let i = 0; i < 60; i++) step();
        };

        setup();
        if (reduce) paintStill();
        else start();

        const observer = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible) start();
            else stop();
        });
        observer.observe(canvas);

        const onVisibility = () => (document.hidden ? stop() : start());
        const onResize = () => {
            setup();
            if (reduce) paintStill();
        };
        document.addEventListener('visibilitychange', onVisibility);
        window.addEventListener('resize', onResize);

        return () => {
            stop();
            observer.disconnect();
            document.removeEventListener('visibilitychange', onVisibility);
            window.removeEventListener('resize', onResize);
        };
    }, [codeString]);

    return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 z-0 h-full w-full" />;
};

export default MatrixBackground;
