'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRightIcon, ChevronLeftIcon, ChevronRightIcon, PlayIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/hooks/useLanguage';
import { useInView, usePrefersReducedMotion } from '@/hooks/useInView';
import { buttonClass, cx } from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import SectionHeader from '@/components/ui/SectionHeader';
import event_img_1 from '@/images/events/1.webp';
import event_img_2 from '@/images/events/2.webp';
import event_img_3 from '@/images/events/3.webp';
import event_img_4 from '@/images/events/4.webp';
import event_img_5 from '@/images/events/5.webp';
import event_img_6 from '@/images/events/6.webp';

const EVENT_IMAGES = [event_img_1, event_img_2, event_img_3, event_img_4, event_img_5, event_img_6];

const SLIDES_EMBED = 'https://www.slideshare.net/slideshow/embed_code/key/1QT8eizVmSnyWg?startSlide=1';
const SLIDES_URL = 'https://www.slideshare.net/slideshow/demystifying-ai-from-core-concepts-to-practical-workflows-with-n8n-e67e/279081313';
const SLIDES_TITLE = 'Demystifying AI: From Core Concepts to Practical Workflows with n8n';

const HIGHLIGHTS = {
    zh: [
        {
            title: 'n8n 自動化：不寫程式也能串起工作流程',
            description: '我們用 n8n 示範如何把不同的應用程式和服務當成節點串起來，用拖拉的方式建立自動化流程。與會者把抽象的流程邏輯，實際做成能幫自己處理事情的數位助理。',
        },
        {
            title: '提示工程：讓 AI 給出你要的答案',
            description: '提示寫得好不好，直接決定 AI 的輸出品質。我們拆解提示工程的核心技巧：給足語境、下清楚的指令、用結構化的方式提問，讓大型語言模型穩定產出好結果。',
        },
        {
            title: '交流與合作：一個問題，帶出更多想法',
            description: '這不是一場單向的講座。現場的提問與討論帶出更多靈感，有人分享的專案也成了大家合作的起點。我們相信，技術在交流中才走得更遠。',
        },
    ],
    en: [
        {
            title: 'n8n automation: build workflows without writing code',
            description: 'Using n8n, we showed how to connect apps and services as nodes and build automations by drag and drop. Attendees turned abstract process logic into digital assistants that handle real work.',
        },
        {
            title: 'Prompt engineering: get the answers you actually want',
            description: 'The quality of a prompt decides the quality of the output. We broke down the core techniques: give enough context, write clear instructions and structure your questions, so large language models deliver consistently good results.',
        },
        {
            title: 'Exchange and collaboration: one question sparks many ideas',
            description: 'This was not a one-way lecture. Questions and discussion on site sparked new ideas, and projects people shared became starting points for collaboration. We believe tech goes further when people build it together.',
        },
    ],
};

/** 活動照片輪播：交叉淡入，在畫面內且滑鼠沒停在上面時才自動換張 */
function PhotoCarousel({ language }) {
    const root = useRef(null);
    const [current, setCurrent] = useState(0);
    const [hovered, setHovered] = useState(false);
    const inView = useInView(root, { threshold: 0.3 });
    const reduce = usePrefersReducedMotion();
    const count = EVENT_IMAGES.length;
    const zh = language === 'zh';

    useEffect(() => {
        if (!inView || hovered || reduce) return undefined;
        const timer = setTimeout(() => {
            if (!document.hidden) setCurrent((prev) => (prev + 1) % count);
        }, 4500);
        return () => clearTimeout(timer);
    }, [inView, hovered, reduce, current, count]);

    const go = (delta) => setCurrent((prev) => (prev + delta + count) % count);

    return (
        <div
            ref={root}
            className="group relative aspect-[16/10] overflow-hidden rounded-3xl border border-line bg-bg-sunken"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            aria-roledescription="carousel"
            aria-label={zh ? 'Build with AI 2025 活動照片' : 'Build with AI 2025 photos'}
        >
            {EVENT_IMAGES.map((src, index) => (
                <Image
                    key={src.src}
                    src={src}
                    alt={`Build with AI 2025 — ${index + 1} / ${count}`}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    priority={index === 0}
                    aria-hidden={index !== current}
                    className={cx(
                        'object-cover transition-[opacity,transform] duration-700 ease-out',
                        index === current ? 'scale-100 opacity-100' : 'scale-[1.03] opacity-0',
                    )}
                />
            ))}
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />

            <button
                type="button"
                onClick={() => go(-1)}
                aria-label={zh ? '上一張' : 'Previous photo'}
                className={buttonClass('overlay', 'iconMd', 'absolute left-3 top-1/2 -translate-y-1/2 md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100')}
            >
                <ChevronLeftIcon className="size-5" />
            </button>
            <button
                type="button"
                onClick={() => go(1)}
                aria-label={zh ? '下一張' : 'Next photo'}
                className={buttonClass('overlay', 'iconMd', 'absolute right-3 top-1/2 -translate-y-1/2 md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100')}
            >
                <ChevronRightIcon className="size-5" />
            </button>

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1">
                {EVENT_IMAGES.map((src, index) => (
                    <button
                        key={src.src}
                        type="button"
                        onClick={() => setCurrent(index)}
                        aria-label={zh ? `第 ${index + 1} 張` : `Photo ${index + 1}`}
                        aria-current={index === current ? 'true' : undefined}
                        className="flex h-6 items-center px-1"
                    >
                        <span className={cx('h-1.5 rounded-full transition-all duration-300', index === current ? 'w-6 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80')} />
                    </button>
                ))}
            </div>
        </div>
    );
}

