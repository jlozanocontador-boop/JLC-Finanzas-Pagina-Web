"use client";

import { useRef, useState } from "react";
import { MessageCircle } from "lucide-react";
import { track } from "@vercel/analytics";

const WHATSAPP_HREF = "https://wa.me/528135780250";
const SIZE = 56;
const MARGIN = 12;

function clampPosition(x: number, y: number) {
  const maxX = window.innerWidth - SIZE - MARGIN;
  const maxY = window.innerHeight - SIZE - MARGIN;
  return {
    x: Math.min(Math.max(x, MARGIN), Math.max(maxX, MARGIN)),
    y: Math.min(Math.max(y, MARGIN), Math.max(maxY, MARGIN)),
  };
}

export default function WhatsAppButton() {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const dragState = useRef({ dragging: false, moved: false, offsetX: 0, offsetY: 0 });

  function handlePointerDown(e: React.PointerEvent<HTMLAnchorElement>) {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;

    dragState.current = {
      dragging: true,
      moved: false,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    };
    buttonRef.current?.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLAnchorElement>) {
    if (!dragState.current.dragging) return;
    dragState.current.moved = true;
    setPosition(
      clampPosition(
        e.clientX - dragState.current.offsetX,
        e.clientY - dragState.current.offsetY
      )
    );
  }

  function handlePointerUp(e: React.PointerEvent<HTMLAnchorElement>) {
    if (dragState.current.moved) {
      e.preventDefault();
    } else {
      track("whatsapp_click", { location: "floating_button" });
    }
    dragState.current.dragging = false;
  }

  return (
    <a
      ref={buttonRef}
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consulta por WhatsApp"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={
        position
          ? { left: position.x, top: position.y, right: "auto", bottom: "auto" }
          : undefined
      }
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 touch-none items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition hover:bg-green-600 active:cursor-grabbing"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
