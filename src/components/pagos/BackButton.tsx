"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="absolute left-4 top-6 flex items-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-5 py-3 text-base font-bold text-white backdrop-blur-sm transition hover:border-gold hover:bg-gold hover:text-navy sm:left-6 lg:left-8"
    >
      <ArrowLeft className="h-5 w-5" />
      Atrás
    </button>
  );
}
