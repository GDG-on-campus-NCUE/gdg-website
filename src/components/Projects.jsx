'use client';

import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/hooks/useLanguage';
import { buttonClass } from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import SectionHeader from '@/components/ui/SectionHeader';
import TechIcon from '@/components/ui/TechIcon';
import ScholarshipShowcase from './ScholarshipShowcase';

const GITHUB_ORG = 'https://github.com/GDG-on-campus-NCUE';

// 精選的獎助學金平台內容在 src/content/scholarship.js；這裡是其他校園專案
const projectData = {
    zh: [
        {
            status: '已上線',
            title: '學生會投票系統',
            description: [
                {
                    title: '彰師單一登入(SSO)驗證',
                    content: '對接彰師標準授權介面進行資格審查。系統僅獲取必要的投票權限聲明，全程不經手且不儲存您的登入憑據，確保個人身分資訊受技術與法律雙重保障。',
                },
                {
                    title: '隱私保護金鑰與零知識證明生成',
                    content: '在您的本地終端生成專屬加密金鑰。基於零知識證明(Zero-Knowledge Proof)技術，您可在不揭露真實身分的前提下，向系統證明合法的投票權，實現絕對匿名與抗關聯性。',
                },
                {
                    title: '端對端加密投票與分散式存證',
                    content: '選票經由高強度非對稱加密函數加密。一旦完成提交，內容即具備不可篡改性與公開可稽核性，確保選舉過程絕對公正、透明。',
                },
            ],
            link: 'https://sa-election.ncue.edu.tw/',
            repo: 'https://github.com/GDG-on-campus-NCUE/NCUE-SAVote',
            tags: ['電子投票', '零知識證明', '資訊安全'],
        },
        {
            status: '已上線',
            title: '代管生輔組 RPage 網站',
            description: '我們接手並優化了學務處生活輔導組的網站頁面，確保資訊能夠更精準地被傳達，為全校師生提供更良好的網站瀏覽體驗。',
            link: 'https://stuaffweb.ncue.edu.tw/p/412-1039-4293.php',
            tags: ['資訊整合', 'UI 優化'],
        },
        {
            status: '已上線',
            title: '生輔組餐券管理系統',
            description: '透過 Google Apps Script 連動 Google Forms、Google Docs、Google Sheets 建立一套電子餐券系統，除了簡化學生端申請流程之外，更提供後台餐券追蹤、數據分析等多項管理員友善功能！',
            link: 'https://stuaffweb.ncue.edu.tw/p/412-1039-4345.php',
            tags: ['流程數位化', '數據分析'],
        },
        {
            status: '已上線',
            title: '生輔組失物招領系統',
            description: '透過 API 連結 Google Forms 與 Google Sheets，提供一個線上登錄與搜尋失物的平台，協助學生快速找回遺失物品。',
            link: 'https://stuaffweb.ncue.edu.tw/p/412-1039-4292.php',
            tags: ['流程數位化', '行政效率'],
        },
    ],
    en: [
        {
            status: 'Launched',
            title: 'Student Association Voting System',
            description: [
                {
                    title: 'NCUE SSO Authentication',
                    content: 'Qualification review via standard NCUE authorization. The system only obtains necessary voting rights claims, never handles or stores login credentials, ensuring identity info is legally and technically protected.',
                },
                {
                    title: 'Privacy Keys & ZKP Generation',
                    content: 'Generates exclusive encryption keys locally. Using Zero-Knowledge Proof (ZKP), users prove legal voting rights without revealing identity, achieving absolute anonymity and anti-correlation.',
                },
                {
                    title: 'E2E Encryption & Distributed Evidence',
                    content: 'Ballots are encrypted with high-strength asymmetric functions. Once submitted, content is immutable and publicly auditable, ensuring a fair and transparent election process.',
                },
            ],
            link: 'https://sa-election.ncue.edu.tw/',
            repo: 'https://github.com/GDG-on-campus-NCUE/NCUE-SAVote',
            tags: ['E-Voting', 'ZKP', 'Information Security'],
        },
        {
            status: 'Launched',
            title: 'Student Affairs RPage Site',
            description: 'We took over and optimized the Student Affairs Division website to ensure information is delivered accurately and to provide a better browsing experience for the campus community.',
            link: 'https://stuaffweb.ncue.edu.tw/p/412-1039-4293.php',
            tags: ['Information Integration', 'UI Optimization'],
        },
        {
            status: 'Launched',
            title: 'Meal Voucher Management System',
            description: 'Uses Google Apps Script to integrate Google Forms, Docs, and Sheets into an electronic meal voucher system that streamlines student applications and provides administrators with voucher tracking and data analysis.',
            link: 'https://stuaffweb.ncue.edu.tw/p/412-1039-4345.php',
            tags: ['Workflow Digitalization', 'Data Analysis'],
        },
        {
            status: 'Launched',
            title: 'Student Affairs Lost and Found System',
            description: 'Connects Google Forms and Sheets through APIs to provide an online platform for registering and searching lost items, helping students quickly recover their belongings.',
            link: 'https://stuaffweb.ncue.edu.tw/p/412-1039-4292.php',
            tags: ['Workflow Digitalization', 'Administrative Efficiency'],
        },
    ],
};

