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
              { label: "Sí, está vigente", price: 500 },
              { label: "No, está vencida", price: 850 },
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

export type PlanRow = {
  label: string;
  basico: string | boolean;
  avanzado: string | boolean;
};

export type ContabilidadRegimen = {
  id: string;
  label: string;
  basicoPrice: number;
  avanzadoPrice: number;
  rows: PlanRow[];
};

const actEmpProfRows: PlanRow[] = [
  { label: "Declaraciones mensuales de ISR e IVA", basico: true, avanzado: true },
  { label: "Declaración anual", basico: false, avanzado: true },
  { label: "Facturación mensual", basico: "Hasta 5-10 CFDI", avanzado: "Hasta 20 CFDI" },
  { label: "Revisión de ingresos y gastos", basico: "Revisión básica", avanzado: "Revisión detallada" },
  { label: "Revisión de deducibilidad", basico: "Básica", avanzado: "Detallada" },
  { label: "Conciliación de ingresos, gastos y bancos", basico: false, avanzado: true },
  { label: "Control de cuentas por cobrar", basico: false, avanzado: true },
  { label: "Control de complementos de pago", basico: false, avanzado: true },
  { label: "Revisión de retenciones", basico: "Básica", avanzado: true },
  { label: "Asesoría", basico: "Dudas relacionadas con el periodo", avanzado: "Asesoría fiscal personalizada" },
  { label: "Trámites sencillos ante el SAT", basico: "Se cotizan por separado", avanzado: "Hasta 2 servicios adicionales al mes" },
  { label: "Atención", basico: "Estándar", avanzado: "Prioritaria" },
];

export const contabilidadRegimenes: ContabilidadRegimen[] = [
  {
    id: "resico",
    label: "RESICO",
    basicoPrice: 850,
    avanzadoPrice: 1000,
    rows: [
      { label: "Declaraciones mensuales de ISR e IVA", basico: true, avanzado: true },
      { label: "Declaración anual", basico: false, avanzado: true },
      { label: "Facturación mensual", basico: "Hasta 5-10 CFDI", avanzado: "Hasta 20 CFDI" },
      { label: "Revisión de ingresos y gastos", basico: "Revisión básica", avanzado: "Revisión detallada" },
      { label: "Revisión de retenciones", basico: "Básica", avanzado: true },
      { label: "Asesoría", basico: "Dudas relacionadas con el periodo", avanzado: "Asesoría fiscal personalizada" },
      { label: "Trámites sencillos ante el SAT", basico: "Se cotizan por separado", avanzado: "Hasta 2 servicios adicionales al mes" },
      { label: "Atención", basico: "Estándar", avanzado: "Prioritaria" },
    ],
  },
  {
    id: "empresarial",
    label: "Actividad Empresarial",
    basicoPrice: 1150,
    avanzadoPrice: 1500,
    rows: actEmpProfRows,
  },
  {
    id: "arrendamiento",
    label: "Arrendamiento",
    basicoPrice: 750,
    avanzadoPrice: 900,
    rows: [
      { label: "Declaraciones mensuales de ISR e IVA", basico: true, avanzado: true },
      { label: "Declaración anual", basico: false, avanzado: true },
      { label: "Emisión de recibos de arrendamiento", basico: "Hasta 5-10 CFDI", avanzado: "Hasta 20 CFDI" },
      { label: "Cálculo de ISR e IVA", basico: true, avanzado: true },
      { label: "Revisión de ingresos y deducciones", basico: "Revisión básica", avanzado: "Revisión detallada" },
      { label: "Control de retenciones de personas morales", basico: "Básico", avanzado: "Revisión detallada" },
      { label: "Asesoría", basico: "Dudas relacionadas con el periodo", avanzado: "Asesoría fiscal personalizada" },
      { label: "Trámites sencillos ante el SAT", basico: "Se cotizan por separado", avanzado: "Hasta 2 servicios adicionales al mes" },
      { label: "Atención", basico: "Estándar", avanzado: "Prioritaria" },
    ],
  },
  {
    id: "profesionales",
    label: "Régimen de Servicios Profesionales",
    basicoPrice: 1150,
    avanzadoPrice: 1500,
    rows: actEmpProfRows,
  },
  {
    id: "plataformas",
    label: "Plataformas Tecnológicas",
    basicoPrice: 650,
    avanzadoPrice: 800,
    rows: [
      { label: "Revisión de ingresos de plataformas", basico: "1 plataforma", avanzado: "Hasta 3 plataformas" },
      { label: "Declaraciones mensuales", basico: true, avanzado: true },
      { label: "Declaración anual", basico: false, avanzado: true },
      { label: "Revisión de retenciones de ISR e IVA", basico: "Básica", avanzado: "Detallada" },
      { label: "Orientación sobre pagos definitivos o provisionales", basico: "General", avanzado: "Personalizada" },
      { label: "Asesoría", basico: "Dudas relacionadas con el periodo", avanzado: "Asesoría fiscal personalizada" },
      { label: "Trámites sencillos ante el SAT", basico: "Se cotizan por separado", avanzado: "Hasta 2 servicios adicionales al mes" },
      { label: "Atención", basico: "Estándar", avanzado: "Prioritaria" },
    ],
  },
];

export const formatMXN = (value: number) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(value);
