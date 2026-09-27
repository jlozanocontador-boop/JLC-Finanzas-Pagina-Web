"use client";

import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";

export default function ContactPopoverLink({
  icon: Icon,
  label,
  href,
  external,
}: {
  icon: LucideIcon;
  label: string;
  href: string;
  external?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const isDesktop = window.matchMedia("(min-width: 640px)").matches;
    if (isDesktop) return;

    if (!open) {
      e.preventDefault();
      setOpen(true);
    } else {
      setOpen(false);
    }
  }

  return (
    <div ref={ref} className="relative">
      <a
        href={href}
        onClick={handleClick}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="flex items-center gap-1.5 hover:text-white"
      >
        <Icon className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">{label}</span>
      </a>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1.5 whitespace-nowrap rounded-md bg-white px-3 py-1.5 text-xs font-medium text-navy shadow-lg sm:hidden">
          {label}
        </div>
      )}
    </div>
  );
}
