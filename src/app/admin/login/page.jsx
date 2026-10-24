import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeftIcon, ExclamationTriangleIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import gdgIcon from '@/images/icon/GDG_icon.png';
import { buttonClass } from '@/components/ui/Button';
import { getAuthConfigErrors, getSession } from '@/lib/auth';
import LoginButton from './LoginButton';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const metadata = {
    title: '管理員登入 | GDG on Campus NCUE',
    robots: { index: false, follow: false },
};

function Notice({ tone, title, children }) {
    const styles = {
        warning: 'border-amber-500/30 bg-amber-500/[0.08] text-warning',
        danger: 'border-red-500/30 bg-red-500/[0.08] text-danger',
    }[tone];
    return (
        <div className={`mt-7 flex gap-3 rounded-2xl border p-3.5 ${styles}`}>
            <ExclamationTriangleIcon className="mt-0.5 h-4 w-4 shrink-0" />
            <div className="min-w-0 text-[12px] leading-relaxed">
                <p className="font-bold">{title}</p>
                <p className="mt-0.5 break-words text-ink-muted">{children}</p>
            </div>
        </div>
    );
}

export default async function AdminLoginPage({ searchParams }) {
    if (await getSession()) redirect('/admin/dashboard');

    const { error } = await searchParams;
    const configErrors = getAuthConfigErrors();

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16">
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/3 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/15 blur-[140px]" />

            <Link href="/" className={buttonClass('secondary', 'sm', 'absolute left-5 top-5 sm:left-8 sm:top-8')}>
                <ArrowLeftIcon className="h-4 w-4" />
                返回首頁
            </Link>

            <main className="relative w-full max-w-[26rem]">
                {/* Google 四色條，和前台精選專案卡片同一個識別 */}
                <div className="overflow-hidden rounded-3xl border border-line bg-surface/90 shadow-2xl shadow-black/50 backdrop-blur">
                    <div aria-hidden="true" className="flex h-1">
                        <span className="flex-1 bg-g-blue" />
                        <span className="flex-1 bg-g-red" />
                        <span className="flex-1 bg-g-yellow" />
                        <span className="flex-1 bg-g-green" />
                    </div>

                    <div className="p-8 sm:p-10">
                        <div className="flex flex-col items-center text-center">
                            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-3">
                                <Image src={gdgIcon} alt="GDG on Campus NCUE" width={56} height={56} className="h-full w-full object-contain" />
                            </span>
                            <p className="mt-6 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-faint">
                                <LockClosedIcon className="h-3 w-3" />
                                Admin Portal
                            </p>
                            <h1 className="mt-3 text-2xl font-bold tracking-tight text-ink">證書管理系統</h1>
                            <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
                                GDG on Campus NCUE
                                <br />
                                請使用已授權的 Google 帳號登入。
                            </p>
                        </div>

                        {configErrors.length > 0 && (
                            <Notice tone="warning" title="伺服器尚未完成設定">
                                缺少環境變數：{configErrors.join('、')}
                            </Notice>
                        )}

                        {error && (
                            <Notice tone="danger" title="登入失敗">
                                {error}
                            </Notice>
                        )}

                        <div className="mt-7">
                            <LoginButton disabled={configErrors.length > 0} />
                        </div>

                        <p className="mt-6 text-center text-[11px] leading-relaxed text-ink-faint">
                            僅限管理員白名單內的帳號。若無法登入，請聯絡核心成員將你的 Google 帳號加入
                            <code className="mx-1 rounded bg-raised px-1 py-0.5 font-mono text-[10px] text-ink-muted">ADMIN_EMAILS</code>
                            。
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
