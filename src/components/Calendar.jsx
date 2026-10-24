'use client';

// 社群行事曆：嵌入 Google Calendar，一律以月曆檢視開啟
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/hooks/useLanguage';
import { buttonClass } from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import SectionHeader from '@/components/ui/SectionHeader';

const CALENDAR_ID = 'c_c9a15fa8927d18cb8a0729ce86aa1801a579a04d11368df860950c15f6c04af4@group.calendar.google.com';
// cid 是行事曆 ID 的 base64，點了會在使用者自己的 Google 日曆加入這份行事曆
const SUBSCRIBE_URL = 'https://calendar.google.com/calendar/u/0?cid=Y19jOWExNWZhODkyN2QxOGNiOGEwNzI5Y2U4NmFhMTgwMWE1NzlhMDRkMTEzNjhkZjg2MDk1MGMxNWY2YzA0YWY0QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20=';

function embedUrl(mode, language) {
    const params = new URLSearchParams({
        src: CALENDAR_ID,
        ctz: 'Asia/Taipei',
        bgcolor: '#ffffff',
        hl: language === 'zh' ? 'zh_TW' : 'en',
        mode,
        showPrint: '0',
        showTitle: '0',
    });
    return `https://calendar.google.com/calendar/embed?${params}`;
}

export default function Calendar() {
    const { language } = useLanguage();
    const zh = language === 'zh';
    return (
        <section id="calendar" className="border-t border-line py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-5 md:px-8">
                <div className="flex flex-wrap items-end justify-between gap-6">
                    <SectionHeader
                        index="04"
                        eyebrow={zh ? '社群行程' : 'Schedule'}
                        title={zh ? '社群行事曆' : 'Community calendar'}
                        lead={zh ? '工作坊、技術分享和社群活動都在這裡。加到你的 Google 日曆，有新活動就不會錯過。' : 'Workshops, tech talks and community events, all in one place. Add it to your Google Calendar and never miss what is next.'}
                    />
                    <Reveal delay={0.1}>
                        <a href={SUBSCRIBE_URL} target="_blank" rel="noopener noreferrer" className={buttonClass('secondary', 'md')}>
                            <CalendarDaysIcon className="size-4" />
                            {zh ? '加入我的 Google 日曆' : 'Add to Google Calendar'}
                        </a>
                    </Reveal>
                </div>

                <Reveal delay={0.1} className="mt-10 overflow-hidden rounded-3xl border border-line bg-surface">
                    {/* Google 日曆沒有深色主題：反轉明暗再把色相轉回來，活動顏色大致維持原色 */}
                    <iframe
                        key={language}
                        src={embedUrl('MONTH', language)}
                        title={zh ? 'GDG On Campus NCUE 社群行事曆' : 'GDG On Campus NCUE calendar'}
                        loading="lazy"
                        className="block h-[560px] w-full [filter:invert(0.92)_hue-rotate(180deg)] md:h-[680px]"
                    />
                </Reveal>
            </div>
        </section>
    );
}
