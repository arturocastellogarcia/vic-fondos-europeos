"use client";
import { useMemo, useState } from "react";
import {
  PROYECTOS,
  SECTOR_ALINEAMIENTO,
  SECTOR_COLORS,
  GAPS_ESTRATEGICOS_UE,
  type Sector,
  fmtEur,
  fmtEurShort,
} from "@/lib/projects";

type Horizonte = "2027" | "2030" | "2034";
type Escenario = "optimista" | "continuidad" | "restrictivo";

const FOCOS = [
  "Gemelos digitales / smart cities",
  "IA y datos",
  "Energía y clima",
  "Agua y medio ambiente",
  "Turismo sostenible",
  "Economía del dato",
  "Cultura y creatividad",
  "Innovación social / ciudadanía",
  "Movilidad sostenible",
  "Compra pública innovadora",
];

function simpleMarkdown(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/^### (.+)$/gm, "<h4 style='margin:16px 0 6px;font-size:13px;text-transform:uppercase;letter-spacing:0.04em;color:var(--accent)'>$1</h4>")
    .replace(/^## (.+)$/gm, "<h3 style='margin:18px 0 8px;font-size:15px;color:var(--text)'>$1</h3>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*?<\/li>\n?)+/gs, (m) => `<ul style='margin:6px 0 10px 18px;padding:0'>${m}</ul>`)
    .replace(/\n\n/g, "<br/><br/>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

export default function TendenciasPage() {
  // ---------- Radiografía actual ----------
  const stats = useMemo(() => {
    const actuales = PROYECTOS.filter((p) => p.legislatura === "actual");
    const totalAyuda = actuales.reduce((s, p) => s + p.ayuda, 0);
    const byProg: Record<string, number> = {};
    actuales.forEach((p) => { byProg[p.programa] = (byProg[p.programa] || 0) + p.ayuda; });
    const topProg = Object.entries(byProg).sort((a, b) => b[1] - a[1]);
    const top3Sum = topProg.slice(0, 3).reduce((s, e) => s + e[1], 0);
    const top3Pct = totalAyuda > 0 ? (top3Sum / totalAyuda) * 100 : 0;

    const edil = actuales.find((p) => p.titulo === "EDIL");
    const edilPct = edil && totalAyuda > 0 ? (edil.ayuda / totalAyuda) * 100 : 0;

    const pequenos = actuales.filter((p) => p.costeTotal < 500_000 && p.costeTotal > 0);
    const pequenosPct = actuales.length > 0 ? (pequenos.length / actuales.length) * 100 : 0;

    const pendientes = actuales.filter((p) => p.estado === "Pendiente aprobar");
    const pendienteAyuda = pendientes.reduce((s, p) => s + p.ayuda, 0);

    const horizonCount = actuales.filter((p) => p.programa === "Horizon Europe").length;
    const feder = actuales.filter((p) => p.programa.startsWith("FEDER"));
    const federAyuda = feder.reduce((s, p) => s + p.ayuda, 0);

    const ldt = actuales.filter((p) => p.programa === "Digital Europe / LDT");
    const ldtAyuda = ldt.reduce((s, p) => s + p.ayuda, 0);

    return {
      totalAyuda, topProg, top3Pct, edil, edilPct,
      pequenos: pequenos.length, pequenosPct,
      pendientes: pendientes.length, pendienteAyuda,
      horizonCount, federAyuda, ldtCount: ldt.length, ldtAyuda,
    };
  }, []);

  // ---------- Sectores estratégicos ----------
  const sectores = useMemo(() => {
    const actuales = PROYECTOS.filter((p) => p.legislatura === "actual");
    const bySector: Record<string, { count: number; ayuda: number; coste: number; proyectos: string[] }> = {};
    actuales.forEach((p) => {
      if (!bySector[p.sector]) bySector[p.sector] = { count: 0, ayuda: 0, coste: 0, proyectos: [] };
      bySector[p.sector].count++;
      bySector[p.sector].ayuda += p.ayuda;
      bySector[p.sector].coste += p.costeTotal;
      bySector[p.sector].proyectos.push(p.titulo.split("·")[0].trim());
    });
    return Object.entries(bySector)
      .map(([sector, d]) => ({ sector: sector as Sector, ...d, ...SECTOR_ALINEAMIENTO[sector as Sector] }))
      .sort((a, b) => b.ayuda - a.ayuda);
  }, []);

  // ---------- Escenarios ----------
  const [horizonte, setHorizonte] = useState<Horizonte>("2030");
  const [escenario, setEscenario] = useState<Escenario>("continuidad");
  const [focos, setFocos] = useState<string[]>([]);
  const [pregunta, setPregunta] = useState("");
  const [loading, setLoading] = useState(false);
  const [respuesta, setRespuesta] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function toggleFoco(f: string) {
    setFocos((prev) => prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]);
  }

  async function generar() {
    setLoading(true);
    setError(null);
    setRespuesta(null);
    try {
      const res = await fetch("/api/scenario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ horizonte, escenario, focos, pregunta }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setRespuesta(data.text);
    } catch (e) {
      setError("Error de red al generar el escenario");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="section-title">Tendencias y escenarios de captación</div>
      <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 24, maxWidth: 850 }}>
        Análisis de cómo nuestra cartera enlaza con las tendencias de financiación europea — pasadas, actuales y futuras —
        para anticipar oportunidades y ajustar el foco estratégico ante distintos escenarios.
      </p>

      {/* ------ RADIOGRAFÍA ACTUAL ------ */}
      <h3 style={{ fontSize: 15, marginBottom: 10 }}>Radiografía actual de la cartera</h3>
      <div className="kpi-grid" style={{ marginBottom: 24 }}>
        <div className="kpi primary">
          <div className="label">Concentración top 3 programas</div>
          <div className="value">{stats.top3Pct.toFixed(0)}%</div>
          <div className="sub">
            {stats.topProg.slice(0, 3).map((e) => e[0]).join(" · ")}
          </div>
        </div>
        <div className="kpi warning">
          <div className="label">Dependencia EDIL</div>
          <div className="value">{stats.edilPct.toFixed(0)}%</div>
          <div className="sub">Un único proyecto concentra {fmtEurShort(stats.edil?.ayuda || 0)} de ayuda</div>
        </div>
        <div className="kpi">
          <div className="label">Horizon Europe · pilots</div>
          <div className="value">{stats.horizonCount}</div>
          <div className="sub">Proyectos {"<"}500K en consorcios UE · VIC muy activo</div>
        </div>
        <div className="kpi success">
          <div className="label">Pipeline pendiente aprobar</div>
          <div className="value">{fmtEurShort(stats.pendienteAyuda)}</div>
          <div className="sub">{stats.pendientes} proyectos aún no resueltos</div>
        </div>
      </div>

      {/* ------ PASADO PRESENTE FUTURO ------ */}
      <h3 style={{ fontSize: 15, marginBottom: 10 }}>Contexto temporal de la financiación europea</h3>
      <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 24 }}>
        <div className="card card-trend past">
          <div className="trend-tag past">Pasado · 2014-2020</div>
          <h3 style={{ marginTop: 10 }}>De proyectos piloto a ciudad-laboratorio</h3>
          <p style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.6 }}>
            Valencia entra con fuerza en la segunda mitad del ciclo: <strong>UIA</strong> (Zentropy), primeras iniciativas
            de <strong>Digital Europe</strong> (CITCOM.ai) y alianza universitaria <strong>ENHANCEplus</strong> marcan la
            consolidación del perfil innovador.
          </p>
          <div className="trend-meta">
            <div><strong>Programas dominantes:</strong> H2020, UIA, Erasmus+, EUI-pilot</div>
            <div><strong>Huella en cartera:</strong> 3 proyectos heredados · 17,16 M€ coste total</div>
          </div>
        </div>

        <div className="card card-trend present">
          <div className="trend-tag present">Presente · 2021-2027</div>
          <h3 style={{ marginTop: 10 }}>Diversificación y apuestas grandes</h3>
          <p style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.6 }}>
            Coexisten muchos proyectos <strong>Horizon Europe</strong> pequeños ({stats.horizonCount} pilots VIC)
            con apuestas grandes de <strong>FEDER</strong> ({fmtEurShort(stats.federAyuda)}: EDIL, FID, ZENTROPY) y una posición
            temprana en <strong>Local Digital Twins</strong> ({stats.ldtCount} proyectos LDT,{" "}
            {fmtEurShort(stats.ldtAyuda)}). BUILD EDIC abre la puerta a los espacios de datos europeos.
          </p>
          <div className="trend-meta">
            <div><strong>Programas dominantes:</strong> Horizon Europe, FEDER, Digital Europe/EDIC, FEMP-EDINT</div>
            <div><strong>Cierra:</strong> RRF (NextGen) 2026 · MFF 2021-2027 entra en fase final</div>
          </div>
        </div>

        <div className="card card-trend future">
          <div className="trend-tag future">Futuro · 2028-2034</div>
          <h3 style={{ marginTop: 10 }}>MFF post-2027 y giro competitividad</h3>
          <p style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.6 }}>
            El <strong>informe Draghi</strong> y la agenda de autonomía estratégica orientan el próximo MFF hacia
            competitividad, defensa-industrial, clean tech e IA. <strong>Horizon FP10</strong> se perfila con mayor foco en
            implementación. <strong>Mission Climate-Neutral Cities 2030</strong> activa — Valencia en las 100.
          </p>
          <div className="trend-meta">
            <div><strong>Previsible emergencia de:</strong> FP10, CEF Digital 2, Innovation Fund ampliado, EUI nueva ola</div>
            <div><strong>Riesgo:</strong> consolidación de programas · menos convocatorias pero mayores tickets</div>
          </div>
        </div>
      </div>

      {/* ------ SECTORES ESTRATÉGICOS ------ */}
      <h3 style={{ fontSize: 15, marginBottom: 6 }}>Sectores estratégicos: posicionamiento y gaps</h3>
      <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 14, maxWidth: 850 }}>
        Radiografía sectorial cruzada con el alineamiento del próximo MFF. Muestra dónde tenemos masa crítica, dónde el envelope UE crece,
        y qué sectores estratégicos emergentes aún no figuran en la cartera.
      </p>

      <div className="card" style={{ padding: 0, overflowX: "auto", marginBottom: 18 }}>
        <table>
          <thead>
            <tr>
              <th>Sector</th>
              <th className="num">Proyectos</th>
              <th className="num">Ayuda</th>
              <th style={{ whiteSpace: "nowrap" }}>Alineamiento UE</th>
              <th>Programas UE relevantes</th>
            </tr>
          </thead>
          <tbody>
            {sectores.map((s) => {
              const nivelClass = s.nivel === "Alto" ? "alin-alto" : s.nivel === "Medio" ? "alin-medio" : s.nivel === "Emergente" ? "alin-emergente" : "alin-gap";
              return (
                <tr key={s.sector}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 3, background: SECTOR_COLORS[s.sector] }}></span>
                      <strong style={{ fontSize: 13 }}>{s.sector}</strong>
                    </div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 3, marginLeft: 18, lineHeight: 1.4 }}>
                      {s.proyectos.slice(0, 3).join(" · ")}{s.proyectos.length > 3 ? ` · +${s.proyectos.length - 3}` : ""}
                    </div>
                  </td>
                  <td className="num">{s.count}</td>
                  <td className="num" style={{ fontWeight: 600, color: "var(--primary)" }}>{fmtEurShort(s.ayuda)}</td>
                  <td><span className={`alin-badge ${nivelClass}`}>{s.nivel}</span></td>
                  <td style={{ fontSize: 12, color: "var(--text-muted)", maxWidth: 280 }}>{s.programasUE}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid-2-even" style={{ marginBottom: 28 }}>
        <div className="card" style={{ borderLeft: "4px solid var(--accent)" }}>
          <h3 style={{ color: "var(--accent)" }}>Fortalezas sectoriales</h3>
          <ul style={{ margin: "10px 0 0 18px", padding: 0, fontSize: 13, lineHeight: 1.7 }}>
            {sectores.slice(0, 3).map((s) => (
              <li key={s.sector} style={{ marginBottom: 8 }}>
                <strong>{s.sector}</strong> ({fmtEurShort(s.ayuda)} en {s.count} proyectos) — {s.razon}
              </li>
            ))}
            <li>
              <strong>Cluster Gemelos Digitales</strong> con 7 proyectos activos es una señal de posicionamiento único entre
              ciudades españolas de cara a CEF Digital 2 y posibles AI Factories.
            </li>
          </ul>
        </div>

        <div className="card" style={{ borderLeft: "4px solid var(--warning)" }}>
          <h3 style={{ color: "var(--warning)" }}>Gaps estratégicos UE sin presencia</h3>
          <ul style={{ margin: "10px 0 0 18px", padding: 0, fontSize: 13, lineHeight: 1.7 }}>
            {GAPS_ESTRATEGICOS_UE.map((g) => (
              <li key={g.titulo} style={{ marginBottom: 10 }}>
                <strong>{g.titulo}</strong> — {g.contexto} <em style={{ color: "var(--text-muted)" }}>{g.oportunidad}</em>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ------ OPORTUNIDADES Y RIESGOS ------ */}
      <div className="grid-2-even" style={{ marginBottom: 28 }}>
        <div className="card" style={{ borderLeft: "4px solid var(--success)" }}>
          <h3 style={{ color: "var(--success)" }}>Oportunidades identificadas</h3>
          <ul style={{ margin: "10px 0 0 18px", padding: 0, fontSize: 13, lineHeight: 1.7 }}>
            <li><strong>Valencia en Mission 100 Cities</strong> — acceso prioritario a calls de climate-neutral cities y EUI.</li>
            <li><strong>BUILD EDIC + FEMP EDINT</strong> — posición muy temprana en la red europea de espacios de datos; palanca para CEF Digital 2.</li>
            <li><strong>Cluster LDT (Virtuopolis · TWINVERSE · URBANFLOW)</strong> — masa crítica en gemelos digitales locales con ~1,7 M€ activados.</li>
            <li><strong>Pipeline pendiente 772 K€</strong> que puede consolidarse como proyectos en ejecución antes de cierre MFF.</li>
            <li><strong>Turismo Sostenible (FU-TOURISM, PID)</strong> — territorio con poca competencia y programas específicos (SMP-COSME, Interreg Euro-MED).</li>
          </ul>
        </div>

        <div className="card" style={{ borderLeft: "4px solid var(--primary)" }}>
          <h3 style={{ color: "var(--primary)" }}>Riesgos y dependencias</h3>
          <ul style={{ margin: "10px 0 0 18px", padding: 0, fontSize: 13, lineHeight: 1.7 }}>
            <li><strong>Concentración EDIL (35% de la ayuda)</strong> — cualquier retraso o recorte impacta materialmente.</li>
            <li><strong>Muchos pilots pequeños {"<"} 300K</strong> en Horizon — alto coste administrativo por euro captado.</li>
            <li><strong>Dependencia consorcios internacionales</strong> para VIC — rol principalmente de partner, no coordinador.</li>
            <li><strong>Transición FP9 → FP10 en 2028</strong> — ventana de incertidumbre donde pueden caer calls en 2027-2028.</li>
            <li><strong>Fin de RRF/NextGen</strong> — el colchón adicional 2021-2026 desaparece; retomar ritmo sin él es un reto.</li>
          </ul>
        </div>
      </div>

      {/* ------ GENERADOR DE ESCENARIOS ------ */}
      <div className="section-title">Generador de escenarios IA</div>
      <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16, maxWidth: 850 }}>
        Configura las variables para que el asistente genere un análisis de escenario específico: oportunidades, riesgos y pipeline
        recomendado para tu contexto.
      </p>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 18 }}>
          <div>
            <label style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 8 }}>
              Horizonte temporal
            </label>
            <div className="group" style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              {(["2027", "2030", "2034"] as Horizonte[]).map((h) => (
                <button key={h} className={`pill ${horizonte === h ? "active" : ""}`} onClick={() => setHorizonte(h)}>
                  {h}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 8 }}>
              Escenario presupuestario UE
            </label>
            <div className="group" style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              {(["optimista", "continuidad", "restrictivo"] as Escenario[]).map((e) => (
                <button key={e} className={`pill ${escenario === e ? "active" : ""}`} onClick={() => setEscenario(e)}>
                  {e.charAt(0).toUpperCase() + e.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 18 }}>
          <label style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 8 }}>
            Focos temáticos ({focos.length} seleccionado{focos.length !== 1 ? "s" : ""})
          </label>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {FOCOS.map((f) => (
              <button key={f} className={`pill ${focos.includes(f) ? "active" : ""}`} onClick={() => toggleFoco(f)}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 8 }}>
            Pregunta o matiz adicional (opcional)
          </label>
          <textarea
            className="chat-input"
            style={{ width: "100%", border: "1px solid var(--border)", borderRadius: 8, padding: 10, minHeight: 60 }}
            placeholder="Ej: ¿qué pasa si se cancela la call de Mission Cities? ¿y si VIC quiere coordinar un consorcio en lugar de solo participar?"
            value={pregunta}
            onChange={(e) => setPregunta(e.target.value)}
          />
        </div>

        <button className="chat-send" onClick={generar} disabled={loading} style={{ padding: "10px 24px" }}>
          {loading ? "Generando escenario..." : "Generar análisis de escenario"}
        </button>
      </div>

      {(respuesta || error || loading) && (
        <div className="card" style={{ minHeight: 100 }}>
          {loading && (
            <div style={{ color: "var(--text-muted)" }}>
              <span className="typing"><span></span><span></span><span></span></span>
              <span style={{ marginLeft: 10, fontSize: 13 }}>Analizando cartera y construyendo escenario...</span>
            </div>
          )}
          {error && <div style={{ color: "var(--primary)", fontSize: 13 }}>Error: {error}</div>}
          {respuesta && (
            <div style={{ fontSize: 13.5, lineHeight: 1.65 }} dangerouslySetInnerHTML={{ __html: simpleMarkdown(respuesta) }} />
          )}
        </div>
      )}

      <footer>
        Análisis cualitativo · Conocimiento del modelo actualizado a enero 2026 · No sustituye asesoramiento especializado en fondos UE
      </footer>
    </>
  );
}
