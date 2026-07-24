import {
  FileText,
  TrendingUp,
  Building2,
  FileCheck,
  RefreshCw,
  Shield,
  Calculator,
  ClipboardList,
  Briefcase,
  Key,
  Repeat,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  badge: string;
};

export const services: Service[] = [
  {
    icon: FileText,
    title: "Declaración Anual",
    description:
      "Presentamos tu declaración anual de impuestos de forma correcta, puntual y optimizada para que obtengas el mejor resultado posible.",
    badge: "Cumple a tiempo y evita multas",
  },
  {
    icon: TrendingUp,
    title: "Devoluciones de Saldo a Favor",
    description:
      "Gestionamos la devolución de tu saldo a favor ante el SAT de manera rápida y eficiente, maximizando tu reembolso.",
    badge: "Recupera tu dinero en menos tiempo",
  },
  {
    icon: Building2,
    title: "Alta y Actualización ante SAT",
    description:
      "Te damos de alta en el RFC con las obligaciones fiscales correctas según tu actividad económica, o actualizamos tu información.",
    badge: "Inicia tu actividad fiscal correctamente",
  },
  {
    icon: FileCheck,
    title: "Constancia de Situación Fiscal",
    description:
      "Obtenemos tu constancia de situación fiscal actualizada, documento indispensable para trámites laborales y comerciales.",
    badge: "Documento listo en minutos",
  },
  {
    icon: RefreshCw,
    title: "Cambio de Domicilio Fiscal",
    description:
      "Realizamos el cambio de tu domicilio fiscal ante el SAT de forma rápida y sin complicaciones.",
    badge: "Actualiza tu información sin estrés",
  },
  {
    icon: Shield,
    title: "Asesoría Fiscal Personalizada",
    description:
      "Te orientamos sobre tu situación fiscal, deducciones, obligaciones y estrategias para optimizar tu carga tributaria.",
    badge: "Toma mejores decisiones fiscales",
  },
  {
    icon: Calculator,
    title: "Regularización Fiscal",
    description:
      "Si tienes declaraciones pendientes o adeudos con el SAT, te ayudamos a ponerte al corriente de forma ordenada.",
    badge: "Ponte al día sin complicaciones",
  },
  {
    icon: ClipboardList,
    title: "Servicios Mensuales para Contribuyentes",
    description:
      "Llevamos tu contabilidad mensual, declaraciones provisionales y cumplimiento de obligaciones periódicas.",
    badge: "Olvídate de fechas y cálculos",
  },
  {
    icon: Briefcase,
    title: "Facturación y Apoyo Administrativo",
    description:
      "Te apoyamos con la emisión de facturas CFDI, notas de crédito y gestión administrativa de tu negocio.",
    badge: "Factura sin errores ni retrasos",
  },
  {
    icon: Key,
    title: "Trámites de e.firma y Obligaciones Fiscales",
    description:
      "Gestionamos tu e.firma (firma electrónica), sellos digitales y actualización de obligaciones ante el SAT.",
    badge: "Todos tus trámites SAT resueltos",
  },
];

export type ServiceCategory = {
  icon: LucideIcon;
  title: string;
  description: string;
  badge: string;
  items: string[];
  cta: "cotizar" | "agendar";
  quoteType?: "fiscal" | "contabilidad";
};

export const serviceCategories: ServiceCategory[] = [
  {
    icon: FileText,
    title: "Servicios Fiscales",
    description:
      "Trámites puntuales y esporádicos para resolver una necesidad específica, sin compromiso de permanencia.",
    badge: "Pago único por trámite",
    cta: "cotizar",
    quoteType: "fiscal",
    items: [
      "Declaración Anual",
      "Devoluciones de Saldo a Favor",
      "Alta y Actualización ante SAT",
      "Constancia de Situación Fiscal",
      "Cambio de Domicilio Fiscal",
      "Regularización Fiscal",
      "Trámites de e.firma y Obligaciones Fiscales",
      "Revisión Fiscal",
      "Renovación FIEL",
    ],
  },
  {
    icon: Repeat,
    title: "Servicio Contabilidad",
    description:
      "Contabilidad y cumplimiento fiscal recurrente, adaptado a tu régimen. Incluye declaraciones mensuales, facturación y apoyo administrativo continuo.",
    badge: "Adaptado a tu régimen fiscal",
    cta: "cotizar",
    quoteType: "contabilidad",
    items: [
      "RESICO",
      "Actividad Empresarial",
      "Arrendamiento",
      "Régimen de Servicios Profesionales",
      "Plataformas Tecnológicas",
    ],
  },
  {
    icon: Shield,
    title: "Asesoría Fiscal",
    description:
      "Orientación personalizada para tomar mejores decisiones fiscales y resolver dudas específicas sobre tu situación.",
    badge: "Toma mejores decisiones fiscales",
    cta: "agendar",
    items: [
      "Asesoría Fiscal Personalizada",
      "Planeación y optimización fiscal",
      "Resolución de dudas y consultas puntuales",
    ],
  },
];
