// components/OtpInputs.tsx
import React, { useEffect, useMemo, useRef } from "react";

type Props = {
  length?: number; // default 6
  value: string; // e.g. "123456"
  onChange: (next: string) => void;
};

export default function OtpInputs({ length = 6, value, onChange }: Props) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const digits = useMemo(() => {
    const arr = Array.from({ length }, (_, i) => value[i] ?? "");
    return arr;
  }, [value, length]);

  // Focus first empty box if none focused (optional nicety)
  useEffect(() => {
    const firstEmpty = digits.findIndex((d) => !d);
    if (firstEmpty >= 0 && !document.activeElement) {
      inputsRef.current[firstEmpty]?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setDigit = (idx: number, char: string) => {
    const clean = char.replace(/\D/g, "").slice(0, 1);
    if (!clean) return;

    const arr = digits.slice();
    arr[idx] = clean;
    const joined = arr.join("");
    onChange(joined);

    // Move cursor to next
    if (idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
      inputsRef.current[idx + 1]?.select?.();
    }
  };

  const handleKeyDown = (
    idx: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const key = e.key;

    if (key === "Backspace") {
      e.preventDefault();
      const arr = digits.slice();

      if (arr[idx]) {
        // clear current
        arr[idx] = "";
        onChange(arr.join(""));
        return;
      }
      // jump back if current is already empty
      if (idx > 0) {
        inputsRef.current[idx - 1]?.focus();
        const arr2 = digits.slice();
        arr2[idx - 1] = "";
        onChange(arr2.join(""));
      }
      return;
    }

    if (key === "ArrowLeft" && idx > 0) {
      e.preventDefault();
      inputsRef.current[idx - 1]?.focus();
      return;
    }
    if (key === "ArrowRight" && idx < length - 1) {
      e.preventDefault();
      inputsRef.current[idx + 1]?.focus();
      return;
    }
  };

  const handlePaste = (
    idx: number,
    e: React.ClipboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;

    const arr = digits.slice();
    for (let i = 0; i < length; i++) {
      const targetIndex = idx + i;
      if (targetIndex >= length) break;
      arr[targetIndex] = pasted[i] ?? arr[targetIndex];
    }
    onChange(arr.join(""));
    const nextFocus = Math.min(idx + pasted.length, length - 1);
    inputsRef.current[nextFocus]?.focus();
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={d}
          onChange={(e) => setDigit(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={(e) => handlePaste(i, e)}
          className="w-12 h-12 text-center text-lg rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
      ))}
    </div>
  );
}
