"use client";

import { useState } from "react";
import { WEDDING } from "@/data/wedding";

type Account = {
  role: string;
  name: string;
  bank: string;
  account: string;
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-3 h-[35px] rounded-xl bg-copy-bg text-ink text-[14px] font-medium shrink-0"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="3" y="3" width="9" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M5 3V2.5A1.5 1.5 0 0 1 6.5 1H10a1.5 1.5 0 0 1 1.5 1.5V3" stroke="currentColor" strokeWidth="1.4" />
      </svg>
      {copied ? "완료" : "복사"}
    </button>
  );
}

function AccountRow({ account }: { account: Account }) {
  return (
    <div className="flex items-center justify-between gap-4 w-full">
      <div className="flex flex-col flex-1 min-w-0">
        <p className="text-[18px] font-medium text-ink truncate">{account.name}</p>
        <p className="text-[16px] text-ink-soft truncate">
          {account.bank} {account.account}
        </p>
      </div>
      <CopyButton text={`${account.bank} ${account.account}`} />
    </div>
  );
}

function AccountGroup({ title, accounts }: { title: string; accounts: Account[] }) {
  return (
    <div className="w-full px-6 py-6 flex flex-col gap-6">
      <h3 className="font-serif text-[22px] text-ink leading-[135%]">{title}</h3>
      <div className="flex flex-col gap-8">
        {accounts.map((account) => (
          <AccountRow key={account.role} account={account} />
        ))}
      </div>
    </div>
  );
}

export default function AccountSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="w-full bg-cream">
      <div className="flex flex-col items-center gap-12 pt-14 pb-10 px-6">
        <p className="font-sans text-[16px] font-semibold text-ink">마음 전하실 곳</p>
        <div className="flex flex-col items-center gap-8">
          <p className="font-serif text-[28px] text-ink">잘 부탁드립니다.</p>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-7 h-14 rounded-2xl bg-black text-white"
            aria-expanded={open}
          >
            <span className="font-serif text-[18px]">
              {open ? "계좌번호 숨기기" : "계좌번호 보기"}
            </span>
            <svg
              width="16"
              height="8"
              viewBox="0 0 16 8"
              fill="none"
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            >
              <path d="M2 2l6 4 6-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className={`accordion-content ${open ? "open" : ""}`}>
        <div>
          <div className="border-t border-ink" />
          <AccountGroup title="신랑 측에게" accounts={WEDDING.accounts.groom} />
          <div className="border-t border-ink mx-6" />
          <AccountGroup title="신부 측에게" accounts={WEDDING.accounts.bride} />
          <div className="h-6" />
        </div>
      </div>
    </section>
  );
}
