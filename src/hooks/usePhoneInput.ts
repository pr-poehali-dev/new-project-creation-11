import { useState } from "react";

/**
 * Хук для поля телефона с маской РФ (+7 (___) ___-__-__) и возможностью
 * свободного ввода зарубежного номера. Логика идентична форме /efir09.
 */
export function usePhoneInput(initial = "+7") {
  const [phone, setPhone] = useState(initial);
  const [phoneIntl, setPhoneIntl] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  function formatPhoneInput(value: string): string {
    let digits = value.replace(/\D/g, "");
    if (digits.startsWith("8")) digits = "7" + digits.slice(1);
    if (!digits.startsWith("7")) digits = "7" + digits;
    digits = digits.slice(0, 11);
    const rest = digits.slice(1);
    let result = "+7";
    if (rest.length > 0) result += " (" + rest.slice(0, 3);
    if (rest.length >= 3) result += ")";
    if (rest.length > 3) result += " " + rest.slice(3, 6);
    if (rest.length > 6) result += "-" + rest.slice(6, 8);
    if (rest.length > 8) result += "-" + rest.slice(8, 10);
    return result;
  }

  // Свободный ввод для зарубежных номеров: разрешаем только +, цифры, пробелы, скобки и дефисы,
  // ограничиваем 15 цифрами (максимум по стандарту E.164)
  function sanitizeIntlPhone(value: string): string {
    const hasPlus = value.trim().startsWith("+");
    const cleaned = value.replace(/[^\d\-\s()]/g, "");
    let digitCount = 0;
    let result = hasPlus ? "+" : "";
    for (const ch of cleaned) {
      if (/\d/.test(ch)) {
        digitCount++;
        if (digitCount > 15) break;
      }
      result += ch;
    }
    return result;
  }

  function isPhoneValid(value: string): boolean {
    const digits = value.replace(/\D/g, "");
    if (phoneIntl) {
      return digits.length >= 7 && digits.length <= 15;
    }
    return /^7\d{10}$/.test(digits);
  }

  function handlePhoneChange(rawValue: string) {
    if (phoneIntl) {
      setPhone(sanitizeIntlPhone(rawValue));
      return;
    }
    const plusMatch = rawValue.trim().match(/^\+(\d+)/);
    if (plusMatch && !plusMatch[1].startsWith("7") && !plusMatch[1].startsWith("8")) {
      setPhoneIntl(true);
      setPhone(sanitizeIntlPhone(rawValue));
      return;
    }
    setPhone(formatPhoneInput(rawValue));
  }

  function switchToIntlPhone(remainingDigits: string) {
    setPhoneIntl(true);
    setPhone(remainingDigits ? "+" + remainingDigits : "+");
  }

  function switchToRuPhone() {
    setPhoneIntl(false);
    setPhone("+7");
    setPhoneTouched(false);
  }

  function handlePhoneKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (phoneIntl) return;
    if (e.key !== "Backspace" && e.key !== "Delete") return;
    const input = e.currentTarget;
    const pos = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? 0;
    const value = input.value;

    if (pos !== end) {
      if (pos < 2) {
        e.preventDefault();
        const digits = value.replace(/\D/g, "");
        const rest = digits.startsWith("7") ? digits.slice(1) : digits;
        switchToIntlPhone(rest);
      }
      return;
    }

    let idx = -1;
    if (e.key === "Backspace") {
      if (pos <= 2) {
        e.preventDefault();
        const digits = value.replace(/\D/g, "");
        const rest = digits.startsWith("7") ? digits.slice(1) : digits;
        switchToIntlPhone(rest);
        return;
      }
      idx = pos - 1;
      while (idx > 1 && !/\d/.test(value[idx])) idx--;
      if (idx <= 1) {
        e.preventDefault();
        const digits = value.replace(/\D/g, "");
        const rest = digits.startsWith("7") ? digits.slice(1) : digits;
        switchToIntlPhone(rest);
        return;
      }
    } else {
      if (pos >= value.length) return;
      idx = pos;
      while (idx < value.length && !/\d/.test(value[idx])) idx++;
      if (idx <= 1 || idx >= value.length) {
        e.preventDefault();
        const digits = value.replace(/\D/g, "");
        const rest = digits.startsWith("7") ? digits.slice(1) : digits;
        switchToIntlPhone(rest);
        return;
      }
    }
    e.preventDefault();
    const digitsBefore = value.slice(0, idx).replace(/\D/g, "").length;
    const newRaw = value.slice(0, idx) + value.slice(idx + 1);
    const formatted = formatPhoneInput(newRaw);
    setPhone(formatted);
    requestAnimationFrame(() => {
      let count = 0;
      let newPos = formatted.length;
      for (let i = 0; i < formatted.length; i++) {
        if (/\d/.test(formatted[i])) {
          count++;
          if (count === digitsBefore + 1) {
            newPos = i;
            break;
          }
        }
      }
      input.setSelectionRange(newPos, newPos);
    });
  }

  return {
    phone,
    setPhone,
    phoneIntl,
    phoneTouched,
    setPhoneTouched,
    isPhoneValid,
    handlePhoneChange,
    handlePhoneKeyDown,
    switchToRuPhone,
    placeholder: phoneIntl ? "+___________" : "+7 (___) ___-__-__",
  };
}
