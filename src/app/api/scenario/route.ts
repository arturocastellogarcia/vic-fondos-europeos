import Anthropic from "@anthropic-ai/sdk";
import { PROYECTOS, SECTOR_ALINEAMIENTO, GAPS_ESTRATEGICOS_UE, type Sector } from "@/lib/projects";

export const runtime = "nodejs";
export const maxDuration = 60;

const SYSTEM_PROMPT = `Eres un analista senior en financiación europea con foco en el Área de Agenda Digital e Innovación del Ajuntament de València. Tu trabajo: generar escenarios de captación realistas y accionables para distintas configuraciones de variables.

Contexto estratégico UE (conocimiento actualizado a inicios 2026):

PRESENTE (2021-2027):
- Horizon Europe WP 2025-2027 en ejecución. Clusters 4 (digital, industria, espacio), 5 (clima, energía, movilidad), 6 (agua, bioeconomía). Missions activas: Climate-Neutral Cities, Soil Deal, Ocean, Cancer, Adaptation.
- Digital Europe Programme: EDICs operativos, espacios de datos, supercomputación, ciberseguridad. Valencia dentro de BUILD EDIC.
- CEF Digital: 5G corridors, quantum, edge, submarine cables.
- European Urban Initiative (EUI): sucesor de UIA dentro de ERDF. Innovative Actions calls temáticas.
- Recovery & Resilience Facility (RRF/NextGenEU): compromisos hasta 2026 disbursement hasta 2026. Cola para España: MRR, PRTR.
- Innovation Fund: ETS-financiado, ~40B€ 2020-2030 para descarbonización.
- LIFE Programme: ~5,4B€ 2021-2027, medio ambiente y clima.
- Creative Europe: cultura (Agenda Sonora, Valencia Music City).
- Interreg Euro-MED, Med, MSMe: cooperación territorial.

TENDENCIAS FUERTES 2025-2027:
- Informe Draghi (sept 2024): ~800B€/año adicionales necesarios, foco competitividad, autonomía estratégica, clean tech.
- Clean Industrial Deal / Net Zero Industry Act.
- Chips Act y sovereign cloud (EDICs ecosistema europeo de datos).
- Mission 100 Climate-Neutral Cities 2030: Valencia dentro, calls dedicadas.
- Mission Adaptation: Valencia afectada por fenómenos extremos (DANA oct 2024).

FUTURO (MFF 2028-2034):
- Propuesta Comisión prevista 2025-2026, aprobación 2027.
- Horizon FP10: estructura en debate. Tendencias: más implementación menos investigación básica, fondos para scaleups, cláusulas defensa industrial.
- CEF Digital 2 y ampliación espacios de datos.
- EUI probable segunda ola con tickets mayores.
- Climate/clean tech presupuesto creciente.
- Riesgos: presión Ucrania/defensa puede reducir envelope civil; condicionalidad rule-of-law.

INSTRUCCIONES DE RESPUESTA:
Responde en español, tono ejecutivo, entre 400 y 700 palabras. Usa SIEMPRE esta estructura:

## Contexto del escenario
2-3 frases situando las variables elegidas.

## Oportunidades principales
- 3-5 bullets con oportunidades CONCRETAS: programa + call tipo + fit con cartera VIC
- Cita proyectos existentes de la cartera si hay continuidad

## Riesgos y amenazas
- 3-4 bullets con riesgos específicos al escenario

## Pipeline recomendado
- Lista priorizada de 3-5 líneas de acción (partenariados, convocatorias, áreas donde posicionarse)

## Acciones inmediatas
- 3 acciones prácticas para los próximos 6 meses

Reglas:
- Cita programas europeos por nombre exacto
- Haz referencias a proyectos de la cartera por nombre cuando aplique
- Distingue claramente entre lo que ya está comprometido y lo especulativo
- Si no tienes información fiable sobre algo post-2027, dilo con honestidad en lugar de inventar
- Nunca inventes nombres de calls o deadlines específicos que no puedas garantizar
- Usa cifras redondeadas solo cuando aporten (no sobre-cuantifiques escenarios inciertos)`;