/**
 * 簡報：先放一張封面，點了才載入 SlideShare。
 * SlideShare 的嵌入頁連同同意視窗腳本約 2 MB，就算 loading="lazy" 也會因為離首屏近而提早載入。
 */
function SlidesEmbed({ language }) {
    const [loaded, setLoaded] = useState(false);
    const zh = language === 'zh';

    if (loaded) {
        return (
            <div className="aspect-[16/11] w-full bg-white">
                <iframe src={SLIDES_EMBED} title={SLIDES_TITLE} className="h-full w-full" allowFullScreen />
            </div>
        );
    }

    return (
        <button
            type="button"
            onClick={() => setLoaded(true)}
            className="group relative flex aspect-[16/11] w-full flex-col justify-between overflow-hidden bg-raised p-6 text-left md:p-8"
        >
            <span aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-brand/15 blur-3xl" />
            <span className="relative flex gap-1" aria-hidden="true">
                <span className="size-2 rounded-full bg-g-blue" />
                <span className="size-2 rounded-full bg-g-red" />
                <span className="size-2 rounded-full bg-g-yellow" />
                <span className="size-2 rounded-full bg-g-green" />
            </span>
            <span className="relative">
                <span className="block text-sm text-ink-muted">Build with AI 2025 · {zh ? '講者簡報' : 'Talk slides'}</span>
                <span className="mt-2 block text-balance text-2xl font-bold leading-snug text-ink md:text-3xl">{SLIDES_TITLE}</span>
                <span className="mt-2 block text-sm text-ink-faint">Presenter: Tai Ming Chen, CSIE, NCUE</span>
            </span>
            <span className={buttonClass('secondary', 'md', 'relative w-fit group-hover:border-ink-faint group-hover:bg-surface')}>
                <PlayIcon className="size-4" />
                {zh ? '在這裡瀏覽簡報' : 'View slides here'}
            </span>
        </button>
    );
}

export default function Events() {
    const { language } = useLanguage();
    const zh = language === 'zh';
    const highlights = HIGHLIGHTS[language] ?? HIGHLIGHTS.zh;

    return (
        <section id="events" className="border-t border-line py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-5 md:px-8">
                <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* 左：照片與簡報 */}
                    <div className="grid gap-5 lg:sticky lg:top-28">
                        <Reveal>
                            <PhotoCarousel language={language} />
                        </Reveal>
                        <Reveal delay={0.1} className="overflow-hidden rounded-3xl border border-line bg-surface">
                            <SlidesEmbed language={language} />
                            <a
                                href={SLIDES_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-ink transition-colors hover:bg-raised"
                            >
                                <span className="min-w-0">
                                    <span className="block text-xs font-normal text-ink-faint">{zh ? '活動簡報' : 'Slides'}</span>
                                    <span className="block truncate">{SLIDES_TITLE}</span>
                                </span>
                                <ArrowUpRightIcon className="size-4 shrink-0 text-ink-muted" />
                            </a>
                        </Reveal>
                    </div>

                    {/* 右：內容 */}
                    <div>
                        <SectionHeader
                            index="02"
                            eyebrow={zh ? '活動回顧 · Build with AI 2025' : 'Event recap · Build with AI 2025'}
                            title={
                                zh
                                    ? '零基礎，也能親手打造自己的 AI 助理'
                                    : 'Build your own AI agent, even from zero'
                            }
                            lead={
                                zh
                                    ? 'Build with AI 2025 是我們把 AI 帶進校園的實作活動。不論你是什麼背景，我們都從基礎帶起：透過視覺化的工作流程工具，每位參加者都親手做出能處理真實任務的客製化 AI 助理，看見點子怎麼透過自動化變成成果。'
                                    : 'Build with AI 2025 brought hands-on AI to campus. Whatever your background, we started from the basics: using a visual workflow tool, every attendee built a custom AI agent that handles real tasks, and saw how an idea becomes a result through automation.'
                            }
                        />

                        <ol className="mt-10 grid gap-4">
                            {highlights.map((highlight, index) => (
                                <Reveal
                                    key={highlight.title}
                                    as="li"
                                    delay={index * 0.08}
                                    className="group rounded-3xl border border-line bg-surface/70 p-6 transition-colors duration-300 hover:border-brand/40 hover:bg-surface md:p-7"
                                >
                                    <div className="flex items-baseline gap-4">
                                        <span className="font-mono text-sm tabular-nums text-brand-soft">{String(index + 1).padStart(2, '0')}</span>
                                        <div>
                                            <h3 className="text-lg font-bold leading-snug text-ink">{highlight.title}</h3>
                                            <p className="mt-2 text-pretty leading-relaxed text-ink-muted">{highlight.description}</p>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    );
}
