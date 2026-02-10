"use client";

import { useState, useRef, useCallback, useEffect } from "react";

type Tab = "couple" | "friends";

const BASE_PATH = "/images";
const PHOTOS_PER_PAGE = 6;

export default function GallerySection({
  couplePhotos,
  friendsPhotos,
}: {
  couplePhotos: string[];
  friendsPhotos: string[];
}) {
  const [activeTab, setActiveTab] = useState<Tab>("couple");
  const [page, setPage] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const photos = activeTab === "couple" ? couplePhotos : friendsPhotos;
  const folder = activeTab === "couple" ? "couple" : "friends";
  const totalPages = Math.ceil(photos.length / PHOTOS_PER_PAGE);
  const visiblePhotos = photos.slice(page * PHOTOS_PER_PAGE, (page + 1) * PHOTOS_PER_PAGE);

  const switchTab = (tab: Tab) => {
    setActiveTab(tab);
    setPage(0);
    setSelectedIndex(null);
  };

  return (
    <section className="px-6 py-10">
      <div className="max-w-sm mx-auto">
        {/* Camera doodle */}
        <div className="flex justify-center mb-4">
          <svg width="36" height="36" viewBox="0 0 36 36" className="text-green-doodle">
            <rect x="4" y="10" width="28" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="18" cy="20" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="18" cy="20" r="2.5" fill="currentColor" opacity="0.3" />
            <path d="M12 10V8a2 2 0 012-2h8a2 2 0 012 2v2" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="27" cy="14" r="1.5" fill="currentColor" opacity="0.5" />
          </svg>
        </div>

        <h2
          className="text-2xl text-red-wedding text-center mb-6"
          style={{ fontFamily: "var(--font-handwriting)" }}
        >
          우리의 순간들
        </h2>

        {/* Tab buttons */}
        <div className="flex justify-center gap-3 mb-6">
          <button
            onClick={() => switchTab("couple")}
            className={`px-5 py-2 rounded-full text-sm transition-colors ${
              activeTab === "couple"
                ? "bg-red-wedding text-white"
                : "bg-white text-brown-light border border-cream-dark hover:border-red-wedding/30"
            }`}
          >
            둘이서 ♥
          </button>
          <button
            onClick={() => switchTab("friends")}
            className={`px-5 py-2 rounded-full text-sm transition-colors ${
              activeTab === "friends"
                ? "bg-red-wedding text-white"
                : "bg-white text-brown-light border border-cream-dark hover:border-red-wedding/30"
            }`}
          >
            소중한 사람들과
          </button>
        </div>

        {/* Photo grid - 2 columns, no gap, 3 rows max */}
        {photos.length > 0 ? (
          <>
            <div className="grid grid-cols-2 overflow-hidden rounded-lg">
              {visiblePhotos.map((filename, i) => {
                const globalIndex = page * PHOTOS_PER_PAGE + i;
                return (
                  <button
                    key={`${folder}-${filename}`}
                    onClick={() => setSelectedIndex(globalIndex)}
                    className="aspect-square overflow-hidden cursor-pointer"
                  >
                    <img
                      src={`${BASE_PATH}/${folder}/${filename}`}
                      alt={`사진 ${globalIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-4">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === page ? "bg-red-wedding" : "bg-cream-dark"
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="text-sm text-brown-light/60 text-center py-8">
            사진을 넣어주세요
          </p>
        )}

        {/* Lightbox with swipe */}
        {selectedIndex !== null && photos[selectedIndex] && (
          <Lightbox
            photos={photos}
            folder={folder}
            initialIndex={selectedIndex}
            onClose={() => setSelectedIndex(null)}
          />
        )}
      </div>
    </section>
  );
}

function Lightbox({
  photos,
  folder,
  initialIndex,
  onClose,
}: {
  photos: string[];
  folder: string;
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
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goPrev, goNext, onClose]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    touchDelta.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.touches[0].clientX - touchStart.current.x;
    touchDelta.current = dx;
    setOffsetX(dx);
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
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 text-2xl z-10 w-10 h-10 flex items-center justify-center"
      >
        ✕
      </button>

      {/* Counter */}
      <p className="absolute top-5 left-0 right-0 text-center text-white/60 text-sm">
        {current + 1} / {photos.length}
      </p>

      {/* Image area */}
      <div
        className="w-full flex-1 flex items-center justify-center px-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={`${BASE_PATH}/${folder}/${photos[current]}`}
          alt={`사진 ${current + 1}`}
          className="max-w-full max-h-[80vh] object-contain transition-transform duration-200"
          style={{ transform: `translateX(${offsetX}px)` }}
          draggable={false}
        />
      </div>

      {/* Nav arrows (desktop) */}
      {current > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          className="absolute left-2 top-1/2 -translate-y-1/2 text-white/60 text-3xl w-10 h-10 flex items-center justify-center"
        >
          ‹
        </button>
      )}
      {current < photos.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60 text-3xl w-10 h-10 flex items-center justify-center"
        >
          ›
        </button>
      )}
    </div>
  );
}
