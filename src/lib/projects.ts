export type Estado = "En ejecución" | "Aprobado" | "Pendiente aprobar";
export type Legislatura = "actual" | "anterior";

export type Sector =
  | "Datos, IA y espacios de datos"
  | "Gemelos digitales urbanos"
  | "Regeneración urbana integrada"
  | "Turismo sostenible"
  | "Agua y medio ambiente"
  | "Energía, movilidad y eficiencia"
  | "Economía circular y agri-alimentación"
  | "Clima y resiliencia urbana"
  | "Cultura y creatividad"
  | "Innovación pública y gobernanza"
  | "Educación y talento";

export interface Proyecto {
  titulo: string;
  expediente: string;
  servicio: string;
  fechaSol: string;
  fechaConc: string;
  costeTotal: number;
  subvencionable: number;
  ayuda: number;
  ayto: number;
  estado: Estado;
  legislatura: Legislatura;
  programa: string;
  sector: Sector;
}

export const PROYECTOS: Proyecto[] = [
  { titulo: "TURISMO DEPORTIVO SOSTENIBLE: Mejora eficiencia energética iluminación deportiva campo hockey Tarongers", expediente: "00212/2023/23", servicio: "SEPUE", fechaSol: "03/08/2023", fechaConc: "13/05/2024", costeTotal: 420826.26, subvencionable: 392617.21, ayuda: 180573.34, ayto: 49690.08, estado: "En ejecución", legislatura: "actual", programa: "IDAE / Eficiencia energética", sector: "Energía, movilidad y eficiencia" },
  { titulo: "PROGRAMA MOVES", expediente: "00212/2024/16", servicio: "SCT", fechaSol: "16/12/2022", fechaConc: "07/07/2024", costeTotal: 1068633.25, subvencionable: 287000, ayuda: 287000, ayto: 781633.25, estado: "En ejecución", legislatura: "actual", programa: "MOVES (IDAE)", sector: "Energía, movilidad y eficiencia" },
  { titulo: "PLATAFORMA INTELIGENTE DE DESTINOS (PID) · Red de destinos Turísticos Inteligentes", expediente: "00212/2024/18", servicio: "OCI", fechaSol: "30/06/2024", fechaConc: "07/12/2024", costeTotal: 2842677, subvencionable: 2842677, ayuda: 2842677, ayto: 0, estado: "En ejecución", legislatura: "actual", programa: "PID (MINTUR)", sector: "Turismo sostenible" },
  { titulo: "FEDER-ZENTROPY (UIA)", expediente: "00212/2024/14", servicio: "Servicio de Turismo", fechaSol: "13/05/2023", fechaConc: "21/05/2024", costeTotal: 839784.80, subvencionable: 671827.84, ayuda: 671827.84, ayto: 167956.96, estado: "En ejecución", legislatura: "actual", programa: "FEDER / UIA", sector: "Turismo sostenible" },
  { titulo: "FEDER - FID - COMPRA PÚBLICA INNOVADORA", expediente: "00202/2024/13 · FID2024-001826", servicio: "Servicio Innovación", fechaSol: "16/03/2024", fechaConc: "04/02/2025", costeTotal: 3000000, subvencionable: 1800000, ayuda: 1800000, ayto: 1200000, estado: "En ejecución", legislatura: "actual", programa: "FEDER / FID", sector: "Innovación pública y gobernanza" },
  { titulo: "AGENTE LOCAL DE INNOVACIÓN", expediente: "00202/2023/160 · 00202/2024/276 · 00202/2025/27 · 00202/2026/33", servicio: "Servicio Innovación", fechaSol: "4 años", fechaConc: "18/11/2023 · 02/12/2024 · 09/12/2025 · 2026 pte.", costeTotal: 100000, subvencionable: 100000, ayuda: 100000, ayto: 0, estado: "Pendiente aprobar", legislatura: "actual", programa: "Red Innpulso", sector: "Innovación pública y gobernanza" },
  { titulo: "BLOOMBERG", expediente: "00202/2024/283", servicio: "Servicio Innovación", fechaSol: "28/10/2024", fechaConc: "—", costeTotal: 600000, subvencionable: 600000, ayuda: 0, ayto: 0, estado: "En ejecución", legislatura: "actual", programa: "Bloomberg Philanthropies", sector: "Innovación pública y gobernanza" },
  { titulo: "RED INNPULSO · CIUDAD LABORATORIO", expediente: "00202/2025/8", servicio: "Servicio Innovación", fechaSol: "18/02/2025", fechaConc: "30/04/2025", costeTotal: 8000, subvencionable: 8000, ayuda: 8000, ayto: 0, estado: "En ejecución", legislatura: "actual", programa: "Red Innpulso", sector: "Innovación pública y gobernanza" },
  { titulo: "AGENDA SONORA 2030", expediente: "00202/2025/299", servicio: "Servicio Innovación", fechaSol: "30/06/2025", fechaConc: "24/10/2025", costeTotal: 249400, subvencionable: 184556, ayuda: 184556, ayto: 0, estado: "En ejecución", legislatura: "actual", programa: "Agenda Sonora / Música", sector: "Cultura y creatividad" },
  { titulo: "FEDER-ZENTROPY (UIA)", expediente: "—", servicio: "VIC", fechaSol: "—", fechaConc: "—", costeTotal: 1022378.40, subvencionable: 817902.72, ayuda: 817902.72, ayto: 204475.68, estado: "En ejecución", legislatura: "actual", programa: "FEDER / UIA", sector: "Turismo sostenible" },
  { titulo: "FEMP - EDINT · Espacios de datos impulsado por FEMP (12 entidades locales)", expediente: "—", servicio: "OCI", fechaSol: "—", fechaConc: "—", costeTotal: 1156440, subvencionable: 1156440, ayuda: 1000000, ayto: 156440, estado: "En ejecución", legislatura: "actual", programa: "FEMP / EDINT", sector: "Datos, IA y espacios de datos" },
  { titulo: "BUILD · BestUse para EDIC", expediente: "—", servicio: "OCI", fechaSol: "—", fechaConc: "—", costeTotal: 494340, subvencionable: 247170, ayuda: 247170, ayto: 247170, estado: "En ejecución", legislatura: "actual", programa: "EDIC (Digital Europe)", sector: "Datos, IA y espacios de datos" },
  { titulo: "GEO4WATER · Geodata Space for Smart Water Monitoring", expediente: "—", servicio: "VIC", fechaSol: "—", fechaConc: "—", costeTotal: 200000, subvencionable: 100000, ayuda: 100000, ayto: 100000, estado: "En ejecución", legislatura: "actual", programa: "Horizon Europe", sector: "Agua y medio ambiente" },
  { titulo: "DISCO", expediente: "—", servicio: "VIC", fechaSol: "—", fechaConc: "—", costeTotal: 80500, subvencionable: 80500, ayuda: 80500, ayto: 0, estado: "En ejecución", legislatura: "actual", programa: "Horizon Europe", sector: "Datos, IA y espacios de datos" },
  { titulo: "MixMatters", expediente: "—", servicio: "VIC", fechaSol: "—", fechaConc: "—", costeTotal: 259375, subvencionable: 259375, ayuda: 259375, ayto: 0, estado: "En ejecución", legislatura: "actual", programa: "Horizon Europe", sector: "Economía circular y agri-alimentación" },
  { titulo: "POWER UP", expediente: "—", servicio: "VIC", fechaSol: "—", fechaConc: "—", costeTotal: 86676.25, subvencionable: 86676.25, ayuda: 86676.25, ayto: 0, estado: "En ejecución", legislatura: "actual", programa: "Horizon Europe", sector: "Energía, movilidad y eficiencia" },
  { titulo: "RescueME", expediente: "—", servicio: "VIC", fechaSol: "—", fechaConc: "—", costeTotal: 133081, subvencionable: 133081, ayuda: 133081, ayto: 0, estado: "En ejecución", legislatura: "actual", programa: "Horizon Europe", sector: "Clima y resiliencia urbana" },
  { titulo: "BIOSOILUTIONS", expediente: "—", servicio: "VIC", fechaSol: "—", fechaConc: "—", costeTotal: 218750, subvencionable: 218750, ayuda: 218750, ayto: 0, estado: "En ejecución", legislatura: "actual", programa: "Horizon Europe", sector: "Economía circular y agri-alimentación" },
  { titulo: "ToNoWaste", expediente: "—", servicio: "VIC", fechaSol: "—", fechaConc: "—", costeTotal: 350125, subvencionable: 350125, ayuda: 350125, ayto: 0, estado: "En ejecución", legislatura: "actual", programa: "Horizon Europe", sector: "Economía circular y agri-alimentación" },
  { titulo: "COP-PILOT", expediente: "—", servicio: "VIC", fechaSol: "—", fechaConc: "—", costeTotal: 274625, subvencionable: 274625, ayuda: 274625, ayto: 0, estado: "En ejecución", legislatura: "actual", programa: "Horizon Europe", sector: "Clima y resiliencia urbana" },
  { titulo: "SPOON", expediente: "—", servicio: "VIC", fechaSol: "—", fechaConc: "—", costeTotal: 260750, subvencionable: 260750, ayuda: 260750, ayto: 0, estado: "En ejecución", legislatura: "actual", programa: "Horizon Europe", sector: "Innovación pública y gobernanza" },
  { titulo: "FU-TOURISM · Apoyo a PYMES turísticas (6 países, 102 proyectos)", expediente: "—", servicio: "Servicio de Turismo", fechaSol: "—", fechaConc: "—", costeTotal: 150768.54, subvencionable: 134439.79, ayuda: 134439.79, ayto: 16328.75, estado: "En ejecución", legislatura: "actual", programa: "SMP / COSME", sector: "Turismo sostenible" },
  { titulo: "MULTIENGAGE", expediente: "—", servicio: "VIC", fechaSol: "—", fechaConc: "—", costeTotal: 20725, subvencionable: 20725, ayuda: 20725, ayto: 0, estado: "En ejecución", legislatura: "actual", programa: "Horizon Europe", sector: "Innovación pública y gobernanza" },
  { titulo: "WATERGRID", expediente: "—", servicio: "VIC", fechaSol: "—", fechaConc: "—", costeTotal: 131562.50, subvencionable: 131562.50, ayuda: 131562.50, ayto: 0, estado: "En ejecución", legislatura: "actual", programa: "Horizon Europe", sector: "Agua y medio ambiente" },
  { titulo: "PUREPOLIS", expediente: "101234870", servicio: "VIC", fechaSol: "—", fechaConc: "tbc", costeTotal: 252750, subvencionable: 252750, ayuda: 252750, ayto: 0, estado: "Pendiente aprobar", legislatura: "actual", programa: "Horizon Europe", sector: "Clima y resiliencia urbana" },
  { titulo: "Virtuopolis", expediente: "—", servicio: "OCI", fechaSol: "—", fechaConc: "—", costeTotal: 150000, subvencionable: 150000, ayuda: 150000, ayto: 0, estado: "Pendiente aprobar", legislatura: "actual", programa: "Digital Europe / LDT", sector: "Gemelos digitales urbanos" },
  { titulo: "Virtucore", expediente: "—", servicio: "OCI", fechaSol: "—", fechaConc: "—", costeTotal: 197500, subvencionable: 0, ayuda: 197500, ayto: 0, estado: "Pendiente aprobar", legislatura: "actual", programa: "Digital Europe / LDT", sector: "Gemelos digitales urbanos" },
  { titulo: "Virtucore", expediente: "—", servicio: "VIC", fechaSol: "—", fechaConc: "—", costeTotal: 142500, subvencionable: 0, ayuda: 142500, ayto: 0, estado: "Pendiente aprobar", legislatura: "actual", programa: "Digital Europe / LDT", sector: "Gemelos digitales urbanos" },
  { titulo: "TWINVERSE", expediente: "—", servicio: "OCI", fechaSol: "—", fechaConc: "—", costeTotal: 103413.46, subvencionable: 103413.46, ayuda: 103413.46, ayto: 0, estado: "Pendiente aprobar", legislatura: "actual", programa: "Digital Europe / LDT", sector: "Gemelos digitales urbanos" },
  { titulo: "TWINVERSE", expediente: "—", servicio: "VIC", fechaSol: "—", fechaConc: "—", costeTotal: 213687.58, subvencionable: 213687.58, ayuda: 213687.58, ayto: 0, estado: "Pendiente aprobar", legislatura: "actual", programa: "Digital Europe / LDT", sector: "Gemelos digitales urbanos" },
  { titulo: "URBANFLOW", expediente: "—", servicio: "OCI", fechaSol: "—", fechaConc: "—", costeTotal: 147500, subvencionable: 147500, ayuda: 147500, ayto: 0, estado: "En ejecución", legislatura: "actual", programa: "Digital Europe / LDT", sector: "Gemelos digitales urbanos" },
  { titulo: "URBANFLOW", expediente: "101239472", servicio: "VIC", fechaSol: "—", fechaConc: "—", costeTotal: 1012000, subvencionable: 1012000, ayuda: 1012000, ayto: 0, estado: "En ejecución", legislatura: "actual", programa: "Digital Europe / LDT", sector: "Gemelos digitales urbanos" },
  { titulo: "EDIL", expediente: "00212/2025/8", servicio: "SEPUE", fechaSol: "28/02/2025", fechaConc: "—", costeTotal: 14500000, subvencionable: 14500000, ayuda: 8500000, ayto: 6000000, estado: "Aprobado", legislatura: "actual", programa: "FEDER / EDIL", sector: "Regeneración urbana integrada" },
  { titulo: "VALENT.IA (Smart Economy)", expediente: "—", servicio: "OCI", fechaSol: "—", fechaConc: "—", costeTotal: 3500000, subvencionable: 0, ayuda: 2100000, ayto: 1400000, estado: "Pendiente aprobar", legislatura: "actual", programa: "FEDER / Smart Economy", sector: "Datos, IA y espacios de datos" },
  { titulo: "Valencia Music City · Sono Lab meet up", expediente: "—", servicio: "VIC", fechaSol: "—", fechaConc: "—", costeTotal: 52240, subvencionable: 52240, ayuda: 35600, ayto: 16640, estado: "Pendiente aprobar", legislatura: "actual", programa: "Red Ciudades Creativas", sector: "Cultura y creatividad" },

  { titulo: "CITCOM.ai", expediente: "—", servicio: "OCI", fechaSol: "—", fechaConc: "—", costeTotal: 1710502, subvencionable: 1710502, ayuda: 855251, ayto: 855251, estado: "En ejecución", legislatura: "anterior", programa: "Digital Europe", sector: "Datos, IA y espacios de datos" },
  { titulo: "CITCOM.ai", expediente: "—", servicio: "VIC", fechaSol: "—", fechaConc: "—", costeTotal: 1053308, subvencionable: 526654, ayuda: 526654, ayto: 526654, estado: "En ejecución", legislatura: "anterior", programa: "Digital Europe", sector: "Datos, IA y espacios de datos" },
  { titulo: "ENHANCEplus · European Universities of Technology Alliance", expediente: "—", servicio: "—", fechaSol: "—", fechaConc: "—", costeTotal: 14400000, subvencionable: 14400000, ayuda: 0, ayto: 0, estado: "En ejecución", legislatura: "anterior", programa: "Erasmus+ / EUI", sector: "Educación y talento" },
];

