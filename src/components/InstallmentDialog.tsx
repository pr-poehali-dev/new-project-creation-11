import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { usePhoneInput } from "@/hooks/usePhoneInput";

const INSTALLMENT_API_URL = "https://functions.poehali.dev/105583ec-94ba-4c0d-aea6-ec429a1a024d";

export interface InstallmentTariff {
  id: string;
  title: string;
}

interface InstallmentDialogProps {
  tariff: InstallmentTariff | null;
  onClose: () => void;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const InstallmentDialog = ({ tariff, onClose }: InstallmentDialogProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [done, setDone] = useState(false);

  const {
    phone,
    setPhone,
    phoneIntl,
    phoneTouched,
    setPhoneTouched,
    isPhoneValid,
    handlePhoneChange,
    handlePhoneKeyDown,
    switchToRuPhone,
    placeholder: phonePlaceholder,
  } = usePhoneInput();

  if (!tariff) return null;

  function handleClose() {
    setName("");
    setEmail("");
    setPhone("+7");
    setError(null);
    setDone(false);
    onClose();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Укажите имя");
      return;
    }
    if (!email.trim() || !isValidEmail(email)) {
      setError("Укажите корректный email");
      return;
    }
    if (!phone.trim() || !isPhoneValid(phone)) {
      setPhoneTouched(true);
      setError("Укажите корректный номер телефона");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(INSTALLMENT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tariff_id: tariff!.id,
          tariff_title: tariff!.title,
          user_name: name.trim(),
          user_email: email.trim(),
          user_phone: phone.trim(),
        }),
      });
      if (!res.ok) throw new Error();
      setDone(true);
    } catch {
      setError("Не удалось отправить заявку. Попробуйте ещё раз чуть позже");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={!!tariff} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-md border-none bg-[#FBF6F0] p-0 text-[#2B2420]">
        <div className="p-6 md:p-7">
          {done ? (
            <div className="py-4 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#E3EFE7] text-[#2F7A52]">
                <Icon name="CheckCircle2" size={28} />
              </div>
              <p className="mb-2 font-['Montserrat',sans-serif] text-lg font-bold text-[#2B2420]">
                Заявка отправлена
              </p>
              <p className="text-sm text-[#6b5d52]">
                Инна свяжется с вами, чтобы согласовать оплату частями
              </p>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="font-['Montserrat',sans-serif] text-xl font-bold text-[#2B2420]">
                  Заявка для связи
                </DialogTitle>
                <DialogDescription className="text-[#8A7864]">{tariff.title}</DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div>
                  <Label htmlFor="id-name" className="mb-1 block text-[#3d332b]">
                    Имя
                  </Label>
                  <Input
                    id="id-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Как к вам обращаться"
                    className="border-[#E2D3C0] bg-white text-[#2B2420]"
                  />
                </div>
                <div>
                  <Label htmlFor="id-email" className="mb-1 block text-[#3d332b]">
                    Email
                  </Label>
                  <Input
                    id="id-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Для связи"
                    className="border-[#E2D3C0] bg-white text-[#2B2420]"
                  />
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <Label htmlFor="id-phone" className="block text-[#3d332b]">
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
                    id="id-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    onKeyDown={handlePhoneKeyDown}
                    onBlur={() => setPhoneTouched(true)}
                    placeholder={phonePlaceholder}
                    className={`bg-white text-[#2B2420] ${
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

                {error && <p className="text-sm font-medium text-[#DC2626]">{error}</p>}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#2F7A52] py-3.5 font-['Montserrat',sans-serif] text-sm font-bold text-[#2F7A52] transition hover:bg-[#E3EFE7] disabled:opacity-60 md:text-base"
                >
                  {isLoading ? "Отправляем..." : "Отправить заявку"}
                </button>
              </form>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InstallmentDialog;