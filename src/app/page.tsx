import fs from "fs";
import path from "path";
import { WEDDING } from "@/data/wedding";
import CountdownTimer from "@/components/CountdownTimer";
import AccountSection from "@/components/AccountSection";
import GallerySection from "@/components/GallerySection";
import ScrollReveal from "@/components/ScrollReveal";

function getPhotos(folder: string): string[] {
  const dir = path.join(process.cwd(), "public/images", folder);
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp|gif)$/i.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  } catch {
    return [];
  }
}

/* ─── SVG Doodle helpers ─── */
function HeartDoodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M12 21s-1.5-1-3.5-2.5C4.5 15 2 12 2 8.5 2 5.4 4.5 3 7.5 3c1.7 0 3.3 1 4.5 2.5C13.2 4 14.8 3 16.5 3 19.5 3 22 5.4 22 8.5c0 3.5-2.5 6.5-6.5 10C13.5 20 12 21 12 21z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="currentColor"
        fillOpacity="0.15"
      />
    </svg>
  );
}


/* ─── Calendar component ─── */
function JuneCalendar() {
  const daysInMonth = 30;
  const headers = ["일", "월", "화", "수", "목", "금", "토"];

  // 2026-06-01 is Monday → 1 blank in Sun-start calendar
  const sunStartBlanks = 1;

  const days: (number | null)[] = [
    ...Array(sunStartBlanks).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // Pad to complete rows
  while (days.length % 7 !== 0) days.push(null);

  return (
    <div className="p-5 max-w-[340px] mx-auto">
      <div
        className="text-center text-lg text-red-wedding font-bold mb-3"
        style={{ fontFamily: "var(--font-handwriting)" }}
      >
        2026년 6월
      </div>
      <table className="w-full text-center text-sm">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th
                key={h}
                className={`py-1 font-normal text-xs ${
                  i === 0 ? "text-red-wedding" : i === 6 ? "text-blue-500" : "text-brown-light"
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: days.length / 7 }, (_, week) => (
            <tr key={week}>
              {days.slice(week * 7, week * 7 + 7).map((day, i) => {
                const isWeddingDay = day === 13;
                const dayIndex = week * 7 + i;
                const isSunday = dayIndex % 7 === 0;
                const isSaturday = dayIndex % 7 === 6;
                return (
                  <td key={i} className="py-1.5">
                    {day && (
                      <span
                        className={`relative inline-flex flex-col items-center justify-center w-8 h-8 text-sm ${
                          isWeddingDay
                            ? "text-red-wedding font-bold"
                            : isSunday
                              ? "text-red-wedding"
                              : isSaturday
                                ? "text-blue-500"
                                : "text-brown-text"
                        }`}
                      >
                        {isWeddingDay && (
                          <svg viewBox="0 0 24 24" className="absolute inset-0 m-auto w-8 h-8 text-red-wedding/20" fill="currentColor">
                            <path d="M12 21s-1.5-1-3.5-2.5C4.5 15 2 12 2 8.5 2 5.4 4.5 3 7.5 3c1.7 0 3.3 1 4.5 2.5C13.2 4 14.8 3 16.5 3 19.5 3 22 5.4 22 8.5c0 3.5-2.5 6.5-6.5 10C13.5 20 12 21 12 21z" />
                          </svg>
                        )}
                        <span className="relative z-10">{day}</span>
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  return (
    <main className="min-h-screen max-w-[480px] mx-auto bg-cream relative overflow-hidden">

      {/* ════════════════════════════════════════════════
          SECTION 1: Hero
          ════════════════════════════════════════════════ */}
      <section className="relative px-6 pt-10 pb-6 text-center">
        {/* Main photo */}
        <div className="mt-4 mb-0 flex justify-center">
          <img
            src="/images/1.png"
            alt={`${WEDDING.groom.name} & ${WEDDING.bride.name}`}
            className="w-[340px] h-auto"
          />
        </div>
      </section>

      <div className="wavy-divider" />

      {/* ════════════════════════════════════════════════
          SECTION 2: Greeting
          ════════════════════════════════════════════════ */}
      <ScrollReveal>
        <section className="px-6 pt-4 pb-10 text-center">
          <h2
            className="text-2xl text-red-wedding mb-6"
            style={{ fontFamily: "var(--font-handwriting)" }}
          >
            소중한 분들을 초대합니다
          </h2>

          {/* Parents info */}
          <div className="text-sm text-brown-light mb-6 space-y-1">
            <p>
              <span className="text-brown-text font-bold">{WEDDING.groom.fatherName}</span>
              {" · "}
              <span className="text-brown-text font-bold">{WEDDING.groom.motherName}</span>
              <span className="text-brown-light/60"> 의 {WEDDING.groom.relation} </span>
              <span className="text-red-wedding font-bold">{WEDDING.groom.name}</span>
            </p>
            <p>
              <span className="text-brown-text font-bold">{WEDDING.bride.fatherName}</span>
              {" · "}
              <span className="text-brown-text font-bold">{WEDDING.bride.motherName}</span>
              <span className="text-brown-light/60"> 의 {WEDDING.bride.relation} </span>
              <span className="text-red-wedding font-bold">{WEDDING.bride.name}</span>
            </p>
          </div>

          {/* Greeting message */}
          <p className="text-sm leading-7 text-brown-text whitespace-pre-line max-w-xs mx-auto">
            {WEDDING.greeting}
          </p>
        </section>
      </ScrollReveal>

      <div className="wavy-divider" />

      {/* ════════════════════════════════════════════════
          SECTION 3: Calendar + D-Day
          ════════════════════════════════════════════════ */}
      <ScrollReveal>
        <section className="px-6 pt-4 pb-10 text-center">
          <h2
            className="text-4xl text-red-wedding mb-2"
            style={{ fontFamily: "var(--font-handwriting)" }}
          >
            WEDDING DAY
          </h2>
          <p className="text-sm text-brown-text mb-1">
            {WEDDING.date.year}년 {WEDDING.date.month}월 {WEDDING.date.day}일 {WEDDING.date.dayOfWeek} | {WEDDING.date.time}
          </p>
          <p className="text-xs text-brown-light mb-8">
            Saturday, Jun 13, 2026 | PM 4:00
          </p>

          <JuneCalendar />

          <div className="mt-6">
            <p
              className="text-lg text-green-doodle mb-4"
              style={{ fontFamily: "var(--font-handwriting)" }}
            >
              결혼식까지 남은 시간
            </p>
            <CountdownTimer />
          </div>
        </section>
      </ScrollReveal>

      <div className="wavy-divider" />

      {/* ════════════════════════════════════════════════
          SECTION 4: Location
          ════════════════════════════════════════════════ */}
      <ScrollReveal>
        <section className="px-6 pt-4 pb-10 text-center">
          <h2
            className="text-2xl text-red-wedding mb-2 flex items-center justify-center gap-2"
            style={{ fontFamily: "var(--font-handwriting)" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" className="text-red-wedding shrink-0">
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="12" cy="9" r="2.5" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1" />
            </svg>
            오시는 길
          </h2>

          <div className="bg-white rounded-lg border border-cream-dark p-6 max-w-xs mx-auto mt-6">
            <p className="text-base font-bold text-brown-text mb-1">
              {WEDDING.venue.name}
            </p>
            <p className="text-sm text-brown-light mb-1">
              {WEDDING.venue.address}
            </p>
            <p className="text-sm text-brown-light">
              {WEDDING.date.year}년 {WEDDING.date.month}월 {WEDDING.date.day}일 {WEDDING.date.dayOfWeek} {WEDDING.date.time}
            </p>
          </div>

          {/* Map links */}
          <div className="flex justify-center gap-3 mt-6">
            <a
              href={WEDDING.venue.kakaoMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-lg border border-cream-dark px-5 py-2.5 text-sm text-brown-text hover:bg-red-bg transition-colors flex items-center gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <circle cx="9" cy="9" r="8" fill="#FEE500" />
                <path d="M9 4.5c-3 0-5.4 1.9-5.4 4.2 0 1.5 1 2.8 2.5 3.6l-.6 2.3c0 .1.1.2.2.1l2.7-1.8c.2 0 .4 0 .6.1 3 0 5.4-1.9 5.4-4.2S12 4.5 9 4.5z" fill="#3C1E1E" />
              </svg>
              카카오맵
            </a>
            <a
              href={WEDDING.venue.naverMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-lg border border-cream-dark px-5 py-2.5 text-sm text-brown-text hover:bg-red-bg transition-colors flex items-center gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <rect width="18" height="18" rx="3" fill="#03C75A" />
                <path d="M10.5 9.5L7.8 5.5H5.5v7h2.2V8.6l2.7 3.9h2.2v-7h-2.1z" fill="white" />
              </svg>
              네이버지도
            </a>
          </div>

          {/* Transportation info */}
          <div className="mt-10 max-w-xs mx-auto text-left space-y-6">
            {/* 지하철 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg width="20" height="20" viewBox="0 0 24 24" className="text-green-doodle shrink-0">
                  <rect x="4" y="2" width="16" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="9" cy="7" r="1.5" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="0.8" />
                  <circle cx="15" cy="7" r="1.5" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="0.8" />
                  <line x1="8" y1="18" x2="6" y2="22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <line x1="16" y1="18" x2="18" y2="22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <span className="text-sm font-bold text-brown-text">{WEDDING.venue.directions.subway.label}</span>
              </div>
              {WEDDING.venue.directions.subway.routes.map((route, i) => (
                <div key={i} className="ml-7">
                  <p className="text-sm font-bold text-red-wedding mb-1">{route.station}</p>
                  {route.details.map((detail, j) => (
                    <p key={j} className="text-xs text-brown-light leading-5">{detail}</p>
                  ))}
                </div>
              ))}
            </div>

            {/* 버스 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg width="20" height="20" viewBox="0 0 24 24" className="text-green-doodle shrink-0">
                  <rect x="4" y="3" width="16" height="15" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1.2" />
                  <rect x="6" y="5.5" width="12" height="5" rx="1" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="0.8" />
                  <circle cx="8" cy="21" r="1.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="16" cy="21" r="1.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                <span className="text-sm font-bold text-brown-text">{WEDDING.venue.directions.bus.label}</span>
              </div>
              {WEDDING.venue.directions.bus.routes.map((route, i) => (
                <div key={i} className="ml-7">
                  <p className="text-sm font-bold text-red-wedding mb-1">{route.station}</p>
                  {route.details.map((detail, j) => (
                    <p key={j} className="text-xs text-brown-light leading-5">{detail}</p>
                  ))}
                </div>
              ))}
            </div>

            {/* 자차 */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg width="20" height="20" viewBox="0 0 24 24" className="text-green-doodle shrink-0">
                  <path d="M5 14l1.5-5.5A2 2 0 018.4 7h7.2a2 2 0 011.9 1.5L19 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <rect x="3" y="14" width="18" height="5" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="7.5" cy="14" r="0.5" fill="currentColor" />
                  <circle cx="16.5" cy="14" r="0.5" fill="currentColor" />
                  <circle cx="7" cy="22" r="1.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="17" cy="22" r="1.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                <span className="text-sm font-bold text-brown-text">{WEDDING.venue.directions.car.label}</span>
              </div>
              <div className="ml-7">
                {WEDDING.venue.directions.car.details.map((detail, i) => (
                  <p key={i} className={`text-xs leading-5 ${detail.startsWith("*") ? "text-brown-light/70 mt-1" : "text-brown-light"}`}>
                    {detail}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <div className="wavy-divider" />

      {/* ════════════════════════════════════════════════
          SECTION 5: Gallery
          ════════════════════════════════════════════════ */}
      <ScrollReveal>
        <GallerySection
          couplePhotos={getPhotos("couple")}
          friendsPhotos={getPhotos("friends")}
        />
      </ScrollReveal>

      <div className="wavy-divider" />

      {/* ════════════════════════════════════════════════
          SECTION 6: Accounts
          ════════════════════════════════════════════════ */}
      <ScrollReveal>
        <AccountSection />
      </ScrollReveal>

      <div className="wavy-divider" />

      {/* ════════════════════════════════════════════════
          SECTION 7: Footer
          ════════════════════════════════════════════════ */}
      <footer className="px-6 pt-8 pb-12 text-center">
        <div className="flex justify-center gap-2 mb-4">
          <HeartDoodle className="w-4 h-4 text-red-wedding/40" />
          <HeartDoodle className="w-5 h-5 text-red-wedding/60 animate-heartbeat" />
          <HeartDoodle className="w-4 h-4 text-red-wedding/40" />
        </div>
        <p
          className="text-xl text-red-wedding mb-2"
          style={{ fontFamily: "var(--font-handwriting)" }}
        >
          {WEDDING.groom.name} ♥ {WEDDING.bride.name}
        </p>
        <p className="text-sm text-brown-light">
          {WEDDING.date.year}.{WEDDING.date.month}.{WEDDING.date.day}
        </p>
      </footer>
    </main>
  );
}
