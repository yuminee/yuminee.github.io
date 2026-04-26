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

function UnderlineEmphasis({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <img
        src="/images/underline.png"
        alt=""
        aria-hidden
        className="absolute left-0 right-0 -bottom-2 w-full h-[10px] pointer-events-none"
        style={{ objectFit: "fill" }}
      />
    </span>
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
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path
        d="M12 2C7.6 2 4 5.4 4 9.5c0 5.6 6.4 11.5 7.4 12.3.3.3.9.3 1.2 0C13.6 21 20 15.1 20 9.5 20 5.4 16.4 2 12 2z"
        fill="#03C75A"
      />
      <circle cx="12" cy="9.3" r="3" fill="white" />
    </svg>
  );
}

function KakaoMapIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
      <path
        d="M12 2C7.6 2 4 5.4 4 9.5c0 5.6 6.4 11.5 7.4 12.3.3.3.9.3 1.2 0C13.6 21 20 15.1 20 9.5 20 5.4 16.4 2 12 2z"
        fill="#FEE500"
      />
      <circle cx="12" cy="9.3" r="3" fill="#3C1E1E" />
    </svg>
  );
}

export default function Home() {
  const photos = getPhotos("gallery");

  return (
    <main className="min-h-screen max-w-[480px] mx-auto bg-cream relative overflow-hidden">
      {/* ──────────────────────────────────────────────
          1. Hero: bouquet illustration as background + text overlay
          Figma 좌표 (frame 360):
            부케: 295.38 × 475.75, left 45.61, top 73.28 → w 82%, left 12.67%
            텍스트: 296.29 × 214.06, left 24, top 99 → 텍스트 좌측 24px, 상단 ~47px
          ────────────────────────────────────────────── */}
      <section className="relative">
        {/* 부케 배경 — 자연 흐름으로 섹션 높이 결정
            Figma: b1 W:295.38 H:475.75, X:45.61, Y:73.28
            메인 사진 Y:624 → 부케 하단(Y:549.03)에서 ~75px 간격 */}
        <div className="w-[82%] ml-[12.67%] pt-[73px] pb-[75px]">
          <img
            src="/images/b1.png"
            alt=""
            aria-hidden
            className="block w-full h-auto pointer-events-none select-none"
          />
        </div>
        {/* 텍스트 오버레이 */}
        <div className="absolute inset-0 z-10 px-6 pt-12 pointer-events-none">
          <div className="pointer-events-auto flex flex-col items-start">
            <p className="font-serif text-[18px] font-bold text-ink mb-2">청첩장</p>
            <h1 className="font-serif text-[28px] font-bold leading-[1.35] text-ink mb-7">
              가장 <UnderlineEmphasis>사랑스러운 순간에</UnderlineEmphasis>는
              <br />
              목격자가 필요합니다.
            </h1>
            <p className="font-serif text-[18px] font-bold text-ink leading-[1.55] mb-7">
              이 순간의 목격자가 될
              <br />
              당신을 초대합니다
            </p>
            <p className="font-serif text-[18px] font-bold text-ink">(Welcome!)</p>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          2. Couple main photo (full width)
          ────────────────────────────────────────────── */}
      <section className="w-full">
        <img
          src="/images/main-photo.png"
          alt="조욱남 박유민"
          className="w-full h-auto object-cover"
        />
      </section>

      {/* ──────────────────────────────────────────────
          3. Greeting message (b2 already includes corner hearts + dots)
          Figma 좌표 (frame 360):
            배경 b2: 292.8 × 462.63, X:24.8 (6.89%), Y:959.58
              → left 6.89%, right margin 11.78%
            텍스트 컨테이너: 312 × 346 Hug, X:24, Y:1023, gap 32, center
              → 텍스트 좌우 24px (6.67%), b2 상단으로부터 ~13.7%
          ────────────────────────────────────────────── */}
      <section className="relative">
        {/* 배경 b2 — 자연 흐름으로 섹션 높이 결정 */}
        <div className="ml-[6.89%] mr-[11.78%] pt-12 pb-2">
          <img
            src="/images/b2.png"
            alt=""
            aria-hidden
            className="block w-full h-auto pointer-events-none select-none"
          />
        </div>
        {/* 텍스트 오버레이 */}
        <div className="absolute inset-0 z-10 flex justify-center pointer-events-none">
          <div className="pointer-events-auto w-[86.67%] mt-[13.7%] flex flex-col items-center text-center gap-8">
            <h2 className="font-serif text-[22px] text-ink leading-[1.5]">
              {WEDDING.greeting.title}
            </h2>
            <div className="font-serif text-[22px] text-ink leading-[1.5] space-y-1">
              {WEDDING.greeting.body.map((line, index) => (
                <p key={index} className={line === "" ? "h-4" : ""}>
                  {line}
                </p>
              ))}
            </div>
            <p className="font-sans text-[16px] font-medium text-ink leading-[1.5] max-w-[260px]">
              {WEDDING.greeting.note}
            </p>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          4. Photo strip (single composed image)
          Figma: W:328 (91.1%), X:16 (4.44%), Y:1480 → 위 b2 하트와 간격 ~58px
          ────────────────────────────────────────────── */}
      <section className="px-4 pt-4 pb-12 flex justify-center">
        <img
          src="/images/photo-strip.png"
          alt="조욱남 박유민 포토 스트립"
          className="w-full max-w-[328px] h-auto rounded-lg"
        />
      </section>

      {/* ──────────────────────────────────────────────
          5. Family names + cloud-heart
          Figma: cloud-heart W:63.97 H:42.56, X:45.16 Y:2171.55
            → 좌측 정렬 (12.54%), 크기 17.77%
          이름 텍스트는 중앙 정렬
          위 photo-strip → 이름까지 ~78px, cloud-heart → 갤러리까지 ~66px
          ────────────────────────────────────────────── */}
      <section className="pt-[30px] pb-[18px] flex flex-col gap-[44px]">
        <div className="flex flex-col items-center gap-4 font-serif text-[22px] text-ink leading-[1.5]">
          <p>
            {WEDDING.groom.fatherName} · {WEDDING.groom.motherName}의 {WEDDING.groom.relation}{" "}
            {WEDDING.groom.name}
          </p>
          <p>
            {WEDDING.bride.fatherName} · {WEDDING.bride.motherName}의 {WEDDING.bride.relation}{" "}
            {WEDDING.bride.name}
          </p>
        </div>
        <img
          src="/images/cloud-heart.png"
          alt=""
          aria-hidden
          className="w-[17.77%] ml-[12.54%] h-auto block pointer-events-none select-none"
        />
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
          Figma: 컨테이너 W:360 X:0 Y:2831, gap:56, alignment center
          버튼 작게, 주소/일자 줄바꿈
          ────────────────────────────────────────────── */}
      <section className="pt-14 pb-14 flex flex-col items-center gap-14">
        <div className="w-full flex flex-col items-center gap-14">
          <p className="font-sans text-[16px] font-semibold text-ink">오시는 길</p>
          <div className="flex flex-col items-center gap-2 px-6">
            <h3 className="font-serif text-[28px] text-ink leading-[1.35] text-center">
              {WEDDING.venue.name}
            </h3>
            <p className="font-sans text-[20px] font-medium text-ink leading-[1.45] text-center">
              {WEDDING.venue.address}
              <br />· {WEDDING.date.year}년 {WEDDING.date.month}월 {WEDDING.date.day}일(
              {WEDDING.date.dayOfWeek}) {WEDDING.date.time}
            </p>
          </div>
          <div className="flex gap-2 w-full max-w-[312px]">
            <a
              href={WEDDING.venue.naverMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 h-14 bg-white border border-ink rounded-2xl flex items-center justify-center gap-2 px-5"
            >
              <NaverMapIcon />
              <span className="font-serif text-[16px] text-ink">네이버지도</span>
            </a>
            <a
              href={WEDDING.venue.kakaoMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 h-14 bg-white border border-ink rounded-2xl flex items-center justify-center gap-2 px-5"
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
