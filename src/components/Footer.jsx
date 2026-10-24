'use client';

import Link from 'next/link';
import Image from 'next/image';
import { EnvelopeIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/hooks/useLanguage';
import gdgLogoDark from '@/images/icon/GDG_On_Campus_dark.png';

const CONTACT = 'gdg-core@ncuesa.org.tw';

// 夥伴 logo 一律以單色白呈現：原檔有深色字（BlendED）也有白色版（學生會），統一後在深底上都看得清楚
const PARTNERS = [
    { src: '/Google.png', alt: 'Google', href: 'https://google.com', width: 1200, height: 406, className: 'h-7' },
    { src: '/BlendED.png', alt: 'BlendED', href: 'https://program.blendedlearn.org', width: 344, height: 80, className: 'h-6' },
    { src: '/partners/sa-white.webp', alt: '國立彰化師範大學學生會', href: 'https://ncuesa.ncue.edu.tw/', width: 480, height: 119, className: 'h-10' },
    { name: 'OpenTPI', href: 'https://tpi.dev/' },
];

export default function Footer() {
    const { language } = useLanguage();
    const zh = language === 'zh';

    // 小標：英文全大寫加字距；中文不加，字距拉開會讓中文一字一字散開
    const headingClass = zh ? 'text-xs font-semibold text-ink-faint' : 'text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint';

    const columns = [
        {
            title: zh ? '社群資源' : 'Resources',
            links: [
                { label: zh ? '關於我們' : 'About us', href: '/#vision' },
                { label: zh ? '活動回顧' : 'Past events', href: '/#events' },
                { label: zh ? '校園專案' : 'Projects', href: '/#projects' },
                { label: zh ? '社群行程' : 'Schedule', href: '/#calendar' },
            ],
        },
        {
            title: zh ? '網站管理' : 'Management',
            links: [{ label: zh ? '管理員後台登入' : 'Admin portal', href: '/admin/login' }],
        },
    ];

    return (
        <footer className="border-t border-line bg-bg-sunken/60">
            <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 md:px-8 md:pt-20">
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
                    {/* 品牌 */}
                    <div className="lg:col-span-5">
                        <Image src={gdgLogoDark} alt="GDG On Campus NCUE" width={1920} height={390} className="h-12 w-auto object-contain md:h-14" />
                        <p className="mt-6 max-w-sm text-pretty leading-relaxed text-ink-muted">
                            {zh
                                ? '國立彰化師範大學的 Google 開發者社群。我們舉辦技術活動、開發校園系統，連結在地開發者，一起用技術創造影響力。'
                                : 'The Google Developer Group at National Changhua University of Education. We run tech events, build campus systems and connect local developers to make a real impact with technology.'}
                        </p>
                        <a href={`mailto:${CONTACT}`} className="group mt-6 inline-flex items-center gap-3 rounded-full text-sm font-semibold text-ink transition-colors hover:text-brand-soft">
                            <span className="flex size-10 items-center justify-center rounded-full border border-line bg-surface transition-colors group-hover:border-brand/50">
                                <EnvelopeIcon className="size-[18px]" />
                            </span>
                            {CONTACT}
                        </a>
                    </div>

                    {/* 連結 */}
                    <nav aria-label={zh ? '頁尾導覽' : 'Footer'} className="grid grid-cols-2 gap-8 lg:col-span-3 lg:grid-cols-1">
                        {columns.map((column) => (
                            <div key={column.title}>
                                <h3 className={headingClass}>{column.title}</h3>
                                <ul className="mt-4 grid gap-3">
                                    {column.links.map((link) => (
                                        <li key={link.href}>
                                            <Link href={link.href} className="text-sm font-medium text-ink-muted transition-colors hover:text-ink">
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>

                    {/* 合作夥伴 */}
                    <div className="lg:col-span-4">
                        <h3 className={headingClass}>{zh ? '我們的夥伴' : 'Our partners'}</h3>
                        <ul className="mt-4 grid grid-cols-2 gap-3">
                            {PARTNERS.map((partner) => (
                                <li key={partner.href}>
                                    <a
                                        href={partner.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={partner.alt ?? partner.name}
                                        className="group flex h-20 items-center justify-center rounded-2xl border border-line bg-surface/70 px-4 transition-colors hover:border-line-strong hover:bg-surface"
                                    >
                                        {partner.src ? (
                                            <Image
                                                src={partner.src}
                                                alt={partner.alt}
                                                width={partner.width}
                                                height={partner.height}
                                                className={`${partner.className} w-auto max-w-full object-contain opacity-75 brightness-0 invert transition-opacity group-hover:opacity-100`}
                                            />
                                        ) : (
                                            <span className="text-xl font-black tracking-tighter text-white opacity-75 transition-opacity group-hover:opacity-100">{partner.name}</span>
                                        )}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-center text-xs text-ink-faint md:flex-row md:text-left">
                    <p>© {new Date().getFullYear()} GDG On Campus NCUE. All rights reserved.</p>
                    {/* AI 輔助建置聲明：刻意只用英文，中英文介面都顯示同一句 */}
                    <p lang="en" className="max-w-xl text-balance md:text-right">
                        <SparklesIcon aria-hidden="true" className="mr-1.5 inline size-3.5 align-[-0.2em] text-brand-soft" />
                        This website was designed and developed with AI assistance. All content has been reviewed by the GDG On Campus NCUE team.
                    </p>
                </div>
            </div>
        </footer>
    );
}
