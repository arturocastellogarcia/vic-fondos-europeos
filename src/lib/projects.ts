export type Estado = "En ejecución" | "Aprobado" | "Pendiente aprobar";
export type Legislatura = "actual" | "anterior";

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
}

export const PROYECTOS: Proyecto[] = [
  { titulo: "TURISMO DEPORTIVO SOSTENIBLE: Mejora eficiencia energética iluminación deportiva campo hockey Tarongers", expediente: "00212/2023/23", servicio: "SEPUE", fechaSol: "03/08/2023", fechaConc: "13/05/2024", costeTotal: 420826.26, subvencionable: 392617.21, ayuda: 180573.34, ayto: 49690.08, estado: "En ejecución", legislatura: "actual", programa: "IDAE / Eficiencia energética" },
  { titulo: "PROGRAMA MOVES", expediente: "00212/2024/16", servicio: "SCT", fechaSol: "16/12/2022", fechaConc: "07/07/2024", costeTotal: 1068633.25, subvencionable: 287000, ayuda: 287000, ayto: 781633.25, estado: "En ejecución", legislatura: "actual", programa: "MOVES (IDAE)" },
  { titulo: "PLATAFORMA INTELIGENTE DE DESTINOS (PID) · Red de destinos Turísticos Inteligentes", expediente: "00212/2024/18", servicio: "OCI", fechaSol: "30/06/2024", fechaConc: "07/12/2024", costeTotal: 2842677, subvencionable: 2842677, ayuda: 2842677, ayto: 0, estado: "En ejecución", legislatura: "actual", programa: "PID (MINTUR)" },
  { titulo: "FEDER-ZENTROPY (UIA)", expediente: "00212/2024/14", servicio: "Servicio de Turismo", fechaSol: "13/05/2023", fechaConc: "21/05/2024", costeTotal: 839784.80, subvencionable: 671827.84, ayuda: 671827.84, ayto: 167956.96, estado: "En ejecución", legislatura: "actual", programa: "FEDER / UIA" },
  { titulo: "FEDER - FID - COMPRA PÚBLICA INNOVADORA", expediente: "00202/2024/13 · FID2024-001826", servicio: "Servicio Innovación", fechaSol: "16/03/2024", fechaConc: "04/02/2025", costeTotal: 3000000, subvencionable: 1800000, ayuda: 1800000, ayto: 1200000, estado: "En ejecución", legislatura: "actual", programa: "FEDER / FID" },
  { titulo: "AGENTE LOCAL DE INNOVACIÓN", expediente: "00202/2023/160 · 00202/2024/276 · 00202/2025/27 · 00202/2026/33", servicio: "Servicio Innovación", fechaSol: "4 años", fechaConc: "18/11/2023 · 02/12/2024 · 09/12/2025 · 2026 pte.", costeTotal: 100000, subvencionable: 100000, ayuda: 100000, ayto: 0, estado: "Pendiente aprobar", legislatura: "actual", programa: "Red Innpulso" },
  { titulo: "BLOOMBERG", expediente: "00202/2024/283", servicio: "Servicio Innovación", fechaSol: "28/10/2024", fechaConc: "—", costeTotal: 600000, subvencionable: 600000, ayuda: 0, ayto: 0, estado: "En ejecución", legislatura: "actual", programa: "Bloomberg Philanthropies" },
  { titulo: "RED INNPULSO · CIUDAD LABORATORIO", expediente: "00202/2025/8", servicio: "Servicio Innovación", fechaSol: "18/02/2025", fechaConc: "30/04/2025", costeTotal: 8000, subvencionable: 8000, ayuda: 8000, ayto: 0, estado: "En ejecución", legislatura: "actual", programa: "Red Innpulso" },
  { titulo: "AGENDA SONORA 2030", expediente: "00202/2025/299", servicio: "Servicio Innovación", fechaSol: "30/06/2025", fechaConc: "24/10/2025", costeTotal: 249400, subvencionable: 184556, ayuda: 184556, ayto: 0, estado: "En ejecución", legislatura: "actual", programa: "Agenda Sonora / Música" },
  { titulo: "FEDER-ZENTROPY (UIA)", expediente: "—", servicio: "VIC", fechaSol: "—", fechaConc: "—", costeTotal: 1022378.40, subvencionable: 817902.72, ayuda: 817902.72, ayto: 204475.68, estado: "En ejecución", legislatura: "actual", programa: "FEDER / UIA" },
  { titulo: "FEMP - EDINT · Espacios de datos impulsado por FEMP (12 entidades locales)", expediente: "—", servicio: "OCI", fechaSol: "—", fechaConc: "—", costeTotal: 1156440, subvencionable: 1156440, ayuda: 1000000, ayto: 156440, estado: "En ejecución", legislatura: "actual", programa: "FEMP / EDINT" },
  { titulo: "BUILD · BestUse para EDIC", expediente: "—", servicio: "OCI", fechaSol: "—", fechaConc: "—", costeTotal: 494340, subvencionable: 247170, ayuda: 247170, ayto: 247170, estado: "En ejecución", legislatura: "actual", programa: "EDIC (Digital Europe)" },
  { titulo: "GEO4WATER · Geodata Space for Smart Water Monitoring", expediente: "—", servicio: "VIC", fechaSol: "—", fechaConc: "—", costeTotal: 200000, subvencionable: 100000, ayuda: 100000, ayto: 100000, estado: "En ejecución", legislatura: "actual", programa: "Horizon Europe" },
  { titulo: "DISCO", expediente: "—", servicio: "VIC", fechaSol: "—", fechaConc: "—", costeTotal: 80500, subvencionable: 80500, ayuda: 80500, ayto: 0, estado: "En ejecución", legislatura: "actual", programa: "Horizon Europe" },
  { titulo: "MixMatters", expediente: "—", servicio: "VIC", fechaSol: "—", fechaConc: "—", costeTotal: 259375, subvencionable: 259375, ayuda: 259375, ayto: 0, estado: "En ejecución", legislatura: "actual", programa: "Horizon Europe" },
  { titulo: "POWER UP", expediente: "—", servicio: "VIC", fechaSol: "—", fechaConc: "—", costeTotal: 86676.25, subvencionable: 86676.25, ayuda: 86676.25, ayto: 0, estado: "En ejecución", legislatura: "actual", programa: "Horizon Europe" },
  { titulo: "RescueME", expediente: "—", servicio: "VIC", fechaSol: "—", fechaConc: "—", costeTotal: 133081, subvencionable: 133081, ayuda: 133081, ayto: 0, estado: "En ejecución", legislatura: "actual", programa: "Horizon Europe" },
  { titulo: "BIOSOILUTIONS", expediente: "—", servicio: "VIC", fechaSol: "—", fechaConc: "—", costeTotal: 218750, subvencionable: 218750, ayuda: 218750, ayto: 0, estado: "En ejecución", legislatura: "actual", programa: "Horizon Europe" },
  { titulo: "ToNoWaste", expediente: "—", servicio: "VIC", fechaSol: "—", fechaConc: "—", costeTotal: 350125, subvencionable: 350125, ayuda: 350125, ayto: 0, estado: "En ejecución", legislatura: "actual", programa: "Horizon Europe" },
  { titulo: "COP-PILOT", expediente: "—", servicio: "VIC", fechaSol: "—", fechaConc: "—", costeTotal: 274625, subvencionable: 274625, ayuda: 274625, ayto: 0, estado: "En ejecución", legislatura: "actual", programa: "Horizon Europe" },
  { titulo: "SPOON", expediente: "—", servicio: "VIC", fechaSol: "—", fechaConc: "—", costeTotal: 260750, subvencionable: 260750, ayuda: 260750, ayto: 0, estado: "En ejecución", legislatura: "actual", programa: "Horizon Europe" },
  { titulo: "FU-TOURISM · Apoyo a PYMES turísticas (6 países, 102 proyectos)", expediente: "—", servicio: "Servicio de Turismo", fechaSol: "—", fechaConc: "—", costeTotal: 150768.54, subvencionable: 134439.79, ayuda: 134439.79, ayto: 16328.75, estado: "En ejecución", legislatura: "actual", programa: "SMP / COSME" },
  { titulo: "MULTIENGAGE", expediente: "—", servicio: "VIC", fechaSol: "—", fechaConc: "—", costeTotal: 20725, subvencionable: 20725, ayuda: 20725, ayto: 0, estado: "En ejecución", legislatura: "actual", programa: "Horizon Europe" },
  { titulo: "WATERGRID", expediente: "—", servicio: "VIC", fechaSol: "—", fechaConc: "—", costeTotal: 131562.50, subvencionable: 131562.50, ayuda: 131562.50, ayto: 0, estado: "En ejecución", legislatura: "actual", programa: "Horizon Europe" },
  { titulo: "PUREPOLIS", expediente: "101234870", servicio: "VIC", fechaSol: "—", fechaConc: "tbc", costeTotal: 252750, subvencionable: 252750, ayuda: 252750, ayto: 0, estado: "Pendiente aprobar", legislatura: "actual", programa: "Horizon Europe" },
  { titulo: "Virtuopolis", expediente: "—", servicio: "OCI", fechaSol: "—", fechaConc: "—", costeTotal: 150000, subvencionable: 150000, ayuda: 150000, ayto: 0, estado: "Pendiente aprobar", legislatura: "actual", programa: "Digital Europe / LDT" },
  { titulo: "Virtucore", expediente: "—", servicio: "OCI", fechaSol: "—", fechaConc: "—", costeTotal: 197500, subvencionable: 0, ayuda: 197500, ayto: 0, estado: "Pendiente aprobar", legislatura: "actual", programa: "Digital Europe / LDT" },
  { titulo: "Virtucore", expediente: "—", servicio: "VIC", fechaSol: "—", fechaConc: "—", costeTotal: 142500, subvencionable: 0, ayuda: 142500, ayto: 0, estado: "Pendiente aprobar", legislatura: "actual", programa: "Digital Europe / LDT" },
  { titulo: "TWINVERSE", expediente: "—", servicio: "OCI", fechaSol: "—", fechaConc: "—", costeTotal: 103413.46, subvencionable: 103413.46, ayuda: 103413.46, ayto: 0, estado: "Pendiente aprobar", legislatura: "actual", programa: "Digital Europe / LDT" },
  { titulo: "TWINVERSE", expediente: "—", servicio: "VIC", fechaSol: "—", fechaConc: "—", costeTotal: 213687.58, subvencionable: 213687.58, ayuda: 213687.58, ayto: 0, estado: "Pendiente aprobar", legislatura: "actual", programa: "Digital Europe / LDT" },
  { titulo: "URBANFLOW", expediente: "—", servicio: "OCI", fechaSol: "—", fechaConc: "—", costeTotal: 147500, subvencionable: 147500, ayuda: 147500, ayto: 0, estado: "En ejecución", legislatura: "actual", programa: "Digital Europe / LDT" },
  { titulo: "URBANFLOW", expediente: "101239472", servicio: "VIC", fechaSol: "—", fechaConc: "—", costeTotal: 1012000, subvencionable: 1012000, ayuda: 1012000, ayto: 0, estado: "En ejecución", legislatura: "actual", programa: "Digital Europe / LDT" },
  { titulo: "EDIL", expediente: "00212/2025/8", servicio: "SEPUE", fechaSol: "28/02/2025", fechaConc: "—", costeTotal: 14500000, subvencionable: 14500000, ayuda: 8500000, ayto: 6000000, estado: "Aprobado", legislatura: "actual", programa: "FEDER / EDIL" },
  { titulo: "VALENT.IA (Smart Economy)", expediente: "—", servicio: "OCI", fechaSol: "—", fechaConc: "—", costeTotal: 3500000, subvencionable: 0, ayuda: 2100000, ayto: 1400000, estado: "Pendiente aprobar", legislatura: "actual", programa: "FEDER / Smart Economy" },
  { titulo: "Valencia Music City · Sono Lab meet up", expediente: "—", servicio: "VIC", fechaSol: "—", fechaConc: "—", costeTotal: 52240, subvencionable: 52240, ayuda: 35600, ayto: 16640, estado: "Pendiente aprobar", legislatura: "actual", programa: "Red Ciudades Creativas" },

  { titulo: "CITCOM.ai", expediente: "—", servicio: "OCI", fechaSol: "—", fechaConc: "—", costeTotal: 1710502, subvencionable: 1710502, ayuda: 855251, ayto: 855251, estado: "En ejecución", legislatura: "anterior", programa: "Digital Europe" },
  { titulo: "CITCOM.ai", expediente: "—", servicio: "VIC", fechaSol: "—", fechaConc: "—", costeTotal: 1053308, subvencionable: 526654, ayuda: 526654, ayto: 526654, estado: "En ejecución", legislatura: "anterior", programa: "Digital Europe" },
  { titulo: "ENHANCEplus · European Universities of Technology Alliance", expediente: "—", servicio: "—", fechaSol: "—", fechaConc: "—", costeTotal: 14400000, subvencionable: 14400000, ayuda: 0, ayto: 0, estado: "En ejecución", legislatura: "anterior", programa: "Erasmus+ / EUI" },
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
