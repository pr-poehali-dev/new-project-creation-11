import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/files/9ff09b89-6524-426e-b420-b47acf16e608.jpg";

const features = [
  {
    icon: "Zap",
    title: "Молниеносная скорость",
    desc: "Ваш продукт работает в 10 раз быстрее конкурентов. Никаких задержек — только результат.",
  },
  {
    icon: "Shield",
    title: "Надёжная защита",
    desc: "Данные зашифрованы и защищены по стандарту enterprise. Ваша безопасность — наш приоритет.",
  },
  {
    icon: "TrendingUp",
    title: "Рост без потолка",
    desc: "Масштабируемая архитектура растёт вместе с вашим бизнесом от стартапа до корпорации.",
  },
  {
    icon: "Layers",
    title: "Всё в одном месте",
    desc: "Единая платформа заменяет 5 разных инструментов. Меньше хаоса, больше фокуса.",
  },
  {
    icon: "Globe",
    title: "Работает везде",
    desc: "Доступно на любом устройстве и в любой точке мира. Мобильное приложение включено.",
  },
  {
    icon: "Users",
    title: "Командная работа",
    desc: "Пригласите всю команду. Совместная работа в реальном времени без ограничений.",
  },
];

const plans = [
  {
    name: "Старт",
    price: "990",
    period: "/ мес",
    desc: "Идеально для старта",
    features: ["До 3 пользователей", "10 ГБ хранилища", "Базовая аналитика", "Email поддержка"],
    cta: "Попробовать",
    accent: false,
  },
  {
    name: "Про",
    price: "2 990",
    period: "/ мес",
    desc: "Для растущих команд",
    features: ["До 20 пользователей", "100 ГБ хранилища", "Расширенная аналитика", "Приоритетная поддержка", "API доступ", "Кастомный домен"],
    cta: "Выбрать Про",
    accent: true,
    badge: "Популярный",
  },
  {
    name: "Бизнес",
    price: "7 990",
    period: "/ мес",
    desc: "Для серьёзных компаний",
    features: ["Безлимит пользователей", "1 ТБ хранилища", "AI аналитика", "Персональный менеджер", "SLA 99.9%", "White-label"],
    cta: "Связаться",
    accent: false,
  },
];

const reviews = [
  {
    name: "Алексей Петров",
    role: "CEO, TechStartup",
    text: "Внедрили за один день — уже через неделю команда в восторге. Производительность выросла на 40%.",
    rating: 5,
    avatar: "А",
  },
  {
    name: "Мария Соколова",
    role: "Директор по маркетингу",
    text: "Наконец-то один инструмент, который действительно работает. Сэкономили 3 часа в день.",
    rating: 5,
    avatar: "М",
  },
  {
    name: "Дмитрий Волков",
    role: "Founder, E-commerce",
    text: "Скептически относился, но это реально изменило подход к работе. Поддержка отвечает за 5 минут.",
    rating: 5,
    avatar: "Д",
  },
  {
    name: "Елена Новикова",
    role: "Product Manager",
    text: "Интерфейс настолько интуитивный, что обучение заняло 20 минут. Команда перешла без сопротивления.",
    rating: 5,
    avatar: "Е",
  },
];

const faqs = [
  {
    q: "Как быстро можно начать работу?",
    a: "Регистрация и первый запуск занимают менее 5 минут. Никаких сложных настроек — всё работает сразу из коробки.",
  },
  {
    q: "Есть ли бесплатный пробный период?",
    a: "Да! Мы предоставляем 14 дней бесплатного доступа ко всем функциям тарифа «Про». Карта не нужна.",
  },
  {
    q: "Могу ли я перейти на другой тариф?",
    a: "Конечно. Вы можете повысить или понизить тариф в любой момент без потери данных и дополнительных платежей.",
  },
  {
    q: "Как обеспечивается безопасность данных?",
    a: "Все данные шифруются по стандарту AES-256. Серверы в России, резервное копирование ежедневно. Соответствуем 152-ФЗ.",
  },
  {
    q: "Есть ли мобильное приложение?",
    a: "Да, приложения доступны для iOS и Android. Полная синхронизация с веб-версией в реальном времени.",
  },
  {
    q: "Как работает техподдержка?",
    a: "Чат-поддержка доступна 24/7. На тарифе «Бизнес» — персональный менеджер и время ответа до 1 часа.",
  },
];

