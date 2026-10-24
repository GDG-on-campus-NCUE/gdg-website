import Reveal from './Reveal';
import { cx } from './Button';

/**
 * 各區塊共用的標題組：編號眉標 → 大標 → 導言。
 * 眉標前的四色點是 Google 的品牌色，讓每一段的開頭長得一樣。
 */
export default function SectionHeader({ index, eyebrow, title, lead, align = 'left', className, children }) {
    const centered = align === 'center';
    return (
        <Reveal className={cx(centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl', className)}>
            <p className={cx('flex items-center gap-3 text-sm font-semibold text-ink-muted', centered && 'justify-center')}>
                <span aria-hidden="true" className="flex gap-1">
                    <span className="size-1.5 rounded-full bg-g-blue" />
                    <span className="size-1.5 rounded-full bg-g-red" />
                    <span className="size-1.5 rounded-full bg-g-yellow" />
                    <span className="size-1.5 rounded-full bg-g-green" />
                </span>
                {index && <span className="font-mono text-xs tabular-nums text-ink-faint">{index}</span>}
                <span>{eyebrow}</span>
            </p>
            <h2 className="mt-4 text-balance text-3xl font-bold leading-[1.15] tracking-tight text-ink md:text-5xl">{title}</h2>
            {lead && <p className="mt-5 text-pretty text-base leading-relaxed text-ink-muted md:text-lg">{lead}</p>}
            {children}
        </Reveal>
    );
}
