"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { track } from "@vercel/analytics";

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
      {!isCheckout && (
        <div className="bg-white shadow-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="JLC Finanzas"
                width={1200}
                height={587}
                priority
                className="h-9 w-auto sm:h-10"
              />
              <span className="hidden text-[11px] font-medium tracking-wide text-gray-500 sm:inline">
                DESPACHO FISCAL
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
              <Link
                href="/agendar-cita"
                onClick={() => track("agendar_click", { location: "header_desktop" })}
                className="rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-navy transition hover:bg-gold-light"
              >
                Agendar Asesoría
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
                  <Link
                    href="/agendar-cita"
                    onClick={() => {
                      setOpen(false);
                      track("agendar_click", { location: "header_mobile" });
                    }}
                    className="rounded-lg bg-gold px-4 py-2 text-center text-sm font-semibold text-navy"
                  >
                    Agendar Asesoría
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
