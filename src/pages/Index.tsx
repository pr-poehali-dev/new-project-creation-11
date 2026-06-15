import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

/* ─── Logo ─── */
const LOGO_URL = "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/299703f9-d2b1-41c4-a3ef-728a48ef1ba8.png";

/* ─── Images ─── */
const IMG = {
  ps399: "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/df225f17-1c64-48bc-8a83-f21266f04de2.png",
  ps850: "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/files/fbbf6388-f4a0-4b11-b028-922a1afcbe41.jpg",

  ps990: "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/files/899434e1-ed1d-487b-af20-846bc37bd0fd.jpg",
  ps1900: "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/files/c88e067c-8a64-48ad-8b87-dc695ae3a2b5.jpg",
  beach: "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/files/498b08e6-66ba-49c0-9b63-ec77de184bf2.jpg",
  karaoke: "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/files/97c7b226-74a1-49d2-bb5e-015a1593555d.jpg",
  dacha: "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/26aa13c2-17ec-4c0e-928a-338af0da164e.jpg",
  event: "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/files/ccc1add1-d458-49fd-88df-157c2db54426.jpg",
};

/* ─── UTM links ─── */
const LINKS = {
  ps399: "https://sven.fi/",
  ps850wb: "https://www.wildberries.ru/catalog/362109847/detail.aspx?utm_campaign=48164-id-Yandex&utm_source=Yandex&utm_medium=cpc&utm_content=product&utm_term=362109847",
  ps990wb: "https://www.wildberries.ru/catalog/535430822/detail.aspx?utm_campaign=48164-id-Yandex&utm_source=Yandex&utm_medium=cpc&utm_content=product&utm_term=535430822",
  ps1900ozon: "https://ozon.ru/product/sven-ps-1900-bolshaya-bluetooth-kolonka-audiosistema-dlya-vecherinok-s-razemami-dlya-karaoke-i-1304273035/?hs=1&utm_campaign=vendor_org_16927_yandex_direct&utm_medium=cpc&utm_source=yandex_direct&utm_term=PS-1900",
  video850: "https://vkvideo.ru/video-16115403_456240809",
  video990: "https://vkvideo.ru/video-16115403_456240946",
  video1900: "https://vkvideo.ru/video-16115403_456239518",
};

const YM_ID = "XXXXXXXX";
 
type YmFn = (id: string, event: string, goal: string) => void;
function ymGoal(goal: string) {
  if (typeof window !== "undefined" && typeof (window as Record<string, unknown>)["ym"] === "function") {
    ((window as Record<string, unknown>)["ym"] as YmFn)(YM_ID, "reachGoal", goal);
  }
}

/* ─── Scroll-fade hook ─── */
function useFadeUp() {
  useEffect(() => {
    const els = document.querySelectorAll(".fade-up");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); } });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ─── Progress bar + sticky btn + header shrink ─── */
