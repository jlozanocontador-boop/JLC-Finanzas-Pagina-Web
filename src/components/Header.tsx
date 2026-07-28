"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Phone, Mail, Clock, MessageCircle, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/servicios", label: "Servicios" },
  { href: "/agendar-cita", label: "Agendar Cita" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isCheckout = pathname === "/pagos";

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-navy text-white/80 text-xs sm:text-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="tel:+528135780250"
              className="flex items-center gap-1.5 hover:text-white"
            >
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">(81) 3578-0250</span>
            </a>
            <a
              href="mailto:jlozanocontador@gmail.com"
              className="flex items-center gap-1.5 hover:text-white"
            >
              <Mail className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">jlozanocontador@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Lun-Jue 19-23h · Dom 8-14h</span>
          </div>
        </div>
      </div>

      {!isCheckout && (
        <div className="bg-white shadow-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy text-sm font-bold text-white">
                JLC
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-lg font-bold text-navy">JLC Finanzas</span>
                <span className="text-[11px] font-medium tracking-wide text-gray-500">
                  DESPACHO FISCAL
                </span>
              </span>
            </Link>

            <nav className="hidden items-center gap-7 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition hover:text-gold ${
                    pathname === link.href ? "text-gold" : "text-gray-700"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <a
                href="https://wa.me/528135780250"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-green-500 px-4 py-2 text-sm font-semibold text-green-600 transition hover:bg-green-50"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <Link
                href="/agendar-cita"
                className="rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-navy transition hover:bg-gold-light"
              >
                Agendar Cita
              </Link>
            </div>

            <button
              className="p-2 lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Abrir menú"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {open && (
            <div className="border-t border-gray-100 px-4 py-4 lg:hidden">
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`text-sm font-medium transition hover:text-gold ${
                      pathname === link.href ? "text-gold" : "text-gray-700"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-2 flex flex-col gap-2">
                  <a
                    href="https://wa.me/528135780250"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-lg border border-green-500 px-4 py-2 text-sm font-semibold text-green-600"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                  <Link
                    href="/agendar-cita"
                    onClick={() => setOpen(false)}
                    className="rounded-lg bg-gold px-4 py-2 text-center text-sm font-semibold text-navy"
                  >
                    Agendar Cita
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