export type AlineamientoUE = "Alto" | "Medio" | "Emergente" | "Gap";

export const SECTOR_ALINEAMIENTO: Record<Sector, { nivel: AlineamientoUE; programasUE: string; razon: string }> = {
  "Datos, IA y espacios de datos": {
    nivel: "Alto",
    programasUE: "Digital Europe · EDICs · AI Factories · FP10",
    razon: "Prioridad Digital Decade 2030 y AI Act. Valencia ya dentro de BUILD EDIC.",
  },
  "Gemelos digitales urbanos": {
    nivel: "Alto",
    programasUE: "Digital Europe LDT · CEF Digital 2 · Mission Cities",
    razon: "Local Digital Twins es buque insignia del Digital Decade. Cluster ya activo (7 proyectos).",
  },
  "Regeneración urbana integrada": {
    nivel: "Alto",
    programasUE: "FEDER · EUI · Mission 100 Cities 2030",
    razon: "Ciudad dentro de Mission Cities. EDIL 2025-2030 apalanca transformación a gran escala.",
  },
  "Turismo sostenible": {
    nivel: "Medio",
    programasUE: "SMP-COSME · Interreg Euro-MED · DG GROW",
    razon: "Programa específico pero con envelope limitado. Valencia con ventaja competitiva en consorcios.",
  },
  "Agua y medio ambiente": {
    nivel: "Alto",
    programasUE: "Horizon Cluster 6 · LIFE · Mission Ocean · Mission Adaptation",
    razon: "Green Deal y post-DANA elevan prioridad. Base actual pequeña pero bien posicionada.",
  },
  "Energía, movilidad y eficiencia": {
    nivel: "Alto",
    programasUE: "Innovation Fund · CEF Transport · LIFE Clean Energy · MOVES nacional",
    razon: "Clean Industrial Deal y Net Zero Industry Act. Envelope creciente en MFF 2028-2034.",
  },
  "Economía circular y agri-alimentación": {
    nivel: "Alto",
    programasUE: "Horizon Cluster 6 · LIFE · Circular Economy Action Plan",
    razon: "Prioridad transversal Green Deal. Valencia con 3 Horizon pilots activos.",
  },
  "Clima y resiliencia urbana": {
    nivel: "Alto",
    programasUE: "Mission Adaptation · LIFE · Horizon Cluster 5",
    razon: "Post-DANA hay ventana política y técnica para liderar adaptación urbana mediterránea.",
  },
  "Cultura y creatividad": {
    nivel: "Medio",
    programasUE: "Creative Europe · New European Bauhaus · Music Moves Europe",
    razon: "Valencia Música City es palanca reconocida UNESCO. Envelope limitado pero bien alineado.",
  },
  "Innovación pública y gobernanza": {
    nivel: "Medio",
    programasUE: "Horizon Cluster 2 · FEDER FID · Interreg",
    razon: "Muchos pilots pequeños. Sector transversal, menos programa-específico en FP10.",
  },
  "Educación y talento": {
    nivel: "Medio",
    programasUE: "Erasmus+ · MSCA · European Universities",
    razon: "Línea activa pero no core de Innovación Municipal. ENHANCEplus genera pertenencia pero poca captación directa.",
  },
};