const STATUS_TONES = {
    已上線: 'bg-emerald-500/10 text-success ring-emerald-500/25',
    Launched: 'bg-emerald-500/10 text-success ring-emerald-500/25',
    開發中: 'bg-amber-500/10 text-warning ring-amber-500/25',
    'In Development': 'bg-amber-500/10 text-warning ring-amber-500/25',
};

function ProjectCard({ project, language, delay }) {
    const tone = STATUS_TONES[project.status] ?? 'bg-white/5 text-ink-muted ring-line';
    return (
        <Reveal
            as="article"
            delay={delay}
            className="group relative flex h-full flex-col rounded-3xl border border-line bg-surface/70 p-6 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-1 hover:border-line-strong hover:bg-surface md:p-8"
        >
            <div className="flex items-start justify-between gap-4">
                <h4 className="text-xl font-bold leading-snug tracking-tight text-ink md:text-2xl">{project.title}</h4>
                <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${tone}`}>
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
                    {project.status}
                </span>
            </div>

            <div className="mt-5 flex-1">
                {Array.isArray(project.description) ? (
                    <dl className="grid gap-4">
                        {project.description.map((item) => (
                            <div key={item.title} className="border-l-2 border-brand/40 pl-4">
                                <dt className="text-sm font-semibold text-ink md:text-[15px]">{item.title}</dt>
                                <dd className="mt-1 text-sm leading-relaxed text-ink-muted">{item.content}</dd>
                            </div>
                        ))}
                    </dl>
                ) : (
                    <p className="leading-relaxed text-ink-muted">{project.description}</p>
                )}
            </div>

            <ul className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                    <li key={tag} className="rounded-full bg-white/[0.05] px-2.5 py-1 text-xs font-medium text-ink-muted">
                        #{tag}
                    </li>
                ))}
            </ul>

            <div className="mt-6 flex items-center gap-2 border-t border-line pt-5">
                {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className={buttonClass('primary', 'md', 'flex-1')}>
                        {language === 'zh' ? '前往專案' : 'Visit project'}
                        <ArrowUpRightIcon className="size-4" />
                    </a>
                )}
                {project.repo && (
                    <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={language === 'zh' ? `${project.title} 的原始碼` : `Source code of ${project.title}`}
                        title={language === 'zh' ? '原始碼' : 'Source code'}
                        className={buttonClass('secondary', 'iconMd')}
                    >
                        <TechIcon name="GitHub" className="size-[18px]" />
                    </a>
                )}
            </div>
        </Reveal>
    );
}

export default function Projects() {
    const { language } = useLanguage();
    const projects = projectData[language] ?? projectData.zh;

    return (
        <section id="projects" className="border-t border-line py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-5 md:px-8">
                <SectionHeader
                    index="03"
                    eyebrow={language === 'zh' ? '校園專案' : 'Campus projects'}
                    title={language === 'zh' ? '你的程式碼，在校園日常迴響' : 'Your code, echoing through campus life'}
                    lead={
                        language === 'zh'
                            ? '我們不只打造酷炫的專案，更構築支撐校園運作的數位基石。從獎助學金資訊平台到校園網站，這些系統安靜地在背景運行，成為每位同學都能依賴的力量。'
                            : 'We don’t just build flashy projects; we lay the digital groundwork campus runs on. From the scholarship platform to campus websites, these systems run quietly in the background for every student to rely on.'
                    }
                />

                <div className="mt-12 md:mt-16">
                    <ScholarshipShowcase />
                </div>

                <div className="mt-20 md:mt-28">
                    <Reveal className="flex flex-wrap items-end justify-between gap-4">
                        <h3 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">
                            {language === 'zh' ? '更多校園專案' : 'More campus projects'}
                        </h3>
                        <a href={GITHUB_ORG} target="_blank" rel="noopener noreferrer" className={buttonClass('inverse', 'md')}>
                            <TechIcon name="GitHub" className="size-4" />
                            {language === 'zh' ? '探索我們的 GitHub' : 'Explore our GitHub'}
                        </a>
                    </Reveal>
                    <div className="mt-8 grid gap-5 md:grid-cols-2 md:gap-6">
                        {projects.map((project, i) => (
                            <ProjectCard key={project.title} project={project} language={language} delay={(i % 2) * 0.08} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