function useScrollEffects() {
  useEffect(() => {
    const bar = document.getElementById("progress-bar");
    const btn = document.getElementById("sticky-btn");
    const hdr = document.getElementById("main-header");
    function onScroll() {
      const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (bar) bar.style.width = pct + "%";
      if (btn) btn.classList.toggle("show", window.scrollY > 300);
      if (hdr) hdr.classList.toggle("scrolled", window.scrollY > 50);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/* ════════════════════════════════════════════════════════════ */
/* ─── PS-850 real photos ─── */
const PS850_PHOTOS = [
  { src: "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/db6a4403-f216-4149-999a-c495391de7cf.png", alt: "SVEN PS-850, вид спереди с микрофоном и пультом" },
  { src: "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/222dab07-1a6a-480a-b1ad-91a0c1242cad.jpg", alt: "SVEN PS-850 — приложение SVEN SOUND" },
  { src: "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/f4dc814d-a65c-4730-82dd-02e2e764efdb.jpg", alt: "SVEN PS-850 — 28 часов автономности" },
  { src: "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/2847c2f2-bb1a-44be-a483-57dde52216dc.jpg", alt: "SVEN PS-850 — TWS стереопара" },
];

/* ─── PS-990 real photos ─── */
const PS990_PHOTOS = [
  { src: "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/02cdba62-82ae-4d3f-be8c-4a8949eaf891.png", alt: "SVEN PS-990, IPx7 защита от воды" },
  { src: "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/4ca4b266-77c6-48ee-85c4-543e18d3c044.jpg", alt: "SVEN PS-990 — 16 часов автономности" },
  { src: "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/b013661a-b6e0-4e6b-86a9-31bf5eb953d8.jpg", alt: "SVEN PS-990 — акустическая система изнутри" },
  { src: "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/3644f976-fc3c-49e0-aad7-53b6e672bc97.jpg", alt: "SVEN PS-990 — мощный бас 180 Вт" },
  { src: "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/640109cd-1909-4cb5-9778-53f9dfc5c058.jpg", alt: "SVEN PS-990 — разъёмы питания, AUX, USB" },
];

/* ─── PS-1900 real photos ─── */
const PS1900_PHOTOS = [
  { src: "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/b06b5f40-c527-4817-b770-a34190601160.png", alt: "SVEN PS-1900, вид спереди, 1000 Вт" },
  { src: "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/0ad8b22e-8e5f-4c7f-8cc0-8de90c612e4b.JPG", alt: "SVEN PS-1900 — гитарный вход" },
  { src: "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/76c4966f-a0f3-4dfb-a76e-84a170dc7dfb.jpg", alt: "SVEN PS-1900 — 1000 Вт настоящего веселья" },
  { src: "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/f319d747-5070-4645-837a-7e397255babc.jpg", alt: "SVEN PS-1900 — 2 микрофона, кара­оке для двоих" },
  { src: "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/12a183c8-c388-4fb9-9b52-7cc53954ae2e.JPG", alt: "SVEN PS-1900 — NFC подключение одним касанием" },
];

/* ─── PS-399 real photos ─── */
const PS399_PHOTOS = [
  { src: "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/df225f17-1c64-48bc-8a83-f21266f04de2.png", alt: "SVEN PS-399, вид спереди" },
  { src: "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/11c91f54-cb42-43d4-9fae-0d0ec59f4959.jpg", alt: "SVEN PS-399 — 3-полосная акустика" },
  { src: "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/284be3c8-775e-4f37-9575-edd6985b8d16.jpg", alt: "SVEN PS-399 — Bluetooth и Auracast" },
  { src: "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/6b846afd-46b3-4265-adbf-563aec0d984d.jpg", alt: "SVEN PS-399 — 16 часов автономности" },
];

function ProductSlider({ photos }: { photos: { src: string; alt: string }[] }) {
  const [current, setCurrent] = useState(0);
  return (
    <div style={{ position: "relative", borderRadius: 20, overflow: "hidden" }}>
      {/* Main image */}
      <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", borderRadius: 20, background: "#111" }}>
        <img
          src={photos[current].src}
          alt={photos[current].alt}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "opacity 0.3s ease" }}
          loading="lazy"
        />
        {/* Arrows */}
        {photos.length > 1 && (
          <>
            <button onClick={() => setCurrent(c => (c - 1 + photos.length) % photos.length)}
              style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)", zIndex: 2 }}>
              ‹
            </button>
            <button onClick={() => setCurrent(c => (c + 1) % photos.length)}
              style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)", zIndex: 2 }}>
              ›
            </button>
          </>
        )}
        {/* Dot counter */}
        <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6, zIndex: 2 }}>
          {photos.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              style={{ width: i === current ? 20 : 8, height: 8, borderRadius: 4, background: i === current ? "#0072CE" : "rgba(255,255,255,0.35)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.25s ease" }} />
          ))}
        </div>
      </div>
      {/* Thumbnails */}
      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        {photos.map((p, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            style={{ flex: 1, aspectRatio: "1", borderRadius: 10, overflow: "hidden", border: `2px solid ${i === current ? "#0072CE" : "rgba(255,255,255,0.1)"}`, padding: 0, cursor: "pointer", transition: "border-color 0.2s" }}>
            <img src={p.src} alt={p.alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Index() {
  useFadeUp();
  useScrollEffects();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div style={{ backgroundColor: "#1A1A1A", color: "#fff", minHeight: "100vh" }}>
      {/* Progress bar */}
      <div id="progress-bar" />

      {/* ── HEADER ── */}
      <header id="main-header" style={{ padding: "0 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <div>
            <img src={LOGO_URL} alt="SVEN — YOU WANT WE CAN" style={{ height: 48, width: "auto", display: "block", objectFit: "contain" }} />
          </div>
          {/* Nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 28 }} className="hidden md:flex">
            {[["Сценарии","scenarios"],["Модели","models"],["Сравнение","compare"],["Видео","videos"]].map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)}
                style={{ background: "none", border: "none", color: "rgba(255,255,255,0.85)", fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: "0.88rem", cursor: "pointer", letterSpacing: "0.02em" }}
                className="hover:text-white transition-colors">
                {label}
              </button>
            ))}
          </nav>
          <button onClick={() => { scrollTo("models"); ymGoal("click_where_to_buy"); }}
            className="sven-btn-outline" style={{ padding: "9px 22px", fontSize: "0.85rem" }}>
            Где купить
          </button>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0d0d1a 0%, #0a1628 50%, #0d0d1a 100%)", display: "flex", alignItems: "center", paddingTop: 72, overflow: "hidden", position: "relative" }}>
        {/* RGB bg glow */}
        <div style={{ position: "absolute", top: "20%", left: "5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(131,56,236,0.15) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,114,206,0.18) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 32px", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}
          className="grid-cols-1 lg:grid-cols-2 hero-grid-inner">
          {/* Text */}
          <div className="fade-up">
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#06FFA5", boxShadow: "0 0 12px #06FFA5" }} />
              <span style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.15em", color: "#06FFA5", textTransform: "uppercase" }}>
                Официальная линейка SVEN 2026
              </span>
            </div>
            <h1 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem, 5vw, 4rem)", lineHeight: 1.1, marginBottom: 24 }}>
              Звук, который превращает любой день{" "}
              <span className="rgb-gradient-text">в событие</span>
            </h1>
            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: 36, maxWidth: 520 }}>
              4 модели портативной акустики SVEN — от пляжного бумбокса до мобильного клуба на 1000 ватт
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 32 }}>
              <button onClick={() => { scrollTo("scenarios"); ymGoal("click_hero_pick_scenario"); }} className="sven-btn-primary">
                🎯 Подобрать под мой сценарий
              </button>
              <button onClick={() => { scrollTo("models"); ymGoal("click_hero_all_models"); }} className="sven-btn-outline">
                Смотреть все модели
              </button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              {["✅ Гарантия 12 месяцев", "✅ Официальная доставка по РФ", "✅ Доступны на маркетплейсах"].map(t => (
                <span key={t} style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.6)" }}>{t}</span>
              ))}
            </div>
          </div>

          {/* 4 speakers lineup */}
          <div className="fade-up hero-speakers-col" style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 16, padding: "20px 0" }}>
            {[
              { img: PS399_PHOTOS[0].src, h: 160, name: "PS-399", glow: "#8338EC" },
              { img: PS850_PHOTOS[0].src, h: 200, name: "PS-850", glow: "#3A86FF" },
              { img: PS990_PHOTOS[0].src, h: 240, name: "PS-990", glow: "#06FFA5" },
              { img: PS1900_PHOTOS[0].src, h: 300, name: "PS-1900", glow: "#FFB800" },
            ].map((sp, i) => (
              <div key={sp.name} className="model-img-float" style={{ animationDelay: `${i * 0.3}s`, textAlign: "center" }}>
                <div style={{
                  width: sp.h * 0.65, height: sp.h, borderRadius: 16, overflow: "hidden",
                  boxShadow: `0 0 30px ${sp.glow}44, 0 0 60px ${sp.glow}22`,
                  border: `1px solid ${sp.glow}33`
                }}>
                  <img src={sp.img} alt={`Портативная акустика SVEN ${sp.name}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                </div>
                <p style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "0.7rem", color: sp.glow, marginTop: 8 }}>{sp.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOCK 2: SCENARIOS ── */}
      <section id="scenarios" style={{ background: "#111", padding: "80px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="fade-up" style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.15em", color: "#0072CE", textTransform: "uppercase", marginBottom: 12 }}>Выберите сценарий</p>
            <h2 className="section-title">Где и как вы будете её слушать?</h2>
            <p className="section-sub" style={{ marginTop: 12 }}>Выберите сценарий — мы подскажем идеальную модель</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {[
              { img: IMG.beach, icon: "🌊", title: "На пляже и пикнике",  text: "Лёгкая, защищённая от воды и брызг. Вещайте музыку сразу на несколько Bluetooth-наушников", btn: "→ SVEN PS-399", anchor: "ps399", goal: "click_scenario_beach", btnClass: "sven-btn-primary" },
              { img: IMG.karaoke, icon: "🎤", title: "Караоке-вечеринка дома", text: "Микрофон в комплекте, управление со смартфона, до 28 часов работы без розетки", btn: "→ SVEN PS-850", anchor: "ps850", goal: "click_scenario_karaoke", btnClass: "sven-btn-primary" },
              { img: IMG.dacha, icon: "💧", title: "Рыбалка, дача, у воды", text: "180 Вт мощности. Не боится полного погружения в воду. Работает от розетки и заряжает телефон", btn: "→ SVEN PS-990", anchor: "ps990", goal: "click_scenario_dacha", btnClass: "sven-btn-primary" },
              { img: IMG.event, icon: "⚡", title: "Свадьба, корпоратив, концерт", text: "1000 Вт. Профессиональные усилители. 2 микрофона + гитарный вход. На колёсиках", btn: "→ SVEN PS-1900", anchor: "ps1900", goal: "click_scenario_event", btnClass: "sven-btn-gold" },
            ].map((sc) => (
              <div key={sc.title} className="scenario-card fade-up" onClick={() => { scrollTo(sc.anchor); ymGoal(sc.goal); }}>
                <div style={{ position: "relative", height: 200 }}>
                  <img src={sc.img} alt={sc.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.75) 100%)" }} />
                  <div style={{ position: "absolute", top: 16, left: 16, fontSize: "2rem" }}>{sc.icon}</div>
                </div>
                <div style={{ padding: "20px 20px 24px", background: "#2C2C2C" }}>
                  <h3 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: 10 }}>{sc.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.6, marginBottom: 16 }}>{sc.text}</p>
                  <button className={sc.btnClass} style={{ fontSize: "0.82rem", padding: "9px 18px" }}>
                    {sc.btn}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOCK 3: MODELS ── */}
      <section id="models" style={{ background: "#1A1A1A" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 32px 40px" }}>
          <div className="fade-up" style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 className="section-title">4 модели. 4 характера. <span className="rgb-gradient-text">4 ваших сценария.</span></h2>
          </div>
        </div>

        {/* PS-399 */}
        <div id="ps399" style={{ background: "#1A1A1A", padding: "60px 32px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="grid-cols-1 lg:grid-cols-2 model-grid">
            <div className="fade-up model-img-wrap model-img-first" style={{ borderRadius: 24 }}>
              <ProductSlider photos={PS399_PHOTOS} />
            </div>
            <div className="fade-up model-text-second">
              <div style={{ marginBottom: 16 }}>
                <span className="badge new">🆕 NEW</span>
                <span className="badge">ПОРТАТИВНАЯ КОЛОНКА</span>
              </div>
              <h3 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", marginBottom: 8 }}>SVEN PS-399</h3>
              <p style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: "1.05rem", color: "#5bb8ff", marginBottom: 16 }}>
                «Один источник — десятки слушателей. Технология будущего уже сегодня»
              </p>
              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.75, fontSize: "0.92rem", marginBottom: 24 }}>
                Самая технологичная модель линейки: поддержка Auracast™ и Bluetooth 5.4 превращают колонку в персональный передатчик — транслируйте музыку на неограниченное количество совместимых устройств. Защита IPx6 не боится ни дождя, ни брызг, ни направленной струи воды.
              </p>
              <div style={{ marginBottom: 24 }}>
                {[
                  { icon: "📡", text: "Auracast™ + Bluetooth 5.4 — вещайте на десятки наушников и колонок одновременно" },
                  { icon: "💧", text: "Защита IPx6 — дождь, брызги, струи воды — не помеха" },
                  { icon: "🎵", text: "3-полосный звук + 100 Вт — глубокий бас, чистая середина, прозрачные ВЧ" },
                ].map(f => (
                  <div key={f.icon} className="feature-item">
                    <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>{f.icon}</span>
                    <span style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{f.text}</span>
                  </div>
                ))}
              </div>
              <div className="stat-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 28 }}>
                {[["100 Вт","Мощность"],["16 ч","Автономность"],["IPx6","Защита"],["3,7 кг","Вес"]].map(([n,l]) => (
                  <div key={l} className="stat-pill"><div className="stat-num">{n}</div><div className="stat-label">{l}</div></div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <span className="sven-btn-disabled">🛒 Купить — скоро</span>
              </div>
              <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginTop: 10 }}>⚠️ Ссылка на покупку появится в ближайшее время</p>
            </div>
          </div>
        </div>

        {/* PS-850 */}
        <div id="ps850" style={{ background: "#2C2C2C", padding: "60px 32px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="grid-cols-1 lg:grid-cols-2 model-grid">
            <div className="fade-up model-text-second">
              <div style={{ marginBottom: 16 }}>
                <span className="badge">🎤 С КАРАОКЕ</span>
                <span className="badge">🎁 МИКРОФОН В КОМПЛЕКТЕ</span>
              </div>
              <h3 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", marginBottom: 8 }}>SVEN PS-850</h3>
              <p style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: "1.05rem", color: "#5bb8ff", marginBottom: 16 }}>
                «Душа любой вечеринки — Карао­ке, музыка, радио: управляйте всем со смартфона»
              </p>
              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.75, fontSize: "0.92rem", marginBottom: 24 }}>
                Единственная в линейке модель с фирменным приложением SVEN SOUND — управляйте эквалайзером, режимами подсветки и треками прямо с телефона. В комплекте — проводной микрофон для караоке с регулировкой эха. Аккумулятор держит до 28 часов.
              </p>
              <div style={{ marginBottom: 24 }}>
                {[
                  { icon: "🎤", text: "Кара­оке + микрофон в комплекте — пойте сразу из коробки" },
                  { icon: "📱", text: "Приложение SVEN SOUND — настройка прямо с телефона + обновление прошивки" },
                  { icon: "🔋", text: "28 часов автономности — рекорд линейки" },
                ].map(f => (
                  <div key={f.icon} className="feature-item">
                    <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>{f.icon}</span>
                    <span style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{f.text}</span>
                  </div>
                ))}
              </div>
              <div className="stat-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 12 }}>
                {[["100 Вт","Мощность"],["28 ч","Автономность"],["NFC","Подключение"],["+ Пульт ДУ","В комплекте"]].map(([n,l]) => (
                  <div key={l} className="stat-pill"><div className="stat-num">{n}</div><div className="stat-label">{l}</div></div>
                ))}
              </div>
              <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", marginBottom: 20 }}>
                TWS-стереопара · FM-радио · microSD · USB · 8 режимов RGB
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href={LINKS.ps850wb} target="_blank" rel="noopener noreferrer"
                  className="sven-btn-wb" onClick={() => ymGoal("click_buy_ps850_wb")}>
                  🛒 Купить на Wildberries
                </a>
                <button className="sven-btn-video"
                  onClick={() => { setActiveVideo("https://vk.com/video_ext.php?oid=-16115403&id=456240809&hd=2"); ymGoal("click_video_ps850"); }}>
                  ▶ Смотреть распаковку
                </button>
              </div>
            </div>
            <div className="fade-up model-img-wrap model-img-first" style={{ borderRadius: 24 }}>
              <ProductSlider photos={PS850_PHOTOS} />
            </div>
          </div>
        </div>

        {/* PS-990 */}
        <div id="ps990" style={{ background: "#1A1A1A", padding: "60px 32px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="grid-cols-1 lg:grid-cols-2 model-grid">
            <div className="fade-up model-img-wrap model-img-first" style={{ borderRadius: 24 }}>
              <ProductSlider photos={PS990_PHOTOS} />
            </div>
            <div className="fade-up model-text-second">
              <div style={{ marginBottom: 16 }}>
                <span className="badge">💧 IPx7</span>
                <span className="badge">🔌 СЕТЬ + АККУМУЛЯТОР</span>
              </div>
              <h3 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", marginBottom: 8 }}>SVEN PS-990</h3>
              <p style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: "1.05rem", color: "#5bb8ff", marginBottom: 16 }}>
                «180 ватт мощности. Можно погружать под воду. Заряжает ваш телефон»
              </p>
              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.75, fontSize: "0.92rem", marginBottom: 24 }}>
                Самая защищённая колонка линейки — класс IPx7 позволяет полное погружение в воду до 1 метра на 30 минут. Это не «не боится дождя», это «не страшно уронить в бассейн или озеро». 180 Вт мощности и поддержка lossless-форматов FLAC и WAV.
              </p>
              <div style={{ marginBottom: 24 }}>
                {[
                  { icon: "💧", text: "IPx7 — полное погружение в воду до 1 м на 30 минут" },
                  { icon: "🔊", text: "180 Вт RMS + диапазон от 35 Гц — самый глубокий бас в линейке" },
                  { icon: "🔌", text: "2 способа зарядки + powerbank — от розетки, от USB-C, и сам заряжает телефон" },
                ].map(f => (
                  <div key={f.icon} className="feature-item">
                    <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>{f.icon}</span>
                    <span style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{f.text}</span>
                  </div>
                ))}
              </div>
              <div className="stat-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 12 }}>
                {[["180 Вт","Мощность"],["16 ч","Автономность"],["IPx7","Защита"],["FLAC","Lossless"]].map(([n,l]) => (
                  <div key={l} className="stat-pill"><div className="stat-num">{n}</div><div className="stat-label">{l}</div></div>
                ))}
              </div>
              <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", marginBottom: 20 }}>
                TWS-пара · NFC · Bass Boost · Эквалайзер · 6 режимов RGB
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href={LINKS.ps990wb} target="_blank" rel="noopener noreferrer"
                  className="sven-btn-wb" onClick={() => ymGoal("click_buy_ps990_wb")}>
                  🛒 Купить на Wildberries
                </a>
                <button className="sven-btn-video"
                  onClick={() => { setActiveVideo("https://vk.com/video_ext.php?oid=-16115403&id=456240946&hd=2"); ymGoal("click_video_ps990"); }}>
                  ▶ Смотреть распаковку
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* PS-1900 */}
        <div id="ps1900" className="gold-model" style={{ background: "#1a1508", padding: "60px 32px", borderTop: "1px solid rgba(255,184,0,0.15)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="grid-cols-1 lg:grid-cols-2 model-grid">
            <div className="fade-up model-text-second">
              <div style={{ marginBottom: 16 }}>
                <span className="badge gold">👑 ФЛАГМАН</span>
                <span className="badge gold">🪵 ДЕРЕВЯННЫЙ КОРПУС</span>
              </div>
              <h3 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", marginBottom: 8, color: "#FFB800" }}>SVEN PS-1900</h3>
              <p style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: "1.05rem", color: "#FFB800", marginBottom: 16 }}>
                «То, для чего раньше арендовали профессиональное оборудование»
              </p>
              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.75, fontSize: "0.92rem", marginBottom: 24 }}>
                Это уже не «колонка». Это мобильная клубная система в корпусе из МДФ на профессиональных усилителях STMicroelectronics STA516BE. 1000 Вт мощности, 2 микрофонных входа, гитарный вход, стробоскоп и колёсики. Озвучит свадьбу, корпоратив, выпускной.
              </p>
              <div style={{ marginBottom: 24 }}>
                {[
                  { icon: "🔊", text: "1000 Вт + проф. усилители STA516BE — мощь для десятков людей" },
                  { icon: "🎤", text: "2 микрофона + гитара — настоящая кара­оке-станция для соло и дуэтов" },
                  { icon: "⚡", text: "Стробоскоп + RGB — атмосфера клуба у вас на площадке" },
                ].map(f => (
                  <div key={f.icon} className="feature-item">
                    <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>{f.icon}</span>
                    <span style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{f.text}</span>
                  </div>
                ))}
              </div>
              <div className="stat-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 12 }}>
                {[["1000 Вт","Мощность"],["МДФ","Корпус"],["2 микр.","Кара­оке"],["Колёса","Транспорт"]].map(([n,l]) => (
                  <div key={l} className="stat-pill" style={{ borderColor: "rgba(255,184,0,0.2)" }}>
                    <div className="stat-num" style={{ color: "#FFB800" }}>{n}</div>
                    <div className="stat-label">{l}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", marginBottom: 6 }}>
                TWS-пара (= 2000 Вт) · NFC · Bass Boost · LED-дисплей · FM-радио · Линейный выход
              </p>
              <p style={{ fontSize: "0.75rem", color: "rgba(255,184,0,0.6)", marginBottom: 20 }}>
                ⚠️ Микрофон не входит в комплект. Питание только от сети 230В (без аккумулятора).
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a href={LINKS.ps1900ozon} target="_blank" rel="noopener noreferrer"
                  className="sven-btn-ozon" onClick={() => ymGoal("click_buy_ps1900_ozon")}>
                  🛒 Купить на OZON
                </a>
                <button className="sven-btn-video"
                  onClick={() => { setActiveVideo("https://vk.com/video_ext.php?oid=-16115403&id=456239518&hd=2"); ymGoal("click_video_ps1900"); }}>
                  ▶ Смотреть распаковку
                </button>
              </div>
            </div>
            <div className="fade-up model-img-wrap model-img-first" style={{ borderRadius: 24, boxShadow: "0 0 40px rgba(255,184,0,0.25)" }}>
              <ProductSlider photos={PS1900_PHOTOS} />
            </div>
          </div>
        </div>
      </section>

      {/* ── BLOCK 4: COMPARE TABLE ── */}
      <section id="compare" style={{ background: "#111", padding: "80px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="fade-up" style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="section-title">Сравните и выберите свою</h2>
            <p className="section-sub" style={{ marginTop: 10 }}>Все ключевые характеристики в одной таблице</p>
          </div>
          <div className="compare-scroll-hint fade-up">
            <span className="compare-arrow compare-arrow-left">‹</span>
            <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", fontFamily: "Montserrat, sans-serif" }}>листайте</span>
            <span className="compare-arrow compare-arrow-right">›</span>
          </div>
          <div className="compare-wrap fade-up" style={{ borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)" }}>
            <table className="compare-table">
              <thead>
                <tr>
                  <th style={{ minWidth: 160 }}>Характеристика</th>
                  <th>PS-399</th>
                  <th>PS-850</th>
                  <th>PS-990</th>
                  <th className="gold-col">PS-1900</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Сценарий","Пляж, пикник","Дом, кара­оке","Дача, рыбалка","Свадьба, клуб"],
                  ["Мощность RMS","100 Вт","100 Вт","180 Вт","1000 Вт"],
                  ["Защита от воды","IPx6","—","IPx7","—"],
                  ["Кара­оке","—","✅ (1 микр.)","—","✅ (2 микр.)"],
                  ["Гитарный вход","—","—","—","✅"],
                  ["Auracast / BT 5.4","✅","—","—","—"],
                  ["Приложение","—","✅ SVEN SOUND","—","—"],
                  ["FM-радио","—","✅","—","✅"],
                  ["microSD","—","✅","—","—"],
                  ["FLAC / lossless","—","—","✅","—"],
                  ["Аккумулятор","16 ч","28 ч","16 ч","— (от сети)"],
                  ["Powerbank","—","—","✅","—"],
                  ["TWS-пара","—","✅","✅","✅"],
                  ["Корпус","Пластик","Пластик","Пластик","МДФ"],
                  ["Вес","3,7 кг","5,85 кг","7,1 кг","17,2 кг"],
                  ["Стробоскоп","—","—","—","✅"],
                  ["Колёсики","—","—","—","✅"],
                  ["Микрофон в компл.","—","✅","—","—"],
                  ["Пульт ДУ","—","✅","—","—"],
                ].map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => {
                      if (j === 0) return <td key={j}>{cell}</td>;
                      const isCheck = cell === "✅" || cell.startsWith("✅");
                      const isDash = cell === "—";
                      return (
                        <td key={j} className={isCheck ? "check" : isDash ? "dash" : ""}>
                          {cell}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr>
                  <td style={{ fontWeight: 700, color: "#fff" }}>Купить</td>
                  <td>
                    <span className="sven-btn-disabled" style={{ fontSize: "0.78rem", padding: "7px 14px" }}>Скоро</span>
                  </td>
                  <td>
                    <a href={LINKS.ps850wb} target="_blank" rel="noopener noreferrer"
                      className="sven-btn-primary" style={{ fontSize: "0.78rem", padding: "7px 14px" }}
                      onClick={() => ymGoal("click_buy_ps850_wb")}>Купить</a>
                  </td>
                  <td>
                    <a href={LINKS.ps990wb} target="_blank" rel="noopener noreferrer"
                      className="sven-btn-primary" style={{ fontSize: "0.78rem", padding: "7px 14px" }}
                      onClick={() => ymGoal("click_buy_ps990_wb")}>Купить</a>
                  </td>
                  <td>
                    <a href={LINKS.ps1900ozon} target="_blank" rel="noopener noreferrer"
                      className="sven-btn-gold" style={{ fontSize: "0.78rem", padding: "7px 14px" }}
                      onClick={() => ymGoal("click_buy_ps1900_ozon")}>Купить</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── BLOCK 5: VIDEOS ── */}
      <section id="videos" style={{ background: "#1A1A1A", padding: "80px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="fade-up" style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="section-title">Посмотрите вживую</h2>
            <p className="section-sub" style={{ marginTop: 10 }}>Распаковки и обзоры от команды SVEN</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {/* PS-399 — заглушка */}
            <div className="video-card fade-up">
              <div className="video-thumb" style={{ cursor: "default" }}>
                <img src={PS399_PHOTOS[0].src} alt="SVEN PS-399 видео скоро" loading="lazy" />
                <div className="video-play-overlay">
                  <div style={{ textAlign: "center" }}>
                    <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#555", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
                      <Icon name="Clock" size={24} style={{ color: "#999" }} />
                    </div>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.82rem" }}>Видео скоро будет добавлено</p>
                  </div>
                </div>
              </div>
              <div style={{ padding: "16px 18px" }}>
                <p style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: "0.88rem", color: "rgba(255,255,255,0.5)" }}>
                  SVEN PS-399 — обзор скоро
                </p>
              </div>
            </div>

            {/* PS-850 */}
            <div className="video-card fade-up">
              <div className="video-thumb" onClick={() => { setActiveVideo("https://vk.com/video_ext.php?oid=-16115403&id=456240809&hd=2"); ymGoal("click_video_ps850"); }}>
                <img src={PS850_PHOTOS[0].src} alt="SVEN PS-850 обзор и распаковка" loading="lazy" />
                <div className="video-play-overlay">
                  <div className="play-circle"><Icon name="Play" size={26} className="ml-1" style={{ color: "#fff" }} /></div>
                </div>
              </div>
              <div style={{ padding: "16px 18px" }}>
                <p style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: "0.88rem" }}>
                  SVEN PS-850 — обзор и настройка приложения SVEN SOUND
                </p>
                <button className="sven-btn-video" style={{ marginTop: 12, fontSize: "0.8rem", padding: "8px 16px" }}
                  onClick={() => { setActiveVideo("https://vk.com/video_ext.php?oid=-16115403&id=456240809&hd=2"); ymGoal("click_video_ps850"); }}>
                  ▶ Смотреть видео
                </button>
              </div>
            </div>

            {/* PS-990 */}
            <div className="video-card fade-up">
              <div className="video-thumb" onClick={() => { setActiveVideo("https://vk.com/video_ext.php?oid=-16115403&id=456240946&hd=2"); ymGoal("click_video_ps990"); }}>
                <img src={PS990_PHOTOS[0].src} alt="SVEN PS-990 распаковка" loading="lazy" />
                <div className="video-play-overlay">
                  <div className="play-circle"><Icon name="Play" size={26} className="ml-1" style={{ color: "#fff" }} /></div>
                </div>
              </div>
              <div style={{ padding: "16px 18px" }}>
                <p style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: "0.88rem" }}>
                  SVEN PS-990 — распаковка флагмана водозащиты
                </p>
                <button className="sven-btn-video" style={{ marginTop: 12, fontSize: "0.8rem", padding: "8px 16px" }}
                  onClick={() => { setActiveVideo("https://vk.com/video_ext.php?oid=-16115403&id=456240946&hd=2"); ymGoal("click_video_ps990"); }}>
                  ▶ Смотреть видео
                </button>
              </div>
            </div>

            {/* PS-1900 */}
            <div className="video-card fade-up">
              <div className="video-thumb" onClick={() => { setActiveVideo("https://vk.com/video_ext.php?oid=-16115403&id=456239518&hd=2"); ymGoal("click_video_ps1900"); }}>
                <img src={PS1900_PHOTOS[0].src} alt="SVEN PS-1900 распаковка" loading="lazy" />
                <div className="video-play-overlay">
                  <div className="play-circle" style={{ background: "#FFB800", boxShadow: "0 0 30px rgba(255,184,0,0.5)" }}>
                    <Icon name="Play" size={26} className="ml-1" style={{ color: "#1A1A1A" }} />
                  </div>
                </div>
              </div>
              <div style={{ padding: "16px 18px" }}>
                <p style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: "0.88rem" }}>
                  SVEN PS-1900 — распаковка мобильного клуба на 1000 Вт
                </p>
                <button className="sven-btn-video" style={{ marginTop: 12, fontSize: "0.8rem", padding: "8px 16px" }}
                  onClick={() => { setActiveVideo("https://vk.com/video_ext.php?oid=-16115403&id=456239518&hd=2"); ymGoal("click_video_ps1900"); }}>
                  ▶ Смотреть видео
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video lightbox */}
        {activeVideo && (
          <div onClick={() => setActiveVideo(null)}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>
            <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 960, position: "relative" }}>
              <button onClick={() => { setActiveVideo(null); ymGoal("click_video_close"); }}
                style={{ position: "absolute", top: -44, right: 0, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontSize: "0.9rem", fontFamily: "Montserrat, sans-serif", fontWeight: 600, cursor: "pointer", padding: "6px 16px", borderRadius: 6, display: "flex", alignItems: "center", gap: 6 }}>
                ✕ Закрыть
              </button>
              <div style={{ aspectRatio: "16/9", borderRadius: 12, overflow: "hidden", background: "#000", boxShadow: "0 0 60px rgba(0,0,0,0.8)" }}>
                <iframe
                  src={activeVideo}
                  width="100%" height="100%"
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                  frameBorder="0"
                  allowFullScreen
                  style={{ display: "block" }}
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── BLOCK 6: SOCIAL PROOF ── */}
      <section style={{ background: "#0072CE", padding: "64px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="fade-up" style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="section-title">Почему выбирают SVEN</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 0 }}>
            {[
              { icon: "🏆", num: "35+", label: "лет на рынке аудио" },
              { icon: "🌍", num: "30+", label: "стран присутствия бренда" },
              { icon: "🛡", num: "12 мес.", label: "официальной гарантии РФ" },
              { icon: "🎵", num: "4", label: "модели под любой сценарий" },
            ].map((s, i) => (
              <div key={i} className="proof-stat fade-up" style={{ borderRight: i < 3 ? "1px solid rgba(255,255,255,0.2)" : "none" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: 8 }}>{s.icon}</div>
                <div className="num" style={{ color: "#fff" }}>{s.num}</div>
                <div className="label" style={{ color: "rgba(255,255,255,0.75)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#111", padding: "40px 32px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          {/* Logo */}
          <div>
            <img src={LOGO_URL} alt="SVEN — YOU WANT WE CAN" style={{ height: 52, width: "auto", display: "block", objectFit: "contain" }} />
          </div>

          {/* Social links */}
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {[
              { href: "https://vk.com/sven_global", title: "ВКонтакте", img: "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/efc30639-b0c0-4bae-bb45-51faabb53685.png", goal: "click_social_vk" },
              { href: "https://rutube.ru/channel/24199565/", title: "Rutube", img: "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/402eb07e-6868-4999-89e0-42b169191754.png", goal: "click_social_rutube" },
              { href: "https://t.me/svenglobal", title: "Telegram", img: "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/f9c079de-0c87-44e5-bf61-d504e9b84410.png", goal: "click_social_telegram" },
              { href: "https://zen.yandex.ru/id/5cbd9ca636a7a700b369294a?lang=ru&clid=300", title: "Яндекс Дзен", img: "https://cdn.poehali.dev/projects/8d7832a1-ab23-4aac-a6ba-8f43ca7fdf37/bucket/13e84ed0-1199-4172-b0dc-274e44b75998.png", goal: "click_social_dzen" },
            ].map(s => (
              <a key={s.title} href={s.href} target="_blank" rel="noopener noreferrer" title={s.title}
                onClick={() => ymGoal(s.goal)}
                style={{ width: 44, height: 44, borderRadius: 10, overflow: "hidden", display: "block", textDecoration: "none", transition: "opacity 0.2s, transform 0.2s", flexShrink: 0 }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.8"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
                <img src={s.img} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", textAlign: "right" }}>
            Registered Trademark of Oy SVEN Scandinavia ltd. Finland.<br />
            Copyright SVEN. All rights reserved.
          </p>
        </div>
      </footer>

      {/* ── Sticky float button ── */}
      <button id="sticky-btn" onClick={() => { scrollTo("scenarios"); ymGoal("click_sticky_pick_scenario"); }} title="Подобрать колонку">
        <Icon name="Music" size={22} style={{ color: "#fff" }} />
      </button>
    </div>
  );
}