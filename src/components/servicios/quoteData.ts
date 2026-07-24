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
  { id: "alta-sat", label: "Alta y Actualización ante SAT", price: 500 },
  { id: "constancia", label: "Constancia de Situación Fiscal", price: 150 },
  { id: "cambio-domicilio", label: "Cambio de Domicilio Fiscal", price: 400 },
  {
    id: "regularizacion",
    label: "Regularización Fiscal",
    followUp: {
      question: "¿Cuántas declaraciones tienes pendientes?",
      options: [
        { label: "1 a 3", price: 500 },
        { label: "4 a 6", price: 1200 },
        { label: "7 o más", price: 2000 },
      ],
    },
  },
  { id: "efirma", label: "Trámites de e.firma y Obligaciones Fiscales", price: 450 },
  { id: "revision-fiscal", label: "Revisión Fiscal", price: 450 },
  {
    id: "renovacion-fiel",
    label: "Renovación FIEL",
    followUp: {
      question: "¿Tienes tu firma electrónica (FIEL)?",
      options: [
        {
          label: "Sí, la tengo",
          followUp: {
            question: "¿Tu firma electrónica está vigente?",
            options: [
              { label: "Sí, está vigente", price: 1000 },
              { label: "No estoy seguro(a)", redirectToId: "revision-fiscal" },
            ],
          },
        },
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
