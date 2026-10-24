'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
    CheckCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    XCircleIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { Button, cx } from '@/components/ui/Button';

// 按鈕與前台共用同一個元件（src/components/ui/Button.jsx），後台不再另外定義一套樣式
export { Button, cx };

/* -------------------------------------------------------------------------- */
/* Form controls                                                               */
/* -------------------------------------------------------------------------- */

const CONTROL_CLASS =
    'w-full rounded-xl border border-line-strong bg-bg px-3.5 text-sm text-ink ' +
    'placeholder:text-ink-faint outline-none transition-colors ' +
    'hover:border-ink-faint focus:border-brand focus:ring-2 focus:ring-brand/25 ' +
    'disabled:bg-surface disabled:text-ink-faint read-only:bg-surface';

export function Field({ label, hint, required, error, children }) {
    return (
        <label className="block space-y-1.5">
            <span className="flex items-baseline justify-between gap-3">
                <span className="text-[13px] font-semibold text-ink">
                    {label}
                    {required && <span className="ml-0.5 text-danger">*</span>}
                </span>
                {hint && <span className="text-[11px] font-medium text-ink-faint">{hint}</span>}
            </span>
            {children}
            {error && <span className="block text-[11px] font-medium text-danger">{error}</span>}
        </label>
    );
}

export function Input({ className, ...props }) {
    return <input className={cx(CONTROL_CLASS, 'h-10', className)} {...props} />;
}

export function Select({ className, children, ...props }) {
    return (
        <select className={cx(CONTROL_CLASS, 'h-10 pr-8', className)} {...props}>
            {children}
        </select>
    );
}

/* -------------------------------------------------------------------------- */
/* Badge — 狀態一律「顏色 + 文字」，不靠顏色單獨表意                              */
/* -------------------------------------------------------------------------- */

const BADGE_TONES = {
    neutral: 'bg-white/[0.05] text-ink-muted ring-line-strong',
    info: 'bg-brand/10 text-brand-soft ring-brand/30',
    success: 'bg-emerald-500/10 text-success ring-emerald-500/25',
    warning: 'bg-amber-500/10 text-warning ring-amber-500/25',
    danger: 'bg-red-500/10 text-danger ring-red-500/30',
};

export function Badge({ tone = 'neutral', icon: Icon, children, className }) {
    return (
        <span
            className={cx(
                'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset whitespace-nowrap',
                BADGE_TONES[tone],
                className,
            )}
        >
            {Icon && <Icon className="h-3 w-3" />}
            {children}
        </span>
    );
}

export function Spinner({ className }) {
    return (
        <span
            role="status"
            aria-label="載入中"
            className={cx('inline-block animate-spin rounded-full border-2 border-current border-t-transparent', className || 'h-4 w-4')}
        />
    );
}

/** 後台的卡片外框：和前台卡片同一組圓角、邊框與底色 */
export const CARD_CLASS = 'rounded-2xl border border-line bg-surface';

