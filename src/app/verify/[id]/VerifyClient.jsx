'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    AcademicCapIcon,
    ArrowDownTrayIcon,
    CalendarIcon,
    CheckBadgeIcon,
    EnvelopeIcon,
    ExclamationTriangleIcon,
    IdentificationIcon,
    ShieldCheckIcon,
    UserIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';
import gdgLogoDark from '@/images/icon/GDG_On_Campus_dark.png';
import { buttonClass, cx } from '@/components/ui/Button';

const CONTACT = 'gdg-core@ncuesa.org.tw';

function DetailItem({ icon: Icon, label, value, mono }) {
    return (
        <div className="flex items-start gap-3.5">
            <span className="mt-0.5 rounded-xl bg-raised p-2">
                <Icon className="h-5 w-5 text-ink-faint" />
            </span>
            <div className="min-w-0">
                <p className="text-xs font-medium text-ink-faint">{label}</p>
                <p className={cx('mt-1 break-words text-lg font-bold text-ink', mono && 'font-mono text-base tracking-tight')}>{value}</p>
            </div>
        </div>
    );
}

/** 卡片頂端的 Google 四色條：和前台、後台登入頁同一個識別 */
function BrandBar() {
    return (
        <div aria-hidden="true" className="flex h-1">
            <span className="flex-1 bg-g-blue" />
            <span className="flex-1 bg-g-red" />
            <span className="flex-1 bg-g-yellow" />
            <span className="flex-1 bg-g-green" />
        </div>
    );
}

export default function VerifyClient({ certificate, signatureValid }) {
    const [downloading, setDownloading] = useState(false);

    const handleDownload = async () => {
        if (!certificate?.image_url) return;
        setDownloading(true);
        try {
            const response = await fetch(certificate.image_url);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Certificate-${certificate.cert_number}.png`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
        } catch {
            window.open(certificate.image_url, '_blank', 'noopener');
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden px-4 py-10 sm:px-6 lg:flex lg:flex-col lg:justify-center lg:py-12">
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 size-[44rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-brand/10 blur-[140px]" />

            <div className="relative mx-auto w-full max-w-4xl">
                <Link href="/" className="mx-auto mb-8 block w-fit lg:mb-10" aria-label="GDG on Campus NCUE">
                    <Image src={gdgLogoDark} alt="GDG on Campus NCUE" width={1920} height={390} className="h-12 w-auto object-contain md:h-14" priority />
                </Link>

                {certificate ? (
                    <div className="space-y-5">
                        <div className="overflow-hidden rounded-3xl border border-line bg-surface shadow-2xl shadow-black/40">
                            <BrandBar />

                            <div
                                className={cx(
                                    'flex flex-col items-center gap-3 border-b px-6 py-7 text-center sm:flex-row sm:text-left lg:px-10',
                                    signatureValid ? 'border-emerald-500/20 bg-emerald-500/[0.06]' : 'border-amber-500/20 bg-amber-500/[0.06]',
                                )}
                            >
                                <span
                                    className={cx(
                                        'flex size-14 shrink-0 items-center justify-center rounded-2xl',
                                        signatureValid ? 'bg-emerald-500/15 text-success' : 'bg-amber-500/15 text-warning',
                                    )}
                                >
                                    {signatureValid ? <CheckBadgeIcon className="size-8" /> : <ExclamationTriangleIcon className="size-8" />}
                                </span>
                                <div>
                                    <h1 className="text-2xl font-bold tracking-tight text-ink lg:text-3xl">
                                        {signatureValid ? 'Credential Verified' : 'Credential Found'}
                                    </h1>
                                    <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-ink-muted sm:justify-start">
                                        <ShieldCheckIcon className="h-4 w-4" />
                                        Officially issued by GDG on Campus NCUE
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 lg:p-10">
                                <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
                                    <div className="grid gap-5">
                                        <DetailItem icon={UserIcon} label="Recipient" value={certificate.recipient_name} />
                                        <DetailItem icon={AcademicCapIcon} label="Event" value={certificate.event_name} />
                                        <DetailItem icon={IdentificationIcon} label="Certificate No." value={certificate.cert_number} mono />
                                        <DetailItem icon={CalendarIcon} label="Issue Date" value={certificate.issue_date} />
                                    </div>

                                    {certificate.image_url && (
                                        <a
                                            href={certificate.image_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group relative mx-auto block w-full overflow-hidden rounded-2xl border border-line bg-raised lg:max-w-sm"
                                        >
                                            <img
                                                src={certificate.image_url}
                                                alt={`${certificate.recipient_name} 的證書`}
                                                className="aspect-[1.414/1] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                            />
                                        </a>
                                    )}
                                </div>

                                <div className="mt-8 flex flex-col items-start justify-between gap-5 border-t border-line pt-6 md:flex-row md:items-center lg:mt-10">
                                    <div className="min-w-0">
                                        <p className="text-xs font-medium text-ink-faint">Integrity Check</p>
                                        <p
                                            className={cx(
                                                'mt-1.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset',
                                                signatureValid
                                                    ? 'bg-emerald-500/10 text-success ring-emerald-500/25'
                                                    : 'bg-amber-500/10 text-warning ring-amber-500/25',
                                            )}
                                        >
                                            {signatureValid ? <ShieldCheckIcon className="h-3.5 w-3.5" /> : <ExclamationTriangleIcon className="h-3.5 w-3.5" />}
                                            {signatureValid ? '簽章驗證通過，內容未被竄改' : '簽章無法驗證，請聯絡核發單位'}
                                        </p>
                                        <p className="mt-2 break-all font-mono text-[11px] text-ink-faint">{certificate.id}</p>
                                    </div>

                                    {certificate.image_url && (
                                        <button type="button" onClick={handleDownload} disabled={downloading} className={buttonClass('primary', 'lg', 'w-full md:w-auto')}>
                                            <ArrowDownTrayIcon className="h-5 w-5" />
                                            {downloading ? '下載中…' : 'Download certificate'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <p className="flex items-center justify-center gap-2 text-center text-xs font-medium text-ink-muted">
                            <EnvelopeIcon className="h-4 w-4" />
                            有疑問請聯絡
                            <a href={`mailto:${CONTACT}`} className="font-semibold text-brand-soft hover:underline">
                                {CONTACT}
                            </a>
                        </p>
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-3xl border border-line bg-surface text-center shadow-2xl shadow-black/40">
                        <BrandBar />
                        <div className="p-8 lg:p-12">
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
                                <XCircleIcon className="h-11 w-11 text-danger" />
                            </div>
                            <h1 className="mb-3 text-2xl font-bold text-ink">Verification Failed</h1>
                            <p className="mx-auto mb-8 max-w-md text-[15px] leading-relaxed text-ink-muted">
                                查不到這組驗證 ID 對應的證書。請確認 QR Code 或連結是否完整；若確定無誤，請聯絡 {CONTACT}。
                            </p>
                            <Link href="/" className={buttonClass('primary', 'lg')}>
                                回到首頁
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
