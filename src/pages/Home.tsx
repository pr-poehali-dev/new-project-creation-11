import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import PaymentDialog, { type PaymentTariff } from "@/components/PaymentDialog";
import InstallmentDialog, { type InstallmentTariff } from "@/components/InstallmentDialog";
/* ─── Constants ─── */
const INNA_PHOTO =
  "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/b6f09e6b-cb1f-4dc5-8be7-c3bb6a44ab98.jpg";
const TG_LINK = "https://t.me/InnaFaloleevaPsy";
const MAX_LINK = "https://max.ru/join/Um75KJ9X-7yhUGiL1A0c6GPOup5OBhMH_PkMiyEZDjk";
const CONTACT_EMAIL = "Inka_f@mail.ru";

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

/* ─── Data ─── */
const PAIN_POINTS = [
  { icon: "🔹", text: "«Все вокруг говорят «ты справишься» — а вы уже не понимаете, откуда брать силы»" },
  { icon: "🔹", text: "Вам проще сделать самой, чем объяснить другому" },
  { icon: "🔹", text: "Трудно попросить о помощи, даже когда совсем тяжело" },
  { icon: "🔹", text: "Не помните, когда в последний раз разрешали себе устать" },
];

const EXPERT_FACTS = [
  {
    icon: "Stethoscope",
    text: "Клинический психолог, практикующий специалист в ЭОТ, ДПДГ и МАК",
  },
  {
    icon: "GraduationCap",
    text: "3400+ часов профильного обучения",
  },
  {
    icon: "Users",
    text: "75+ клиентов и более 2400 часов практики",
  },
  {
    icon: "Route",
    text: "25 лет в финансах → инструктор по рукопашному бою → собственный магазин одежды → психология",
  },
];

const DIPLOMAS = [
  {
    title: "Удостоверение о повышении квалификации",
    subtitle: "Психотерапия пограничного расстройства личности, 72 ч.",
    url: "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/d4432b6c-b0eb-4c7e-8b3b-b92068bb2b28.jpg",
  },
  {
    title: "Удостоверение о повышении квалификации",
    subtitle: "Нарциссическое расстройство личности. Диагностика и методы психотерапии, 72 ч.",
    url: "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/10701ac9-d450-4c01-aa0a-f34839a61410.jpg",
  },
  {
    title: "Диплом ЭОТ",
    subtitle: "Эмоционально-образная терапия, 650 ч.",
    url: "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/8bc06beb-1ef8-4102-9ce0-5110d0fb8843.jpg",
  },
  {
    title: "Диплом «Психолог в социальной сфере»",
    subtitle: "Онлайн-институт Смарт, 450 ч.",
    url: "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/d45dfbfb-ae24-4e6c-a9c9-70c7d47024a7.jpg",
  },
  {
    title: "Диплом ЭОТ — работа с внутренним ребёнком",
    subtitle: "Институт ЭОТ Н. Линде, 650 ч.",
    url: "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/318629d0-c98b-4b12-b666-5de8c4b3be9f.jpg",
  },
  {
    title: "Диплом ДПДГ",
    subtitle: "Метод десенсибилизации и переработки движениями глаз, 340 ч.",
    url: "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/c52f5658-aaa5-4fbf-88eb-6a3a1a94ff92.jpg",
  },
  {
    title: "Удостоверение о повышении квалификации",
    subtitle: "Психология РПП, 108 ч.",
    url: "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/3e532753-4518-41ca-90ad-f7cfa27f7460.jpg",
  },
  {
    title: "Удостоверение о повышении квалификации",
    subtitle: "Психологическая работа с жизненным сценарием, 72 ч.",
    url: "/certs/zhiznenny-scenariy.jpg",
  },
  {
    title: "Сертификат",
    subtitle: "Психологическая работа с состоянием «взрослого», 72 ч.",
    url: "/certs/vzrosliy-sostoyanie.jpg",
  },
];

