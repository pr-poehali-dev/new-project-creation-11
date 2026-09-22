import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const ORDER_STATUS_API_URL = "https://functions.poehali.dev/a486ecf1-980e-45b7-9577-881e81649895";

type OrderStatus = "pending" | "paid" | "canceled";

interface OrderInfo {
  order_number: string;
  status: OrderStatus;
  amount: number | null;
  user_name: string | null;
  tariff_id: string | null;
}

const YM_IDS = [112325163];
type YmFn = (id: number, event: string, goal: string) => void;
function ymGoal(goal: string) {
  if (typeof window === "undefined") return;
  const ym = (window as Record<string, unknown>)["ym"] as YmFn | undefined;
  if (typeof ym !== "function") return;
  YM_IDS.forEach((id) => ym(id, "reachGoal", goal));
}

const OrderStatus = () => {
  const [order, setOrder] = useState<OrderInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    document.title = "Статус заказа — Инна Фалолеева";
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
    }
    robots.setAttribute("content", "noindex, nofollow");
  }, []);

  useEffect(() => {
    let pendingOrderNumber: string | null = null;
    try {
      const raw = localStorage.getItem("yookassa_pending_order");
      if (raw) pendingOrderNumber = JSON.parse(raw).order_number;
    } catch {
      pendingOrderNumber = null;
    }

    if (!pendingOrderNumber) {
      setLoading(false);
      setNotFound(true);
      return;
    }

    let attempts = 0;
    let cancelled = false;

    async function poll() {
      attempts += 1;
      try {
        const res = await fetch(
          `${ORDER_STATUS_API_URL}?order_number=${encodeURIComponent(pendingOrderNumber!)}`
        );
        if (res.status === 404) {
          if (!cancelled) {
            setNotFound(true);
            setLoading(false);
          }
          return;
        }
        const data = await res.json();
        if (cancelled) return;

        setOrder({
          order_number: data.order_number,
          status: data.status,
          amount: data.amount,
          user_name: data.user_name,
          tariff_id: data.tariff_id,
        });

        if (data.status === "pending" && attempts < 6) {
          setTimeout(poll, 2000);
        } else {
          setLoading(false);
          if (data.status === "paid") {
            ymGoal("order_status_paid_view");
            localStorage.removeItem("yookassa_pending_order");
          }
        }
      } catch {
        if (!cancelled) {
          setLoading(false);
          setNotFound(true);
        }
      }
    }

    poll();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#FBF6F0] font-['Inter',sans-serif] text-[#2B2420]">
      <header className="border-b border-[#EFE0CE] bg-[#FBF6F0]/90 px-5 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <span className="font-['Montserrat',sans-serif] text-sm font-bold md:text-base">
            Инна Фалолеева <span className="font-normal text-[#8A7864]">· психолог</span>
          </span>
          <Link
            to="/"
            className="text-xs font-semibold text-[#8A7864] transition hover:text-[#2F7A52] md:text-sm"
          >
            На главную
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center px-5 py-14 md:py-20">
        <div className="mx-auto w-full max-w-lg rounded-2xl border border-[#EEE0D2] bg-white p-6 text-center shadow-sm md:p-10">
          {loading && (
            <>
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#E3EFE7] text-[#2F7A52]">
                <Icon name="Loader2" size={32} className="animate-spin" />
              </div>
              <h1 className="mb-2 font-['Montserrat',sans-serif] text-2xl font-bold md:text-3xl">
                Проверяем оплату...
              </h1>
              <p className="text-sm text-[#6b5d52] md:text-base">
                Это займёт несколько секунд
              </p>
            </>
          )}

          {!loading && order?.status === "paid" && (
            <>
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#E3EFE7] text-[#2F7A52]">
                <Icon name="CheckCircle2" size={32} />
              </div>
              <h1 className="mb-3 font-['Montserrat',sans-serif] text-2xl font-bold leading-tight md:text-3xl">
                Оплата прошла успешно{order.user_name ? `, ${order.user_name}` : ""}!
              </h1>
              <p className="mb-6 text-sm leading-relaxed text-[#6b5d52] md:text-base">
                Спасибо за запись. Инна свяжется с вами в ближайшее время, чтобы согласовать
                удобное время встречи. Чек об оплате придёт на вашу почту.
              </p>
              <p className="mb-6 text-xs text-[#8A7864]">Номер заказа: {order.order_number}</p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-xl bg-[#2F7A52] px-6 py-3.5 font-['Montserrat',sans-serif] text-sm font-bold text-white transition hover:bg-[#1F5E3F] md:text-base"
              >
                На главную
                <Icon name="ArrowRight" size={18} />
              </Link>
            </>
          )}

          {!loading && order?.status === "pending" && (
            <>
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#FBEAE3] text-[#C2542E]">
                <Icon name="Clock" size={32} />
              </div>
              <h1 className="mb-3 font-['Montserrat',sans-serif] text-2xl font-bold md:text-3xl">
                Оплата обрабатывается
              </h1>
              <p className="mb-6 text-sm leading-relaxed text-[#6b5d52] md:text-base">
                Если оплата прошла, статус обновится в течение пары минут. Если возникли
                вопросы — напишите нам, и мы всё проверим вручную.
              </p>
              <p className="mb-6 text-xs text-[#8A7864]">Номер заказа: {order.order_number}</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="https://max.ru/id505003981273_bot?start=dl-17889736833afaa9562bfc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-[#2F7A52] px-6 py-3.5 font-['Montserrat',sans-serif] text-sm font-bold text-[#2F7A52] transition hover:bg-[#E3EFE7] md:text-base"
                >
                  Написать в MAX
                </a>
                <a
                  href="https://t.me/FaloleevaPsybot?start=dl-1788885417801"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-[#2F7A52] px-6 py-3.5 font-['Montserrat',sans-serif] text-sm font-bold text-[#2F7A52] transition hover:bg-[#E3EFE7] md:text-base"
                >
                  Написать в Telegram
                </a>
              </div>
              <p className="mt-3 text-xs text-[#8A7864]">Чтобы связаться в Telegram потребуется VPN</p>
            </>
          )}

          {!loading && order?.status === "canceled" && (
            <>
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#FBEAE3] text-[#C2542E]">
                <Icon name="XCircle" size={32} />
              </div>
              <h1 className="mb-3 font-['Montserrat',sans-serif] text-2xl font-bold md:text-3xl">
                Оплата не прошла
              </h1>
              <p className="mb-6 text-sm leading-relaxed text-[#6b5d52] md:text-base">
                Платёж был отменён. Вы можете попробовать снова — деньги с вас не списаны.
              </p>
              <Link
                to="/#pricing"
                className="inline-flex items-center gap-2 rounded-xl bg-[#2F7A52] px-6 py-3.5 font-['Montserrat',sans-serif] text-sm font-bold text-white transition hover:bg-[#1F5E3F] md:text-base"
              >
                Попробовать снова
              </Link>
            </>
          )}

          {!loading && notFound && (
            <>
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#E3EFE7] text-[#2F7A52]">
                <Icon name="HelpCircle" size={32} />
              </div>
              <h1 className="mb-3 font-['Montserrat',sans-serif] text-2xl font-bold md:text-3xl">
                Информация о заказе не найдена
              </h1>
              <p className="mb-6 text-sm leading-relaxed text-[#6b5d52] md:text-base">
                Если вы только что оплатили — напишите нам, и мы проверим оплату вручную.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="https://max.ru/id505003981273_bot?start=dl-17889736833afaa9562bfc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-[#2F7A52] px-6 py-3.5 font-['Montserrat',sans-serif] text-sm font-bold text-[#2F7A52] transition hover:bg-[#E3EFE7] md:text-base"
                >
                  Написать в MAX
                </a>
                <a
                  href="https://t.me/FaloleevaPsybot?start=dl-1788885417801"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-[#2F7A52] px-6 py-3.5 font-['Montserrat',sans-serif] text-sm font-bold text-[#2F7A52] transition hover:bg-[#E3EFE7] md:text-base"
                >
                  Написать в Telegram
                </a>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#2F7A52] px-6 py-3.5 font-['Montserrat',sans-serif] text-sm font-bold text-white transition hover:bg-[#1F5E3F] md:text-base"
                >
                  На главную
                </Link>
              </div>
              <p className="mt-3 text-xs text-[#8A7864]">Чтобы связаться в Telegram потребуется VPN</p>
            </>
          )}
        </div>
      </main>

      <footer className="border-t border-[#EEE0D2] bg-white px-5 py-6 text-center text-xs text-[#8A7864]">
        © {new Date().getFullYear()} ИП Фалолеева Инна Николаевна · ИНН 505003981273
      </footer>
    </div>
  );
};

export default OrderStatus;