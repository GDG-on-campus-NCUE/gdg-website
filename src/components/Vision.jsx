'use client';

import { AcademicCapIcon, CodeBracketSquareIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/hooks/useLanguage';
import Reveal from '@/components/ui/Reveal';
import SectionHeader from '@/components/ui/SectionHeader';

// 三張卡片各用一個 Google 品牌色：紅、黃、綠
const CARDS = [
    {
        icon: CodeBracketSquareIcon,
        color: '#ea4335',
        zh: {
            title: '從校園出發，解決真實問題',
            description: '我們從身邊的需求做起：查獎學金、學生會選舉、行政流程。親手打造師生每天用得到的系統，讓 AI 和新技術不再只是課本上的名詞，而是你手上的工具。',
        },
        en: {
            title: 'Start on campus, solve real problems',
            description: 'We start with the needs around us: finding scholarships, running student elections, simplifying paperwork. We build systems students and staff use every day, so AI and new tech become tools in your hands, not just terms in a textbook.',
        },
    },
    {
        icon: AcademicCapIcon,
        color: '#fbbc04',
        zh: {
            title: '一起學，成長得更快',
            description: '從 AI 應用到網頁開發，我們辦工作坊、技術分享，也一起做專案。你不只是來聽講，而是動手參與、和夥伴交流，在合作中快速累積實力。',
        },
        en: {
            title: 'Learn together, grow faster',
            description: 'From AI applications to web development, we run workshops and tech talks and build projects together. You will not just sit and listen: you will build, share and level up alongside people who care as much as you do.',
        },
    },
    {
        icon: GlobeAltIcon,
        color: '#34a853',
        zh: {
            title: '連結 Google 與全球開發者',
            description: '透過 Google Developer Groups 的全球網絡，你能認識業界導師、找到志同道合的夥伴，也有機會站上國際舞台，讓更多人看見你的作品。',
        },
        en: {
            title: 'Connect with Google and developers worldwide',
            description: 'Through the global Google Developer Groups network, you will meet industry mentors, find teammates who share your drive, and get a stage to show the world what you can build.',
        },
    },
];

export default function Vision() {
    const { language } = useLanguage();
    const zh = language === 'zh';

    return (
        <section id="vision" className="py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-5 md:px-8">
                <SectionHeader
                    index="01"
                    eyebrow={zh ? '社群願景' : 'Our vision'}
                    title={zh ? '寫程式，是為了解決真實的問題' : 'We write code to solve real problems'}
                    lead={
                        zh
                            ? '程式碼不該只停留在 GitHub。我們在意的是兩件事：它有沒有讓校園生活變得更好，有沒有讓你變得更強。'
                            : 'Code should not just sit on GitHub. We care about two things: does it make campus life better, and does it make you better.'
                    }
                />

                <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-3 md:gap-6">
                    {CARDS.map((card, index) => {
                        const Icon = card.icon;
                        const copy = card[language] ?? card.zh;
                        return (
                            <Reveal
                                key={card.color}
                                as="article"
                                delay={index * 0.1}
                                style={{ '--accent': card.color }}
                                className="group relative overflow-hidden rounded-3xl border border-line bg-surface/70 p-6 transition-[border-color,transform,background-color] duration-300 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--accent)_55%,transparent)] hover:bg-surface md:p-8"
                            >
                                {/* 卡片頂端的品牌色光暈，滑過時變亮 */}
                                <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full opacity-[0.12] blur-3xl transition-opacity duration-300 group-hover:opacity-25"
                                    style={{ background: card.color }}
                                />
                                <span
                                    className="relative flex size-12 items-center justify-center rounded-2xl"
                                    style={{ background: `color-mix(in srgb, ${card.color} 14%, transparent)`, color: card.color }}
                                >
                                    <Icon className="size-6" />
                                </span>
                                <h3 className="relative mt-6 text-xl font-bold leading-snug tracking-tight text-ink md:text-2xl">{copy.title}</h3>
                                <p className="relative mt-4 text-pretty leading-relaxed text-ink-muted">{copy.description}</p>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
