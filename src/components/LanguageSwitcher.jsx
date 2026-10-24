'use client';

// 語言切換：兩段式按鈕，目前的語言反白，一眼看得出現在是哪一種
import { useLanguage } from '@/hooks/useLanguage';
import { cx } from '@/components/ui/Button';

const OPTIONS = [
    { value: 'zh', label: '中' },
    { value: 'en', label: 'EN' },
];

export default function LanguageSwitcher({ className }) {
    const { language, toggleLanguage, isLoaded } = useLanguage();

    return (
        <div
            role="group"
            aria-label="語言 / Language"
            className={cx('inline-flex items-center rounded-full border border-line bg-surface/70 p-0.5', !isLoaded && 'opacity-0', className)}
        >
            {OPTIONS.map((option) => {
                const active = language === option.value;
                return (
                    <button
                        key={option.value}
                        type="button"
                        aria-pressed={active}
                        onClick={() => !active && toggleLanguage()}
                        className={cx(
                            'h-7 min-w-9 rounded-full px-2.5 text-xs font-bold transition-colors',
                            active ? 'bg-ink text-bg' : 'text-ink-muted hover:text-ink',
                        )}
                    >
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
}
