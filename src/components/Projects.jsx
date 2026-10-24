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
                    content: '直接串接學校的標準登入確認投票資格。系統只取得投票需要的權限，從頭到尾不經手、也不儲存你的帳號密碼。',
                },
                {
                    title: '隱私金鑰與零知識證明',
                    content: '加密金鑰在你自己的裝置上產生。透過零知識證明（Zero-Knowledge Proof），你不用透露身分，也能向系統證明自己有投票資格，做到真正的匿名、無法被追溯。',
                },
                {
                    title: '端對端加密投票與分散式存證',
                    content: '選票用高強度的非對稱加密保護；送出之後就無法竄改，任何人都能公開稽核，讓選舉過程公正透明。',
                },
            ],
            link: 'https://sa-election.ncue.edu.tw/',
            repo: 'https://github.com/GDG-on-campus-NCUE/NCUE-SAVote',
            tags: ['電子投票', '零知識證明', '資訊安全'],
        },
        {
            status: '已上線',
            title: '代管生輔組 RPage 網站',
            description: '我們接手並改版學務處生活輔導組的網站，讓重要資訊更容易被找到，全校師生用起來也更順手。',
            link: 'https://stuaffweb.ncue.edu.tw/p/412-1039-4293.php',
            tags: ['資訊整合', 'UI 優化'],
        },
        {
            status: '已上線',
            title: '生輔組餐券管理系統',
            description: '用 Google Apps Script 串起 Google 表單、文件與試算表，打造一套電子餐券系統。學生申請更簡單，管理端也能追蹤餐券使用情形、做數據分析。',
            link: 'https://stuaffweb.ncue.edu.tw/p/412-1039-4345.php',
            tags: ['流程數位化', '數據分析'],
        },
        {
            status: '已上線',
            title: '生輔組失物招領系統',
            description: '串接 Google 表單與試算表，提供線上登記和搜尋失物的平台，幫同學更快找回遺失物品。',
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
                    content: 'Eligibility is checked through the university’s standard sign-in. The system only receives the permissions voting needs, and never handles or stores your password.',
                },
                {
                    title: 'Private keys & zero-knowledge proofs',
                    content: 'Your encryption key is generated on your own device. With zero-knowledge proofs, you prove you are eligible to vote without revealing who you are, so ballots stay anonymous and unlinkable.',
                },
                {
                    title: 'End-to-end encryption & distributed records',
                    content: 'Ballots are protected with strong asymmetric encryption. Once submitted they cannot be altered, and anyone can audit them, keeping the election fair and transparent.',
                },
            ],
            link: 'https://sa-election.ncue.edu.tw/',
            repo: 'https://github.com/GDG-on-campus-NCUE/NCUE-SAVote',
            tags: ['E-Voting', 'ZKP', 'Information Security'],
        },
        {
            status: 'Launched',
            title: 'Student Affairs RPage Site',
            description: 'We took over and redesigned the Student Affairs Division website, so important information is easier to find and the site is easier to use for everyone on campus.',
            link: 'https://stuaffweb.ncue.edu.tw/p/412-1039-4293.php',
            tags: ['Information Integration', 'UI Optimization'],
        },
        {
            status: 'Launched',
            title: 'Meal Voucher Management System',
            description: 'Google Apps Script ties Google Forms, Docs and Sheets into an electronic meal voucher system: applying is simpler for students, and staff can track voucher use and analyze the data.',
            link: 'https://stuaffweb.ncue.edu.tw/p/412-1039-4345.php',
            tags: ['Workflow Digitalization', 'Data Analysis'],
        },
        {
            status: 'Launched',
            title: 'Student Affairs Lost and Found System',
            description: 'Connects Google Forms and Sheets into an online place to report and search for lost items, so students get their things back faster.',
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
                    title={language === 'zh' ? '從校園需求出發，做出真正上線的系統' : 'Real campus needs, real systems in production'}
                    lead={
                        language === 'zh'
                            ? '我們做的不是練習作品，而是校園每天在用的系統。從獎助學金資訊平台、學生會投票系統，到生輔組的行政工具，每一項都已正式上線，在背景穩定運作。'
                            : 'These are not practice projects; they are systems campus uses every day. From the scholarship platform and the student association voting system to the Student Affairs office’s tools, every one of them is live and running.'
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
