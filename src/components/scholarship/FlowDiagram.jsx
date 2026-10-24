'use client';

import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { BellIcon, CircleStackIcon, ClockIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import TechIcon from '@/components/ui/TechIcon';
import { cx } from '@/components/ui/Button';
import { useInView, usePrefersReducedMotion } from '@/hooks/useInView';
import { pick } from '@/content/scholarship';

const GLYPHS = { clock: ClockIcon, bell: BellIcon, globe: GlobeAltIcon, database: CircleStackIcon };

const TONES = {
    default: 'border-line bg-raised',
    brand: 'border-brand/60 bg-raised shadow-[0_0_0_4px_rgb(66_133_244/0.12)]',
    muted: 'border-line bg-surface text-ink-muted',
};

/**
 * 兩個節點之間畫一條三次貝茲曲線：水平為主就從左右邊出入，垂直為主就從上下邊出入。
 * 回傳路徑、曲線中點（放標籤）與方向。
 */
function wire(a, b, origin) {
    const gap = 6;
    const ac = { x: a.left + a.width / 2 - origin.left, y: a.top + a.height / 2 - origin.top };
    const bc = { x: b.left + b.width / 2 - origin.left, y: b.top + b.height / 2 - origin.top };
    const dx = bc.x - ac.x;
    const dy = bc.y - ac.y;
    const horizontal = Math.abs(dx) >= Math.abs(dy) * 0.9;
    let s;
    let e;
    let c1;
    let c2;
    if (horizontal) {
        const dir = Math.sign(dx) || 1;
        s = { x: ac.x + (dir * a.width) / 2 + dir * gap, y: ac.y };
        e = { x: bc.x - (dir * b.width) / 2 - dir * gap, y: bc.y };
        const k = Math.max(Math.abs(e.x - s.x) / 2, 24);
        c1 = { x: s.x + dir * k, y: s.y };
        c2 = { x: e.x - dir * k, y: e.y };
    } else {
        const dir = Math.sign(dy) || 1;
        s = { x: ac.x, y: ac.y + (dir * a.height) / 2 + dir * gap };
        e = { x: bc.x, y: bc.y - (dir * b.height) / 2 - dir * gap };
        const k = Math.max(Math.abs(e.y - s.y) / 2, 20);
        c1 = { x: s.x, y: s.y + dir * k };
        c2 = { x: e.x, y: e.y - dir * k };
    }
    const f = (n) => n.toFixed(1);
    const d = `M${f(s.x)} ${f(s.y)} C${f(c1.x)} ${f(c1.y)} ${f(c2.x)} ${f(c2.y)} ${f(e.x)} ${f(e.y)}`;
    const mid = { x: (s.x + 3 * c1.x + 3 * c2.x + e.x) / 8, y: (s.y + 3 * c1.y + 3 * c2.y + e.y) / 8 };
    return { d, mid, horizontal };
}

function NodeCard({ node, language }) {
    const tone = node.tone ?? 'default';
    const Glyph = GLYPHS[node.icon];
    return (
        <div className={cx('flex h-full items-start gap-3 rounded-2xl border p-3.5 transition-colors', TONES[tone])}>
            {node.icon && (
                <span
                    className={cx(
                        'inline-flex size-9 shrink-0 items-center justify-center rounded-xl',
                        tone === 'brand' ? 'bg-brand text-white' : 'bg-bg-sunken text-ink',
                    )}
                >
                    {Glyph ? <Glyph className="size-[18px]" /> : <TechIcon name={node.icon} className="size-[18px]" />}
                </span>
            )}
            <span className="min-w-0">
                <span className="block text-[15px] font-semibold leading-snug text-ink">{pick(node.label, language)}</span>
                {node.sub && <span className="mt-0.5 block text-[13px] leading-snug text-ink-muted">{pick(node.sub, language)}</span>}
            </span>
        </div>
    );
}

/**
 * 系統架構圖：節點放在 CSS grid 上（版面交給瀏覽器排），
 * 量完節點位置後用 SVG 畫連線；視窗尺寸或字型載入改變時重量一次。
 * 捲進畫面時連線依序畫出，再有光點沿線流過（SVG animateMotion）；減少動態效果時只有靜態的線。
 * 滑鼠移到節點上，只留下與它相連的線與節點，方便追一條路徑。
 * 手機寬度放不下時整張圖可以左右滑，而不是把節點擠成一欄而失去連線。
 */
export default function FlowDiagram({ def, language, swipeHint }) {
    const id = useId().replace(/:/g, '');
    const wrap = useRef(null);
    const nodes = useRef({});
    const [wires, setWires] = useState([]);
    const [box, setBox] = useState({ w: 0, h: 0 });
    const [hovered, setHovered] = useState(null);
    const reduce = usePrefersReducedMotion();
    const inView = useInView(wrap, { once: true, threshold: 0.25 });

    const measure = useCallback(() => {
        const el = wrap.current;
        if (!el) return;
        const origin = el.getBoundingClientRect();
        setBox({ w: origin.width, h: origin.height });
        const next = [];
        def.edges.forEach((edge, index) => {
            const a = nodes.current[edge.from];
            const b = nodes.current[edge.to];
            if (!a || !b) return;
            const { d, mid, horizontal } = wire(a.getBoundingClientRect(), b.getBoundingClientRect(), origin);
            next.push({
                key: `${edge.from}-${edge.to}`,
                from: edge.from,
                to: edge.to,
                d,
                mid,
                horizontal,
                dashed: edge.dashed,
                label: edge.label ? pick(edge.label, language) : undefined,
                index,
            });
        });
        setWires(next);
    }, [def.edges, language]);

    useLayoutEffect(() => {
        measure();
    }, [measure]);

    useEffect(() => {
        const el = wrap.current;
        if (!el) return undefined;
        const ro = new ResizeObserver(() => measure());
        ro.observe(el);
        document.fonts?.ready.then(() => measure()).catch(() => {});
        return () => ro.disconnect();
    }, [measure]);

    // 滑鼠所在節點的鄰居：用來淡化不相干的節點與連線
    const linked = useMemo(() => {
        if (!hovered) return null;
        const set = new Set([hovered]);
        def.edges.forEach((edge) => {
            if (edge.from === hovered) set.add(edge.to);
            if (edge.to === hovered) set.add(edge.from);
        });
        return set;
    }, [hovered, def.edges]);

    const isWireActive = (w) => !hovered || w.from === hovered || w.to === hovered;
    const drawn = inView || reduce;
    const gridStyle = { gridTemplateColumns: `repeat(${def.cols}, minmax(0, 1fr))` };
    // 手機與平板上每欄至少 220px：寧可左右滑，也不要把節點擠到每個字都換行；桌機一律塞進容器
    const minWidth = def.cols * 220;

    return (
        <div>
            <div className="-mx-5 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0">
                <div className="min-w-[var(--flow-min)] lg:min-w-0" style={{ '--flow-min': `${minWidth}px` }}>
                    {def.columns && (
                        <div className="mb-4 grid gap-x-10 md:gap-x-14" style={gridStyle}>
                            {def.columns.map((column) => (
                                <p key={column.en} className="border-b border-line pb-2 text-xs font-semibold text-ink-faint">
                                    {pick(column, language)}
                                </p>
                            ))}
                        </div>
                    )}

                    <div
                        ref={wrap}
                        className="relative grid items-stretch gap-x-10 gap-y-10 py-2 md:gap-x-14"
                        style={gridStyle}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <svg aria-hidden="true" width={box.w} height={box.h} className="pointer-events-none absolute inset-0 overflow-visible">
                            <defs>
                                <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                                    <path d="M0 0 L10 5 L0 10 z" fill="var(--color-ink-faint)" />
                                </marker>
                                <marker id={`${id}-arrow-on`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                                    <path d="M0 0 L10 5 L0 10 z" fill="var(--color-brand-soft)" />
                                </marker>
                            </defs>

                            {wires.map((w) => {
                                const active = isWireActive(w);
                                const highlighted = hovered && active;
                                return (
                                    <path
                                        key={w.key}
                                        d={w.d}
                                        fill="none"
                                        pathLength={w.dashed ? undefined : 1}
                                        stroke={highlighted ? 'var(--color-brand-soft)' : w.dashed ? 'var(--color-ink-faint)' : 'var(--color-line-strong)'}
                                        strokeWidth={highlighted ? 2 : 1.5}
                                        strokeDasharray={w.dashed ? '5 6' : 1}
                                        strokeDashoffset={w.dashed ? undefined : drawn ? 0 : 1}
                                        className={w.dashed && drawn && !reduce ? 'dash-flow' : undefined}
                                        markerEnd={`url(#${id}-${highlighted ? 'arrow-on' : 'arrow'})`}
                                        style={{
                                            opacity: drawn ? (active ? 1 : 0.18) : 0,
                                            transition: `stroke-dashoffset 0.8s cubic-bezier(0.16,1,0.3,1) ${0.12 * w.index}s, opacity 0.3s, stroke 0.2s`,
                                        }}
                                    />
                                );
                            })}

                            {inView &&
                                !reduce &&
                                !hovered &&
                                wires.map((w) => (
                                    <circle key={`p-${w.key}`} r={3.5} fill="var(--color-brand)">
                                        <animateMotion dur="2.6s" begin={`${0.9 + w.index * 0.45}s`} repeatCount="indefinite" path={w.d} />
                                        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="2.6s" begin={`${0.9 + w.index * 0.45}s`} repeatCount="indefinite" />
                                    </circle>
                                ))}
                        </svg>

                        {def.nodes.map((node, i) => (
                            <div
                                key={node.id}
                                ref={(el) => {
                                    nodes.current[node.id] = el;
                                }}
                                onMouseEnter={() => setHovered(node.id)}
                                className="relative z-10 transition-opacity duration-300"
                                style={{
                                    gridColumn: node.col,
                                    gridRow: node.row,
                                    opacity: drawn ? (linked && !linked.has(node.id) ? 0.35 : 1) : 0,
                                    transitionDelay: drawn && !hovered ? `${0.05 * i}s` : '0s',
                                }}
                            >
                                <NodeCard node={node} language={language} />
                            </div>
                        ))}

                        {wires
                            .filter((w) => w.label)
                            .map((w) => (
                                <span
                                    key={`l-${w.key}`}
                                    className={cx(
                                        'pointer-events-none absolute z-20 whitespace-nowrap rounded-full border px-2 py-0.5 text-[11px] transition-[opacity,color,border-color] duration-300',
                                        hovered && isWireActive(w) ? 'border-brand/50 bg-bg text-brand-soft' : 'border-line bg-bg text-ink-muted',
                                    )}
                                    style={{
                                        left: w.mid.x,
                                        top: w.mid.y,
                                        // 水平線的標籤放在線的上方、垂直線的放在右邊，不蓋住箭頭
                                        transform: w.horizontal ? 'translate(-50%, calc(-100% - 6px))' : 'translate(8px, -50%)',
                                        opacity: drawn ? (isWireActive(w) ? 1 : 0.15) : 0,
                                        transitionDelay: drawn && !hovered ? `${0.4 + 0.12 * w.index}s` : '0s',
                                    }}
                                >
                                    {w.label}
                                </span>
                            ))}
                    </div>
                </div>
            </div>
            {swipeHint && <p className="mt-2 text-center text-xs text-ink-faint lg:hidden">{swipeHint}</p>}
        </div>
    );
}
