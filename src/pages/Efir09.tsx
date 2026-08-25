import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

/* ─── Constants ─── */
const REGISTER_URL = "https://functions.poehali.dev/4af27964-7aa8-44d4-8e2d-9a5bfea7e8ff";
const WEBINAR_DATE = new Date("2026-09-22T19:00:00+03:00");
const TG_LINK = "https://t.me/InnaFaloleevaPsy";
const MAX_LINK = "https://max.ru/join/Um75KJ9X-7yhUGiL1A0c6GPOup5OBhMH_PkMiyEZDjk";

const YM_IDS = [101026698, 109868001];
type YmFn = (id: number, event: string, goal: string) => void;
function ymGoal(goal: string) {
  if (typeof window === "undefined") return;
  const ym = (window as Record<string, unknown>)["ym"] as YmFn | undefined;
  if (typeof ym !== "function") return;
  YM_IDS.forEach((id) => ym(id, "reachGoal", goal));
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ─── Countdown hook ─── */
function useCountdown(target: Date) {
  const [left, setLeft] = useState(() => target.getTime() - Date.now());
  useEffect(() => {
    const t = setInterval(() => setLeft(target.getTime() - Date.now()), 1000);
    return () => clearInterval(t);
  }, [target]);
  const clamped = Math.max(0, left);
  return {
    days: Math.floor(clamped / 86400000),
    hours: Math.floor((clamped % 86400000) / 3600000),
    minutes: Math.floor((clamped % 3600000) / 60000),
    seconds: Math.floor((clamped % 60000) / 1000),
  };
}

function googleCalendarLink() {
  const text = encodeURIComponent("Вебинар «Сильная снаружи, сломанная внутри»");
  const details = encodeURIComponent(
    "Бесплатный вебинар с Инной Фалолеевой. Ссылка на подключение придёт на вашу почту.",
  );
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=20260922T160000Z/20260922T173000Z&details=${details}`;
}

/* ─── Placeholder for photo/video content ─── */
function Placeholder({
  label,
  icon = "Image",
  className = "",
}: {
  label: string;
  icon?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#D9C3AE] bg-[#F3E9DD] px-4 text-center text-[#8A7864] ${className}`}
    >
      <Icon name={icon} size={26} />
      <span className="text-xs font-medium md:text-sm">{label}</span>
    </div>
  );
}

/* ─── Data ─── */
const PAIN_POINTS = [
  { icon: "🔹", text: "«Все вокруг говорят «ты справишься» — а вы уже не понимаете, откуда брать силы»" },
  { icon: "🔹", text: "Повышение или похвала вызывает не радость, а тревогу «теперь спрос ещё больше»" },
  { icon: "🔹", text: "Вы тащите чужие проблемы быстрее, чем свои — и называете это заботой" },
  { icon: "🔹", text: "Отказать кому-то до сих пор кажется почти преступлением" },
  { icon: "🔹", text: "Не помните, когда в последний раз разрешали себе устать" },
];

const PROGRAM_ITEMS = [
  {
    icon: "Compass",
    title: "Откуда берётся роль «сильной»",
    text: "и почему это не характер, а сценарий",
  },
  {
    icon: "Users",
    title: "4 типа «сильных» женщин",
    text: "Спасатель, Перфекционист, Жертва-трудоголик, «хорошая девочка» — узнаете свой",
  },
  {
    icon: "Brain",
    title: "Внутренний критик",
    text: "откуда голос «ты недостаточно хороша» и как перестать ему подчиняться",
  },
  {
    icon: "Footprints",
    title: "Конкретные шаги выхода из сценария",
    text: "не теория, а то, что можно применить сразу",
  },
  {
    icon: "Sparkles",
    title: "23 сентября — практика в Zoom",
    text: "отдельная встреча для всех зарегистрированных, в дополнение к эфиру",
  },
];

const TESTIMONIALS = [1, 2, 3, 4];

const FAQ = [
  {
    q: "А это точно бесплатно?",
    a: "Да, сам эфир 22 сентября — бесплатный. Программы и консультации — отдельно, цены открыты, без «пишите в личку».",
  },
  {
    q: "А если мне не подойдёт метод?",
    a: "На эфире Инна показывает метод в деле — можно оценить его до записи на консультацию.",
  },
  {
    q: "У меня не будет времени/сил на 3 месяца работы",
    a: "Эфир — не продажа программы, а самостоятельная ценность на 60–90 минут. Решение можно принять уже после него.",
  },
  {
    q: "Будет запись, если не смогу быть онлайн?",
    a: "Да, доступ к записи откроется для всех зарегистрированных.",
  },
];

