import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useEfir09Schedule, formatEfir09Dates } from "@/lib/efir09-dates";

const TG_LINK = "https://t.me/FaloleevaPsybot?start=dl-1788885417801";
const MAX_LINK = "https://max.ru/id505003981273_bot?start=dl-17889736833afaa9562bfc";

const EMAIL_PROVIDERS: { domains: string[]; url: string; name: string }[] = [
  { domains: ["gmail.com", "googlemail.com"], url: "https://mail.google.com/mail/u/0/#inbox", name: "Gmail" },
  {
    domains: ["yandex.ru", "yandex.com", "ya.ru", "yandex.by", "yandex.kz", "yandex.ua"],
    url: "https://mail.yandex.ru/",
    name: "Яндекс Почту",
  },
  { domains: ["mail.ru", "inbox.ru", "list.ru", "bk.ru"], url: "https://e.mail.ru/inbox/", name: "Почту Mail.ru" },
  { domains: ["rambler.ru"], url: "https://mail.rambler.ru/", name: "Рамблер Почту" },
  {
    domains: ["outlook.com", "hotmail.com", "live.com", "msn.com"],
    url: "https://outlook.live.com/mail/",
    name: "Outlook",
  },
  { domains: ["icloud.com", "me.com"], url: "https://www.icloud.com/mail", name: "iCloud Почту" },
  { domains: ["yahoo.com"], url: "https://mail.yahoo.com/", name: "Yahoo Почту" },
];

function findMailProvider(email: string) {
  const domain = (email.split("@")[1] || "").toLowerCase().trim();
  if (!domain) return null;
  return EMAIL_PROVIDERS.find((p) => p.domains.includes(domain)) || null;
}

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
  const { day1Date, day2Date } = useEfir09Schedule();
  const { rangeLabel } = formatEfir09Dates(day1Date, day2Date);
  const [mailProvider, setMailProvider] = useState<{ url: string; name: string } | null>(null);
  const [mailChecked, setMailChecked] = useState(false);

  useEffect(() => {
    let email: string | null = null;
    try {
      email = localStorage.getItem("faloleeva_efir09_email");
    } catch {
      email = null;
    }
    setMailProvider(email ? findMailProvider(email) : null);
    setMailChecked(true);
  }, []);

  useEffect(() => {
    document.title = "Регистрация почти завершена — интенсив «Сильная снаружи, сломанная внутри»";
    ymGoal("efir09_thankyou_view");

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://faloleeva.ru/thank-you");

    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    robots.setAttribute("content", "noindex, nofollow");
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
              {rangeLabel}, 19:00 мск
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

          {/* ── Block 4: email confirmation ── */}
          <div className="mt-8 rounded-2xl border border-[#EEE0D2] bg-white p-6 shadow-sm md:p-8">
            <div className="mb-4 flex items-center justify-center gap-2 text-[#2F7A52]">
              <Icon name="Mail" size={22} />
              <h2 className="font-['Montserrat',sans-serif] text-lg font-bold text-[#2B2420] md:text-xl">
                Подтвердите участие по почте
              </h2>
            </div>
            <p className="text-center text-sm leading-relaxed text-[#6b5d52] md:text-base">
              Вам на указанный при регистрации email придёт письмо с темой:{" "}
              <span className="font-semibold text-[#2B2420]">
                «[Подтвердите участие] "Сильная снаружи, сломанная внутри". Онлайн-эфир с психологом
                Инной Фалолеевой»
              </span>
              . Пожалуйста, нажмите синюю кнопку в письме, чтобы подтвердить участие в эфире.
            </p>
            <p className="mt-3 text-center text-sm text-[#6b5d52] md:text-base">Письмо выглядит вот так:</p>
            <img
              src="https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/ec485e34-6936-4575-9bc0-e4cdfb29ad12.png"
              alt="Пример письма для подтверждения регистрации на эфир"
              className="mx-auto mt-4 w-full max-w-md rounded-xl border border-[#EEE0D2] shadow-sm"
            />
            <p className="mt-4 text-center text-sm font-bold text-[#2F7A52] md:text-base">
              Пожалуйста, проверьте почту
            </p>
            <div className="mt-5 flex flex-col items-center gap-2">
              {(!mailChecked || mailProvider) && (
                <button
                  type="button"
                  onClick={() => {
                    if (!mailProvider) return;
                    ymGoal("efir09_thankyou_open_mail_click");
                    window.open(mailProvider.url, "_blank", "noopener");
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#2F7A52] px-6 py-3.5 font-['Montserrat',sans-serif] text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#1F5E3F] md:text-base"
                >
                  {mailProvider ? `Перейти в ${mailProvider.name}` : "Перейти в почту"}
                </button>
              )}
              <p className="text-center text-xs leading-relaxed text-[#8A7864]">
                Письмо пришло от <b>inka_f@mail.ru</b>. Если не видите его во «Входящих» —
                проверьте папку «Спам».
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-[#EEE0D2] bg-white px-5 py-6 text-center text-xs text-[#8A7864]">
        © {new Date().getFullYear()} ИП Фалолеева Инна Николаевна · ИНН 505003981273
      </footer>
    </div>
  );
};

export default ThankYou;