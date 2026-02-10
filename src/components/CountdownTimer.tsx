"use client";

import { useState, useEffect } from "react";

const WEDDING_DATE = new Date("2026-06-13T16:00:00+09:00").getTime();

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      const now = Date.now();
      const diff = WEDDING_DATE - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="flex justify-center gap-3">
        {["일", "시간", "분", "초"].map((label) => (
          <div key={label} className="text-center">
            <div className="bg-white rounded-lg px-4 py-3 min-w-[60px] border border-cream-dark">
              <span
                className="text-2xl font-bold text-red-wedding"
                style={{ fontFamily: "var(--font-handwriting)" }}
              >
                --
              </span>
            </div>
            <span className="text-xs text-brown-light mt-1 block">{label}</span>
          </div>
        ))}
      </div>
    );
  }

  const items = [
    { value: timeLeft.days, label: "일" },
    { value: timeLeft.hours, label: "시간" },
    { value: timeLeft.minutes, label: "분" },
    { value: timeLeft.seconds, label: "초" },
  ];

  return (
    <div className="flex justify-center gap-3">
      {items.map(({ value, label }) => (
        <div key={label} className="text-center">
          <div className="bg-white rounded-lg px-4 py-3 min-w-[60px] border border-cream-dark">
            <span
              className="text-2xl font-bold text-red-wedding"
              style={{ fontFamily: "var(--font-handwriting)" }}
            >
              {String(value).padStart(2, "0")}
            </span>
          </div>
          <span className="text-xs text-brown-light mt-1 block">{label}</span>
        </div>
      ))}
    </div>
  );
}