export default function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--dark-bg)", color: "#f0f4ff" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ backdropFilter: "blur(20px)", backgroundColor: "rgba(8,12,20,0.85)", borderBottom: "1px solid rgba(0,245,255,0.08)" }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-btn flex items-center justify-center">
            <span className="text-sm font-bold relative z-10" style={{ fontFamily: "Oswald, sans-serif" }}>P</span>
          </div>
          <span style={{ fontFamily: "Oswald, sans-serif", fontSize: "1.1rem", fontWeight: 600, letterSpacing: "0.05em", color: "#fff" }}>
            PRODUCT
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["Преимущества", "Цены", "Отзывы", "FAQ"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}
              className="text-sm transition-colors hover:text-cyan-400"
              style={{ color: "rgba(240,244,255,0.6)", textDecoration: "none", fontFamily: "Golos Text, sans-serif" }}>
              {item}
            </a>
          ))}
        </div>
        <button className="gradient-btn px-5 py-2 rounded-lg text-sm">
          <span>Начать бесплатно</span>
        </button>
      </nav>

      {/* HERO */}
      <section className="mesh-bg noise-overlay relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full animate-pulse-slow pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full animate-pulse-slow pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,245,255,0.15) 0%, transparent 70%)", filter: "blur(40px)", animationDelay: "2s" }} />

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 animate-fade-up stagger-1"
              style={{ border: "1px solid rgba(0,245,255,0.25)", backgroundColor: "rgba(0,245,255,0.05)" }}>
              <div className="w-2 h-2 rounded-full bg-cyan-400" style={{ boxShadow: "0 0 8px #00f5ff" }} />
              <span className="text-sm font-medium text-cyan-400">Новый уровень эффективности</span>
            </div>

            <h1 className="animate-fade-up stagger-2" style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 700, lineHeight: 1.05, marginBottom: "1.5rem" }}>
              ВАШЕ ДЕЛО <br />
              <span className="gradient-text">НА НОВОМ</span><br />
              УРОВНЕ
            </h1>

            <p className="animate-fade-up stagger-3 text-lg mb-8" style={{ color: "rgba(240,244,255,0.65)", maxWidth: "480px", lineHeight: 1.7 }}>
              Опишите здесь ключевую ценность вашего продукта в 2–3 предложениях. Что получит клиент и почему именно сейчас стоит начать?
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up stagger-4">
              <button className="gradient-btn px-8 py-4 rounded-xl text-base">
                <span>Попробовать 14 дней бесплатно</span>
              </button>
              <button className="flex items-center gap-3 px-8 py-4 rounded-xl text-base font-medium transition-all hover:bg-white/5"
                style={{ border: "1px solid rgba(240,244,255,0.15)", color: "#f0f4ff" }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(0,245,255,0.1)", border: "1px solid rgba(0,245,255,0.3)" }}>
                  <Icon name="Play" size={14} className="text-cyan-400" />
                </div>
                Смотреть демо
              </button>
            </div>

            <div className="flex items-center gap-8 mt-10 animate-fade-up stagger-5">
              {[["500+", "клиентов"], ["99.9%", "uptime"], ["4.9★", "рейтинг"]].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: "Oswald, sans-serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--neon-cyan)" }}>{num}</div>
                  <div style={{ fontSize: "0.8rem", color: "rgba(240,244,255,0.5)" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-up stagger-3 animate-float">
            <div className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ background: "radial-gradient(circle at center, rgba(0,245,255,0.15) 0%, transparent 70%)", filter: "blur(20px)", transform: "scale(1.1)" }} />
            <div className="relative rounded-2xl overflow-hidden neon-border">
              <img src={HERO_IMAGE} alt="Product preview"
                className="w-full object-cover" style={{ aspectRatio: "16/10", display: "block" }} />
              <div className="absolute inset-0 flex items-center justify-center"
                style={{ background: "rgba(8,12,20,0.35)" }}>
                <button className="w-20 h-20 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))", boxShadow: "0 0 40px rgba(0,245,255,0.4)" }}>
                  <Icon name="Play" size={28} className="ml-1" style={{ color: "#080c14" }} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span style={{ fontSize: "0.75rem", color: "rgba(240,244,255,0.4)", letterSpacing: "0.1em" }}>ЛИСТАЙТЕ</span>
          <Icon name="ChevronDown" size={20} style={{ color: "rgba(0,245,255,0.5)" }} />
        </div>
      </section>

      {/* FEATURES */}
      <section id="преимущества" className="section-bg-alt py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-cyan-400 mb-3" style={{ letterSpacing: "0.15em", textTransform: "uppercase" }}>Почему выбирают нас</p>
            <h2 style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700 }}>
              ВСЁ, ЧТО НУЖНО <span className="gradient-text">ДЛЯ РОСТА</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="card-glow rounded-2xl p-7">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: "linear-gradient(135deg, rgba(0,245,255,0.15), rgba(168,85,247,0.15))", border: "1px solid rgba(0,245,255,0.2)" }}>
                  <Icon name={f.icon} size={22} className="text-cyan-400" />
                </div>
                <h3 style={{ fontFamily: "Oswald, sans-serif", fontSize: "1.2rem", fontWeight: 600, marginBottom: "0.6rem", color: "#f0f4ff" }}>
                  {f.title}
                </h3>
                <p style={{ color: "rgba(240,244,255,0.55)", lineHeight: 1.7, fontSize: "0.9rem" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section className="py-20 mesh-bg">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 700 }}>
              СМОТРИТЕ, <span className="gradient-text">КАК ЭТО РАБОТАЕТ</span>
            </h2>
            <p className="mt-3" style={{ color: "rgba(240,244,255,0.55)" }}>Полный обзор продукта за 3 минуты</p>
          </div>
          <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden neon-border"
            style={{ background: "var(--card-bg)" }}>
            <div className="aspect-video flex items-center justify-center relative"
              style={{ background: "linear-gradient(135deg, #0d1220 0%, #13192e 100%)" }}>
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,245,255,0.07) 0%, transparent 70%)" }} />
              <div className="text-center relative z-10">
                <button className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 transition-all hover:scale-110"
                  style={{ background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))", boxShadow: "0 0 60px rgba(0,245,255,0.3)" }}>
                  <Icon name="Play" size={32} className="ml-1" style={{ color: "#080c14" }} />
                </button>
                <p style={{ color: "rgba(240,244,255,0.5)", fontSize: "0.9rem" }}>Нажмите, чтобы посмотреть демо-видео</p>
              </div>
              <div className="absolute bottom-4 right-4 px-3 py-1 rounded-lg text-sm"
                style={{ backgroundColor: "rgba(0,0,0,0.6)", color: "rgba(240,244,255,0.7)", backdropFilter: "blur(10px)" }}>
                3:24
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="цены" className="section-bg-alt py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-cyan-400 mb-3" style={{ letterSpacing: "0.15em", textTransform: "uppercase" }}>Тарифы</p>
            <h2 style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700 }}>
              ВЫБЕРИТЕ <span className="gradient-text">СВОЙ ПЛАН</span>
            </h2>
            <p className="mt-3" style={{ color: "rgba(240,244,255,0.55)" }}>14 дней бесплатно на любом тарифе. Карта не нужна.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <div key={i} className={`relative rounded-2xl p-8 ${plan.accent ? "" : "card-glow"}`}
                style={plan.accent ? {
                  background: "linear-gradient(135deg, rgba(0,245,255,0.08), rgba(168,85,247,0.08))",
                  border: "1px solid rgba(0,245,255,0.4)",
                  boxShadow: "0 0 50px rgba(0,245,255,0.1), 0 20px 60px rgba(0,0,0,0.5)"
                } : {}}>
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold gradient-btn"
                    style={{ fontFamily: "Oswald, sans-serif", letterSpacing: "0.1em" }}>
                    <span>{plan.badge}</span>
                  </div>
                )}
                <div className="mb-6">
                  <p style={{ color: "rgba(240,244,255,0.5)", fontSize: "0.85rem", marginBottom: "0.3rem" }}>{plan.desc}</p>
                  <h3 style={{ fontFamily: "Oswald, sans-serif", fontSize: "1.4rem", fontWeight: 600, color: plan.accent ? "var(--neon-cyan)" : "#f0f4ff" }}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mt-3">
                    <span style={{ fontFamily: "Oswald, sans-serif", fontSize: "2.8rem", fontWeight: 700, color: "#f0f4ff" }}>
                      {plan.price} ₽
                    </span>
                    <span style={{ color: "rgba(240,244,255,0.4)", fontSize: "0.9rem" }}>{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(0,245,255,0.12)", border: "1px solid rgba(0,245,255,0.3)" }}>
                        <Icon name="Check" size={11} className="text-cyan-400" />
                      </div>
                      <span style={{ color: "rgba(240,244,255,0.75)", fontSize: "0.9rem" }}>{feat}</span>
                    </li>
                  ))}
                </ul>
                {plan.accent ? (
                  <button className="gradient-btn w-full py-3 rounded-xl font-semibold text-sm">
                    <span>{plan.cta}</span>
                  </button>
                ) : (
                  <button className="w-full py-3 rounded-xl font-semibold text-sm transition-all hover:bg-white/5"
                    style={{ border: "1px solid rgba(0,245,255,0.25)", color: "var(--neon-cyan)", backgroundColor: "transparent", fontFamily: "Oswald, sans-serif", letterSpacing: "0.05em" }}>
                    {plan.cta}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="отзывы" className="mesh-bg py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-cyan-400 mb-3" style={{ letterSpacing: "0.15em", textTransform: "uppercase" }}>Отзывы</p>
            <h2 style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700 }}>
              НАМ <span className="gradient-text">ДОВЕРЯЮТ</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {reviews.map((r, i) => (
              <div key={i} className="card-glow rounded-2xl p-6">
                <div className="flex gap-1 mb-4">
                  {Array(r.rating).fill(0).map((_, j) => (
                    <span key={j} style={{ color: "var(--neon-cyan)", fontSize: "0.9rem" }}>★</span>
                  ))}
                </div>
                <p style={{ color: "rgba(240,244,255,0.7)", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "1.2rem" }}>
                  "{r.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))", color: "#080c14", fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: "1rem" }}>
                    {r.avatar}
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: "0.9rem", color: "#f0f4ff" }}>{r.name}</p>
                    <p style={{ fontSize: "0.78rem", color: "rgba(240,244,255,0.45)" }}>{r.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-bg-alt py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-cyan-400 mb-3" style={{ letterSpacing: "0.15em", textTransform: "uppercase" }}>FAQ</p>
            <h2 style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700 }}>
              ЧАСТЫЕ <span className="gradient-text">ВОПРОСЫ</span>
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl overflow-hidden transition-all"
                style={{ border: `1px solid ${openFaq === i ? "rgba(0,245,255,0.3)" : "rgba(0,245,255,0.1)"}`, backgroundColor: "var(--card-bg)" }}>
                <button
                  className="w-full flex items-center justify-between p-5 text-left transition-all hover:bg-white/[0.02]"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span style={{ fontFamily: "Golos Text, sans-serif", fontWeight: 600, color: openFaq === i ? "var(--neon-cyan)" : "#f0f4ff", fontSize: "0.95rem" }}>
                    {faq.q}
                  </span>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ml-4 transition-all duration-300"
                    style={{ background: openFaq === i ? "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))" : "rgba(0,245,255,0.1)", transform: openFaq === i ? "rotate(45deg)" : "none" }}>
                    <Icon name="Plus" size={14} style={{ color: openFaq === i ? "#080c14" : "var(--neon-cyan)" }} />
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 animate-fade-up">
                    <p style={{ color: "rgba(240,244,255,0.6)", lineHeight: 1.75, fontSize: "0.9rem" }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 mesh-bg">
        <div className="container mx-auto px-6">
          <div className="relative rounded-3xl p-12 text-center overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(0,245,255,0.08) 0%, rgba(168,85,247,0.1) 100%)", border: "1px solid rgba(0,245,255,0.2)" }}>
            <div className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,245,255,0.06) 0%, transparent 70%)" }} />
            <div className="relative z-10">
              <h2 style={{ fontFamily: "Oswald, sans-serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700, marginBottom: "1rem" }}>
                ГОТОВЫ НАЧАТЬ? <span className="gradient-text">ЭТО БЕСПЛАТНО</span>
              </h2>
              <p className="mb-8" style={{ color: "rgba(240,244,255,0.6)", maxWidth: "500px", margin: "0 auto 2rem", fontSize: "1.05rem" }}>
                Попробуйте 14 дней без ограничений. Никаких скрытых платежей и обязательств.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="gradient-btn px-10 py-4 rounded-xl text-base">
                  <span>Начать бесплатно</span>
                </button>
                <button className="px-10 py-4 rounded-xl text-base font-medium transition-all hover:bg-white/5"
                  style={{ border: "1px solid rgba(240,244,255,0.2)", color: "#f0f4ff", fontFamily: "Golos Text, sans-serif" }}>
                  Задать вопрос
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: "#060a10", borderTop: "1px solid rgba(0,245,255,0.08)" }}>
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg gradient-btn flex items-center justify-center">
                  <span className="text-sm font-bold relative z-10" style={{ fontFamily: "Oswald, sans-serif" }}>P</span>
                </div>
                <span style={{ fontFamily: "Oswald, sans-serif", fontSize: "1.1rem", fontWeight: 600, color: "#fff" }}>PRODUCT</span>
              </div>
              <p style={{ color: "rgba(240,244,255,0.4)", fontSize: "0.85rem", lineHeight: 1.7 }}>
                Краткое описание компании и её миссии в 2–3 строки.
              </p>
            </div>
            {[
              { title: "Продукт", links: ["Возможности", "Тарифы", "Обновления", "Документация"] },
              { title: "Компания", links: ["О нас", "Блог", "Карьера", "Пресса"] },
              { title: "Поддержка", links: ["Центр помощи", "Сообщество", "Контакты", "Статус"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 style={{ fontFamily: "Oswald, sans-serif", fontWeight: 600, color: "#f0f4ff", marginBottom: "1rem", fontSize: "0.95rem", letterSpacing: "0.05em" }}>
                  {col.title.toUpperCase()}
                </h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" style={{ color: "rgba(240,244,255,0.45)", fontSize: "0.85rem", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={e => (e.target as HTMLElement).style.color = "var(--neon-cyan)"}
                        onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(240,244,255,0.45)"}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-6"
            style={{ borderTop: "1px solid rgba(0,245,255,0.08)" }}>
            <p style={{ color: "rgba(240,244,255,0.3)", fontSize: "0.8rem" }}>
              © 2024 Product. Все права защищены.
            </p>
            <div className="flex items-center gap-3 mt-4 md:mt-0">
              {["Telegram", "ВКонтакте", "YouTube"].map((s) => (
                <a key={s} href="#"
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  style={{ border: "1px solid rgba(0,245,255,0.15)", color: "rgba(240,244,255,0.5)", fontSize: "0.7rem", textDecoration: "none" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,245,255,0.4)"; (e.currentTarget as HTMLElement).style.color = "var(--neon-cyan)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,245,255,0.15)"; (e.currentTarget as HTMLElement).style.color = "rgba(240,244,255,0.5)"; }}>
                  <Icon name="ExternalLink" size={13} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}