"use client";

import { useState, useRef, useCallback, useEffect } from "react";

const BASE_PATH = "/images/couple";

export default function HorizontalGallery({ photos }: { photos: string[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (photos.length === 0) {
    return (
      <p className="text-sm text-ink-soft text-center py-8 opacity-60">
        사진을 넣어주세요
      </p>
    );
  }

  return (
    <>
      <div className="w-full overflow-x-scroll no-scrollbar">
        <div className="flex gap-3 px-5">
          {photos.map((filename, index) => (
            <button
              key={filename}
              onClick={() => setSelectedIndex(index)}
              className="flex-none w-[280px] h-[360px] rounded-xl overflow-hidden bg-white"
              aria-label={`사진 ${index + 1}`}
            >
              <img
                src={`${BASE_PATH}/${filename}`}
                alt={`사진 ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {selectedIndex !== null && (
        <Lightbox
          photos={photos}
          initialIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </>
  );
}

function Lightbox({
  photos,
  initialIndex,
  onClose,
}: {
  photos: string[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(initialIndex);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const touchDelta = useRef(0);
  const [offsetX, setOffsetX] = useState(0);

  const goPrev = useCallback(() => {
    setCurrent((c) => (c > 0 ? c - 1 : c));
  }, []);

  const goNext = useCallback(() => {
    setCurrent((c) => (c < photos.length - 1 ? c + 1 : c));
  }, [photos.length]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goPrev();
      else if (event.key === "ArrowRight") goNext();
      else if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goPrev, goNext, onClose]);

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStart.current = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
    touchDelta.current = 0;
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    if (!touchStart.current) return;
    const deltaX = event.touches[0].clientX - touchStart.current.x;
    touchDelta.current = deltaX;
    setOffsetX(deltaX);
  };

  const handleTouchEnd = () => {
    if (Math.abs(touchDelta.current) > 50) {
      if (touchDelta.current < 0) goNext();
      else goPrev();
    }
    touchStart.current = null;
    touchDelta.current = 0;
    setOffsetX(0);
  };

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 text-2xl z-10 w-10 h-10 flex items-center justify-center"
        aria-label="닫기"
      >
        ✕
      </button>
      <p className="absolute top-5 left-0 right-0 text-center text-white/60 text-sm">
        {current + 1} / {photos.length}
      </p>
      <div
        className="w-full flex-1 flex items-center justify-center px-4 overflow-hidden"
        onClick={(event) => event.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={`${BASE_PATH}/${photos[current]}`}
          alt={`사진 ${current + 1}`}
          className="max-w-full max-h-[80vh] object-contain transition-transform duration-200"
          style={{ transform: `translateX(${offsetX}px)` }}
          draggable={false}
        />
      </div>
      {current > 0 && (
        <button
          onClick={(event) => {
            event.stopPropagation();
            goPrev();
          }}
          className="absolute left-2 top-1/2 -translate-y-1/2 text-white/60 text-3xl w-10 h-10 flex items-center justify-center"
          aria-label="이전"
        >
          ‹
        </button>
      )}
      {current < photos.length - 1 && (
        <button
          onClick={(event) => {
            event.stopPropagation();
            goNext();
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60 text-3xl w-10 h-10 flex items-center justify-center"
          aria-label="다음"
        >
          ›
        </button>
      )}
    </div>
  );
}