export const SECTOR_COLORS: Record<Sector, string> = {
  "Datos, IA y espacios de datos": "#0ea5e9",
  "Gemelos digitales urbanos": "#1e3a8a",
  "Regeneración urbana integrada": "#C8102E",
  "Turismo sostenible": "#10b981",
  "Agua y medio ambiente": "#14b8a6",
  "Energía, movilidad y eficiencia": "#f59e0b",
  "Economía circular y agri-alimentación": "#84cc16",
  "Clima y resiliencia urbana": "#6366f1",
  "Cultura y creatividad": "#a855f7",
  "Innovación pública y gobernanza": "#ec4899",
  "Educación y talento": "#64748b",
};

export const GAPS_ESTRATEGICOS_UE = [
  {
    titulo: "Tecnologías cuánticas y chips",
    contexto: "EU Chips Act y Quantum Strategy movilizan >10 B€ 2024-2027. Ciudades con universidades tecnológicas lideran demostradores.",
    oportunidad: "Valencia con UPV+ITI podría plantear hubs urbanos de experimentación en edge computing/quantum aplicado a movilidad o redes.",
  },
  {
    titulo: "Biotech y life sciences urbanas",
    contexto: "Creciente foco en salud preventiva, bio-monitoring y enfermedades relacionadas con contaminación urbana.",
    oportunidad: "Conectar con clúster biotech CV y Mission Cancer / EU4Health — línea muy floja en la cartera actual.",
  },
  {
    titulo: "Industrias culturales y creativas avanzadas (XR, IA generativa)",
    contexto: "Creative Europe + Horizon Cluster 2 empujan contenidos digitales, inmersivos y gemelos virtuales culturales.",
    oportunidad: "Apalancar Valencia Música City hacia XR/metaverso cultural, puente con el cluster LDT.",
  },
  {
    titulo: "Defensa civil y seguridad (dual-use)",
    contexto: "Reajuste post-Ucrania hace que parte del envelope civil pueda migrar a ciberseguridad, resiliencia crítica, emergencias.",
    oportunidad: "No es territorio municipal natural, pero proyectos de resiliencia climática (DANA) y ciberseguridad urbana encajan parcialmente.",
  },
];

