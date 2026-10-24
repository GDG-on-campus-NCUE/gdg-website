'use client';

import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import { Badge, EmptyState, Spinner } from '../../_components/ui';
import { AUDIT_ACTIONS } from './statusMeta';

export default function AuditPanel({ entries, loading }) {
    return (
        <section className="overflow-hidden rounded-2xl border border-line bg-surface">
            <header className="border-b border-line px-5 py-4">
                <h3 className="text-sm font-bold tracking-tight text-ink">稽核紀錄</h3>
                <p className="mt-0.5 text-xs text-ink-muted">最近 50 筆登入與證書異動事件，由伺服器直接寫入，前台無法竄改</p>
            </header>

            {loading ? (
                <div className="flex items-center justify-center gap-3 py-20 text-sm font-semibold text-ink-faint">
                    <Spinner className="h-5 w-5" />
                    載入稽核紀錄…
                </div>
            ) : entries.length === 0 ? (
                <EmptyState icon={ClipboardDocumentListIcon} title="尚無紀錄" description="登入、核發、撤銷等操作都會記錄在這裡。" />
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[620px] border-collapse text-left">
                        <thead>
                            <tr className="border-b border-line text-xs font-semibold text-ink-faint">
                                <th scope="col" className="px-5 py-3">時間</th>
                                <th scope="col" className="px-5 py-3">操作</th>
                                <th scope="col" className="px-5 py-3">操作者</th>
                                <th scope="col" className="px-5 py-3">對象 / 備註</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-line text-[13px]">
                            {entries.map((entry) => {
                                const action = AUDIT_ACTIONS[entry.action] ?? { label: entry.action, tone: 'neutral' };
                                return (
                                    <tr key={entry.id} className="hover:bg-white/[0.03]">
                                        <td className="whitespace-nowrap px-5 py-3 tabular-nums text-ink-muted">
                                            {new Date(entry.created_at).toLocaleString('zh-TW')}
                                        </td>
                                        <td className="px-5 py-3">
                                            <Badge tone={action.tone}>{action.label}</Badge>
                                        </td>
                                        <td className="max-w-[200px] truncate px-5 py-3 text-ink">{entry.actor || '—'}</td>
                                        <td className="px-5 py-3 text-ink-muted">
                                            {entry.detail || entry.target_id || '—'}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}
