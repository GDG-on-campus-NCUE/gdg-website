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
            title: '工作流的協奏：編織數位自動化',
            description: '在這場實作中，我們深入探索了 n8n 工作流自動化的藝術。與會者學習了如何以視覺化的方式，將不同的應用程式與服務作為獨立的節點串連起來，建構出無需編寫程式碼的複雜自動化流程。這不僅是技術的教學，更是一場將抽象邏輯轉化為高效數位助理的創造之旅。',
        },
        {
            title: '提示的詩學：精煉與 AI 的對話之道',
            description: '與 AI 的溝通是一門精妙的技藝。本環節深度剖析了提示工程的核心，探討如何藉由精準的語境、清晰的指令與結構化的提問，引導大型語言模型進行深度對話。我們帶領與會者掌握了這把釋放 AI 潛能的鑰匙，體會到每一個精心設計的提示，如何成為驅動卓越產出的起點。',
        },
        {
            title: '思想的交匯：點燃創新的火花',
            description: '技術的革新從非獨行。這場活動不僅是單向的知識傳遞，更是思想的碰撞與交融。在此，一個人的疑問激發了一群人的靈感；一個人的專案成為了眾人協作的起點。我們共同點燃的，不僅是對技術的熱情，更是那份一同探索未知、定義未來的集體潛能。',
        },
    ],
    en: [
        {
            title: 'Flows in Formation: The Art of Automation',
            description: 'In this hands-on session, we delved into the art of n8n workflow automation. Attendees learned to visually orchestrate complex processes, connecting disparate applications and services as individual nodes without writing a single line of code. It was a journey of transforming abstract logic into efficient, tangible digital assistants.',
        },
        {
            title: "The Prompt's Precision: A Dialogue with AI's Vision",
            description: "Communicating with AI is a subtle art. This segment provided a deep dive into the core of Prompt Engineering, exploring how precise context, structured commands, and artful inquiry can guide Large Language Models into profound dialogues. We equipped attendees with the keys to unlocking AI's true potential, revealing how every well-crafted prompt becomes the catalyst for extraordinary output.",
        },
        {
            title: 'A Confluence of Minds: Where Insights Ignite',
            description: "Technological progress is never a solitary journey. This event was more than a transfer of knowledge; it was a vibrant collision of ideas. Here, a single question sparked inspiration in many, and one person's project became the starting point for collaboration. Together, we ignited not just a passion for technology, but the collective potential to explore the unknown and define the future.",
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
                            eyebrow={zh ? '回顧我們的「Build with AI 2025」' : 'Review of “Build with AI 2025”'}
                            title={
                                zh
                                    ? <>不只是一場活動，<br className="hidden md:block" />而是一場技術革命的開端。</>
                                    : <>Not just an event, <br className="hidden md:block" />but the dawn of a technical revolution.</>
                            }
                            lead={
                                zh
                                    ? '在這場活動中，我們將 AI 的力量注入校園，致力於消弭技術的鴻溝。我們引導了每位參與者，無論其背景，都能從零到一喚醒內在的 AI 原力。透過直觀的視覺化工作坊，與會者親手構築了能夠應對真實世界挑戰的客製化智能體，見證了創意如何透過自動化流程，綻放無限可能。'
                                    : 'This event was our commitment to infusing the campus with the power of AI, bridging the technological divide. We guided every participant, regardless of their background, on a journey from zero to one, igniting the spark of AI potential within them. Through an intuitive, visual workshop, attendees crafted bespoke intelligent agents capable of tackling real-world challenges, witnessing how creativity, channeled through automated workflows, could blossom into infinite possibilities.'
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
