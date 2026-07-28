import { createClient } from "@supabase/supabase-js";

// Cliente independiente hacia el Supabase del panel del despacho.
// Se usa únicamente para notificar nuevas solicitudes de asesoría
// (tabla "asesorias"), que el panel escucha en tiempo real.
const despachoUrl = process.env.NEXT_PUBLIC_DESPACHO_SUPABASE_URL || "https://placeholder.supabase.co";
const despachoAnonKey = process.env.NEXT_PUBLIC_DESPACHO_SUPABASE_ANON_KEY || "placeholder";

export const despachoSupabase = createClient(despachoUrl, despachoAnonKey);