export function EmptyState({ icon: Icon, title, description, action }) {
    return (
        <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
            {Icon && (
                <div className="mb-4 rounded-full bg-raised p-4 ring-1 ring-line">
                    <Icon className="h-6 w-6 text-ink-faint" />
                </div>
            )}
            <h4 className="text-sm font-semibold text-ink">{title}</h4>
            {description && <p className="mt-1 max-w-sm text-[13px] leading-relaxed text-ink-muted">{description}</p>}
            {action && <div className="mt-5">{action}</div>}
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* Modal                                                                       */
/* -------------------------------------------------------------------------- */

export function Modal({ open, onClose, title, subtitle, icon: Icon, size = 'md', children }) {
    const panelRef = useRef(null);

    useEffect(() => {
        if (!open) return undefined;
        const onKeyDown = (event) => {
            if (event.key === 'Escape') onClose?.();
        };
        document.addEventListener('keydown', onKeyDown);
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        panelRef.current?.focus();
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [open, onClose]);

    if (!open) return null;

    const widths = { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-5xl' };

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6">
            <div className="absolute inset-0 animate-fade-in bg-black/70 backdrop-blur-[2px]" onClick={onClose} aria-hidden="true" />
            <div
                ref={panelRef}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                aria-label={title}
                className={cx(
                    'relative z-10 flex max-h-[92vh] w-full animate-rise-in flex-col overflow-hidden rounded-t-3xl border border-line bg-surface shadow-2xl shadow-black/60 outline-none sm:rounded-3xl',
                    widths[size],
                )}
            >
                <header className="flex items-start justify-between gap-4 border-b border-line px-6 py-4">
                    <div className="flex items-center gap-3">
                        {Icon && (
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/15 text-brand-soft">
                                <Icon className="h-5 w-5" />
                            </span>
                        )}
                        <div>
                            <h2 className="text-[15px] font-bold tracking-tight text-ink">{title}</h2>
                            {subtitle && <p className="mt-0.5 text-xs text-ink-muted">{subtitle}</p>}
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} aria-label="關閉">
                        <XMarkIcon className="h-5 w-5" />
                    </Button>
                </header>
                {children}
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* Confirm dialog（取代瀏覽器原生 confirm）                                      */
/* -------------------------------------------------------------------------- */

export function ConfirmDialog({ open, title, description, confirmLabel = '確認', tone = 'danger', busy, onConfirm, onCancel }) {
    return (
        <Modal open={open} onClose={busy ? undefined : onCancel} title={title} size="sm">
            <div className="px-6 py-5 text-[13px] leading-relaxed text-ink-muted">{description}</div>
            <div className="flex justify-end gap-2 border-t border-line bg-bg/40 px-6 py-4">
                <Button variant="secondary" onClick={onCancel} disabled={busy}>
                    取消
                </Button>
                <Button variant={tone} onClick={onConfirm} disabled={busy}>
                    {busy && <Spinner />}
                    {confirmLabel}
                </Button>
            </div>
        </Modal>
    );
}

/* -------------------------------------------------------------------------- */
/* Toast                                                                       */
/* -------------------------------------------------------------------------- */

const ToastContext = createContext(null);

const TOAST_STYLES = {
    success: { icon: CheckCircleIcon, ring: 'ring-emerald-500/30', accent: 'text-success' },
    error: { icon: XCircleIcon, ring: 'ring-red-500/35', accent: 'text-danger' },
    warning: { icon: ExclamationTriangleIcon, ring: 'ring-amber-500/30', accent: 'text-warning' },
    info: { icon: InformationCircleIcon, ring: 'ring-brand/35', accent: 'text-brand-soft' },
};

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);
    const counter = useRef(0);

    const dismiss = useCallback((id) => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
    }, []);

    const push = useCallback(
        (tone, message, detail) => {
            const id = ++counter.current;
            setToasts((current) => [...current, { id, tone, message, detail }]);
            setTimeout(() => dismiss(id), tone === 'error' ? 8000 : 4500);
        },
        [dismiss],
    );

    const value = useMemo(
        () => ({
            success: (message, detail) => push('success', message, detail),
            error: (message, detail) => push('error', message, detail),
            warning: (message, detail) => push('warning', message, detail),
            info: (message, detail) => push('info', message, detail),
        }),
        [push],
    );

    return (
        <ToastContext.Provider value={value}>
            {children}
            <div className="pointer-events-none fixed bottom-4 right-4 z-[60] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-2" aria-live="polite">
                {toasts.map((toast) => {
                    const style = TOAST_STYLES[toast.tone];
                    const Icon = style.icon;
                    return (
                        <div
                            key={toast.id}
                            role="status"
                            className={cx(
                                'pointer-events-auto flex animate-rise-in items-start gap-3 rounded-2xl bg-raised px-4 py-3 shadow-2xl shadow-black/50 ring-1',
                                style.ring,
                            )}
                        >
                            <Icon className={cx('mt-0.5 h-5 w-5 shrink-0', style.accent)} />
                            <div className="min-w-0 flex-1">
                                <p className="text-[13px] font-semibold text-ink">{toast.message}</p>
                                {toast.detail && <p className="mt-0.5 break-words text-xs text-ink-muted">{toast.detail}</p>}
                            </div>
                            <button
                                type="button"
                                onClick={() => dismiss(toast.id)}
                                className="-mr-1 rounded-full p-1 text-ink-faint transition-colors hover:bg-white/[0.06] hover:text-ink"
                                aria-label="關閉通知"
                            >
                                <XMarkIcon className="h-4 w-4" />
                            </button>
                        </div>
                    );
                })}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast 必須在 ToastProvider 之內使用');
    return context;
}