const METHODS = [
  {
    icon: "Sparkles",
    title: "ЭОТ",
    subtitle: "Эмоционально-образная терапия",
    text: "Когда чувство, которое сложно объяснить словами, мы находим через образ",
  },
  {
    icon: "Eye",
    title: "ДПДГ",
    subtitle: "Десенсибилизация и переработка движением глаз",
    text: "Для работы с травматичным опытом",
  },
  {
    icon: "LayoutGrid",
    title: "МАК",
    subtitle: "Метафорические ассоциативные карты",
    text: "Когда нужно обойти рациональный контроль и посмотреть на ситуацию иначе",
  },
];

type Tariff = {
  id: string;
  title: string;
  subtitle: string;
  intro?: string;
  features?: { text: string; note?: string }[];
  price: number;
  priceOld?: number;
  discountPercent?: number;
  priceInstallment?: number;
  installmentAvailable: boolean;
  goal: string;
};

const TARIFFS: Tariff[] = [
  {
    id: "consultation",
    title: "Индивидуальная консультация",
    subtitle: "1 час, разовая встреча",
    price: 3250,
    priceOld: 7500,
    discountPercent: 50,
    installmentAvailable: false,
    goal: "home_pricing_consultation_click",
  },
  {
    id: "group",
    title: "Терапевтическая группа «Опора»",
    subtitle: "До 10 участников, 12 встреч (3 месяца) по 1,5–2 часа",
    price: 35700,
    priceOld: 51000,
    discountPercent: 30,
    priceInstallment: 51000,
    installmentAvailable: true,
    goal: "home_pricing_group_click",
  },
  {
    id: "program",
    title: "10 шагов к себе настоящей",
    subtitle: "Индивидуальная трансформационная программа, 3 месяца",
    intro:
      "«10 шагов к себе настоящей» — про то, чтобы собрать себя из ролей, в которых давно потеряли себя, а не отдельные разовые встречи без общей линии.",
    features: [
      { text: "1 сессия в неделю, 1,5 ч, 10 сессий всего" },
      { text: "Приоритетное время записи" },
      { text: "Резюме каждой сессии (голос/текст на выбор)", note: "чтобы инсайты не терялись между встречами" },
      { text: "Поддержка в личном чате между сессиями" },
      { text: "Дополнительный созвон 1 раз в неделю, 15–20 мин" },
    ],
    price: 93800,
    priceOld: 134400,
    discountPercent: 30,
    priceInstallment: 134400,
    installmentAvailable: true,
    goal: "home_pricing_program_click",
  },
  {
    id: "retreat",
    title: "Ретрит «Я – НАЧАЛО»",
    subtitle: "Пт–Вс, 16–18 октября, Подмосковье",
    price: 45500,
    priceOld: 65000,
    discountPercent: 30,
    installmentAvailable: false,
    goal: "home_pricing_retreat_click",
  },
];

