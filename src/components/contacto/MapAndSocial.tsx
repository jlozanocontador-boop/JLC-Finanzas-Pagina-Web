import { MessageCircle } from "lucide-react";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/icons/SocialIcons";

export default function MapAndSocial() {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl bg-navy p-7">
        <h3 className="text-lg font-bold text-gold">
          Respuesta inmediata por WhatsApp
        </h3>
        <p className="mt-2 text-sm text-white/70">
          ¿Necesitas una respuesta rápida? Escríbenos directamente por
          WhatsApp y te atenderemos al momento.
        </p>
        <a
          href="https://wa.me/528135780250"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-green-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-600"
        >
          <MessageCircle className="h-4 w-4" />
          Escribir por WhatsApp
        </a>
      </div>

      <div className="rounded-xl bg-white p-7 shadow-sm ring-1 ring-gray-100">
        <h3 className="text-base font-bold text-navy">Síguenos en redes</h3>
        <div className="mt-4 flex gap-3">
          <a
            href="https://www.facebook.com/profile.php?id=100063773822682"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-navy hover:bg-gold hover:text-white"
          >
            <FacebookIcon />
          </a>
          <a
            href="https://www.instagram.com/jlcfinanzas/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-navy hover:bg-gold hover:text-white"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://www.tiktok.com/@jlcfinanzas"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-navy hover:bg-gold hover:text-white"
          >
            <TikTokIcon />
          </a>
        </div>
      </div>
    </div>
  );
}
