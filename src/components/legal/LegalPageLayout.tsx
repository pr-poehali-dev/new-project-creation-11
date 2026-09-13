import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

interface LegalPageLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const LegalPageLayout = ({ title, subtitle, children }: LegalPageLayoutProps) => {
  return (
    <div className="min-h-screen w-full bg-[#FBF6F0] font-['Inter',sans-serif] text-[#2B2420]">
      <header className="sticky top-0 z-40 border-b border-[#EFE0CE] bg-[#FBF6F0]/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3">
          <span className="font-['Montserrat',sans-serif] text-sm font-bold md:text-base">
            Инна Фалолеева <span className="font-normal text-[#8A7864]">· психолог</span>
          </span>
          <Link
            to="/efir09"
            className="flex items-center gap-1.5 text-xs font-semibold text-[#8A7864] transition hover:text-[#2F7A52] md:text-sm"
          >
            <Icon name="ArrowLeft" size={16} />
            На главную
          </Link>
        </div>
      </header>

      <main className="px-5 py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-2 font-['Montserrat',sans-serif] text-2xl font-extrabold leading-tight md:text-4xl">
            {title}
          </h1>
          <p className="mb-8 text-sm text-[#8A7864] md:text-base">{subtitle}</p>
          <div className="space-y-6 rounded-2xl border border-[#EEE0D2] bg-white p-6 leading-relaxed md:p-10">
            {children}
          </div>
        </div>
      </main>

      <footer className="border-t border-[#EEE0D2] bg-white px-5 py-8">
        <p className="mx-auto max-w-3xl text-center text-xs text-[#8A7864]">
          © {new Date().getFullYear()} ИП Фалолеева Инна Николаевна · ИНН 505003981273
        </p>
      </footer>
    </div>
  );
};

export const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section>
    <h2 className="mb-3 font-['Montserrat',sans-serif] text-lg font-bold text-[#2B2420] md:text-xl">
      {title}
    </h2>
    <div className="space-y-2 text-sm text-[#4a3f36] md:text-base">{children}</div>
  </section>
);

export const P = ({ children }: { children: React.ReactNode }) => (
  <p className="leading-relaxed">{children}</p>
);

export const Ul = ({ items }: { items: React.ReactNode[] }) => (
  <ul className="list-disc space-y-1.5 pl-5">
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
);

export default LegalPageLayout;
