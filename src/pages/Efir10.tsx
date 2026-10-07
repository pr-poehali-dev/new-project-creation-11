import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

const REGISTER_URL = "https://functions.poehali.dev/4af27964-7aa8-44d4-8e2d-9a5bfea7e8ff";
const TG_LINK = "https://t.me/InnaFaloleevaPsy";
const MAX_LINK = "https://max.ru/join/Um75KJ9X-7yhUGiL1A0c6GPOup5OBhMH_PkMiyEZDjk";
const EXPERT_PHOTO = "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/37160f38-a1d2-45fa-aeb1-540e07378b30.jpg";
const AVATAR_CASE = "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/ef336b14-eb6d-418f-ad7d-80e871309823.jpg";
const AVATAR_QUOTE = "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/84c86ce6-edda-4983-996c-e6f6a0e5d6bb.JPG";
const EVENT_DATE = new Date("2026-10-21T19:00:00+03:00");

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

const YM_ID = 112325163;
function ymGoal(goal: string) {
  if (typeof window === "undefined") return;
  const ym = (window as unknown as Record<string, unknown>)["ym"] as ((id: number, e: string, g: string) => void) | undefined;
  if (typeof ym === "function") ym(YM_ID, "reachGoal", goal);
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useCountdown(target: Date) {
  const [left, setLeft] = useState(() => target.getTime() - Date.now());
  useEffect(() => {
    const t = setInterval(() => setLeft(target.getTime() - Date.now()), 1000);
    return () => clearInterval(t);
  }, [target]);
  const c = Math.max(0, left);
  return {
    days: Math.floor(c / 86400000),
    hours: Math.floor((c % 86400000) / 3600000),
    minutes: Math.floor((c % 3600000) / 60000),
    seconds: Math.floor((c % 60000) / 1000),
  };
}

const PAIN_POINTS = [
  "Не говорите о своих желаниях: боитесь показаться эгоисткой",
  "Соглашаетесь, лишь бы не было конфликта",
  "Проще всё сделать самой, чем попросить",
  "Чувствуете вину, когда отдыхаете",
  "Знаете, чего хотят другие, а чего хотите вы, не знаете",
  "Стыдно тратить на себя",
];

const SCENES = [
  { icon: "☕", title: "В кафе", text: "заказываете то же, что подруга, хотя хотели другое" },
  { icon: "✈️", title: "В отпуске", text: "едете туда, куда удобно всем, а ваше «хочу» даже не прозвучало" },
  { icon: "🌙", title: "Вечером", text: "устали, но слушаете подругу до ночи" },
];

const PROGRAM_ITEMS = [
  { icon: "Users", title: "5 ролей, в которых мы застреваем", text: "Спасатель, Хорошая девочка, Трудоголик, «Самозванец», Жертвующая мать, и какая из них ваша" },
  { icon: "Compass", title: "Откуда это берётся", text: "родительские послания, вина как способ управления, подавленные чувства" },
  { icon: "History", title: "Что досталось нам от истории", text: "почему «я последняя» передаётся из поколения в поколение" },
  { icon: "ShieldQuestion", title: "4 мифа об эгоизме", text: "почему здоровый эгоизм не про «плохо» и не про «разрушение отношений»" },
  { icon: "HeartPulse", title: "Чем опасно жить «последней буквой»", text: "выгорание, сигналы тела, накопленная злость" },
  { icon: "Footprints", title: "5 шагов, как выбирать себя", text: "без скандалов и вины" },
  { icon: "Sparkles", title: "Практика про ваш жизненный сценарий", text: "" },
];

const CHANGES = [
  { icon: "Zap", text: "Появится энергия" },
  { icon: "Handshake", text: "Отношения станут честнее" },
  { icon: "Leaf", text: "Ощущение, что живёте свою жизнь" },
  { icon: "Smile", text: "Тело расслабится, уйдут зажимы" },
  { icon: "Sparkles", text: "Появится место для радости" },
];

const EXPERT_FACTS = [
  { icon: "Stethoscope", text: "Клинический психолог, работает в методе ЭОТ (эмоционально-образная терапия), ДПДГ и МАК-картах" },
  { icon: "GraduationCap", text: "3400+ часов профильного обучения" },
  { icon: "Users", text: "175+ клиентов и более 2400 часов практики" },
  { icon: "Route", text: "До психологии: 25 лет в финансах. Была инструктором по рукопашному бою, вела собственный бизнес" },
  { icon: "HeartHandshake", text: "Инна сама прошла путь «сильной», которая тащит всё сама, и знает эту роль изнутри, а не по учебникам" },
];

const FAQ = [
  { q: "А это точно бесплатно?", a: "Да, эфир бесплатный. В конце я расскажу о форматах работы, но решение принимать необязательно" },
  { q: "А если мне не подойдёт метод?", a: "На эфире вы увидите, как я работаю, и поймёте, откликается ли вам. Для этого достаточно прийти" },
  { q: "Нужно ли включать камеру и говорить?", a: "Нет. Эфир без камер участников, вопросы можно задавать в чате" },
  { q: "Я не эгоистка, мне просто тяжело. Это про меня?", a: "Если вы часто ставите других выше себя и устаёте от этого, да. Про эгоизм поговорим отдельно: он не то, чем кажется" },
  { q: "У меня нет времени и сил на долгую работу над собой", a: "Эфир про первые шаги, которые можно сделать сразу. Дальше решаете вы" },
];

const H2 = "font-['Montserrat',sans-serif] text-[26px] font-bold leading-9 text-[#2B2420] md:text-[30px]";
const CARD = "rounded-2xl border border-[#E2D3C0] bg-white shadow-sm transition hover:shadow-md";
const BTN = "inline-flex h-[60px] items-center justify-center gap-2 rounded-xl px-8 font-['Montserrat',sans-serif] text-lg font-bold transition hover:-translate-y-0.5";
const INPUT = "h-[50px] w-full rounded-xl border border-[#E2D3C0] bg-[#FBF6F0] px-4 text-base outline-none focus:border-[#2F7A52]";

function formatPhone(value: string): string {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("8")) digits = "7" + digits.slice(1);
  if (!digits.startsWith("7")) digits = "7" + digits;
  const rest = digits.slice(1, 11);
  let r = "+7";
  if (rest.length > 0) r += " (" + rest.slice(0, 3);
  if (rest.length >= 3) r += ")";
  if (rest.length > 3) r += " " + rest.slice(3, 6);
  if (rest.length > 6) r += "-" + rest.slice(6, 8);
  if (rest.length > 8) r += "-" + rest.slice(8, 10);
  return r;
}

