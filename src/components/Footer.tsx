import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/icons/SocialIcons";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/servicios", label: "Servicios" },
  { href: "/agendar-cita", label: "Agendar Cita" },
  { href: "/contacto", label: "Contacto" },
];

const serviceLinks = [
  "Declaración Anual",
  "Devoluciones de Saldo a Favor",
  "Alta ante SAT",
  "Asesoría Fiscal",
  "Regularización Fiscal",
  "Facturación",
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold text-sm font-bold text-navy">
              JLC
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-lg font-bold text-white">JLC Finanzas</span>
              <span className="text-[11px] font-medium tracking-wide text-white/60">
                DESPACHO FISCAL
              </span>
            </span>
          </Link>
          <p className="mt-4 text-sm text-white/70">
            Tu aliado en soluciones fiscales y contables. Atención profesional,
            personalizada y confiable para personas físicas y negocios en
            México.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href="https://www.facebook.com/profile.php?id=100063773822682"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-gold hover:text-navy"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://www.instagram.com/jlcfinanzas/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-gold hover:text-navy"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.tiktok.com/@jlcfinanzas"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-gold hover:text-navy"
            >
              <TikTokIcon />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-base font-bold text-gold">Navegación</h3>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-white/70 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-base font-bold text-gold">Servicios</h3>
          <ul className="mt-4 space-y-2.5">
            {serviceLinks.map((s) => (
              <li key={s}>
                <Link href="/servicios" className="text-sm text-white/70 hover:text-white">
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-base font-bold text-gold">Contacto</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gold" />
              (81) 3578-0250
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gold" />
              jlozanocontador@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gold" />
              Guadalupe, México
            </li>
            <li className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>
                Lun - Jue: 18:00 - 22:00
                <br />
                Vie - Sáb: Cerrado
                <br />
                Dom: 9:00 - 15:00
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/50 sm:flex-row sm:px-6 lg:px-8">
          <span>
            © {new Date().getFullYear()} JLC Finanzas. Todos los derechos
            reservados.
          </span>
          <div className="flex items-center gap-4">
            <Link href="/aviso-de-privacidad" className="hover:text-white/80">
              Aviso de Privacidad
            </Link>
            <Link href="/terminos-y-condiciones" className="hover:text-white/80">
              Términos y Condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
