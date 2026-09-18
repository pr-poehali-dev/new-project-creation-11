import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";
import { useYookassa } from "@/components/extensions/yookassa/useYookassa";
import { usePhoneInput } from "@/hooks/usePhoneInput";

const PAYMENT_API_URL = "https://functions.poehali.dev/8395f2e6-34d8-44b8-b606-b2409920abd1";

export interface PaymentTariff {
  id: string;
  title: string;
  amount: number;
}

interface PaymentDialogProps {
  tariff: PaymentTariff | null;
  onClose: () => void;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const PaymentDialog = ({ tariff, onClose }: PaymentDialogProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    phone,
    phoneIntl,
    phoneTouched,
    setPhoneTouched,
    isPhoneValid,
    handlePhoneChange,
    handlePhoneKeyDown,
    switchToRuPhone,
    placeholder: phonePlaceholder,
  } = usePhoneInput();

  const { createPayment, isLoading } = useYookassa({ apiUrl: PAYMENT_API_URL });

  if (!tariff) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Укажите имя");
      return;
    }
    if (!email.trim() || !isValidEmail(email)) {
      setError("Укажите корректный email — на него придёт чек об оплате");
      return;
    }
    if (!phone.trim() || !isPhoneValid(phone)) {
      setPhoneTouched(true);
      setError("Укажите корректный номер телефона");
      return;
    }
    if (!consent) {
      setError("Нужно согласие на обработку персональных данных");
      return;
    }

    const returnUrl = `${window.location.origin}/order-status`;

    const response = await createPayment({
      amount: tariff!.amount,
      userEmail: email.trim(),
      userName: name.trim(),
      userPhone: phone.trim(),
      description: tariff!.title,
      returnUrl,
      tariffId: tariff!.id,
    });

    if (response?.payment_url) {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        window.open(response.payment_url, "_blank");
      } else {
        window.location.href = response.payment_url;
      }
    } else {
      setError("Не удалось создать платёж. Попробуйте ещё раз чуть позже");
    }
  }

  return (
    <Dialog open={!!tariff} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md border-none bg-[#FBF6F0] p-0">
        <div className="p-6 md:p-7">
          <DialogHeader>
            <DialogTitle className="font-['Montserrat',sans-serif] text-xl font-bold text-[#2B2420]">
              {tariff.title}
            </DialogTitle>
            <DialogDescription className="text-[#8A7864]">
              {tariff.amount.toLocaleString("ru-RU")} ₽ · оплата через ЮKassa
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <Label htmlFor="pd-name" className="mb-1 block text-[#3d332b]">
                Имя
              </Label>
              <Input
                id="pd-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Как к вам обращаться"
                className="border-[#E2D3C0] bg-white"
              />
            </div>
            <div>
              <Label htmlFor="pd-email" className="mb-1 block text-[#3d332b]">
                Email
              </Label>
              <Input
                id="pd-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Для чека об оплате"
                className="border-[#E2D3C0] bg-white"
              />
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between">
                <Label htmlFor="pd-phone" className="block text-[#3d332b]">
                  Телефон
                </Label>
                {phoneIntl && (
                  <button
                    type="button"
                    onClick={switchToRuPhone}
                    className="text-xs font-medium text-[#2F7A52] underline-offset-2 hover:underline"
                  >
                    Ввести российский номер
                  </button>
                )}
              </div>
              <Input
                id="pd-phone"
                type="tel"
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                onKeyDown={handlePhoneKeyDown}
                onBlur={() => setPhoneTouched(true)}
                placeholder={phonePlaceholder}
                className={`bg-white ${
                  phoneTouched && !isPhoneValid(phone) ? "border-red-500" : "border-[#E2D3C0]"
                }`}
              />
              {phoneIntl && !(phoneTouched && !isPhoneValid(phone)) && (
                <p className="mt-1 text-xs text-[#8A7864]">Зарубежный номер</p>
              )}
              {phoneTouched && !isPhoneValid(phone) && (
                <p className="mt-1 text-xs text-red-500">
                  Пожалуйста, проверьте корректность введённого телефона
                </p>
              )}
            </div>

            <label className="flex items-start gap-3 text-xs text-[#6b5d52]">
              <Checkbox
                checked={consent}
                onCheckedChange={(v) => setConsent(v === true)}
                className="mt-0.5"
              />
              <span>
                Согласен(на) на{" "}
                <Link
                  to="/personal-data-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#2F7A52]"
                >
                  обработку персональных данных
                </Link>{" "}
                согласно{" "}
                <Link
                  to="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#2F7A52]"
                >
                  политике конфиденциальности
                </Link>
              </span>
            </label>

            {error && <p className="text-sm font-medium text-[#DC2626]">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2F7A52] py-3.5 font-['Montserrat',sans-serif] text-sm font-bold text-white transition hover:bg-[#1F5E3F] disabled:opacity-60 md:text-base"
            >
              {isLoading ? "Создаём платёж..." : "Перейти к оплате"}
              {!isLoading && <Icon name="ArrowRight" size={18} />}
            </button>
            <p className="text-center text-xs text-[#8A7864]">
              Вы будете перенаправлены на защищённую страницу оплаты ЮKassa
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;