const Efir10 = () => {
  const navigate = useNavigate();
  const countdown = useCountdown(EVENT_DATE);
  const [utm, setUtm] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+7");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [diplomaIndex, setDiplomaIndex] = useState<number | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState<number | null>(null);
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [lightboxApi, setLightboxApi] = useState<CarouselApi>();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    document.title = "Бесплатный онлайн-эфир 21.10 «Я — не последняя буква» — Инна Фалолеева";
    const setMeta = (attr: "name" | "property", key: string, content: string) => {
      let tag = document.querySelector(`meta[${attr}="${key}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };
    const desc = "Бесплатный онлайн-эфир с психологом Инной Фалолеевой, 21 октября. Роли «спасателя» и «хорошей девочки», здоровый эгоизм, 5 шагов, как выбирать себя";
    setMeta("name", "description", desc);
    setMeta("property", "og:title", "Бесплатный онлайн-эфир 21.10 «Я — не последняя буква»");
    setMeta("property", "og:description", desc);
    const p = new URLSearchParams(window.location.search);
    setUtm({
      utm_source: p.get("utm_source") || p.get("src") || "",
      utm_medium: p.get("utm_medium") || "",
      utm_campaign: p.get("utm_campaign") || "",
      utm_content: p.get("utm_content") || "",
      utm_term: p.get("utm_term") || "",
    });
  }, []);

  useEffect(() => {
    if (!mainApi) return;
    const onSelect = () => setActiveSlide(mainApi.selectedScrollSnap());
    onSelect();
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim()) {
      setError("Заполните имя и email");
      return;
    }
    if (!/^7\d{10}$/.test(phone.replace(/\D/g, ""))) {
      setError("Пожалуйста, проверьте корректность введённого телефона");
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
        body: JSON.stringify({ name, email, phone, consent, ...utm }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ошибка регистрации, попробуйте ещё раз");
      ymGoal("efir10_form_submit");
      try {
        localStorage.setItem("faloleeva_efir10_email", email.trim());
        localStorage.setItem("faloleeva_efir10_email_ts", String(Date.now()));
      } catch {
        /* storage unavailable */
      }
      setSubmitted(true);
      navigate(`/thanks?name=${encodeURIComponent(name.trim())}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Что-то пошло не так, попробуйте ещё раз");
    } finally {
      setLoading(false);
    }
  }

  const goRegister = (goal: string) => {
    ymGoal(goal);
    scrollTo("register");
  };

  return (
    <div className="min-h-screen w-full bg-[#FBF6F0] font-['Inter',sans-serif] text-[16px] leading-6 text-[#3D332B]">
      <header className="sticky top-0 z-40 border-b border-[#EFE0CE] bg-[#FBF6F0]/90 backdrop-blur">
        <div className="mx-auto flex h-[78px] max-w-5xl items-center justify-between gap-3 px-4">
          <span className="font-['Montserrat',sans-serif] text-sm font-bold leading-tight text-[#2B2420] md:text-base">
            Инна Фалолеева <span className="font-normal text-[#8A7864]">· психолог</span>
          </span>
          <div className="flex items-center gap-2 md:gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-[#E8503A] px-3 py-1.5 text-white shadow-md md:px-4">
              <Icon name="Timer" size={18} className="hidden shrink-0 animate-pulse sm:block" />
              <div className="leading-tight">
                <div className="text-[9px] font-bold uppercase tracking-wide text-white/85 md:text-[10px]">До старта эфира</div>
                <div className="font-['Montserrat',sans-serif] text-sm font-extrabold tabular-nums md:text-lg">
                  {countdown.days > 0 && `${countdown.days}д `}
                  {String(countdown.hours).padStart(2, "0")}:{String(countdown.minutes).padStart(2, "0")}:
                  {String(countdown.seconds).padStart(2, "0")}
                </div>
              </div>
            </div>
            <button
              onClick={() => goRegister("efir10_header_cta")}
              className="h-9 rounded-xl bg-[#2F7A52] px-3 font-['Montserrat',sans-serif] text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#1F5E3F] md:px-4 md:text-sm"
            >
              Записаться
            </button>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-b from-[#F3E6DA] to-[#FBF6F0] px-5 pb-24 pt-16">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-5 inline-block rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[#2F7A52] shadow-sm">
            Бесплатный онлайн-эфир
          </span>
          <h1 className="mb-4 font-['Montserrat',sans-serif] text-[30px] font-extrabold leading-[1.1] text-[#2B2420] md:text-[48px] md:leading-[48px]">
            Я — не последняя буква
          </h1>
          <p className="mx-auto mb-7 max-w-xl text-lg text-[#6B5D52] md:text-xl md:leading-7">
            Почему в собственной жизни вы всё время в конце списка и как начать выбирать себя, не превращаясь в «эгоистку»
          </p>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-['Montserrat',sans-serif] text-sm font-bold text-[#2B2420] shadow-sm md:text-base">
            <Icon name="Calendar" size={18} className="text-[#2F7A52]" />
            21 октября, 19:00 мск
          </div>
          <div>
            <button
              onClick={() => goRegister("efir10_hero_cta")}
              className={`${BTN} bg-[#2F7A52] text-white shadow-lg shadow-[#2F7A52]/25 hover:bg-[#1F5E3F]`}
            >
              Забронировать место
              <Icon name="ArrowRight" size={20} />
            </button>
          </div>
          <p className="mx-auto mt-4 max-w-md text-sm font-medium text-[#2F7A52]">
            🎁 Подарок за регистрацию: медитация. Поможет успокоиться перед или после стрессовой ситуации и расслабиться перед сном
          </p>
          <img
            src={EXPERT_PHOTO}
            alt="Инна Фалолеева — клинический психолог"
            className="mx-auto mt-10 aspect-square w-56 rounded-full object-cover object-top shadow-lg"
          />
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className={`${H2} mb-3 text-center`}>Это про вас, если…</h2>
          <p className="mb-8 text-center italic text-[#8A7864]">
            В алфавите все буквы равны. Почему же вы решили, что ваша последняя?
          </p>
          <div className="space-y-3">
            {PAIN_POINTS.map((t) => (
              <div key={t} className={`${CARD} flex items-start gap-3 p-4`}>
                <span className="text-lg leading-6">🔹</span>
                <span>{t}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center italic text-[#8A7864]">
            Если узнали себя хотя бы в двух пунктах, этот эфир для вас
          </p>
        </div>
      </section>

      <section className="bg-white px-5 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className={`${H2} mb-10 text-center`}>Знакомые сцены</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {SCENES.map((s) => (
              <div key={s.title} className={`${CARD} p-6`}>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#E3EFE7] text-2xl">{s.icon}</div>
                <p className="mb-1 font-['Montserrat',sans-serif] text-base font-bold text-[#2B2420]">{s.title}</p>
                <p className="text-[#6B5D52]">{s.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center italic text-[#8A7864]">
            «Мне неудобно», «А что люди скажут», «Я же не эгоистка», «Потом»
          </p>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className={`${H2} mb-3 text-center`}>Что будет на эфире</h2>
          <p className="mb-10 text-center text-[#8A7864]">Один вечер: теория, практика и ответы на ваши вопросы</p>
          <div className={`${CARD} p-6 md:p-8`}>
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2F7A52] font-['Montserrat',sans-serif] text-base font-extrabold text-white">
                1
              </span>
              <div>
                <p className="font-['Montserrat',sans-serif] text-xl font-bold leading-7 text-[#2B2420]">21 октября, 19:00 мск</p>
                <p className="text-sm text-[#8A7864]">Онлайн-эфир · Ответы на вопросы</p>
              </div>
            </div>
            <div className="space-y-4">
              {PROGRAM_ITEMS.map((item, i) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E3EFE7] text-[#2F7A52]">
                    <Icon name={item.icon} size={18} fallback="Sparkles" />
                  </div>
                  <div>
                    <p className="font-['Montserrat',sans-serif] text-base font-bold text-[#2B2420]">
                      {i + 1}. {item.title}
                    </p>
                    {item.text && <p className="text-[#6B5D52]">{item.text}</p>}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl bg-[#FBF6F0] p-4 text-center text-[#6B5D52]">
              <strong>Формат:</strong> без камер участников — только я, теория, практика и ваши вопросы в чате
            </div>
            <div className="mt-3 rounded-xl bg-[#F3E6DA] p-4 text-center text-sm text-[#3D332B]">
              В конце расскажу о двух форматах работы, если захотите пойти глубже: индивидуальное сопровождение на 3 месяца и терапевтическая группа «Опора» на 12 недель. Это не про то, чтобы стать удобной, а про то, чтобы стать себе опорой
            </div>
          </div>
          <p className="mt-6 text-center text-[#8A7864]">Регистрация бесплатная, ссылка на эфир придёт на почту</p>
        </div>
      </section>

      <section className="bg-white px-5 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className={`${H2} mb-10 text-center`}>Что будет меняться</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {CHANGES.map((c) => (
              <div key={c.text} className={`${CARD} flex w-full flex-col items-center p-5 text-center sm:w-[calc(50%-8px)] md:w-[calc(33.333%-11px)]`}>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#E3EFE7] text-[#2F7A52]">
                  <Icon name={c.icon} size={22} fallback="Sparkles" />
                </div>
                <p className="font-['Montserrat',sans-serif] text-base font-bold text-[#2B2420]">{c.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center italic text-[#8A7864]">
            Бывает, что часть отношений после этого заканчивается: уйдут те, кому было удобно вас использовать
          </p>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 md:grid-cols-[1fr_1.3fr] md:items-stretch">
            <img
              src={EXPERT_PHOTO}
              alt="Инна Фалолеева — клинический психолог"
              className="min-h-[280px] w-full rounded-2xl object-cover object-top shadow-sm"
            />
            <div>
              <h2 className={`${H2} mb-4`}>Об эксперте</h2>
              <ul className="mb-4 space-y-3">
                {EXPERT_FACTS.map((f) => (
                  <li key={f.text} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E3EFE7] text-[#2F7A52]">
                      <Icon name={f.icon} size={16} />
                    </div>
                    <span>{f.text}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {["ЭОТ", "ДПДГ", "МАК"].map((m) => (
                  <span key={m} className="rounded-full bg-[#E3EFE7] px-3 py-1 text-xs font-semibold text-[#2F7A52]">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="mb-4 font-['Montserrat',sans-serif] text-xl font-bold text-[#2B2420]">Дипломы и сертификаты</h3>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {DIPLOMAS.map((d, i) => (
                <button
                  key={d.url}
                  type="button"
                  onClick={() => {
                    setDiplomaIndex(i);
                    ymGoal("efir10_diploma_click");
                  }}
                  className="group text-left"
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-xl border border-[#E2D3C0] bg-white shadow-sm">
                    <img src={d.url} alt={d.title} className="h-full w-full object-cover transition group-hover:scale-105" />
                  </div>
                  <p className="mt-2 text-xs font-semibold text-[#3D332B]">{d.title}</p>
                  <p className="text-xs text-[#8A7864]">{d.subtitle}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Dialog open={diplomaIndex !== null} onOpenChange={(o) => !o && setDiplomaIndex(null)}>
        <DialogContent className="max-w-3xl border-none bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">{diplomaIndex !== null ? DIPLOMAS[diplomaIndex].title : "Диплом"}</DialogTitle>
          {diplomaIndex !== null && (
            <div className="overflow-hidden rounded-2xl bg-white">
              <img src={DIPLOMAS[diplomaIndex].url} alt={DIPLOMAS[diplomaIndex].title} className="max-h-[80vh] w-full object-contain" />
              <div className="p-4 text-center">
                <p className="font-semibold text-[#3D332B]">{DIPLOMAS[diplomaIndex].title}</p>
                <p className="text-sm text-[#8A7864]">{DIPLOMAS[diplomaIndex].subtitle}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <section className="bg-[#2B2420] px-5 py-20 text-white">
        <div className="mx-auto max-w-2xl">
          <h2 className={`${H2} mb-8 text-center !text-white`}>Кейс Елены</h2>
          <div className="space-y-5 rounded-2xl bg-white/5 p-6 md:p-8">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#E8A288]">Запрос</p>
              <p className="text-white/80">
                Елена пришла не лечить аллергию. Она пришла с непрожитыми эмоциями и напряжением в отношениях с близким родственником — то, что давно сидело внутри и не отпускало.
              </p>
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#E8A288]">Метод</p>
              <p className="text-white/80">
                Эмоционально-образная терапия (ЭОТ) — чувства проявляются через образы, метафоры, телесные ощущения. В глубокой точке работы, где чувство стало осязаемым, Елена увидела свой образ злости в виде кружочка дыни, которая «жжёт, сжимает горло».
              </p>
            </div>
            <div className="rounded-xl border-2 border-dashed border-white/20 p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-white/50">До</p>
              <p className="italic text-white/70">«Я уже несколько лет не могу есть дыню. Мою любимую. Горло жжёт, трудно дышать»</p>
            </div>
            <div className="rounded-xl border-2 border-dashed border-white/20 p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-white/50">После</p>
              <p className="italic text-white/70">«Жизнь прекрасна. Я поела дыню!»</p>
              <p className="mt-2 text-xs text-white/50">Через несколько дней после сессии Елена съела дыню — без боли, без жжения.</p>
            </div>
            <div className="flex items-start gap-3 pt-2">
              <img src={AVATAR_CASE} alt="Инна Фалолеева" className="h-12 w-12 flex-shrink-0 rounded-full border-2 border-[#E8A288] object-cover" />
              <div>
                <p className="text-lg font-semibold italic text-[#E8A288]">
                  «Мы не «лечили аллергию». Мы возвращали способность быть в контакте с собой»
                </p>
                <p className="mt-1 text-xs text-white/50">— Инна Фалолеева</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className={`${H2} mb-2 text-center`}>Что говорят клиенты о совместной работе</h2>
          <p className="mb-6 flex animate-pulse items-center justify-center gap-2 text-sm font-medium text-[#8A7864]">
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
                      ymGoal("efir10_testimonial_click");
                    }}
                    className="block w-full overflow-hidden rounded-2xl border border-[#E2D3C0] bg-white shadow-sm transition hover:shadow-md"
                  >
                    <img src={src} alt={`Отзыв клиента №${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-1 h-10 w-10 border-2 border-[#E8A288] bg-white text-[#E8A288] md:-left-4" />
            <CarouselNext className="right-1 h-10 w-10 border-2 border-[#E8A288] bg-white text-[#E8A288] md:-right-4" />
          </Carousel>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {TESTIMONIALS.map((src, i) => (
              <button
                key={src}
                type="button"
                aria-label={`Перейти к отзыву №${i + 1}`}
                onClick={() => mainApi?.scrollTo(i)}
                className={`h-2 rounded-full transition-all ${i === activeSlide ? "w-6 bg-[#E8A288]" : "w-2 bg-[#E2D3C0]"}`}
              />
            ))}
          </div>
        </div>
      </section>

      <Dialog open={testimonialIndex !== null} onOpenChange={(o) => !o && setTestimonialIndex(null)}>
        <DialogContent className="max-w-2xl border-none bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">Отзыв клиента</DialogTitle>
          {testimonialIndex !== null && (
            <Carousel opts={{ align: "start", loop: true, startIndex: testimonialIndex }} setApi={setLightboxApi} className="relative">
              <CarouselContent>
                {TESTIMONIALS.map((src, i) => (
                  <CarouselItem key={src}>
                    <div className="overflow-hidden rounded-2xl bg-white">
                      <img src={src} alt={`Отзыв клиента №${i + 1}`} className="max-h-[80vh] w-full object-contain" />
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

      <section className="bg-white px-5 py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className={`${H2} mb-8 text-center`}>Частые вопросы</h2>
          <Accordion type="single" collapsible className="w-full">
            {FAQ.map((item, i) => (
              <AccordionItem key={item.q} value={`item-${i}`} className="border-[#E2D3C0]">
                <AccordionTrigger className="text-left font-['Montserrat',sans-serif] text-base font-semibold text-[#2B2420]">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-base text-[#6B5D52]">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="bg-[#2F7A52] px-5 py-20 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className={`${H2} mb-6 !text-white`}>До начала эфира осталось</h2>
          <div className="mb-4 flex justify-center gap-3 md:gap-5">
            {[
              { label: "дн", value: countdown.days },
              { label: "ч", value: countdown.hours },
              { label: "мин", value: countdown.minutes },
              { label: "сек", value: countdown.seconds },
            ].map((u) => (
              <div key={u.label} className="w-16 animate-pulse rounded-xl bg-white/15 py-3 md:w-20">
                <div className="font-['Montserrat',sans-serif] text-2xl font-extrabold tabular-nums md:text-3xl">
                  {String(u.value).padStart(2, "0")}
                </div>
                <div className="text-[10px] uppercase text-white/70 md:text-xs">{u.label}</div>
              </div>
            ))}
          </div>
          <p className="mb-8 text-sm text-white/70">Один эфир, 21 октября в 19:00 мск</p>
          <div className="mx-auto mb-8 flex max-w-lg items-start justify-center gap-3">
            <img src={AVATAR_QUOTE} alt="Инна" className="h-12 w-12 flex-shrink-0 rounded-full border-2 border-white/40 object-cover" />
            <p className="text-left italic text-white/90">
              «21 октября я расскажу то, что обычно говорю только на консультациях один на один. Вы имеете право быть в начале своего списка. Буду рада увидеть вас» — Инна
            </p>
          </div>
          <button
            onClick={() => goRegister("efir10_final_cta")}
            className={`${BTN} bg-white text-[#2F7A52] shadow-lg hover:bg-[#E3EFE7]`}
          >
            Забронировать место
            <Icon name="ArrowRight" size={20} />
          </button>
        </div>
      </section>

      <section id="register" className="px-5 py-20">
        <div className={`${CARD} mx-auto max-w-xl p-6 md:p-10`}>
          {!submitted ? (
            <>
              <h2 className={`${H2} mb-2 text-center`}>Регистрация на эфир</h2>
              <p className="mb-6 text-center text-sm text-[#8A7864]">21 октября · 19:00 мск · онлайн</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-[#3D332B]">Имя</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Как к вам обращаться" className={INPUT} />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-[#3D332B]">Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Для доступа к трансляции" className={INPUT} />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-[#3D332B]">Телефон</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                    placeholder="+7 (___) ___-__-__"
                    className={INPUT}
                  />
                </div>
                <label className="flex items-start gap-3 text-sm text-[#6B5D52]">
                  <Checkbox checked={consent} onCheckedChange={(v) => setConsent(v === true)} className="mt-0.5" />
                  <span>
                    Согласен(на) на{" "}
                    <Link to="/personal-data-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#2F7A52]">
                      обработку персональных данных
                    </Link>{" "}
                    согласно{" "}
                    <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#2F7A52]">
                      политике конфиденциальности
                    </Link>
                  </span>
                </label>
                {error && <p className="text-sm font-medium text-[#DC2626]">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className={`${BTN} w-full bg-[#2F7A52] text-white hover:bg-[#1F5E3F] disabled:opacity-60`}
                >
                  {loading ? "Отправляем..." : "Зарегистрироваться на эфир"}
                  {!loading && <Icon name="ArrowRight" size={20} />}
                </button>
                <p className="text-center text-sm font-medium text-[#2F7A52]">
                  🎁 Подарок за регистрацию: медитация, чтобы успокоиться и расслабиться перед сном
                </p>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#E3EFE7] text-[#2F7A52]">
                <Icon name="Check" size={28} />
              </div>
              <h3 className="mb-2 font-['Montserrat',sans-serif] text-2xl font-bold text-[#2B2420]">Вы зарегистрированы!</h3>
              <p className="text-[#6B5D52]">Проверьте почту — туда придёт ссылка на эфир 21 октября в 19:00 мск и подарок.</p>
            </div>
          )}
        </div>
      </section>

      <footer className="border-t border-[#EFE0CE] bg-white px-5 py-10">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex justify-center gap-4">
            <a
              href={TG_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E3EFE7] text-[#2F7A52] transition hover:bg-[#C9E0D2]"
              aria-label="Telegram"
            >
              <Icon name="Send" size={18} />
            </a>
            <a
              href={MAX_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E3EFE7] text-[#2F7A52] transition hover:bg-[#C9E0D2]"
              aria-label="MAX"
            >
              <Icon name="MessageCircle" size={18} />
            </a>
          </div>
          <p className="mx-auto mb-3 max-w-xl text-center text-xs leading-relaxed text-[#8A7864]">
            Регистрируясь на эфир, вы соглашаетесь на{" "}
            <Link to="/personal-data-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#2F7A52]">
              обработку персональных данных
            </Link>{" "}
            в целях организации и проведения мероприятия. Данные не передаются третьим лицам и используются только для связи с вами.
          </p>
          <div className="mx-auto max-w-xl rounded-xl border border-[#E2D3C0] bg-[#FBF6F0] p-4 text-center text-xs leading-relaxed text-[#8A7864]">
            <p className="font-semibold text-[#3D332B]">ИП Фалолеева Инна Николаевна</p>
            <p>ИНН 505003981273</p>
          </div>
          <p className="mt-2 text-center text-xs text-[#8A7864]">© 2026 ИП Фалолеева Инна Николаевна</p>
        </div>
      </footer>
    </div>
  );
};

export default Efir10;