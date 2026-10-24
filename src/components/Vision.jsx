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
            title: '以校園為根，用技術發聲',
            description: '我們捕捉靈感的火花，化為程式的語句，讓校園日常因它而閃耀新的光彩。我們敢於嘗試，親手創造，讓系統真正服務於師生的需求。在這裡，AI 與科技不再是遙遠的夢想，而是你我都能掌握的力量。',
        },
        en: {
            title: 'Rooted in Campus, Speaking through Code',
            description: 'We capture sparks of inspiration and shape them into lines of code, illuminating everyday campus life with new brilliance. We dare to try and create with our own hands, building systems that truly serve the needs of students and faculty. Here, AI and technology are no longer distant dreams, but real forces you and I can grasp to drive change.',
        },
    },
    {
        icon: AcademicCapIcon,
        color: '#fbbc04',
        zh: {
            title: '社群同心，淬鍊前行',
            description: '我們追求的不僅是技術的深度，更是思想交鋒激盪出的集體智慧。從 AI 應用到網頁開發，這裡是一個為熱愛技術的人而生的舞台。在這裡，你不是旁觀者，而是共創者；彼此啟發、互相成就，一同定義卓越，淬鍊出屬於我們的成長。',
        },
        en: {
            title: 'United in Community, Forged in Growth',
            description: 'What we seek is not only the depth of technology, but also the collective wisdom born from the clash of ideas. From AI applications to web development, this is a stage built for those who love to create with technology. Here, you are not a bystander, but a co-creator; through inspiration and collaboration, we define excellence together and forge our shared growth.',
        },
    },
    {
        icon: GlobeAltIcon,
        color: '#34a853',
        zh: {
            title: '放眼全球，開創新猷',
            description: '你的才華，值得被世界看見。我們為你搭起橋樑，連結 Google 與全球開發者的廣闊生態。無論你尋找的是一位指引的導師、一群志同道合的戰友，或是一個能證明自己的國際舞台，這裡，都是夢想啟程的起點。',
        },
        en: {
            title: 'Reaching the Globe, Creating New Roads',
            description: 'Your talent deserves to be seen by the world. We build bridges that connect you to Google and the global community of developers. Whether you seek the guidance of a mentor, a team of like-minded partners, or an international stage to prove yourself—this is where your journey begins.',
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
                    title={zh ? '我們的願景' : 'Our Vision'}
                    lead={
                        zh
                            ? '我們因改變而寫，為影響而生。讓程式碼不止於 GitHub，而是走進現實，化作真切的力量與迴響。'
                            : 'We code for change, and we live to create impact. Code is more than what resides on GitHub—it steps into reality, transforming into tangible power and lasting resonance.'
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
