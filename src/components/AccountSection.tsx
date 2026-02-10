"use client";

import { useState } from "react";
import { WEDDING } from "@/data/wedding";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="text-xs px-3 py-1.5 rounded-full border border-red-wedding/30 text-red-wedding hover:bg-red-wedding hover:text-white transition-colors"
    >
      {copied ? "복사완료 ✓" : "복사"}
    </button>
  );
}

function AccountGroup({
  title,
  accounts,
  isOpen,
  onToggle,
}: {
  title: string;
  accounts: typeof WEDDING.accounts.groom;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-white rounded-lg border border-cream-dark overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-5 py-4 flex items-center justify-between"
      >
        <span
          className="text-lg text-red-wedding font-bold"
          style={{ fontFamily: "var(--font-handwriting)" }}
        >
          {title}
        </span>
        <svg
          className={`w-5 h-5 text-red-wedding transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`accordion-content ${isOpen ? "open" : ""}`}>
        <div>
          <div className="px-5 pb-4 space-y-3">
            {accounts.map((acc) => (
              <div
                key={acc.role}
                className="flex items-center justify-between py-2 border-b border-cream-dark last:border-b-0"
              >
                <div>
                  <span className="text-xs text-brown-light block">
                    {acc.role}
                  </span>
                  <span className="text-sm font-bold">{acc.name}</span>
                  <span className="text-sm text-brown-light ml-2">
                    {acc.bank} {acc.account}
                  </span>
                </div>
                <CopyButton text={`${acc.bank} ${acc.account}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AccountSection() {
  const [groomOpen, setGroomOpen] = useState(false);
  const [brideOpen, setBrideOpen] = useState(false);

  return (
    <section className="px-6 py-10">
      <div className="max-w-sm mx-auto">
        {/* Heart doodle */}
        <div className="flex justify-center mb-4">
          <svg width="32" height="32" viewBox="0 0 32 32" className="text-red-wedding animate-heartbeat">
            <path
              d="M16 28s-1.5-1-3.5-2.7C7.5 21 3 16.5 3 11.5 3 7.4 6 4 10 4c2.5 0 4.5 1.5 6 3.5C17.5 5.5 19.5 4 22 4c4 0 7 3.4 7 7.5 0 5-4.5 9.5-9.5 13.8C17.5 27 16 28 16 28z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </svg>
        </div>

        <h2
          className="text-2xl text-red-wedding text-center mb-2"
          style={{ fontFamily: "var(--font-handwriting)" }}
        >
          마음 전하실 곳
        </h2>
        <p className="text-sm text-brown-light text-center mb-8">
          축하의 마음을 전해주세요
        </p>

        <div className="space-y-4">
          <AccountGroup
            title="🤵 신랑측"
            accounts={WEDDING.accounts.groom}
            isOpen={groomOpen}
            onToggle={() => setGroomOpen(!groomOpen)}
          />
          <AccountGroup
            title="👰 신부측"
            accounts={WEDDING.accounts.bride}
            isOpen={brideOpen}
            onToggle={() => setBrideOpen(!brideOpen)}
          />
        </div>
      </div>
    </section>
  );
}
