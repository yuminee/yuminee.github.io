import fs from "fs";
import path from "path";
import { WEDDING } from "@/data/wedding";
import HorizontalGallery from "@/components/HorizontalGallery";
import BusReservationForm from "@/components/BusReservationForm";
import AccountSection from "@/components/AccountSection";

function getPhotos(folder: string): string[] {
  const directory = path.join(process.cwd(), "public/images", folder);
  try {
    return fs
      .readdirSync(directory)
      .filter((file) => /\.(jpe?g|png|webp|gif)$/i.test(file))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  } catch {
    return [];
  }
}

function PhotoPlaceholder({
  className = "",
  src,
  label,
}: {
  className?: string;
  src?: string;
  label?: string;
}) {
  if (src) {
    return <img src={src} alt={label ?? "photo"} className={`object-cover ${className}`} />;
  }
  return (
    <div
      className={`photo-placeholder flex items-center justify-center text-[12px] text-ink-soft/60 ${className}`}
    >
      {label ?? "PHOTO"}
    </div>
  );
}

function BouquetIllustration() {
  return (
    <svg
      viewBox="0 0 220 180"
      className="w-[220px] h-[180px]"
      fill="none"
      stroke="#212121"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M110 170 L98 130 L110 100 L122 130 Z" />
      <path d="M110 170 L100 140 M110 170 L120 140 M110 170 L110 135" />
      <circle cx="80" cy="80" r="18" />
      <circle cx="80" cy="80" r="10" />
      <circle cx="140" cy="80" r="18" />
      <circle cx="140" cy="80" r="10" />
      <circle cx="110" cy="55" r="20" />
      <circle cx="110" cy="55" r="11" />
      <circle cx="60" cy="105" r="14" />
      <circle cx="60" cy="105" r="7" />
      <circle cx="160" cy="105" r="14" />
      <circle cx="160" cy="105" r="7" />
      <path d="M50 50 q4 -4 8 0 q4 4 0 8 q-4 4 -8 0 q-4 -4 0 -8 z" />
      <path d="M170 45 q4 -4 8 0 q4 4 0 8 q-4 4 -8 0 q-4 -4 0 -8 z" />
      <path d="M40 130 l4 4 M44 126 l-4 4" />
      <path d="M180 135 l4 4 M184 131 l-4 4" />
    </svg>
  );
}

function HeartDoodle() {
  return (
    <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" aria-hidden>
      <path
        d="M20 32 C 8 22 6 14 12 12 C 16 11 19 14 20 17 C 21 14 24 11 28 12 C 34 14 32 22 20 32 Z"
        stroke="#212121"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ButterflyIllustration() {
  return (
    <svg viewBox="0 0 80 60" className="w-[64px] h-[48px]" fill="none" aria-hidden>
      <path
        d="M40 30 C 20 10 10 18 14 32 C 18 44 30 40 40 30 Z M40 30 C 60 10 70 18 66 32 C 62 44 50 40 40 30 Z"
        stroke="#212121"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <line x1="40" y1="20" x2="40" y2="42" stroke="#212121" strokeWidth="1.2" strokeLinecap="round" />
      <path
        d="M40 20 q -3 -6 -6 -6 M40 20 q 3 -6 6 -6"
        stroke="#212121"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function DownArrow() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" aria-hidden>
      <path
        d="M12 4v16m0 0l-6-6m6 6l6-6"
        stroke="#212121"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NaverMapIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6 rounded">
      <rect width="24" height="24" rx="4" fill="#03C75A" />
      <path d="M14 7h2.5v10H14l-4-5.8V17H7.5V7H10l4 5.8V7z" fill="white" />
    </svg>
  );
}

function KakaoMapIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6 rounded">
      <rect width="24" height="24" rx="4" fill="#FEE500" />
      <path
        d="M12 6c-3.6 0-6.5 2.3-6.5 5.1 0 1.8 1.2 3.4 3 4.3l-.7 2.7c-.1.2.1.4.3.3l3.2-2.1h.7c3.6 0 6.5-2.3 6.5-5.1S15.6 6 12 6z"
        fill="#3C1E1E"
      />
    </svg>
  );
}