const TESTIMONIALS = [
  "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/8df6a075-38de-402a-af80-3c30a50e8a88.jpg",
  "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/68300928-00ce-4c12-b074-d6b77e74092e.jpg",
  "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/472b6f92-b435-4df5-8444-ba3f9e058fd5.jpg",
  "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/00dd76b7-b746-4836-983c-b17940fc6c1f.jpg",
  "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/a89f9a64-3fc5-490f-8c43-167698c3b3ad.jpg",
  "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/95c3caaa-fa1e-4d8b-9a32-056e6743729f.jpg",
  "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/ee9e4527-8c7d-475c-9d36-78ba987aeda1.jpg",
  "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/2754b2ce-2497-406b-b932-0e84c0cb1330.jpg",
  "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/1b7b05d6-33ec-49f3-9a62-04a83fcc2627.jpg",
  "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/1d3185fb-7783-4ada-9bbf-68d984a13a54.jpg",
  "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/84505ed1-0129-49a9-9942-9b303f25038f.jpg",
  "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/ce999923-3312-4c61-9773-73f34410d1dc.jpg",
  "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/78e02385-3421-4ca2-b570-f17ebcf54501.jpg",
  "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/34402379-adda-4ae8-b8d7-b2b7a6db5073.jpg",
  "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/b5261e94-8d90-4118-8cbb-2201fb5ef4c9.jpg",
  "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/e8c60e11-6708-416a-ba1a-d65466af4dc8.jpg",
  "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/32a339fe-71cd-4bc1-b639-c13c1d01aeef.jpg",
  "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/d049db61-66f7-490d-a8fb-152422da597f.jpg",
  "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/45fc08a8-454d-422a-96f9-99ba300132d9.jpg",
  "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/7f3d12e0-553a-4cfc-87ab-99e9d068f432.jpg",
  "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/325c699b-786b-4476-bd92-1891ae1e2647.jpg",
  "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/36edd80e-9a5f-4e9f-a3fc-ee8d459841c3.jpg",
  "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/42f81f0e-43e1-4f6e-93a8-0e4f78551e78.jpg",
  "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/208186b3-d460-49c1-94aa-9de09879ee4a.jpg",
  "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/449f3d56-533e-4fb1-aeac-0998e1f89035.jpg",
  "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/21299676-09cc-4e49-bf00-5444bf5a4488.jpg",
  "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/b3f80a54-bbfc-476f-81af-1c5c16d92398.jpg",
];

const FAQ = [
  {
    q: "А если мне не подойдёт метод?",
    a: "Индивидуальная консультация — это разовая встреча без обязательств, на ней вы сразу увидите метод в деле.",
  },
  {
    q: "Дорого?",
    a: "Вопрос не «дорого или нет», а что стоит продолжать жить в сценарии, где вы тащите всё сами. Консультация или группа — это инвестиция в то, чтобы перестать платить этим каждый день.",
  },
  {
    q: "Можно начать с малого?",
    a: "Да — индивидуальная консультация как первый шаг, дальше по желанию.",
  },
  {
    q: "Точно поможет?",
    a: "Кейс Елены и отзывы клиентов — ниже на этой странице, в разделах «Кейс» и «Отзывы».",
  },
];

function priceLabel(n: number) {
  return `${n.toLocaleString("ru-RU")} ₽`;
}