export const SERVICIO_COLORS: Record<string, string> = {
  "VIC": "#C8102E",
  "OCI": "#1e3a8a",
  "Servicio Innovación": "#0ea5e9",
  "Servicio de Turismo": "#10b981",
  "SEPUE": "#f59e0b",
  "SCT": "#8b5cf6",
  "—": "#94a3b8",
};

export const ESTADO_COLORS: Record<Estado, string> = {
  "En ejecución": "#10b981",
  "Aprobado": "#1e3a8a",
  "Pendiente aprobar": "#f59e0b",
};

export const PROGRAMA_COLORS: Record<string, string> = {
  "Horizon Europe": "#1e3a8a",
  "FEDER / UIA": "#C8102E",
  "FEDER / FID": "#b91c1c",
  "FEDER / EDIL": "#dc2626",
  "FEDER / Smart Economy": "#ef4444",
  "Digital Europe / LDT": "#0ea5e9",
  "Digital Europe": "#0284c7",
  "FEMP / EDINT": "#8b5cf6",
  "EDIC (Digital Europe)": "#7c3aed",
  "Red Innpulso": "#10b981",
  "MOVES (IDAE)": "#f59e0b",
  "IDAE / Eficiencia energética": "#fbbf24",
  "PID (MINTUR)": "#14b8a6",
  "SMP / COSME": "#ec4899",
  "Bloomberg Philanthropies": "#6366f1",
  "Agenda Sonora / Música": "#a855f7",
  "Red Ciudades Creativas": "#d946ef",
  "Erasmus+ / EUI": "#64748b",
};

export function fmtEur(n: number): string {
  return (n || 0).toLocaleString("es-ES", { style: "currency", currency: "EUR", minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export function fmtEurShort(n: number): string {
  if (!n) return "0 €";
  if (n >= 1e6) return (n / 1e6).toLocaleString("es-ES", { maximumFractionDigits: 2 }) + " M€";
  if (n >= 1e3) return (n / 1e3).toLocaleString("es-ES", { maximumFractionDigits: 0 }) + " K€";
  return n.toFixed(0) + " €";
}
