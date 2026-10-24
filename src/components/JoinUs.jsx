'use client';

import Image from 'next/image';
import { ArrowRightIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/hooks/useLanguage';
import { buttonClass } from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import githubIcon from '@/images/icon/github.png';
import instagramIcon from '@/images/icon/instagram.png';
import lineIcon from '@/images/icon/line.png';
import gdgCommunityIcon from '@/images/icon/GDG_icon.png';

const COMMUNITY_URL = 'https://gdg.community.dev/gdg-on-campus-national-changhua-university-of-education-changhua-city-taiwan/';

const SOCIAL_LINKS = [
    { name: 'GitHub', icon: githubIcon, url: 'https://github.com/GDG-on-campus-NCUE', label: { zh: '探索專案', en: 'Explore repos' } },
    { name: 'Instagram', icon: instagramIcon, url: 'https://www.instagram.com/gdg_ncue', label: { zh: '追蹤我們', en: 'Follow us' } },
    { name: 'LINE', icon: lineIcon, url: 'https://line.me/R/ti/g/s4qeWSAWR9', label: { zh: '活動資訊', en: 'Event info' } },
    { name: 'GDG Official', icon: gdgCommunityIcon, url: COMMUNITY_URL, label: { zh: '社群主頁', en: 'Chapter page' } },
];

export default function JoinUs() {
    const { language } = useLanguage();
    const zh = language === 'zh';

    return (
        <section id="join" className="relative overflow-hidden border-t border-line py-20 md:py-32">
            <div aria-hidden="true" className="pointer-events-none absolute left-1/4 top-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/15 blur-[120px]" />

            <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-12 lg:gap-16">
                <Reveal className="lg:col-span-7">
                    <p className="flex items-center gap-3 text-sm font-semibold text-ink-muted">
                        <span aria-hidden="true" className="flex gap-1">
                            <span className="size-1.5 rounded-full bg-g-blue" />
                            <span className="size-1.5 rounded-full bg-g-red" />
                            <span className="size-1.5 rounded-full bg-g-yellow" />
                            <span className="size-1.5 rounded-full bg-g-green" />
                        </span>
                        <span className="font-mono text-xs tabular-nums text-ink-faint">05</span>
                        {zh ? '加入我們' : 'Join us'}
                    </p>
                    <h2 className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight text-ink md:text-7xl">
                        {zh ? '用程式碼' : 'Define the future'}
                        <span className="mt-2 block bg-gradient-to-r from-brand-soft to-brand bg-clip-text text-transparent">
                            {zh ? '定義彰師未來' : 'with your code'}
                        </span>
                    </h2>
                    <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-ink-muted md:text-xl">
                        {zh
                            ? '無論你的起點在哪，只要對技術懷抱熱情，渴望將想法付諸實踐，這裡就是你連結同好、共同成長的最佳社群。'
                            : 'Whether you are just starting or already an expert, if you are passionate about technology, this is the community to connect and grow.'}
                    </p>
                    <a href={COMMUNITY_URL} target="_blank" rel="noopener noreferrer" className={buttonClass('inverse', 'xl', 'group mt-10')}>
                        {zh ? '立即加入社群' : 'Join us now'}
                        <ArrowRightIcon className="size-5 transition-transform group-hover:translate-x-1" />
                    </a>
                </Reveal>

                <ul className="grid grid-cols-2 gap-4 md:gap-5 lg:col-span-5">
                    {SOCIAL_LINKS.map((social, idx) => (
                        <Reveal key={social.name} as="li" delay={0.1 + idx * 0.06} className={idx % 2 === 1 ? 'lg:translate-y-10' : ''}>
                            <a
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex h-full flex-col rounded-3xl border border-line bg-surface/70 p-5 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-1 hover:border-line-strong hover:bg-surface md:p-7"
                            >
                                <span className="flex items-start justify-between">
                                    <span className="flex size-12 items-center justify-center rounded-2xl bg-white p-2.5 md:size-14">
                                        <Image src={social.icon} alt="" width={36} height={36} className="h-auto w-full object-contain" />
                                    </span>
                                    <ArrowUpRightIcon className="size-4 text-ink-faint transition-colors group-hover:text-ink" />
                                </span>
                                <span className="mt-6 block text-base font-bold text-ink">{social.name}</span>
                                <span className="mt-0.5 block text-sm text-ink-muted">{social.label[language] ?? social.label.zh}</span>
                            </a>
                        </Reveal>
                    ))}
                </ul>
            </div>
        </section>
    );
}
