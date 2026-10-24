/**
 * 全站共用的按鈕樣式：前台的 CTA、後台的操作按鈕都從這裡來，確保長得一樣。
 * 形狀一律是膠囊（Material 3 的按鈕形狀），顏色走 globals.css 的 token。
 * 連結要長得像按鈕時用 buttonClass()，真的按鈕用 <Button>。
 */

export function cx(...classes) {
    return classes.filter(Boolean).join(' ');
}

const VARIANTS = {
    // 主要動作：Google 藍底白字
    primary: 'bg-brand-strong text-white shadow-sm shadow-brand/20 hover:bg-[#2b7de9] active:bg-[#1967d2] disabled:bg-brand-strong/40 disabled:text-white/60 disabled:shadow-none',
    // 反白：深底上最醒目的白色按鈕
    inverse: 'bg-ink text-bg hover:bg-white active:bg-ink/90 disabled:bg-ink/40',
    // 次要動作：描邊
    secondary: 'border border-line-strong bg-surface text-ink hover:border-ink-faint hover:bg-raised active:bg-raised/70 disabled:text-ink-faint disabled:hover:border-line-strong disabled:hover:bg-surface',
    ghost: 'text-ink-muted hover:bg-white/[0.06] hover:text-ink active:bg-white/10 disabled:text-ink-faint/60 disabled:hover:bg-transparent',
    danger: 'bg-[#d93025] text-white shadow-sm shadow-red-900/30 hover:bg-[#e04437] active:bg-[#c5221f] disabled:bg-[#d93025]/40 disabled:shadow-none',
    dangerGhost: 'text-ink-muted hover:bg-red-500/10 hover:text-danger active:bg-red-500/15 disabled:text-ink-faint/60',
    // 疊在照片或動態背景上：半透明毛玻璃
    glass: 'border border-white/15 bg-white/[0.06] text-ink backdrop-blur hover:border-white/25 hover:bg-white/10',
    overlay: 'bg-black/45 text-white backdrop-blur hover:bg-black/65',
};

// 沒有 tailwind-merge：呼叫端不要再傳會和這裡衝突的 padding / 高度 / 顏色，需要新尺寸就加在這裡
const SIZES = {
    sm: 'h-8 gap-1.5 px-3 text-[13px]',
    md: 'h-10 gap-2 px-4 text-sm',
    lg: 'h-12 gap-2.5 px-6 text-[15px]',
    xl: 'h-14 gap-3 px-8 text-base',
    icon: 'size-9 justify-center',
    iconMd: 'size-10 justify-center',
    iconSm: 'size-8 justify-center',
};

export function buttonClass(variant = 'secondary', size = 'md', className) {
    return cx(
        'inline-flex shrink-0 items-center justify-center rounded-full font-semibold whitespace-nowrap transition-colors duration-150',
        'outline-none focus-visible:ring-2 focus-visible:ring-brand-soft focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
        'disabled:cursor-not-allowed',
        VARIANTS[variant],
        SIZES[size],
        className,
    );
}

export function Button({ variant = 'secondary', size = 'md', className, type = 'button', children, ...props }) {
    return (
        <button type={type} className={buttonClass(variant, size, className)} {...props}>
            {children}
        </button>
    );
}