const Home = () => {
  useEffect(() => {
    document.title = "Инна Фалолеева — психолог, с которым становится легче жить";

    const setMeta = (attr: "name" | "property", key: string, content: string) => {
      let tag = document.querySelector(`meta[${attr}="${key}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setMeta(
      "name",
      "description",
      "Инна Фалолеева — клинический психолог. Индивидуальные консультации, терапевтическая группа, программа «10 шагов к себе настоящей». Цены открыты."
    );
    setMeta("property", "og:title", "Инна Фалолеева — психолог, с которым становится легче жить");
    setMeta(
      "property",
      "og:description",
      "Индивидуально или в группе — разберёмся, откуда привычка тащить всё на себе, и что с этим делать."
    );
    setMeta("property", "og:image", "https://faloleeva.ru/og-home.jpg");
    setMeta("property", "og:url", "https://faloleeva.ru/");
    setMeta("name", "twitter:title", "Инна Фалолеева — психолог, с которым становится легче жить");
    setMeta(
      "name",
      "twitter:description",
      "Индивидуально или в группе — разберёмся, откуда привычка тащить всё на себе."
    );
    setMeta("name", "twitter:image", "https://faloleeva.ru/og-home.jpg");

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://faloleeva.ru/");

    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    robots.setAttribute("content", "index, follow");
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const timer = setTimeout(() => scrollTo(hash), 300);
    return () => clearTimeout(timer);
  }, []);

  const [diplomaIndex, setDiplomaIndex] = useState<number | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState<number | null>(null);
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [lightboxApi, setLightboxApi] = useState<CarouselApi>();
  const [activeSlide, setActiveSlide] = useState(0);
  const [paymentTariff, setPaymentTariff] = useState<PaymentTariff | null>(null);
  const [installmentTariff, setInstallmentTariff] = useState<InstallmentTariff | null>(null);

  function openPayment(t: Tariff) {
    setPaymentTariff({ id: t.id, title: t.title, amount: t.price });
    ymGoal(t.goal);
  }

  function openInstallment(t: Tariff) {
    setInstallmentTariff({ id: t.id, title: t.title });
    ymGoal(`${t.goal}_installment`);
  }

  useEffect(() => {
    if (!mainApi) return;
    setActiveSlide(mainApi.selectedScrollSnap());
    const onSelect = () => setActiveSlide(mainApi.selectedScrollSnap());
    mainApi.on("select", onSelect);
    return () => {
      mainApi.off("select", onSelect);
    };
  }, [mainApi]);

  useEffect(() => {
    if (!lightboxApi) return;
    const onSelect = () => setTestimonialIndex(lightboxApi.selectedScrollSnap());
    lightboxApi.on("select", onSelect);
    return () => {
      lightboxApi.off("select", onSelect);
    };
  }, [lightboxApi]);

  return (
    <div className="min-h-screen w-full bg-[#FBF6F0] font-['Inter',sans-serif] text-[#2B2420]">
      {/* ── Sticky header ── */}
      <header className="sticky top-0 z-40 border-b border-[#EFE0CE] bg-[#FBF6F0]/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-3">
          <span className="font-['Montserrat',sans-serif] text-sm font-bold md:text-base">
            Инна Фалолеева <span className="font-normal text-[#8A7864]">· психолог</span>
          </span>
          <div className="ml-auto flex items-center gap-2 md:gap-3">
            <button
              onClick={() => {
                scrollTo("pricing");
                ymGoal("home_header_cta");
              }}
              className="rounded-lg bg-[#2F7A52] px-4 py-2 font-['Montserrat',sans-serif] text-xs font-bold text-white transition hover:bg-[#1F5E3F] md:text-sm"
            >
              Выбрать формат
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section id="hero" className="bg-gradient-to-b from-[#F3E6DA] to-[#FBF6F0] px-5 pb-14 pt-10 md:pb-24 md:pt-16">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div className="text-center md:text-left">
            <h1 className="mb-4 font-['Montserrat',sans-serif] text-3xl font-extrabold leading-tight md:text-5xl">
              Инна Фалолеева — психолог, с которым становится легче жить
            </h1>
            <p className="mx-auto mb-7 max-w-xl text-base text-[#6b5d52] md:mx-0 md:text-xl">
              Если вы привыкли тащить всё на себе — разберёмся, откуда это, и что с этим делать.
              Индивидуально или в группе
            </p>

            <div className="mb-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <button
                onClick={() => {
                  scrollTo("pricing");
                  ymGoal("home_hero_cta_primary");
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-[#2F7A52] px-7 py-4 font-['Montserrat',sans-serif] text-base font-bold text-white shadow-lg shadow-[#2F7A52]/25 transition hover:-translate-y-0.5 hover:bg-[#1F5E3F]"
              >
                Выбрать формат работы
                <Icon name="ArrowRight" size={20} />
              </button>
            </div>

            <p className="text-xs font-medium leading-relaxed text-[#8A7864] md:text-sm">
              Клинический психолог · 3400 часов обучения · 75+ клиентов · 2400+ часов практики
            </p>
          </div>

          <div className="relative mx-auto flex w-full max-w-sm justify-center md:max-w-none">
            <div
              aria-hidden
              className="absolute inset-x-6 top-4 aspect-square rounded-full bg-[#E3EFE7]"
            />
            <img
              src={INNA_PHOTO}
              alt="Инна Фалолеева — клинический психолог"
              className="relative aspect-[4/5] w-full max-w-[360px] rounded-[2rem] object-cover shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* ── Diagnostics ── */}
      <section id="diagnostics" className="bg-[#FBF6F0] px-5 py-14 md:py-20">
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
            Если узнали себя хотя бы в двух пунктах — начните с раздела «Формат работы» ниже
          </p>
        </div>
      </section>

      {/* ── About expert ── */}
      <section id="about" className="bg-white px-5 py-14 md:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 md:grid-cols-[1fr_1.3fr] md:items-center">
            <img
              src={INNA_PHOTO}
              alt="Инна Фалолеева"
              className="mx-auto aspect-[4/5] w-full max-w-[260px] rounded-2xl object-cover shadow-sm md:max-w-none"
            />
            <div>
              <h2 className="mb-4 font-['Montserrat',sans-serif] text-2xl font-bold md:text-3xl">
                Обо мне
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-[#3d332b] md:text-base">
                До психологии у меня было три разных жизни: 25 лет в финансах, работа инструктором
                по рукопашному бою и собственный магазин одежды. В какой-то момент я поняла, что за
                каждым из этих проектов стояло одно и то же — желание разбираться в людях и в себе.
                Так началась психология: диплом клинического психолога, 3400 часов профильного
                обучения и практика в методах ЭОТ, ДПДГ и МАК.
              </p>
              <p className="mb-5 text-sm leading-relaxed text-[#3d332b] md:text-base">
                Я сама прошла путь «сильной», которая тащит всё сама — и знаю эту роль изнутри, а
                не по учебникам.
              </p>
              <ul className="mb-4 space-y-3">
                {EXPERT_FACTS.map((f) => (
                  <li key={f.text} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E3EFE7] text-[#2F7A52]">
                      <Icon name={f.icon} size={16} />
                    </div>
                    <span className="text-sm leading-relaxed text-[#3d332b] md:text-base">{f.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div id="certificates" className="mt-10 scroll-mt-20">
            <h3 className="mb-4 font-['Montserrat',sans-serif] text-lg font-bold md:text-xl">
              Все дипломы и сертификаты
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {DIPLOMAS.map((d, i) => (
                <button
                  key={d.url}
                  type="button"
                  onClick={() => {
                    setDiplomaIndex(i);
                    ymGoal("home_diploma_click");
                  }}
                  className="group text-left"
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-xl border border-[#EEE0D2] bg-white shadow-sm">
                    <img
                      src={d.url}
                      alt={d.title}
                      className="h-full w-full object-cover transition group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-2 text-xs font-semibold text-[#3d332b] md:text-sm">{d.title}</p>
                  <p className="text-xs text-[#8A7864]">{d.subtitle}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Dialog open={diplomaIndex !== null} onOpenChange={(open) => !open && setDiplomaIndex(null)}>
        <DialogContent className="max-w-3xl border-none bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">
            {diplomaIndex !== null ? DIPLOMAS[diplomaIndex].title : "Диплом"}
          </DialogTitle>
          {diplomaIndex !== null && (
            <div className="overflow-hidden rounded-2xl bg-white">
              <img
                src={DIPLOMAS[diplomaIndex].url}
                alt={DIPLOMAS[diplomaIndex].title}
                className="max-h-[80vh] w-full object-contain"
              />
              <div className="p-4 text-center">
                <p className="font-semibold text-[#3d332b]">{DIPLOMAS[diplomaIndex].title}</p>
                <p className="text-sm text-[#8A7864]">{DIPLOMAS[diplomaIndex].subtitle}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ── Method ── */}
      <section id="method" className="bg-[#FBF6F0] px-5 py-14 md:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-3 text-center font-['Montserrat',sans-serif] text-2xl font-bold md:text-3xl">
            Работаю на стыке трёх методов
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-sm text-[#6b5d52] md:text-base">
            Не один универсальный метод на всех — а то, что откликается именно вам
          </p>
          <div className="grid gap-5 sm:grid-cols-3">
            {METHODS.map((m) => (
              <div
                key={m.title}
                className="rounded-2xl border border-[#EEE0D2] bg-white p-6 text-center shadow-sm"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#E3EFE7] text-[#2F7A52]">
                  <Icon name={m.icon} size={22} />
                </div>
                <p className="font-['Montserrat',sans-serif] text-lg font-bold">{m.title}</p>
                <p className="mb-3 text-xs font-medium text-[#8A7864]">{m.subtitle}</p>
                <p className="text-sm leading-relaxed text-[#3d332b]">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case ── */}
      <section id="case" className="bg-[#2B2420] px-5 py-14 text-white md:py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-8 text-center font-['Montserrat',sans-serif] text-2xl font-bold md:text-3xl">
            Кейс Елены
          </h2>
          <div className="space-y-5 rounded-2xl bg-white/5 p-6 md:p-8">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#E8A288]">Запрос</p>
              <p className="text-sm text-white/80 md:text-base">
                Елена пришла не лечить аллергию. Она пришла с непрожитыми эмоциями и напряжением
                в отношениях с близким родственником — то, что давно сидело внутри и не отпускало.
              </p>
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#E8A288]">Метод</p>
              <p className="text-sm text-white/80 md:text-base">
                Эмоционально-образная терапия (ЭОТ) — чувства проявляются через образы, метафоры,
                телесные ощущения. В глубокой точке работы, где чувство стало осязаемым, Елена
                увидела свой образ злости в виде кружочка дыни, которая «жжёт, сжимает горло».
              </p>
            </div>

            <div className="rounded-xl border-2 border-dashed border-white/20 p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-white/50">До</p>
              <p className="text-sm italic text-white/70 md:text-base">
                «Я уже несколько лет не могу есть дыню. Мою любимую. Горло жжёт, трудно дышать»
              </p>
            </div>
            <div className="rounded-xl border-2 border-dashed border-white/20 p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-white/50">После</p>
              <p className="text-sm italic text-white/70 md:text-base">
                «Жизнь прекрасна. Я поела дыню!»
              </p>
              <p className="mt-2 text-xs text-white/50">
                Через несколько дней после сессии Елена съела дыню — без боли, без жжения.
              </p>
            </div>

            <div className="flex items-start gap-3 pt-2">
              <img
                src="https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/ef336b14-eb6d-418f-ad7d-80e871309823.jpg"
                alt="Инна Фалолеева"
                className="h-10 w-10 flex-shrink-0 rounded-full border-2 border-[#E8A288] object-cover md:h-12 md:w-12"
              />
              <div>
                <p className="text-base font-semibold italic text-[#E8A288] md:text-lg">
                  «Мы не «лечили аллергию». Мы возвращали способность быть в контакте с собой»
                </p>
                <p className="mt-1 text-xs text-white/50">— Инна Фалолеева</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="bg-[#FBF6F0] px-5 py-14 md:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-2 text-center font-['Montserrat',sans-serif] text-2xl font-bold md:text-3xl">
            Формат работы
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-center text-sm font-medium text-[#2F7A52] md:text-base">
            Все цены — сразу и без вопросов в директ
          </p>

          <div className="grid gap-5 sm:grid-cols-2">
            {TARIFFS.map((t) => (
              <div
                key={t.id}
                className="flex flex-col rounded-2xl border border-[#EEE0D2] bg-white p-6 shadow-sm md:p-7"
              >
                <p className="font-['Montserrat',sans-serif] text-lg font-bold md:text-xl">{t.title}</p>
                <p className="mb-4 text-sm text-[#8A7864]">{t.subtitle}</p>

                {t.intro && (
                  <p className="mb-4 text-sm leading-relaxed text-[#3d332b]">{t.intro}</p>
                )}

                {t.features && (
                  <ul className="mb-5 space-y-2.5">
                    {t.features.map((f) => (
                      <li key={f.text} className="flex items-start gap-2.5">
                        <Icon name="Check" size={16} className="mt-0.5 shrink-0 text-[#2F7A52]" />
                        <span className="text-sm text-[#3d332b]">
                          {f.text}
                          {f.note && <span className="text-[#8A7864]"> — {f.note}</span>}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-auto">
                  <div className="mb-4">
                    <div className="flex flex-wrap items-baseline gap-2">
                      {t.priceOld !== undefined && (
                        <span className="text-base font-medium text-[#8A7864] line-through">
                          {priceLabel(t.priceOld)}
                        </span>
                      )}
                      <span className="font-['Montserrat',sans-serif] text-3xl font-extrabold">
                        {priceLabel(t.price)}
                      </span>
                      {t.discountPercent !== undefined && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#FBEAE3] px-2.5 py-1 text-xs font-bold text-[#C2542E]">
                          🏷️ −{t.discountPercent}%
                        </span>
                      )}
                    </div>
                    {!t.installmentAvailable && (
                      <p className="mt-1 text-sm text-[#8A7864]">Рассрочка не предусмотрена</p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => openPayment(t)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2F7A52] py-3.5 font-['Montserrat',sans-serif] text-sm font-bold text-white transition hover:bg-[#1F5E3F] md:text-base"
                  >
                    Записаться и оплатить
                    <Icon name="ArrowRight" size={18} />
                  </button>

                  {t.installmentAvailable && (
                    <button
                      type="button"
                      onClick={() => openInstallment(t)}
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#2F7A52] py-3.5 font-['Montserrat',sans-serif] text-sm font-bold text-[#2F7A52] transition hover:bg-[#E3EFE7] md:text-base"
                    >
                      Оставить заявку на рассрочку
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="bg-white px-5 py-14 md:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-2 text-center font-['Montserrat',sans-serif] text-2xl font-bold md:text-3xl">
            Что говорят клиенты о совместной работе
          </h2>
          <p className="mb-6 flex animate-pulse items-center justify-center gap-2 text-center text-sm font-medium text-[#8A7864] md:text-base">
            <Icon name="ArrowLeft" size={16} />
            Листайте
            <Icon name="ArrowRight" size={16} />
          </p>
          <Carousel opts={{ align: "start", loop: true }} setApi={setMainApi} className="relative">
            <CarouselContent>
              {TESTIMONIALS.map((src, i) => (
                <CarouselItem key={src} className="basis-4/5 sm:basis-1/2 md:basis-1/3">
                  <button
                    type="button"
                    onClick={() => {
                      setTestimonialIndex(i);
                      ymGoal("home_testimonial_click");
                    }}
                    className="block w-full overflow-hidden rounded-2xl border border-[#E2D3C0] bg-white shadow-sm transition hover:shadow-md"
                  >
                    <img
                      src={src}
                      alt={`Отзыв клиента №${i + 1}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-1 h-10 w-10 animate-pulse border-2 border-[#E8A288] bg-white text-[#E8A288] md:-left-4" />
            <CarouselNext className="right-1 h-10 w-10 animate-pulse border-2 border-[#E8A288] bg-white text-[#E8A288] md:-right-4" />
          </Carousel>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {TESTIMONIALS.map((src, i) => (
              <button
                key={src}
                type="button"
                aria-label={`Перейти к отзыву №${i + 1}`}
                onClick={() => mainApi?.scrollTo(i)}
                className={`h-2 rounded-full transition-all ${
                  i === activeSlide ? "w-6 bg-[#E8A288]" : "w-2 bg-[#E2D3C0]"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <Dialog
        open={testimonialIndex !== null}
        onOpenChange={(open) => !open && setTestimonialIndex(null)}
      >
        <DialogContent className="max-w-2xl border-none bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">Отзыв клиента</DialogTitle>
          {testimonialIndex !== null && (
            <Carousel
              opts={{ align: "start", loop: true, startIndex: testimonialIndex }}
              setApi={setLightboxApi}
              className="relative"
            >
              <CarouselContent>
                {TESTIMONIALS.map((src, i) => (
                  <CarouselItem key={src}>
                    <div className="overflow-hidden rounded-2xl bg-white">
                      <img
                        src={src}
                        alt={`Отзыв клиента №${i + 1}`}
                        className="max-h-[80vh] w-full object-contain"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-1 h-10 w-10 border-2 border-[#E8A288] bg-white text-[#E8A288] md:-left-12" />
              <CarouselNext className="right-1 h-10 w-10 border-2 border-[#E8A288] bg-white text-[#E8A288] md:-right-12" />
            </Carousel>
          )}
          <p className="mt-3 text-center text-sm text-white/80">
            {testimonialIndex !== null ? testimonialIndex + 1 : 0} / {TESTIMONIALS.length}
          </p>
        </DialogContent>
      </Dialog>

      {/* ── FAQ ── */}
      <section id="faq" className="bg-[#FBF6F0] px-5 py-14 md:py-20">
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
          <p className="mt-6 rounded-xl border border-[#EEE0D2] bg-white p-4 text-center text-sm text-[#5b4d41] md:text-base">
            Никаких «напишите в директ, узнаете цену». Все условия открыты.
          </p>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section id="final-cta" className="bg-[#2F7A52] px-5 py-14 text-white md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 flex max-w-lg items-start justify-center gap-3">
            <img
              src="https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/84c86ce6-edda-4983-996c-e6f6a0e5d6bb.JPG"
              alt="Инна"
              className="h-10 w-10 flex-shrink-0 rounded-full border-2 border-white/40 object-cover md:h-12 md:w-12"
            />
            <p className="text-left text-sm italic text-white/90 md:text-base">
              «Буду рада разобраться в этом вместе с вами, с чего бы вы ни начали» — Инна
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                scrollTo("pricing");
                ymGoal("home_final_cta_primary");
              }}
              className="rounded-xl bg-white px-7 py-4 font-['Montserrat',sans-serif] text-base font-bold text-[#2F7A52] shadow-lg transition hover:-translate-y-0.5"
            >
              Выбрать формат работы
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#EEE0D2] bg-white px-5 py-10">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex justify-center gap-4">
            <a
              href={TG_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => ymGoal("home_footer_telegram_click")}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E3EFE7] text-[#2F7A52] transition hover:bg-[#C9E0D2]"
              aria-label="Telegram"
            >
              <Icon name="Send" size={18} />
            </a>
            <a
              href={MAX_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => ymGoal("home_footer_max_click")}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E3EFE7] text-[#2F7A52] transition hover:bg-[#C9E0D2]"
              aria-label="MAX"
            >
              <Icon name="MessageCircle" size={18} />
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              onClick={() => ymGoal("home_footer_email_click")}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E3EFE7] text-[#2F7A52] transition hover:bg-[#C9E0D2]"
              aria-label="Email"
            >
              <Icon name="Mail" size={18} />
            </a>
          </div>

          <p className="mb-3 text-center text-xs text-[#8A7864]">{CONTACT_EMAIL}</p>

          <p className="mx-auto mb-3 max-w-xl text-center text-xs leading-relaxed text-[#8A7864]">
            <Link to="/personal-data-policy" className="underline hover:text-[#2F7A52]">
              Положение об обработке персональных данных
            </Link>{" "}
            ·{" "}
            <Link to="/privacy-policy" className="underline hover:text-[#2F7A52]">
              Политика конфиденциальности
            </Link>
          </p>

          <div className="mx-auto max-w-xl rounded-xl border border-[#EEE0D2] bg-[#FBF6F0] p-4 text-center text-xs leading-relaxed text-[#8A7864]">
            <p className="font-semibold text-[#5b4d41]">ИП Фалолеева Инна Николаевна</p>
            <p>ИНН 505003981273 · ОГРНИП 318502700074326</p>
          </div>
          <p className="mt-2 text-center text-xs text-[#8A7864]">
            © {new Date().getFullYear()} ИП Фалолеева Инна Николаевна
          </p>
        </div>
      </footer>

      <PaymentDialog tariff={paymentTariff} onClose={() => setPaymentTariff(null)} />
      <InstallmentDialog tariff={installmentTariff} onClose={() => setInstallmentTariff(null)} />
    </div>
  );
};

export default Home;