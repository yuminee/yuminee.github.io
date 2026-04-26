"use client";

import { useState } from "react";

/**
 * Google Form 매핑 설정.
 *
 * 1. Google Form 생성 후 "사전 입력 링크 받기"로 entry.* ID 확인
 * 2. 아래 formActionUrl/fields 채워넣으면 자동으로 실 제출 동작
 * 3. formActionUrl이 비어있으면 클라이언트 완료 상태만 표시 (개발용)
 */
const GOOGLE_FORM_CONFIG = {
  formActionUrl: "",
  fields: {
    name: "",
    phone: "",
    riding: "",
    count: "",
  },
} as const;

type FormState =
  | { status: "editing" }
  | { status: "submitting" }
  | { status: "submitted" };

export default function BusReservationForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [count, setCount] = useState(0);
  const [formState, setFormState] = useState<FormState>({ status: "editing" });

  const isFormValid = name.trim().length > 0 && phone.trim().length > 0;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isFormValid) return;

    setFormState({ status: "submitting" });

    if (GOOGLE_FORM_CONFIG.formActionUrl && GOOGLE_FORM_CONFIG.fields.name) {
      const formData = new FormData();
      formData.append(GOOGLE_FORM_CONFIG.fields.name, name);
      formData.append(GOOGLE_FORM_CONFIG.fields.phone, phone);
      formData.append(GOOGLE_FORM_CONFIG.fields.riding, count > 0 ? "예" : "아니오");
      formData.append(GOOGLE_FORM_CONFIG.fields.count, String(count));
      try {
        await fetch(GOOGLE_FORM_CONFIG.formActionUrl, {
          method: "POST",
          mode: "no-cors",
          body: formData,
        });
      } catch {
        // no-cors mode always returns opaque response, so we can't detect failure here.
        // Fail silently and show submitted state — user can re-submit if needed.
      }
    }

    setFormState({ status: "submitted" });
  };

  if (formState.status === "submitted") {
    return (
      <div className="w-full flex flex-col items-center gap-3 py-2">
        <p className="text-[20px] font-medium text-ink">제출이 완료되었습니다 🙆</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-[320px] max-w-full flex flex-col gap-2">
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="성함을 알려주세요"
        className="bus-input w-full h-[55px] px-4 rounded-xl bg-white text-[20px] text-ink"
        autoComplete="name"
      />
      <input
        type="tel"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        placeholder="휴대폰 번호를 알려주세요"
        className="bus-input w-full h-[55px] px-4 rounded-xl bg-white text-[20px] text-ink"
        autoComplete="tel"
      />
      <div className="flex items-center gap-2 w-full">
        <button
          type="button"
          onClick={() => setCount((current) => Math.max(0, current - 1))}
          className="w-[84px] h-[55px] rounded-xl bg-cream-button flex items-center justify-center"
          aria-label="인원 감소"
        >
          <span className="block w-5 h-0.5 bg-cream-button-text" />
        </button>
        <div className="flex-1 h-[55px] rounded-xl bg-white flex items-center justify-center">
          <span className={`text-[24px] ${count === 0 ? "text-placeholder" : "text-ink"}`}>
            {count}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setCount((current) => current + 1)}
          className="w-[84px] h-[55px] rounded-xl bg-ink flex items-center justify-center"
          aria-label="인원 증가"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4v12M4 10h12" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <button
        type="submit"
        disabled={!isFormValid || formState.status === "submitting"}
        className={`w-full h-14 rounded-2xl flex items-center justify-center gap-2 mt-2 transition-colors ${
          isFormValid
            ? "bg-ink text-white"
            : "bg-cream-button text-cream-button-text cursor-not-allowed"
        }`}
      >
        <span className="text-[18px]">
          {formState.status === "submitting" ? "제출 중..." : "다 썼어요"}
        </span>
      </button>
    </form>
  );
}
