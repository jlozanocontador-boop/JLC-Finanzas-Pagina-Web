export type NumberInputConfig = {
  question: string;
  summaryLabel: string;
  placeholder?: string;
  computePrice: (value: number) => number;
};

export type FollowUpOption = {
  label: string;
  price?: number;
  redirectToId?: string;
  followUp?: FollowUp;
  numberInput?: NumberInputConfig;
};

export type FollowUp = {
  question: string;
  options: FollowUpOption[];
};

export type FiscalTramite = {
  id: string;
  label: string;
  price?: number;
  followUp?: FollowUp;
  numberInput?: NumberInputConfig;
};

const efirmaCiecFollowUp: FollowUp = {
  question: "¿Cuentas con tu e.firma (FIEL) o con la contraseña del RFC (CIEC)?",
  options: [
    { label: "Tengo la FIEL" },
    { label: "Tengo el RFC y Contraseña" },
    { label: "Cuento con ambas" },
    { label: "No estoy seguro(a)", redirectToId: "revision-fiscal" },
  ],
};

const efirmaOnlyFollowUp: FollowUp = {
  question: "¿Cuentas con tu e.firma (FIEL)?",
  options: [
    {
      label: "Tengo la FIEL",
      numberInput: {
        question: "¿Cuál es el monto aproximado de tu saldo a favor?",
        summaryLabel: "Saldo a favor",
        placeholder: "$0.00",
        computePrice: (value) => 1200 + value * 0.1,
      },
    },
    { label: "No estoy seguro(a)", redirectToId: "revision-fiscal" },
  ],
};

export const fiscalTramites: FiscalTramite[] = [
  {
    id: "declaracion-anual",
    label: "Declaración Anual",
    followUp: {
      question: "¿Eres persona física asalariada o tienes algún otro régimen adicional?",
      options: [
        { label: "Asalariado", price: 650, followUp: efirmaCiecFollowUp },
        {
          label: "Actividad Empresarial / RESICO / Arrendamiento / Plataformas Digitales",
          price: 1100,
          followUp: efirmaCiecFollowUp,
        },
        { label: "No estoy seguro(a)", redirectToId: "revision-fiscal" },
      ],
    },
  },
  {
    id: "devoluciones",
    label: "Devoluciones de Saldo a Favor",
    followUp: {
      question: "¿Eres persona física asalariada o tienes algún otro régimen adicional?",
      options: [
        { label: "Asalariado", followUp: efirmaOnlyFollowUp },
        {
          label: "Actividad Empresarial / RESICO / Arrendamiento / Plataformas Digitales",
          followUp: efirmaOnlyFollowUp,
        },
        { label: "No estoy seguro(a)", redirectToId: "revision-fiscal" },
      ],
    },
  },
  {
    id: "alta-sat",
    label: "Alta y Actualización ante SAT",
    followUp: {
      question: "¿A qué régimen te quieres dar de alta?",
      options: [
        { label: "Asalariado", price: 450 },
        {
          label: "RESICO, Actividad Empresarial, Arrendamiento, Plataformas Tecnológicas",
          price: 850,
        },
        { label: "Otro Régimen", price: 1000 },
        { label: "No estoy seguro(a)", redirectToId: "revision-fiscal" },
      ],
    },
  },
  {
    id: "alta-local-sat",
    label: "Alta Local/Negocio SAT (Apertura Establecimiento)",
    price: 1200,
    followUp: efirmaCiecFollowUp,
  },
  { id: "constancia", label: "Constancia de Situación Fiscal", price: 250 },
  { id: "cambio-domicilio", label: "Cambio de Domicilio Fiscal", price: 350 },
  { id: "regularizacion", label: "Regularización Fiscal", price: 350 },
  { id: "revision-fiscal", label: "Revisión Fiscal", price: 350 },
  {
    id: "renovacion-fiel",
    label: "Renovación FIEL En línea",
    followUp: {
      question: "¿Eres persona física o moral?",
      options: [
        {
          label: "Persona Física",
          followUp: {
            question: "¿Cuentas con tu firma electrónica (FIEL)?",
            options: [
              { label: "Sí, está vigente", price: 1000 },
              { label: "No, está vencida", price: 1500 },
              { label: "No estoy seguro(a)", redirectToId: "revision-fiscal" },
            ],
          },
        },
        {
          label: "Persona Moral",
          followUp: {
            question: "¿Cuentas con tu firma electrónica (FIEL)?",
            options: [
              { label: "Sí, está vigente", price: 2000 },
              { label: "No, está vencida", price: 3000 },
              { label: "No estoy seguro(a)", redirectToId: "revision-fiscal" },
            ],
          },
        },
      ],
    },
  },
  {
    id: "sellos-digitales",
    label: "Sellos Digitales",
    followUp: {
      question: "¿Cuentas con tu firma electrónica (FIEL)?",
      options: [
        { label: "Sí, la tengo", price: 1000 },
        { label: "No estoy seguro(a)", redirectToId: "revision-fiscal" },
      ],
    },
  },
];

export const facturacionRanges = [
  "Menos de $50,000",
  "$50,000 – $150,000",
  "Más de $150,000",
];

export type ContabilidadRegimen = {
  id: string;
  label: string;
  prices: [number, number, number];
};

export const contabilidadRegimenes: ContabilidadRegimen[] = [
  { id: "resico", label: "RESICO", prices: [600, 900, 1200] },
  { id: "empresarial", label: "Actividad Empresarial", prices: [1500, 2500, 3500] },
  { id: "arrendamiento", label: "Arrendamiento", prices: [700, 1100, 1500] },
  {
    id: "profesionales",
    label: "Régimen de Servicios Profesionales",
    prices: [1000, 1500, 2000],
  },
  { id: "plataformas", label: "Plataformas Tecnológicas", prices: [800, 1300, 1800] },
];

export const formatMXN = (value: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(value);
