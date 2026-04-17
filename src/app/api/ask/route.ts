import Anthropic from "@anthropic-ai/sdk";
import { PROYECTOS } from "@/lib/projects";

export const runtime = "nodejs";
export const maxDuration = 30;

const SYSTEM_PROMPT = `Eres un asistente especializado en análisis de la cartera de proyectos europeos del Área de Agenda Digital e Innovación del Ajuntament de València.

Responde SIEMPRE en español, de forma directa, precisa y ejecutiva. Usa los datos estructurados proporcionados para responder con cifras concretas.

Formato de respuesta:
- Respuestas cortas y al grano (máximo 3-4 párrafos salvo que se pida más detalle)
- Cuando cites importes, usa formato europeo: 1.250.000 € o 1,25 M€
- Cuando listes proyectos, usa bullets con guión (-) y nombre en **negrita**
- Si la pregunta requiere cálculos, hazlos con precisión (suma todos los proyectos relevantes)
- Si no hay datos suficientes para responder, dilo claramente en lugar de inventar

Servicios responsables del Área:
- VIC: Valencia Innovation Capital (Fundación Las Naves)
- OCI: Oficina de Ciudad Inteligente
- SEPUE: Servicio de Proyectos Urbanos Europeos
- SCT: Servicio de Contaminación y Tráfico
- Servicio Innovación
- Servicio de Turismo

Glosario:
- "Ayuda" = importe europeo/estatal captado
- "Coste total" = presupuesto global del proyecto (IVA incluido)
- "Subvencionable" = gasto aprobado como elegible
- "Aporta Ayto" = cofinanciación municipal`;

function buildContext(): string {
  const rows = PROYECTOS.map((p, i) =>
    `${i + 1}. [${p.legislatura}] "${p.titulo}" | Servicio: ${p.servicio} | Expediente: ${p.expediente} | FechaSol: ${p.fechaSol} | FechaConc: ${p.fechaConc} | Coste: ${p.costeTotal}€ | Subv: ${p.subvencionable}€ | Ayuda: ${p.ayuda}€ | Ayto: ${p.ayto}€ | Estado: ${p.estado} | Programa: ${p.programa}`
  ).join("\n");
  const totalAyuda = PROYECTOS.reduce((s, p) => s + p.ayuda, 0);
  const totalCoste = PROYECTOS.reduce((s, p) => s + p.costeTotal, 0);
  const totalAyto = PROYECTOS.reduce((s, p) => s + p.ayto, 0);
  return `DATOS DE LA CARTERA (${PROYECTOS.length} proyectos):

Totales globales:
- Ayuda europea captada: ${totalAyuda.toLocaleString("es-ES")}€
- Coste total: ${totalCoste.toLocaleString("es-ES")}€
- Aporta Ayto: ${totalAyto.toLocaleString("es-ES")}€

Detalle por proyecto:
${rows}`;
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json() as { messages: { role: "user" | "assistant"; content: string }[] };

    if (!process.env.ANTHROPIC_API_KEY) {
      return Response.json({ error: "ANTHROPIC_API_KEY no configurada" }, { status: 500 });
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1500,
      system: [
        { type: "text", text: SYSTEM_PROMPT },
        { type: "text", text: buildContext(), cache_control: { type: "ephemeral" } },
      ],
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });

    const text = response.content
      .filter((b) => b.type === "text")
      .map((b) => (b as { text: string }).text)
      .join("\n");

    return Response.json({ text });
  } catch (e) {
    console.error("[/api/ask] error:", e);
    const msg = e instanceof Error ? e.message : "Error desconocido";
    return Response.json({ error: msg }, { status: 500 });
  }
}
