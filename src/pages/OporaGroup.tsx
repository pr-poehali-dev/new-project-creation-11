import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import PaymentDialog, { type PaymentTariff } from "@/components/PaymentDialog";
import InstallmentDialog, { type InstallmentTariff } from "@/components/InstallmentDialog";

const TG_LINK = "https://t.me/InnaFaloleevaPsy";
const MAX_LINK = "https://max.ru/u/f9LHodD0cOJIgWOUouYOS4DRLnxCzZ6q0hBRUtxF5_x1OBiH8_wn5BE6qS4";
const IMG = "/opora";

const YM_IDS = [112325163];
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

function priceLabel(value: number) {
  return `${value.toLocaleString("ru-RU")} ₽`;
}

const RESULTS = [
  "Улучшишь отношения с близкими и с собой",
  "Проживёшь обиду, злость, вину — не разрушаясь",
  "Снизишь тревожность",
  "Научишься выражать чувства и отстаивать границы экологично: без скандалов, без вины, без страха",
  "Разберёшься с деньгами: почему их «всегда мало» или «страшно тратить на себя»",
  "Найдёшь свои ресурсы — те, что уже внутри",
  "Вернёшь лёгкость и гармонию с собой",
];

const FORMAT_POINTS = [
  { text: "12 недель — 12 актуальных каждому тем" },
  { text: "Закрытая группа с постоянным составом до 10 человек" },
  { text: "1 онлайн-встреча в неделю в фиксированный день (2–2,5 часа)" },
  { text: "Каждая встреча:", chips: ["теория", "групповая практика", "разбор"] },
  { text: "Поддержка в чате группы от темы к теме" },
];

const PARTICIPATION = [
  "Кто-то готов говорить и делиться",
  "Кому-то комфортнее сначала слушать и наблюдать",
  "Можно узнать себя в истории другого человека",
  "Чужой разбор может неожиданно подсветить именно вашу ситуацию",
  "В группе проявляются привычные сценарии общения с другими людьми",
  "Не обязательно быть в центре внимания, чтобы происходили изменения",
];

const BIO = [
  "Интегративный психолог",
  "Клинический психолог, ЭОТ-терапевт",
  "Автор трансформационной программы для женщин «10 шагов к себе настоящей»",
  "Более 2400 часов практики с клиентами",
];

const GROUP = {
  id: "group",
  title: "Терапевтическая группа «Опора»",
  subtitle: "До 10 участников, 12 встреч (3 месяца) по 2–2,5 часа",
  features: [
    "12 тематических встреч (2–2,5 часа)",
    "1 встреча в неделю в фиксированный день",
    "Закрытая группа с постоянным составом",
    "Поддержка и общение в чате группы",
    "Каждая встреча: теория, групповая практика, разбор",
  ],
  price: 35700,
  priceOld: 51000,
  discountPercent: 30,
  goal: "home_pricing_group_click",
};