function buildPortfolio(): string {
  const actuales = PROYECTOS.filter((p) => p.legislatura === "actual");
  const totalAyuda = actuales.reduce((s, p) => s + p.ayuda, 0);

  const byProg: Record<string, { count: number; ayuda: number; proyectos: string[] }> = {};
  actuales.forEach((p) => {
    if (!byProg[p.programa]) byProg[p.programa] = { count: 0, ayuda: 0, proyectos: [] };
    byProg[p.programa].count++;
    byProg[p.programa].ayuda += p.ayuda;
    byProg[p.programa].proyectos.push(p.titulo.split("·")[0].trim());
  });
  const bloquesProg = Object.entries(byProg)
    .sort((a, b) => b[1].ayuda - a[1].ayuda)
    .map(([prog, d]) => `- ${prog}: ${d.count} proyecto(s), ${d.ayuda.toLocaleString("es-ES")}€ · ${d.proyectos.slice(0, 4).join(", ")}${d.proyectos.length > 4 ? "…" : ""}`)
    .join("\n");

  const bySector: Record<string, { count: number; ayuda: number; proyectos: string[] }> = {};
  actuales.forEach((p) => {
    if (!bySector[p.sector]) bySector[p.sector] = { count: 0, ayuda: 0, proyectos: [] };
    bySector[p.sector].count++;
    bySector[p.sector].ayuda += p.ayuda;
    bySector[p.sector].proyectos.push(p.titulo.split("·")[0].trim());
  });
  const bloquesSector = Object.entries(bySector)
    .sort((a, b) => b[1].ayuda - a[1].ayuda)
    .map(([sec, d]) => {
      const alin = SECTOR_ALINEAMIENTO[sec as Sector];
      return `- ${sec} [alineamiento UE: ${alin?.nivel}]: ${d.count} proyecto(s), ${d.ayuda.toLocaleString("es-ES")}€ · programas: ${alin?.programasUE} · proyectos: ${d.proyectos.slice(0, 3).join(", ")}${d.proyectos.length > 3 ? "…" : ""}`;
    })
    .join("\n");

  const gaps = GAPS_ESTRATEGICOS_UE
    .map((g) => `- ${g.titulo}: ${g.contexto} Oportunidad potencial: ${g.oportunidad}`)
    .join("\n");

  return `CARTERA ACTUAL VIC/OCI/SEPUE/SCT/Innovación/Turismo (legislatura 2023-2027):
Ayuda total captada: ${totalAyuda.toLocaleString("es-ES")}€ en ${actuales.length} proyectos.

Distribución por PROGRAMA europeo:
${bloquesProg}

Distribución por SECTOR ESTRATÉGICO (cruzado con alineamiento MFF próximo):
${bloquesSector}

GAPS estratégicos UE sin presencia en cartera (a considerar para pipeline futuro):
${gaps}`;
}

export async function POST(req: Request) {
  try {
    const { horizonte, escenario, focos, pregunta } = await req.json() as {
      horizonte: string;
      escenario: string;
      focos: string[];
      pregunta?: string;
    };

    if (!process.env.ANTHROPIC_API_KEY) {
      return Response.json({ error: "ANTHROPIC_API_KEY no configurada" }, { status: 500 });
    }

    const userMessage = `Variables del escenario:
- Horizonte temporal: ${horizonte}
- Escenario presupuestario UE: ${escenario}
- Focos temáticos: ${focos.length > 0 ? focos.join(", ") : "(sin seleccionar — usa cartera actual como guía)"}
- Pregunta o matiz adicional: ${pregunta?.trim() || "(ninguna)"}

Genera el análisis de escenario siguiendo la estructura indicada.`;

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2500,
      system: [
        { type: "text", text: SYSTEM_PROMPT },
        { type: "text", text: buildPortfolio(), cache_control: { type: "ephemeral" } },
      ],
      messages: [{ role: "user", content: userMessage }],
    });

    const text = response.content
      .filter((b) => b.type === "text")
      .map((b) => (b as { text: string }).text)
      .join("\n");

    return Response.json({ text });
  } catch (e) {
    console.error("[/api/scenario] error:", e);
    const msg = e instanceof Error ? e.message : "Error desconocido";
    return Response.json({ error: msg }, { status: 500 });
  }
}
