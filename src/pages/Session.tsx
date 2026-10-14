import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Checkbox } from "@/components/ui/checkbox";
import { usePhoneInput } from "@/hooks/usePhoneInput";

const SESSION_API_URL = "https://functions.poehali.dev/7dc5d326-432a-4892-bf20-6eccc22d01f4";
const TG_LINK = "https://t.me/InnaFaloleevaPsy";
const MAX_LINK = "https://max.ru/join/Um75KJ9X-7yhUGiL1A0c6GPOup5OBhMH_PkMiyEZDjk";
const YM_IDS = [112325163];

type YmFn = (id: number, event: string, goal: string) => void;
function ymGoal(goal: string) {
  if (typeof window === "undefined") return;
  const ym = (window as unknown as Record<string, unknown>)["ym"] as YmFn | undefined;
  if (typeof ym !== "function") return;
  YM_IDS.forEach((id) => ym(id, "reachGoal", goal));
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const IMG = {
  hero: "/session/hero.webp",
  sand: "/session/sand.webp",
  tired: "/session/tired.webp",
  relations: "/session/relations.webp",
  irritation: "/session/irritation.webp",
  online: "/session/online.webp",
  lotus: "/session/lotus.webp",
  inna: "/session/inna.webp",
};

const H2 = "font-['Montserrat',sans-serif] text-2xl font-extrabold uppercase leading-tight tracking-wide md:text-4xl";
const EYEBROW = "mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A47A] md:text-sm";
const BTN =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-[#C9A47A] px-8 py-4 font-['Montserrat',sans-serif] text-sm font-bold uppercase tracking-wide text-[#1F3A35] transition hover:bg-[#D8B78F] md:text-base";

const RECOGNIZE = [
  "Сил ни на что не хватает, даже после выходных или отпуска",
  "Стали часто раздражаться, срываться на близких, а потом жалеть об этом",
  "Постоянно тревожитесь и не можете расслабиться",
  "Отношения с партнёром или близкими складываются не так, как хотелось бы",
  "Потеряли интерес к тому, что раньше радовало",
  "Чувствуете, что застряли на месте и не знаете, как изменить ситуацию",
];

const GAINS = [
  "Глубже разобраться в том, что вас действительно беспокоит",
  "Увидеть возможные причины своих трудностей",
  "Заметить важные взаимосвязи, которые раньше оставались незамеченными",
  "Понять, с чего можно начать изменения",
];

const STEPS = [
  { title: "Вы рассказываете", text: "Что происходит в вашей жизни, что вас беспокоит и что хотелось бы изменить." },
  {
    title: "Мы вместе исследуем",
    text: "Я задаю вопросы, которые помогают нам увидеть возможные причины ваших переживаний, реакций и повторяющихся ситуаций.",
  },
  { title: "Намечаем первые шаги", text: "Вместе определяем, на что стоит обратить внимание и в каком направлении двигаться дальше." },
];

const DEEPER = [
  {
    img: IMG.tired,
    tag: "Усталость",
    q: "Кажется, что вы просто устали?",
    a: "За усталостью может стоять постоянное внутреннее напряжение.",
  },
  {
    img: IMG.irritation,
    tag: "Раздражение",
    q: "Считаете себя слишком раздражительным человеком?",
    a: "За раздражением могут скрываться накопленные переживания.",
  },
  {
    img: IMG.relations,
    tag: "Отношения",
    q: "Не понимаете, почему отношения снова складываются одинаково?",
    a: "За этим могут стоять привычные сценарии поведения.",
  },
];

const NEXT = [
  { title: "«10 шагов к себе настоящей»", text: "Индивидуальная трансформационная программа." },
  { title: "«Опора»", text: "Терапевтическая группа из 12 встреч." },
];

const Session = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [done, setDone] = useState(false);

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

  useEffect(() => {
    document.title = "Бесплатная стартовая встреча — психолог Инна Фалолеева";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "Бесплатная индивидуальная онлайн-встреча 30 минут с интегративным психологом Инной Фалолеевой: понять, что стоит за вашими трудностями и с чего начать изменения",
    );
  }, []);

  const goForm = (goal: string) => {
    ymGoal(goal);
    scrollTo("session-form");
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Укажите имя");
      return;
    }
    if (!email.trim() || !isValidEmail(email.trim())) {
      setError("Укажите корректный email");
      return;
    }
    if (!phone.trim() || !isPhoneValid(phone)) {
      setPhoneTouched(true);
      setError("Укажите корректный номер телефона");
      return;
    }
    if (!consent) {
      setError("Необходимо согласие на обработку персональных данных");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(SESSION_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_name: name.trim(),
          user_email: email.trim(),
          user_phone: phone.trim(),
        }),
      });
      if (!res.ok) throw new Error();
      ymGoal("session_lead");
      ymGoal("session_form_submit");
      setDone(true);
    } catch {
      setError("Не удалось отправить заявку. Попробуйте ещё раз чуть позже");
    } finally {
      setIsLoading(false);
    }
  }

  const fieldCls =
    "w-full rounded-xl border bg-white/95 px-4 py-3.5 text-base text-[#1F3A35] outline-none placeholder:text-[#8A9A94] focus:border-[#C9A47A]";

  return (
    <div className="min-h-screen bg-[#F5EFE6] font-['Inter',sans-serif] text-[#1F3A35]">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#1F3A35]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <Link to="/" className="font-['Montserrat',sans-serif] text-sm font-bold text-white md:text-base">
            Инна Фалолеева
          </Link>
          <button
            type="button"
            onClick={() => goForm("session_header_cta")}
            className="rounded-lg bg-[#C9A47A] px-4 py-2 font-['Montserrat',sans-serif] text-xs font-bold uppercase tracking-wide text-[#1F3A35] transition hover:bg-[#D8B78F] md:text-sm"
          >
            Записаться
          </button>
        </div>
      </header>

      <section className="bg-[#1F3A35] px-5 py-12 text-white md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <p className={EYEBROW}>Индивидуально онлайн</p>
            <h1 className="mb-6 font-['Montserrat',sans-serif] text-4xl font-extrabold uppercase leading-[1.05] md:text-6xl">
              Бесплатная
              <br />
              <span className="text-[#C9A47A]">стартовая</span>
              <br />
              встреча
            </h1>
            <p className="mb-8 max-w-md text-base leading-relaxed text-white/85 md:text-lg">
              30 минут, чтобы понять, что может стоять за Вашими трудностями и с чего начать изменения.
            </p>
            <button type="button" onClick={() => goForm("session_hero_cta")} className={BTN}>
              Записаться на встречу
              <Icon name="ArrowRight" size={18} />
            </button>
            <p className="mt-8 text-sm text-white/70">
              Интегративный психолог
              <br />
              <span className="font-['Montserrat',sans-serif] text-base font-bold text-white">Инна Фалолеева</span>
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm md:max-w-md">
            <img
              src={IMG.hero}
              alt="Психолог Инна Фалолеева"
              className="aspect-[3/4] w-full rounded-3xl object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className={EYEBROW}>С чем вы можете ко мне прийти</p>
          <h2 className={`${H2} mb-8`}>Возможно, Вам знакомо…</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {RECOGNIZE.map((t) => (
              <div key={t} className="flex items-start gap-3 rounded-2xl border border-[#E4D8C6] bg-white p-5 shadow-sm">
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#C9A47A]" />
                <p className="text-sm leading-relaxed md:text-base">{t}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-base font-medium leading-relaxed text-[#2F6B5F] md:text-lg">
            Неважно, с какой трудностью Вы столкнулись. Мы начнём с того, что беспокоит именно Вас.
          </p>
        </div>
      </section>

      <section className="bg-[#E9DFCF] px-5 py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <img
            src={IMG.sand}
            alt=""
            loading="lazy"
            className="mx-auto aspect-[3/4] w-full max-w-sm rounded-3xl object-cover shadow-xl md:order-2"
          />
          <div className="md:order-1">
            <p className={EYEBROW}>Что вы можете получить за 30 минут</p>
            <h2 className={`${H2} mb-2`}>Понимание причин</h2>
            <h2 className={`${H2} mb-8 text-[#2F6B5F]`}>и первых шагов</h2>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#8A6B45]">
              Уже на первой встрече вы можете:
            </p>
            <ul className="mb-8 space-y-3">
              {GAINS.map((g) => (
                <li key={g} className="flex items-start gap-3">
                  <Icon name="Check" size={20} className="mt-0.5 shrink-0 text-[#2F6B5F]" />
                  <span className="text-sm leading-relaxed md:text-base">{g}</span>
                </li>
              ))}
            </ul>
            <p className="font-['Montserrat',sans-serif] text-base font-bold md:text-lg">
              Иногда самые важные открытия начинаются с одного разговора.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#1F3A35] px-5 py-14 text-white md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className={EYEBROW}>Как проходит наша встреча</p>
          <h2 className={`${H2} mb-10`}>30 минут — только о вас и вашей ситуации</h2>
          <div className="grid items-start gap-8 md:grid-cols-[1fr_320px]">
            <div className="space-y-5">
              {STEPS.map((s, i) => (
                <div key={s.title} className="flex gap-5 rounded-2xl border border-white/15 bg-white/5 p-5 md:p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#C9A47A] font-['Montserrat',sans-serif] text-xl font-extrabold text-[#1F3A35]">
                    {i + 1}
                  </div>
                  <div>
                    <p className="mb-1 font-['Montserrat',sans-serif] text-lg font-bold">{s.title}</p>
                    <p className="text-sm leading-relaxed text-white/80 md:text-base">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <img
              src={IMG.online}
              alt="Онлайн-встреча"
              loading="lazy"
              className="hidden aspect-square w-full rounded-3xl object-cover md:block"
            />
          </div>
          <p className="mt-8 text-center font-['Montserrat',sans-serif] text-sm font-bold uppercase tracking-[0.2em] text-[#C9A47A]">
            Индивидуально • Онлайн • Бесплатно
          </p>
        </div>
      </section>

      <section className="px-5 py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className={EYEBROW}>Иногда причина глубже, чем кажется</p>
          <h2 className={`${H2} mb-3`}>То, что вас беспокоит, может быть лишь частью картины</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {DEEPER.map((d) => (
              <div key={d.tag} className="overflow-hidden rounded-3xl border border-[#E4D8C6] bg-white shadow-sm">
                <img src={d.img} alt={d.tag} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                <div className="p-5">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C9A47A]">{d.tag}</p>
                  <p className="mb-2 font-['Montserrat',sans-serif] text-base font-bold leading-snug">{d.q}</p>
                  <p className="text-sm leading-relaxed text-[#4A5F58]">{d.a}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center font-['Montserrat',sans-serif] text-base font-bold md:text-lg">
            Иногда то, что кажется самой проблемой, оказывается лишь её проявлением.
          </p>
        </div>
      </section>

      <section className="bg-[#E9DFCF] px-5 py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[320px_1fr]">
          <img
            src={IMG.lotus}
            alt=""
            loading="lazy"
            className="mx-auto aspect-square w-full max-w-xs rounded-3xl object-cover shadow-xl"
          />
          <div>
            <p className={EYEBROW}>Что будет после встречи</p>
            <h2 className={`${H2} mb-4`}>Первый шаг не обязывает вас идти дальше</h2>
            <p className="mb-6 text-sm leading-relaxed md:text-base">
              Если после нашей встречи вы захотите продолжить работу, я помогу подобрать подходящий формат.
            </p>
            <div className="mb-6 grid gap-4 sm:grid-cols-2">
              {NEXT.map((n) => (
                <div key={n.title} className="rounded-2xl bg-white p-5 shadow-sm">
                  <p className="mb-1 font-['Montserrat',sans-serif] text-base font-bold text-[#2F6B5F]">{n.title}</p>
                  <p className="text-sm text-[#4A5F58]">{n.text}</p>
                </div>
              ))}
            </div>
            <p className="font-['Montserrat',sans-serif] text-sm font-bold md:text-base">
              Решение о продолжении работы всегда остаётся за Вами.
            </p>
          </div>
        </div>
      </section>

      <section id="session-form" className="bg-[#1F3A35] px-5 py-14 text-white md:py-20">
        <div className="mx-auto grid max-w-6xl items-start gap-10 md:grid-cols-2">
          <div>
            <p className={EYEBROW}>Давайте начнём с вашей истории</p>
            <h2 className={`${H2} mb-6`}>Я — Инна Фалолеева</h2>
            <img
              src={IMG.inna}
              alt="Инна Фалолеева"
              loading="lazy"
              className="mx-auto mb-6 aspect-[3/4] w-full max-w-sm rounded-3xl object-cover"
            />
            <p className="mb-3 text-sm leading-relaxed text-white/85 md:text-base">
              Интегративный психолог, клинический психолог, ЭОТ-терапевт. Более 2400 часов практики с клиентами.
            </p>
            <p className="mb-3 text-sm leading-relaxed text-white/85 md:text-base">
              Автор трансформационной программы «10 шагов к себе настоящей».
            </p>
            <p className="font-['Montserrat',sans-serif] text-base font-bold text-[#C9A47A]">
              Иногда один разговор помогает увидеть то, что долго оставалось незамеченным.
            </p>
          </div>

          <div className="rounded-3xl bg-[#F5EFE6] p-6 text-[#1F3A35] shadow-2xl md:p-8">
            {done ? (
              <div className="py-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#1F3A35] text-[#C9A47A]">
                  <Icon name="CheckCircle2" size={32} />
                </div>
                <p className="mb-2 font-['Montserrat',sans-serif] text-xl font-bold">Заявка отправлена</p>
                <p className="text-sm text-[#4A5F58]">
                  Инна свяжется с вами, чтобы согласовать время бесплатной стартовой встречи
                </p>
              </div>
            ) : (
              <>
                <h3 className="mb-1 font-['Montserrat',sans-serif] text-xl font-extrabold uppercase leading-tight md:text-2xl">
                  Записаться на бесплатную встречу
                </h3>
                <p className="mb-6 text-sm text-[#4A5F58]">30 минут • Индивидуально • Онлайн</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="session-name" className="mb-1 block text-sm font-medium">
                      Имя
                    </label>
                    <input
                      id="session-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Как к вам обращаться"
                      className={`${fieldCls} border-[#E4D8C6]`}
                    />
                  </div>
                  <div>
                    <label htmlFor="session-email" className="mb-1 block text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="session-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Для связи"
                      className={`${fieldCls} border-[#E4D8C6]`}
                    />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <label htmlFor="session-phone" className="block text-sm font-medium">
                        Телефон
                      </label>
                      {phoneIntl && (
                        <button
                          type="button"
                          onClick={switchToRuPhone}
                          className="text-xs font-medium text-[#2F6B5F] underline-offset-2 hover:underline"
                        >
                          Ввести российский номер
                        </button>
                      )}
                    </div>
                    <input
                      id="session-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      onKeyDown={handlePhoneKeyDown}
                      onBlur={() => setPhoneTouched(true)}
                      placeholder={phonePlaceholder}
                      className={`${fieldCls} ${phoneTouched && !isPhoneValid(phone) ? "border-red-500" : "border-[#E4D8C6]"}`}
                    />
                    {phoneIntl && !(phoneTouched && !isPhoneValid(phone)) && (
                      <p className="mt-1 text-xs text-[#6B7C76]">Зарубежный номер</p>
                    )}
                    {phoneTouched && !isPhoneValid(phone) && (
                      <p className="mt-1 text-xs text-red-500">
                        Пожалуйста, проверьте корректность введённого телефона
                      </p>
                    )}
                  </div>

                  <label className="flex items-start gap-3 text-xs text-[#4A5F58]">
                    <Checkbox checked={consent} onCheckedChange={(v) => setConsent(v === true)} className="mt-0.5" />
                    <span>
                      Согласен(на) на{" "}
                      <Link
                        to="/personal-data-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-[#2F6B5F]"
                      >
                        обработку персональных данных
                      </Link>{" "}
                      согласно{" "}
                      <Link
                        to="/privacy-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-[#2F6B5F]"
                      >
                        политике конфиденциальности
                      </Link>
                    </span>
                  </label>

                  {error && <p className="text-sm font-medium text-[#DC2626]">{error}</p>}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1F3A35] py-4 font-['Montserrat',sans-serif] text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#2F6B5F] disabled:opacity-60 md:text-base"
                  >
                    {isLoading ? "Отправляем..." : "Отправить заявку"}
                    {!isLoading && <Icon name="ArrowRight" size={18} />}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-[#162B27] px-5 py-8 text-center text-white">
        <p className="mb-4 font-['Montserrat',sans-serif] text-sm font-bold">Ваш психолог, Инна Фалолеева</p>
        <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
          <a
            href={TG_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => ymGoal("session_footer_telegram_click")}
            className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-4 py-2 text-sm transition hover:bg-white/10"
          >
            <Icon name="Send" size={16} />
            Telegram
          </a>
          <a
            href={MAX_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => ymGoal("session_footer_max_click")}
            className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-4 py-2 text-sm transition hover:bg-white/10"
          >
            <Icon name="MessageCircle" size={16} />
            MAX
          </a>
        </div>
        <p className="text-xs text-white/60">@InnaFaloleevaPsy</p>
      </footer>
    </div>
  );
};

export default Session;