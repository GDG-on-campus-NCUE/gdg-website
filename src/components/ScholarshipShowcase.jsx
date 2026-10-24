'use client';

import { ArrowUpRightIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/hooks/useLanguage';
import { buttonClass, cx } from '@/components/ui/Button';
import PhraseText from '@/components/ui/PhraseText';
import Reveal from '@/components/ui/Reveal';
import TechIcon from '@/components/ui/TechIcon';
import FlowDiagram from '@/components/scholarship/FlowDiagram';
import LifecycleLoop from '@/components/scholarship/LifecycleLoop';
import ProductTour from '@/components/scholarship/ProductTour';
import ShotSwitcher from '@/components/scholarship/ShotSwitcher';
import { pick, scholarship as work, scholarshipLabels as t } from '@/content/scholarship';

/** 案例內各段的小標：等寬字編號 + 標題 */
function PartHeading({ index, title, intro, language }) {
    return (
        <Reveal className="max-w-3xl">
            <p className="font-mono text-xs tabular-nums text-brand-soft">{index}</p>
            <h4 className="mt-2 text-2xl font-bold tracking-tight text-ink md:text-3xl">{pick(title, language)}</h4>
            {intro && <p className="mt-4 text-pretty text-base leading-relaxed text-ink-muted md:text-lg">{pick(intro, language)}</p>}
        </Reveal>
    );
}

function Bullets({ items, language, className }) {
    return (
        <ul className={cx('grid gap-3', className)}>
            {items.map((item) => (
                <li key={item.zh} className="flex gap-3 text-pretty leading-relaxed text-ink-muted">
                    <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-brand" />
                    <span>{pick(item, language)}</span>
                </li>
            ))}
        </ul>
    );
}

/**
 * 精選專案：獎助學金資訊平台。
 * 版型與文案沿用 ming-website／io Software 官網的案例頁：
 * 標題區 → 產品導覽 → 目標／做法／成果 → 資料生命週期 → 系統架構 → 重點設計。
 * 整個案例包在一張大卡片裡，和下方其他校園專案在視覺上分開。
 */
export default function ScholarshipShowcase() {
    const { language } = useLanguage();
    const sectionPad = 'px-5 py-10 md:px-10 md:py-16 lg:px-14';

    return (
        // overflow-clip 而不是 overflow-hidden：hidden 會讓這層變成捲動容器，左側事實欄的 sticky 就失效
        <article aria-labelledby="scholarship-name" className="relative -mx-5 overflow-clip border-y border-line bg-surface/70 shadow-2xl shadow-black/30 md:mx-0 md:rounded-[2rem] md:border-x">
            {/* 頂端的 Google 四色條 */}
            <div aria-hidden="true" className="flex h-1">
                <span className="flex-1 bg-g-blue" />
                <span className="flex-1 bg-g-red" />
                <span className="flex-1 bg-g-yellow" />
                <span className="flex-1 bg-g-green" />
            </div>
            <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 size-[28rem] rounded-full bg-brand/10 blur-3xl" />

            {/* ------------------------------ 標題區 ------------------------------ */}
            <div className={cx('relative', sectionPad)}>
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
                    <Reveal className="lg:col-span-8">
                        <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-ink-muted">
                            <span className="rounded-full bg-brand/15 px-2.5 py-0.5 text-xs font-semibold text-brand-soft">{pick(work.eyebrow, language)}</span>
                            <span>{pick(work.client, language)}</span>
                            <span aria-hidden="true" className="text-ink-faint">·</span>
                            <span>{pick(work.category, language)}</span>
                        </p>
                        <h3 id="scholarship-name" className="mt-5 text-xl font-bold text-ink md:text-2xl">
                            {pick(work.name, language)}
                        </h3>
                        <p className="mt-2 text-balance text-3xl font-bold leading-[1.15] tracking-tight text-ink md:text-5xl">
                            <PhraseText text={pick(work.title, language)} />
                        </p>
                        <p className="mt-6 max-w-[62ch] text-pretty text-base leading-relaxed text-ink-muted md:text-lg">{pick(work.summary, language)}</p>
                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <a href={work.url} target="_blank" rel="noopener noreferrer" className={buttonClass('primary', 'lg')}>
                                {pick(t.visit, language)}
                                <ArrowUpRightIcon className="size-4" />
                            </a>
                            <a href={work.github} target="_blank" rel="noopener noreferrer" className={buttonClass('secondary', 'lg')}>
                                <TechIcon name="GitHub" className="size-4" />
                                {pick(t.source, language)}
                            </a>
                        </div>
                    </Reveal>

                    <Reveal delay={0.1} className="grid gap-4 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
                        <div className="rounded-2xl border border-line bg-raised/80 p-5">
                            <p className="text-5xl font-bold tracking-tight text-brand-soft md:text-6xl">{work.stat.value}</p>
                            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{pick(work.stat.label, language)}</p>
                        </div>
                        <div className="flex items-center gap-3 rounded-2xl border border-g-yellow/30 bg-g-yellow/[0.06] p-5">
                            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-g-yellow/15 text-warning">
                                <TrophyIcon className="size-5" />
                            </span>
                            <span>
                                <span className="block font-bold leading-tight text-ink">{work.recognition.title}</span>
                                <span className="mt-0.5 block text-sm text-ink-muted">{pick(work.recognition.desc, language)}</span>
                            </span>
                        </div>
                    </Reveal>
                </div>

                <Reveal delay={0.15} className="mt-12 md:mt-16">
                    <ProductTour items={work.tour} domain={work.domain} language={language} label={pick(t.tour, language)} />
                </Reveal>
            </div>

            {/* ------------------------------ 目標・做法・成果 ------------------------------ */}
            <div className={cx('relative grid grid-cols-1 gap-12 border-t border-line lg:grid-cols-12', sectionPad)}>
                <aside className="lg:col-span-4">
                    <dl className="grid gap-7 lg:sticky lg:top-28">
                        <div>
                            <dt className="text-sm text-ink-faint">{pick(t.deliverables, language)}</dt>
                            <dd>
                                <ul className="mt-3 grid gap-2">
                                    {work.deliverables.map((item) => (
                                        <li key={item.zh} className="flex gap-2.5 text-[15px] leading-snug text-ink">
                                            <span aria-hidden="true" className="mt-[0.7em] h-px w-3.5 shrink-0 bg-ink-faint" />
                                            {pick(item, language)}
                                        </li>
                                    ))}
                                </ul>
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm text-ink-faint">{pick(t.stack, language)}</dt>
                            <dd className="mt-3 flex flex-wrap gap-2">
                                {work.stack.map((name) => (
                                    <span key={name} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-raised/60 px-2.5 py-1 text-xs text-ink-muted">
                                        <TechIcon name={name} className="size-3.5" />
                                        {name}
                                    </span>
                                ))}
                            </dd>
                        </div>
                        <div className="flex gap-10">
                            <div>
                                <dt className="text-sm text-ink-faint">{pick(t.year, language)}</dt>
                                <dd className="mt-1 text-lg font-semibold text-ink">{work.year}</dd>
                            </div>
                            <div>
                                <dt className="text-sm text-ink-faint">{pick(t.client, language)}</dt>
                                <dd className="mt-1 text-[15px] font-semibold leading-snug text-ink">{pick(work.client, language)}</dd>
                            </div>
                        </div>
                    </dl>
                </aside>

                <div className="grid gap-12 lg:col-span-7 lg:col-start-6">
                    <Reveal>
                        <h4 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">{pick(t.goal, language)}</h4>
                        <div className="mt-5 grid gap-4">
                            {work.goal.map((item) => (
                                <p key={item.label.zh} className="text-pretty text-base leading-relaxed text-ink-muted md:text-lg">
                                    <span className="mr-2 inline-block rounded-md bg-raised px-2 py-0.5 align-[0.1em] text-sm font-semibold text-ink">
                                        {pick(item.label, language)}
                                    </span>
                                    {pick(item.text, language)}
                                </p>
                            ))}
                        </div>
                    </Reveal>
                    <Reveal>
                        <h4 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">{pick(t.approach, language)}</h4>
                        <Bullets items={work.approach} language={language} className="mt-5 md:text-lg" />
                    </Reveal>
                    <Reveal>
                        <h4 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">{pick(t.result, language)}</h4>
                        <Bullets items={work.result} language={language} className="mt-5 md:text-lg" />
                    </Reveal>
                </div>
            </div>

            {/* ------------------------------ 資料生命週期 ------------------------------ */}
            <div className={cx('relative border-t border-line bg-bg-sunken/40', sectionPad)}>
                <PartHeading index="01" title={work.lifecycle.heading} intro={work.lifecycle.intro} language={language} />
                <div className="mt-10">
                    <LifecycleLoop flow={work.lifecycle} language={language} />
                </div>
            </div>

            {/* ------------------------------ 系統架構 ------------------------------ */}
            <div className={cx('relative border-t border-line', sectionPad)}>
                <PartHeading index="02" title={work.architecture.heading} intro={work.architecture.intro} language={language} />
                <Reveal className="mt-10">
                    <FlowDiagram def={work.architecture} language={language} swipeHint={pick(t.swipe, language)} />
                </Reveal>
                <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink-faint">
                    <li className="flex items-center gap-2">
                        <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
                        {language === 'zh' ? '資料流向' : 'Data flow'}
                    </li>
                    <li className="flex items-center gap-2">
                        <span aria-hidden="true" className="w-6 border-t border-dashed border-ink-faint" />
                        {pick(t.fallbackLegend, language)}
                    </li>
                    <li className="flex items-center gap-2">
                        <span aria-hidden="true" className="size-3 rounded-[4px] border border-brand/60 shadow-[0_0_0_3px_rgb(66_133_244/0.15)]" />
                        {language === 'zh' ? '核心服務' : 'Core services'}
                    </li>
                    <li className="hidden items-center gap-2 lg:flex">{language === 'zh' ? '滑鼠移到節點上，可追蹤它的連線' : 'Hover a node to trace its connections'}</li>
                </ul>
            </div>

            {/* ------------------------------ 重點設計 ------------------------------ */}
            <div className={cx('relative border-t border-line', sectionPad)}>
                <PartHeading index="03" title={t.highlights} language={language} />
                <ol className="mt-12 grid gap-16 md:gap-24">
                    {work.highlights.map((item, i) => {
                        const flip = i % 2 === 1;
                        return (
                            <Reveal key={item.key} as="li" className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
                                <div className={cx('lg:col-span-5', flip && 'lg:order-2 lg:col-start-8')}>
                                    <p className="font-mono text-sm text-ink-faint">{String(i + 1).padStart(2, '0')}</p>
                                    <h5 className="mt-2 text-2xl font-bold tracking-tight text-ink md:text-3xl">{pick(item.title, language)}</h5>
                                    <p className="mt-4 max-w-[48ch] text-pretty text-lg font-medium leading-relaxed text-ink">{pick(item.body, language)}</p>
                                    <Bullets items={item.points} language={language} className="mt-5 max-w-[48ch]" />
                                </div>
                                <div className={cx('lg:col-span-7', flip && 'lg:order-1')}>
                                    <ShotSwitcher shots={item.shots} language={language} />
                                </div>
                            </Reveal>
                        );
                    })}
                </ol>
            </div>
        </article>
    );
}
