-- Esquema para el sitio web de JLC Finanzas
-- Ejecutar este script completo en el SQL Editor de tu proyecto Supabase
-- (https://supabase.com/dashboard/project/_/sql/new)

-- ============================================================
-- 1. Solicitudes de cita (formulario "Agendar Cita")
-- ============================================================
create table if not exists public.solicitudes_cita (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nombre text not null,
  telefono text not null,
  correo text,
  servicio_interes text not null,
  fecha_preferida date not null,
  hora_preferida text not null,
  mensaje text,
  estatus text not null default 'pendiente'
);

alter table public.solicitudes_cita enable row level security;

create policy "Cualquiera puede crear una solicitud de cita"
  on public.solicitudes_cita
  for insert
  to anon
  with check (true);

-- ============================================================
-- 2. Mensajes de contacto (formulario "Contacto")
-- ============================================================
create table if not exists public.mensajes_contacto (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nombre text not null,
  telefono text,
  correo text not null,
  asunto text not null,
  mensaje text not null,
  estatus text not null default 'pendiente'
);

alter table public.mensajes_contacto enable row level security;

create policy "Cualquiera puede enviar un mensaje de contacto"
  on public.mensajes_contacto
  for insert
  to anon
  with check (true);

-- ============================================================
-- 3. Comprobantes de pago (formulario "Pagos")
-- ============================================================
create table if not exists public.comprobantes_pago (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nombre text not null,
  concepto_pago text not null,
  monto numeric(12, 2) not null,
  referencia text,
  notas text,
  estatus text not null default 'pendiente'
);

alter table public.comprobantes_pago enable row level security;

create policy "Cualquiera puede registrar un comprobante de pago"
  on public.comprobantes_pago
  for insert
  to anon
  with check (true);

-- Nota: solo el rol "service_role" (llave secreta) puede leer/editar/borrar
-- estos registros por defecto, ya que RLS no tiene políticas de SELECT para
-- "anon". Esto protege los datos de los visitantes del sitio: nadie puede
-- leer las solicitudes de otras personas con la llave pública del sitio.