export default function Home() {
  const photos = getPhotos("couple");

  return (
    <main className="min-h-screen max-w-[480px] mx-auto bg-cream relative overflow-hidden">
      {/* ──────────────────────────────────────────────
          1. Hero: greeting + bouquet illustration
          ────────────────────────────────────────────── */}
      <section className="px-6 pt-16 pb-16 flex flex-col items-center text-center">
        <p className="font-sans text-[14px] text-ink-soft mb-4">청첩장</p>
        <h1 className="font-serif text-[26px] leading-[1.5] text-ink mb-3">
          가장 사랑스러운
          <br />
          순간에는
          <br />
          특별한 무언가가
          <br />
          필요합니다.
        </h1>
        <p className="font-sans text-[14px] text-ink-soft leading-[1.6] mb-2">
          이 순간의 목격자가 될
          <br />
          당신을 초대합니다
        </p>
        <p className="font-serif text-[14px] text-ink mt-2 mb-10">(Welcome!)</p>
        <div className="mt-2">
          <BouquetIllustration />
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          2. Couple main photo (full width)
          ────────────────────────────────────────────── */}
      <section className="w-full">
        <PhotoPlaceholder
          src="/images/1.png"
          label="MAIN PHOTO"
          className="w-full h-[270px]"
        />
      </section>

      {/* ──────────────────────────────────────────────
          3. Greeting message
          ────────────────────────────────────────────── */}
      <section className="px-6 pt-16 pb-12 flex flex-col items-center text-center">
        <div className="mb-8">
          <HeartDoodle />
        </div>
        <h2 className="font-serif text-[22px] text-ink leading-[1.5] mb-5">
          {WEDDING.greeting.title}
        </h2>
        <div className="font-serif text-[22px] text-ink leading-[1.5] space-y-1">
          {WEDDING.greeting.body.map((line, index) => (
            <p key={index} className={line === "" ? "h-4" : ""}>
              {line}
            </p>
          ))}
        </div>
        <p className="font-sans text-[16px] font-medium text-ink leading-[1.5] mt-12 max-w-[260px]">
          {WEDDING.greeting.note}
        </p>
      </section>

      {/* ──────────────────────────────────────────────
          4. Photo trio (vertical column, like Figma)
          ────────────────────────────────────────────── */}
      <section className="px-4 py-6 flex flex-col items-center gap-3">
        {photos.slice(0, 3).map((filename, index) => (
          <PhotoPlaceholder
            key={filename}
            src={`/images/couple/${filename}`}
            label={`PHOTO ${index + 1}`}
            className="w-full max-w-[280px] h-[140px] rounded-md"
          />
        ))}
        {photos.length === 0 &&
          [0, 1, 2].map((index) => (
            <PhotoPlaceholder
              key={index}
              label={`PHOTO ${index + 1}`}
              className="w-full max-w-[280px] h-[140px] rounded-md"
            />
          ))}
      </section>

      {/* ──────────────────────────────────────────────
          5. Family names + butterfly
          ────────────────────────────────────────────── */}
      <section className="px-4 py-12 flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-2 font-serif text-[22px] text-ink leading-[1.5]">
          <p>
            {WEDDING.groom.fatherName} · {WEDDING.groom.motherName}의 {WEDDING.groom.relation}{" "}
            {WEDDING.groom.name}
          </p>
          <p>
            {WEDDING.bride.fatherName} · {WEDDING.bride.motherName}의 {WEDDING.bride.relation}{" "}
            {WEDDING.bride.name}
          </p>
        </div>
        <ButterflyIllustration />
      </section>

      {/* ──────────────────────────────────────────────
          6. Gallery (horizontal scroll)
          ────────────────────────────────────────────── */}
      <section className="py-12 flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4">
          <p className="font-sans text-[16px] font-semibold text-ink">이것 좀 보세요 갤러리</p>
          <DownArrow />
        </div>
        <HorizontalGallery photos={photos} />
      </section>

      {/* ──────────────────────────────────────────────
          7. Directions
          ────────────────────────────────────────────── */}
      <section className="pt-14 pb-14 flex flex-col items-center gap-12">
        <div className="w-full flex flex-col items-center gap-12">
          <p className="font-sans text-[16px] font-semibold text-ink">오시는 길</p>
          <div className="flex flex-col items-center gap-2 px-6">
            <h3 className="font-serif text-[28px] text-ink leading-[1.35] text-center">
              {WEDDING.venue.name}
            </h3>
            <p className="font-sans text-[20px] font-medium text-ink leading-[1.45] text-center">
              {WEDDING.venue.address} · {WEDDING.date.year}년 {WEDDING.date.month}월{" "}
              {WEDDING.date.day}일({WEDDING.date.dayOfWeek}) {WEDDING.date.time}
            </p>
          </div>
          <div className="flex gap-2 px-6 w-full max-w-[336px]">
            <a
              href={WEDDING.venue.naverMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 h-14 bg-white border border-ink rounded-2xl flex items-center justify-center gap-2"
            >
              <NaverMapIcon />
              <span className="font-serif text-[16px] text-ink">네이버지도</span>
            </a>
            <a
              href={WEDDING.venue.kakaoMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 h-14 bg-white border border-ink rounded-2xl flex items-center justify-center gap-2"
            >
              <KakaoMapIcon />
              <span className="font-serif text-[16px] text-ink">카카오맵</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-12 px-6 w-full max-w-[360px]">
          <DirectionBlock
            title={WEDDING.directions.subway.title}
            items={WEDDING.directions.subway.items}
          />
          <DirectionBlock
            title={WEDDING.directions.bus.title}
            items={WEDDING.directions.bus.items}
          />
          <DirectionBlock
            title={WEDDING.directions.car.title}
            items={WEDDING.directions.car.items}
            note={WEDDING.directions.car.note}
          />
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-ink mx-6" />

      {/* ──────────────────────────────────────────────
          8. Bus reservation form
          ────────────────────────────────────────────── */}
      <section className="pt-14 pb-14 flex flex-col items-center gap-9">
        <p className="font-sans text-[16px] font-semibold text-ink">참석 및 버스 탑승</p>
        <div className="flex flex-col items-center gap-2 px-4">
          <h3 className="font-serif text-[28px] text-ink leading-[1.35] text-center">
            {WEDDING.bus.title}
          </h3>
          <p className="font-sans text-[20px] font-medium text-ink leading-[1.35] text-center">
            {WEDDING.bus.subtitle}
          </p>
        </div>
        <BusReservationForm />
        <div className="flex flex-col items-start gap-4 px-6 max-w-[340px]">
          {WEDDING.bus.description.map((paragraph, index) => (
            <p
              key={index}
              className="font-sans text-[18px] text-ink leading-[1.35] text-center w-full whitespace-pre-line"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-ink mx-6" />

      {/* ──────────────────────────────────────────────
          9. Accounts
          ────────────────────────────────────────────── */}
      <AccountSection />
    </main>
  );
}

function DirectionBlock({
  title,
  items,
  note,
}: {
  title: string;
  items: string[];
  note?: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-serif text-[22px] text-ink leading-[1.35]">{title}</h4>
      <div className="flex flex-col gap-3">
        {items.map((text, index) => (
          <div
            key={index}
            className="bg-white/30 rounded-2xl px-5 py-5 font-sans text-[18px] text-ink leading-[1.35] whitespace-pre-line"
          >
            {text}
          </div>
        ))}
      </div>
      {note && (
        <p className="font-sans text-[15px] text-ink-muted leading-[1.35] mt-2">{note}</p>
      )}
    </div>
  );
}
