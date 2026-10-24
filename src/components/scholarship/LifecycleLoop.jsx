import { ArrowRightIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import Reveal from '@/components/ui/Reveal';
import { cx } from '@/components/ui/Button';
import { pick } from '@/content/scholarship';

// 回流線橫跨第 2～6 欄；卡片中心 = 欄寬的一半 = (區塊寬 - 4 個 gap) / 10
const loopEndX = 'calc((100% - 4rem) / 10)';

/**
 * 資料生命週期：六站一排（桌機）、三欄兩排（平板）、單欄（手機），站與站之間用箭頭。
 * 桌機在最後一站底下畫一條回流線：從 06 卡片底部出發、往左、轉上接回 02 卡片（知識庫），
 * 線上有標籤，虛線會流動，減少動態效果時靜止。
 * 平板與手機沒有橫向排列，改用一張帶圖示的回流說明卡。
 * SVG 以 preserveAspectRatio="none" 拉伸，x 座標用千分比近似（94 / 906），誤差在 2px 內。
 */
export default function LifecycleLoop({ flow, language }) {
    const last = flow.steps.length - 1;
    const isLoopEnd = (i) => i === 1 || i === last;
    const loopLabel = pick(flow.loopLabel, language);
    const loopText = pick(flow.loop, language);

    return (
        <div>
            <ol className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
                {flow.steps.map((step, i) => (
                    <Reveal
                        key={step.title.zh}
                        as="li"
                        delay={i * 0.08}
                        className={cx('relative rounded-2xl border bg-raised p-5', isLoopEnd(i) ? 'border-line lg:border-brand/50' : 'border-line')}
                    >
                        <span className="font-mono text-xs tabular-nums text-ink-faint">{String(i + 1).padStart(2, '0')}</span>
                        <p className="mt-2 font-semibold leading-snug text-ink">{pick(step.title, language)}</p>
                        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{pick(step.note, language)}</p>
                        {i < last && (
                            <ArrowRightIcon aria-hidden="true" className="absolute -right-[0.95rem] top-1/2 hidden size-4 -translate-y-1/2 text-ink-faint lg:block" />
                        )}
                    </Reveal>
                ))}
            </ol>

            {/* 桌機：回流線，06 → 02 */}
            <Reveal delay={0.5} className="hidden lg:grid lg:grid-cols-6 lg:gap-4">
                <div className="col-span-5 col-start-2">
                    <div className="relative h-16">
                        <svg aria-hidden="true" viewBox="0 0 1000 64" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
                            <path
                                d="M906 0 V38 a16 16 0 0 1 -16 16 H110 a16 16 0 0 1 -16 -16 V10"
                                fill="none"
                                stroke="var(--color-brand)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeDasharray="6 8"
                                vectorEffect="non-scaling-stroke"
                                className="dash-flow"
                            />
                        </svg>
                        {/* 起點：從 06 卡片底邊出發 */}
                        <span aria-hidden="true" className="absolute top-0 size-2.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-brand ring-4 ring-surface" style={{ right: loopEndX }} />
                        {/* 終點：箭頭指回 02 卡片 */}
                        <svg aria-hidden="true" viewBox="0 0 10 8" className="absolute top-0 h-2 w-2.5 -translate-x-1/2 text-brand" style={{ left: loopEndX }} fill="currentColor">
                            <path d="M5 0 L10 8 L0 8 z" />
                        </svg>
                        {/* 線上的標籤 */}
                        <span className="absolute bottom-0 left-1/2 inline-flex -translate-x-1/2 translate-y-1/2 items-center gap-1.5 rounded-full border border-brand/40 bg-raised px-3 py-1 text-xs font-semibold text-brand-soft shadow-sm">
                            <ArrowUturnLeftIcon aria-hidden="true" className="size-3" />
                            {loopLabel}
                        </span>
                    </div>
                    <p className="mt-8 text-pretty text-center text-sm leading-relaxed text-ink-muted">{loopText}</p>
                </div>
            </Reveal>

            {/* 平板與手機：沒有橫向的線可畫，用一張回流說明卡 */}
            <Reveal delay={0.3} className="mt-4 flex items-start gap-3 rounded-2xl border border-brand/30 bg-brand/[0.06] p-5 lg:hidden">
                <ArrowUturnLeftIcon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-soft" />
                <div>
                    <p className="text-sm font-semibold text-brand-soft">
                        {loopLabel}
                        <span className="mx-1.5 text-ink-faint" aria-hidden="true">·</span>
                        <span className="font-mono text-xs text-ink-faint">06 → 02</span>
                    </p>
                    <p className="mt-1.5 text-pretty text-sm leading-relaxed text-ink-muted">{loopText}</p>
                </div>
            </Reveal>
        </div>
    );
}