const Efir09 = () => {
  useEffect(() => {
    document.title = "Бесплатный вебинар «Сильная снаружи, сломанная внутри» — 22 сентября";
  }, []);

  const countdown = useCountdown(WEBINAR_DATE);

  const [utm, setUtm] = useState<Record<string, string>>({});
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtm({
      utm_source: params.get("utm_source") || params.get("src") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_content: params.get("utm_content") || "",
      utm_term: params.get("utm_term") || "",
    });
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim()) {
      setError("Заполните имя и email");
      return;
    }
    if (!consent) {
      setError("Нужно согласие на обработку персональных данных");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(REGISTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          consent,
          ...utm,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ошибка регистрации, попробуйте ещё раз");
      ymGoal("efir09_form_submit");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Что-то пошло не так, попробуйте ещё раз");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#FBF6F0] font-['Inter',sans-serif] text-[#2B2420]">
      {/* ── Sticky header ── */}
      <header className="sticky top-0 z-40 border-b border-[#EFE0CE] bg-[#FBF6F0]/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
          <span className="font-['Montserrat',sans-serif] text-sm font-bold md:text-base">
            Инна Фалолеева <span className="font-normal text-[#8A7864]">· психолог</span>
          </span>
          <button
            onClick={() => {
              scrollTo("register");
              ymGoal("efir09_header_cta");
            }}
            className="rounded-lg bg-[#B5533C] px-4 py-2 font-['Montserrat',sans-serif] text-xs font-bold text-white transition hover:bg-[#98422E] md:text-sm"
          >
            Записаться
          </button>
        </div>
      </header>

      {/* ── Hero ── */}
      <section id="hero" className="bg-gradient-to-b from-[#F3E6DA] to-[#FBF6F0] px-5 pb-14 pt-10 md:pb-24 md:pt-16">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-5 inline-block rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-[#B5533C] shadow-sm md:text-sm">
            Бесплатный онлайн-вебинар
          </span>
          <h1 className="mb-4 font-['Montserrat',sans-serif] text-3xl font-extrabold leading-tight md:text-5xl">
            «Сильная снаружи, сломанная внутри»
          </h1>
          <p className="mx-auto mb-7 max-w-xl text-base text-[#6b5d52] md:text-xl">
            Разберём 4 роли, в которые попадает каждая «сильная» женщина — и конкретные шаги, чтобы
            выйти из сценария, не разваливаясь на части
          </p>

          <div className="mb-7 flex items-center justify-center gap-3 font-['Montserrat',sans-serif] text-lg font-bold md:text-2xl">
            <Icon name="Calendar" size={22} className="text-[#B5533C]" />
            <span>22 сентября · 19:00 мск</span>
          </div>

          <button
            onClick={() => {
              scrollTo("register");
              ymGoal("efir09_hero_cta");
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-[#B5533C] px-8 py-4 font-['Montserrat',sans-serif] text-base font-bold text-white shadow-lg shadow-[#B5533C]/25 transition hover:-translate-y-0.5 hover:bg-[#98422E] md:text-lg"
          >
            Забронировать место
            <Icon name="ArrowRight" size={20} />
          </button>
          <p className="mt-3 text-xs text-[#8A7864] md:text-sm">
            Без спама. Ссылка на подключение придёт на почту
          </p>

          <Placeholder
            label="Фото Инны — живое, не студийное"
            icon="Image"
            className="mx-auto mt-10 aspect-square w-44 rounded-full md:w-56"
          />
        </div>
      </section>

      {/* ── Diagnostics ── */}
      <section id="diagnostics" className="px-5 py-14 md:py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-8 text-center font-['Montserrat',sans-serif] text-2xl font-bold md:text-3xl">
            Это про вас, если...
          </h2>
          <div className="space-y-3">
            {PAIN_POINTS.map((p) => (
              <div
                key={p.text}
                className="flex items-start gap-3 rounded-xl border border-[#EEE0D2] bg-white p-4 shadow-sm"
              >
                <span className="text-lg leading-none">{p.icon}</span>
                <span className="text-sm leading-relaxed text-[#3d332b] md:text-base">{p.text}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm italic text-[#8A7864] md:text-base">
            Если узнали себя хотя бы в двух пунктах — этот эфир для вас
          </p>
        </div>
      </section>

      {/* ── Program ── */}
      <section id="program" className="bg-white px-5 py-14 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-10 text-center font-['Montserrat',sans-serif] text-2xl font-bold md:text-3xl">
            Что будет на эфире
          </h2>
          <div className="space-y-5">
            {PROGRAM_ITEMS.map((item, i) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F3E6DA] text-[#B5533C]">
                  <Icon name={item.icon} size={20} />
                </div>
                <div>
                  <p className="font-['Montserrat',sans-serif] text-base font-bold md:text-lg">
                    {i + 1}. {item.title}
                  </p>
                  <p className="text-sm text-[#6b5d52] md:text-base">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-9 rounded-xl border border-[#EEE0D2] bg-[#FBF6F0] p-5 text-center text-sm text-[#5b4d41] md:text-base">
            <strong>Формат:</strong> без камер участников — только я, теория и ваши вопросы в чате в
            реальном времени
          </div>
        </div>
      </section>

      {/* ── About expert ── */}
      <section id="expert" className="px-5 py-14 md:py-20">
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-[1fr_1.3fr] md:items-center">
          <div className="grid grid-cols-2 gap-3">
            <Placeholder label="Фото Инны №1" icon="Image" className="col-span-2 aspect-video" />
            <Placeholder label="Фото №2" icon="Image" className="aspect-square" />
            <Placeholder label="Фото №3" icon="Image" className="aspect-square" />
          </div>
          <div>
            <h2 className="mb-4 font-['Montserrat',sans-serif] text-2xl font-bold md:text-3xl">
              Об эксперте
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-[#3d332b] md:text-base">
              Инна Фалолеева — клинический психолог, работает в методе ЭОТ (эмоционально-образная
              терапия), ДПДГ и МАК-картах. За плечами 3400+ часов профильного обучения, 75+ клиентов и
              более 2400 часов практики. До психологии — 25 лет в финансах, потом инструктор, потом
              собственный магазин одежды. Инна сама прошла путь «сильной», которая тащит всё сама — и
              знает эту роль изнутри, а не по учебникам.
            </p>
            <div className="flex flex-wrap gap-2">
              {["ЭОТ", "ДПДГ", "МАК"].map((m) => (
                <span
                  key={m}
                  className="rounded-full bg-[#F3E6DA] px-3 py-1 text-xs font-semibold text-[#B5533C]"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Case ── */}
      <section id="case" className="bg-[#2B2420] px-5 py-14 text-white md:py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-8 text-center font-['Montserrat',sans-serif] text-2xl font-bold md:text-3xl">
            Кейс Елены
          </h2>
          <div className="space-y-4 rounded-2xl bg-white/5 p-6 md:p-8">
            <div className="rounded-xl border-2 border-dashed border-white/20 p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-white/50">До</p>
              <p className="text-sm italic text-white/70 md:text-base">
                [Вставьте цитату Елены о состоянии «до» работы с Инной]
              </p>
            </div>
            <div className="rounded-xl border-2 border-dashed border-white/20 p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-white/50">После</p>
              <p className="text-sm italic text-white/70 md:text-base">
                [Вставьте цитату Елены о состоянии «после»]
              </p>
            </div>
            <p className="pt-2 text-center text-base font-semibold italic text-[#E8A288] md:text-lg">
              «Мы не лечили аллергию. Мы возвращали способность быть в контакте с собой»
            </p>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="px-5 py-14 md:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center font-['Montserrat',sans-serif] text-2xl font-bold md:text-3xl">
            Что говорят подписчицы
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {TESTIMONIALS.map((n) => (
              <Placeholder
                key={n}
                label={`Отзыв / скриншот №${n}`}
                icon={n % 2 === 0 ? "MessageSquareText" : "Image"}
                className="aspect-[3/4]"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="bg-white px-5 py-14 md:py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-8 text-center font-['Montserrat',sans-serif] text-2xl font-bold md:text-3xl">
            Частые вопросы
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {FAQ.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`} className="border-[#EEE0D2]">
                <AccordionTrigger className="text-left text-sm font-semibold md:text-base">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[#6b5d52] md:text-base">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="mt-6 rounded-xl border border-[#EEE0D2] bg-[#FBF6F0] p-4 text-center text-sm text-[#5b4d41] md:text-base">
            На эфире и после — никаких «напишите в директ, узнаете цену». Все условия открыты.
          </p>
        </div>
      </section>

      {/* ── Final CTA / countdown ── */}
      <section id="final-cta" className="bg-[#B5533C] px-5 py-14 text-white md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-6 font-['Montserrat',sans-serif] text-2xl font-bold md:text-3xl">
            До эфира осталось
          </h2>
          <div className="mb-8 flex justify-center gap-3 md:gap-5">
            {[
              { label: "дн", value: countdown.days },
              { label: "ч", value: countdown.hours },
              { label: "мин", value: countdown.minutes },
              { label: "сек", value: countdown.seconds },
            ].map((u) => (
              <div key={u.label} className="w-16 rounded-xl bg-white/15 py-3 md:w-20">
                <div className="font-['Montserrat',sans-serif] text-xl font-extrabold md:text-3xl">
                  {String(u.value).padStart(2, "0")}
                </div>
                <div className="text-[10px] uppercase text-white/70 md:text-xs">{u.label}</div>
              </div>
            ))}
          </div>
          <p className="mx-auto mb-8 max-w-lg text-sm italic text-white/90 md:text-base">
            «22 сентября я расскажу то, что обычно говорю только на консультациях один на один. Буду
            рада увидеть вас в эфире» — Инна
          </p>
          <button
            onClick={() => {
              scrollTo("register");
              ymGoal("efir09_final_cta");
            }}
            className="rounded-xl bg-white px-8 py-4 font-['Montserrat',sans-serif] text-base font-bold text-[#B5533C] shadow-lg transition hover:-translate-y-0.5 md:text-lg"
          >
            Забронировать место
          </button>
        </div>
      </section>

      {/* ── Registration form ── */}
      <section id="register" className="px-5 py-14 md:py-20">
        <div className="mx-auto max-w-xl rounded-2xl border border-[#EEE0D2] bg-white p-6 shadow-sm md:p-10">
          {!submitted ? (
            <>
              <h2 className="mb-2 text-center font-['Montserrat',sans-serif] text-2xl font-bold md:text-3xl">
                Регистрация на вебинар
              </h2>
              <p className="mb-6 text-center text-sm text-[#8A7864] md:text-base">
                22 сентября · 19:00 мск · онлайн
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-[#3d332b]">Имя</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Как к вам обращаться"
                    className="w-full rounded-lg border border-[#E2D3C0] bg-[#FBF6F0] px-4 py-3 text-sm outline-none focus:border-[#B5533C] md:text-base"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-[#3d332b]">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Для доступа к трансляции"
                    className="w-full rounded-lg border border-[#E2D3C0] bg-[#FBF6F0] px-4 py-3 text-sm outline-none focus:border-[#B5533C] md:text-base"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-[#3d332b]">
                    Телефон <span className="font-normal text-[#8A7864]">(необязательно)</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 ..."
                    className="w-full rounded-lg border border-[#E2D3C0] bg-[#FBF6F0] px-4 py-3 text-sm outline-none focus:border-[#B5533C] md:text-base"
                  />
                </div>
                <label className="flex items-start gap-3 text-xs text-[#6b5d52] md:text-sm">
                  <Checkbox
                    checked={consent}
                    onCheckedChange={(v) => setConsent(v === true)}
                    className="mt-0.5"
                  />
                  <span>
                    Согласен(на) на обработку персональных данных согласно{" "}
                    <a href="#privacy" className="underline hover:text-[#B5533C]">
                      политике конфиденциальности
                    </a>
                  </span>
                </label>

                {error && <p className="text-sm font-medium text-[#B5533C]">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-[#B5533C] py-4 font-['Montserrat',sans-serif] text-base font-bold text-white transition hover:bg-[#98422E] disabled:opacity-60"
                >
                  {loading ? "Отправляем..." : "Забронировать место"}
                </button>
                <p className="text-center text-xs text-[#8A7864]">
                  Без спама. Ссылка на подключение придёт на почту
                </p>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F3E6DA] text-[#B5533C]">
                <Icon name="Check" size={28} />
              </div>
              <h3 className="mb-2 font-['Montserrat',sans-serif] text-xl font-bold md:text-2xl">
                Вы зарегистрированы!
              </h3>
              <p className="mb-6 text-sm text-[#6b5d52] md:text-base">
                Проверьте почту — туда придёт ссылка на подключение к эфиру 22 сентября. А 23 сентября
                вас ждёт практика в Zoom для всех зарегистрированных.
              </p>
              <a
                href={googleCalendarLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => ymGoal("efir09_add_to_calendar")}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-[#B5533C] px-6 py-3 font-['Montserrat',sans-serif] text-sm font-bold text-[#B5533C] transition hover:bg-[#F3E6DA] md:text-base"
              >
                <Icon name="CalendarPlus" size={18} />
                Добавить в календарь
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer id="privacy" className="border-t border-[#EEE0D2] bg-white px-5 py-10">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex justify-center gap-4">
            <a
              href={TG_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3E6DA] text-[#B5533C] transition hover:bg-[#E8CFB4]"
              aria-label="Telegram"
            >
              <Icon name="Send" size={18} />
            </a>
            <a
              href={MAX_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3E6DA] text-[#B5533C] transition hover:bg-[#E8CFB4]"
              aria-label="MAX"
            >
              <Icon name="MessageCircle" size={18} />
            </a>
          </div>
          <p className="mx-auto mb-3 max-w-xl text-center text-xs leading-relaxed text-[#8A7864]">
            Регистрируясь на вебинар, вы соглашаетесь на обработку персональных данных в целях
            организации и проведения мероприятия. Данные не передаются третьим лицам и используются
            только для связи с вами.
          </p>
          <p className="text-center text-xs text-[#8A7864]">
            [Юридическая информация — заглушка, ИП/самозанятость уточняется] · Контакты: [заглушка]
          </p>
          <p className="mt-2 text-center text-xs text-[#8A7864]">
            © {new Date().getFullYear()} Инна Фалолеева
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Efir09;