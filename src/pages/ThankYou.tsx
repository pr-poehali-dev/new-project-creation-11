import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const TG_LINK = "https://t.me/InnaFaloleevaPsy";
const MAX_LINK = "https://max.ru/join/Um75KJ9X-7yhUGiL1A0c6GPOup5OBhMH_PkMiyEZDjk";

const YM_IDS = [112325163];
type YmFn = (id: number, event: string, goal: string) => void;
function ymGoal(goal: string) {
  if (typeof window === "undefined") return;
  const ym = (window as Record<string, unknown>)["ym"] as YmFn | undefined;
  if (typeof ym !== "function") return;
  YM_IDS.forEach((id) => ym(id, "reachGoal", goal));
}

const ThankYou = () => {
  const [params] = useSearchParams();
  const name = params.get("name");

  useEffect(() => {
    document.title = "Регистрация почти завершена — интенсив «Сильная снаружи, сломанная внутри»";
    ymGoal("efir09_thankyou_view");
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#FBF6F0] font-['Inter',sans-serif] text-[#2B2420]">
      <header className="border-b border-[#EFE0CE] bg-[#FBF6F0]/90 px-5 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <span className="font-['Montserrat',sans-serif] text-sm font-bold md:text-base">
            Инна Фалолеева <span className="font-normal text-[#8A7864]">· психолог</span>
          </span>
          <Link
            to="/efir09"
            className="text-xs font-semibold text-[#8A7864] transition hover:text-[#2F7A52] md:text-sm"
          >
            На главную
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center px-5 py-14 md:py-20">
        <div className="mx-auto w-full max-w-2xl">
          {/* ── Block 1: confirmation ── */}
          <div className="mb-10 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#E3EFE7] text-[#2F7A52]">
              <Icon name="CheckCircle2" size={32} />
            </div>
            <h1 className="mb-3 font-['Montserrat',sans-serif] text-3xl font-extrabold leading-tight md:text-4xl">
              Регистрация почти завершена{name ? `, ${name}` : ""}!
            </h1>
            <p className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 font-['Montserrat',sans-serif] text-sm font-bold shadow-sm md:text-base">
              <Icon name="Calendar" size={18} className="text-[#2F7A52]" />
              22 и 23 сентября, 19:00 мск
            </p>
          </div>

          {/* ── Block 2: motivation ── */}
          <div className="mb-8 rounded-2xl border border-[#EEE0D2] bg-white p-6 text-center shadow-sm md:p-8">
            <h2 className="mb-3 font-['Montserrat',sans-serif] text-xl font-bold md:text-2xl">
              Чтобы завершить регистрацию и забрать бонус — выберите удобный мессенджер
            </h2>
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-[#6b5d52] md:text-base">
              В боте вы получите чек-лист «7 признаков, что вы тащите чужую ответственность», ссылки
              на подключение к обоим дням интенсива и напоминания, чтобы точно не пропустить эфир
            </p>
          </div>

          {/* ── Block 3: messenger buttons ── */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <a
                href={TG_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => ymGoal("efir09_thankyou_telegram_click")}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#229ED9] px-6 py-4 font-['Montserrat',sans-serif] text-base font-bold text-white shadow-lg shadow-[#229ED9]/25 transition hover:-translate-y-0.5 hover:bg-[#1B87BC]"
              >
                <Icon name="Send" size={22} />
                Забрать бонус в Telegram
              </a>
              <p className="mt-2 text-center text-xs text-[#A99C8D]">для перехода включите VPN</p>
            </div>
            <div>
              <a
                href={MAX_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => ymGoal("efir09_thankyou_max_click")}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#3B6DF0] to-[#7B4FE0] px-6 py-4 font-['Montserrat',sans-serif] text-base font-bold text-white shadow-lg shadow-[#7B4FE0]/25 transition hover:-translate-y-0.5 hover:opacity-90"
              >
                <Icon name="MessageCircle" size={22} />
                Забрать бонус в MAX
              </a>
              <p className="mt-2 text-center text-xs text-transparent md:text-xs">&nbsp;</p>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-[#8A7864] md:text-sm">
            Мы также отправили доступ и ссылки на подключение на вашу почту — на случай, если вы
            решите вернуться к письму позже
          </p>
        </div>
      </main>

      <footer className="border-t border-[#EEE0D2] bg-white px-5 py-6 text-center text-xs text-[#8A7864]">
        © {new Date().getFullYear()} ИП Фалолеева Инна Николаевна · ИНН 505003981273
      </footer>
    </div>
  );
};

export default ThankYou;