const OporaGroup = () => {
  const [paymentTariff, setPaymentTariff] = useState<PaymentTariff | null>(null);
  const [installmentTariff, setInstallmentTariff] = useState<InstallmentTariff | null>(null);

  useEffect(() => {
    document.title = "Терапевтическая группа «Опора» — Инна Фалолеева";
    let desc = document.querySelector('meta[name="description"]');
    if (!desc) {
      desc = document.createElement("meta");
      desc.setAttribute("name", "description");
      document.head.appendChild(desc);
    }
    desc.setAttribute(
      "content",
      "Терапевтическая группа «Опора» на 12 недель для женщин, которые снаружи выглядят сильными, а внутри — на пределе. Ведущая — интегративный психолог Инна Фалолеева."
    );
  }, []);

  function openPayment() {
    setPaymentTariff({ id: GROUP.id, title: GROUP.title, amount: GROUP.price });
    ymGoal(GROUP.goal);
    ymGoal("opora_page_payment_click");
  }

  function openInstallment() {
    setInstallmentTariff({ id: GROUP.id, title: GROUP.title });
    ymGoal(`${GROUP.goal}_installment`);
    ymGoal("opora_page_request_click");
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden break-words bg-[#FBF7F1] font-['Inter',sans-serif] text-[#2B3A3B]">
      <header className="sticky top-0 z-40 border-b border-[#E5D9BE] bg-[#FBF7F1]/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-5 py-3">
          <Link to="/" className="font-['Montserrat',sans-serif] text-sm font-bold md:text-base">
            Инна Фалолеева <span className="font-normal text-[#6F8A8B]">· психолог</span>
          </Link>
          <button
            onClick={() => {
              scrollTo("opora-form");
              ymGoal("opora_page_header_cta");
            }}
            className="rounded-lg bg-[#3E8587] px-4 py-2 font-['Montserrat',sans-serif] text-xs font-bold text-white transition hover:bg-[#2F6B6D] md:text-sm"
          >
            Записаться
          </button>
        </div>
      </header>

      <section className="relative isolate overflow-hidden">
        <img src={`${IMG}/hands-bg.jpg`} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-[#2F6B6D]/55" />
        <div className="mx-auto grid max-w-5xl items-center gap-8 px-5 py-14 md:grid-cols-[1.2fr_0.8fr] md:py-24">
          <div>
            <h1 className="font-['Montserrat',sans-serif] text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-6xl">
              Терапевтическая группа <span className="text-[#E5D9BE]">«Опора»</span>
            </h1>
            <div className="mt-8 inline-block rounded-[2rem] bg-[#E5D9BE]/90 px-5 py-3 text-[#2B3A3B] md:px-6 md:py-4">
              <p className="font-['Montserrat',sans-serif] text-base font-bold md:text-lg">Интегративный психолог</p>
              <p className="font-['Montserrat',sans-serif] text-base md:text-lg">Фалолеева Инна</p>
            </div>
          </div>
          <div className="mx-auto h-52 w-52 overflow-hidden rounded-full border-4 border-white shadow-xl md:h-64 md:w-64">
            <img src={`${IMG}/inna-round.jpg`} alt="Инна Фалолеева" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden">
        <img src={`${IMG}/circle.jpg`} alt="Участницы группы в кругу" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-[#5B3A22]/30" />
        <div className="mx-auto flex min-h-[420px] max-w-5xl flex-col items-center justify-center gap-6 px-5 py-14 text-center md:min-h-[520px]">
          <p className="font-['Montserrat',sans-serif] text-2xl font-bold text-white md:text-3xl">Терапевтическая группа</p>
          <p className="max-w-lg rounded-[2.5rem] bg-[#3E8587]/85 px-6 py-5 font-['Montserrat',sans-serif] text-base font-bold leading-snug text-white sm:px-8 sm:py-6 sm:text-lg md:text-xl">
            Для женщин, которые снаружи выглядят сильными и собранными, а внутри — на пределе
          </p>
          <p className="font-['Montserrat',sans-serif] text-3xl font-semibold text-white md:text-4xl">12 недель</p>
        </div>
      </section>

      <section className="px-5 py-14 md:py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <div className="mx-auto w-64 overflow-hidden rounded-t-[8rem] rounded-b-[3rem] border-4 border-[#3E8587]/40 shadow-lg md:w-full md:max-w-xs">
            <img src={`${IMG}/compass.jpg`} alt="Компас на дороге" className="h-full w-full object-cover" />
          </div>
          <div>
            <h2 className="mb-5 font-['Montserrat',sans-serif] text-xl font-bold text-[#E8734A] sm:text-2xl md:text-3xl">
              Пройдя терапию в группе, ты:
            </h2>
            <ul className="space-y-3">
              {RESULTS.map((r) => (
                <li key={r} className="flex items-start gap-3">
                  <Icon name="Target" size={18} className="mt-1 shrink-0 text-[#3E8587]" />
                  <span className="text-base text-[#2F6B6D]">{r}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-['Montserrat',sans-serif] text-lg font-bold text-[#E8734A] md:text-xl">
              Не ищи опору — стань ею для себя!
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#F1E9D6] px-5 py-14 md:py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="mb-6 inline-block rounded-[2rem] bg-[#E5D9BE] px-5 py-3 font-['Montserrat',sans-serif] text-base font-bold text-[#3E8587] shadow-sm md:px-6 md:py-4 md:text-xl">
              Терапевтическая группа на 12 недель
            </p>
            <ul className="space-y-5">
              {FORMAT_POINTS.map((p) => (
                <li key={p.text} className="flex items-start gap-3">
                  <span className="mt-2 h-3 w-3 shrink-0 rounded-full bg-[#F2A98C]" />
                  <div>
                    <p className="text-base text-[#2B3A3B] md:text-lg">{p.text}</p>
                    {p.chips && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {p.chips.map((c) => (
                          <span key={c} className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-[#E8734A]">
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mx-auto w-full max-w-sm overflow-hidden rounded-[3rem] rounded-bl-[8rem] shadow-lg">
            <img src={`${IMG}/online.jpg`} alt="Онлайн-встреча группы" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-[#2F6B6D]">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-5 py-14 text-white md:grid-cols-[1.1fr_0.9fr] md:py-20">
          <div className="space-y-8">
          <div>
            <p className="font-['Montserrat',sans-serif] text-xl font-bold md:text-2xl">
              В группе твои привычные сценарии проявляются прямо в моменте —
            </p>
            <p className="mt-2 text-base leading-relaxed text-white/90 md:text-lg">
              где ты молчишь, спасаешь, ждёшь одобрения, сравниваешь, соглашаешься, не можешь принять поддержку,
              обесцениваешь то, что с тобой происходит.
            </p>
            <p className="mt-5 font-['Montserrat',sans-serif] text-xl font-bold md:text-2xl">
              И главное — с этим можно работать здесь же. В живом контакте.
            </p>
            <p className="mt-1 text-base text-white/90 md:text-lg">Не унося домой.</p>
          </div>
          <div className="max-w-md rounded-[2.5rem] bg-[#E5D9BE]/90 p-6 text-[#2B3A3B]">
            <p className="font-['Montserrat',sans-serif] text-lg font-bold text-[#2F6B6D] md:text-xl">
              Заметить, назвать, попробовать иначе. И увидеть, что мир не рушится.
            </p>
            <p className="mt-2 text-base text-[#3E8587]">Так рождается опора — на себя и на других.</p>
          </div>
          </div>
          <div className="mx-auto w-full max-w-sm overflow-hidden rounded-[3rem] rounded-tl-[8rem] shadow-xl">
            <img src={`${IMG}/sprouts-hands.jpg`} alt="Руки с ростками" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="px-5 py-14 md:py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <div className="relative mx-auto w-full max-w-xs overflow-hidden rounded-[3rem]">
            <img src={`${IMG}/puzzle.jpg`} alt="Пазл" className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 rounded-t-[3rem] bg-[#F2A98C] px-6 pb-6 pt-8">
              <p className="font-['Montserrat',sans-serif] text-lg font-bold leading-snug text-white">
                В группе у каждого свой комфортный способ участия
              </p>
            </div>
          </div>
          <ul className="space-y-4">
            {PARTICIPATION.map((p) => (
              <li key={p} className="flex items-start gap-3 text-base text-[#2B3A3B] md:text-lg">
                <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[#3E8587]" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white px-5 py-14 md:py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[0.7fr_1.3fr]">
          <div className="mx-auto w-60 overflow-hidden rounded-t-[8rem] rounded-b-[2rem] border-2 border-[#F2A98C]/60 md:w-full md:max-w-xs">
            <img src={`${IMG}/hug.jpg`} alt="Поддержка группы" className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="font-['Montserrat',sans-serif] text-lg font-semibold leading-snug text-[#E8734A] sm:text-xl md:text-2xl">
              В группу можно прийти с одной темой, а самое важное открытие сделать совсем в другой!
            </p>
            <p className="mt-6 font-['Montserrat',sans-serif] text-xl font-medium leading-snug text-[#3E8587] sm:text-2xl md:text-4xl">
              Почувствуй поддержку группы, стань опорой для себя самой.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#3E8587] px-5 py-14 md:py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <div className="mx-auto w-full max-w-xs overflow-hidden rounded-[3rem] rounded-tr-[8rem] shadow-xl">
            <img src={`${IMG}/inna.jpg`} alt="Инна Фалолеева" className="h-full w-full object-cover" />
          </div>
          <div className="rounded-[2rem] bg-white p-5 sm:p-7 md:rounded-[3rem] md:p-9">
            <p className="font-['Montserrat',sans-serif] text-xl font-bold text-[#3E8587] md:text-2xl">
              Ведущая группы Инна Фалолеева
            </p>
            <ul className="mt-4 space-y-2.5">
              {BIO.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-[#3E8587] md:text-base">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#E5D9BE]" />
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-[#2B3A3B] md:text-base">
              Чтобы задать вопрос или уточнить детали программы, напиши слово{" "}
              <span className="font-bold text-[#E8734A]">ГРУППА</span> или{" "}
              <span className="font-bold text-[#E8734A]">ОПОРА</span> в личные сообщения
            </p>
            <p className="mt-3 text-sm text-[#6F8A8B]">Ваш психолог Фалолеева Инна.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="https://t.me/FaloleevaPsy"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => ymGoal("opora_page_tg_click")}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-[#3E8587] px-5 py-2.5 font-['Montserrat',sans-serif] text-sm font-bold text-[#3E8587] transition hover:bg-[#E3F0F0]"
              >
                <Icon name="Send" size={16} />
                Написать в Telegram
              </a>
              <a
                href={MAX_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => ymGoal("opora_page_max_click")}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-[#3E8587] px-5 py-2.5 font-['Montserrat',sans-serif] text-sm font-bold text-[#3E8587] transition hover:bg-[#E3F0F0]"
              >
                <Icon name="MessageCircle" size={16} />
                Написать в MAX
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="opora-form" className="bg-[#F1E9D6] px-5 py-14 md:py-20">
        <div className="mx-auto max-w-xl">
          <h2 className="mb-2 text-center font-['Montserrat',sans-serif] text-2xl font-bold text-[#2F6B6D] md:text-3xl">
            Записаться в группу
          </h2>
          <p className="mb-8 text-center text-sm font-medium text-[#E8734A] md:text-base">
          </p>

          <div className="flex flex-col rounded-[2rem] border border-[#E5D9BE] bg-white p-6 shadow-sm md:p-8">
            <p className="font-['Montserrat',sans-serif] text-lg font-bold text-[#2B3A3B] md:text-xl">{GROUP.title}</p>
            <p className="mb-4 text-sm text-[#6F8A8B]">{GROUP.subtitle}</p>

            <ul className="mb-5 space-y-2.5">
              {GROUP.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <Icon name="Check" size={16} className="mt-0.5 shrink-0 text-[#3E8587]" />
                  <span className="text-sm text-[#2B3A3B]">{f}</span>
                </li>
              ))}
            </ul>

            <div className="mb-4 flex flex-wrap items-baseline gap-2">
              <span className="text-base font-medium text-[#6F8A8B] line-through">{priceLabel(GROUP.priceOld)}</span>
              <span className="font-['Montserrat',sans-serif] text-3xl font-extrabold text-[#2B3A3B]">
                {priceLabel(GROUP.price)}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#FDE9E0] px-2.5 py-1 text-xs font-bold text-[#E8734A]">
                🏷️ −{GROUP.discountPercent}%
              </span>
            </div>

            <button
              type="button"
              onClick={openPayment}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3E8587] py-3.5 font-['Montserrat',sans-serif] text-sm font-bold text-white transition hover:bg-[#2F6B6D] md:text-base"
            >
              Записаться и оплатить
              <Icon name="ArrowRight" size={18} />
            </button>

            <button
              type="button"
              onClick={openInstallment}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#3E8587] py-3.5 font-['Montserrat',sans-serif] text-sm font-bold text-[#3E8587] transition hover:bg-[#E3F0F0] md:text-base"
            >
              Оставить заявку
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-[#FBF7F1] px-5 py-8">
        <div className="mx-auto max-w-5xl text-center text-xs text-[#6F8A8B]">
          <p>
            <Link to="/personal-data-policy" className="underline hover:text-[#3E8587]">
              Политика обработки персональных данных
            </Link>{" "}
            ·{" "}
            <Link to="/privacy-policy" className="underline hover:text-[#3E8587]">
              Политика конфиденциальности
            </Link>
          </p>
          <p className="mt-3 font-semibold text-[#2F6B6D]">ИП Фалолеева Инна Николаевна</p>
          <p>ИНН 505003981273 · ОГРНИП 318502700074326</p>
          <p className="mt-2">© {new Date().getFullYear()} ИП Фалолеева Инна Николаевна</p>
        </div>
      </footer>

      <PaymentDialog tariff={paymentTariff} onClose={() => setPaymentTariff(null)} />
      <InstallmentDialog tariff={installmentTariff} onClose={() => setInstallmentTariff(null)} />
    </div>
  );
};

export default OporaGroup;