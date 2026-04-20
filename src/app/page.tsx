"use client";
import { useMemo, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import {
  PROYECTOS,
  Proyecto,
  Estado,
  Legislatura,
  SERVICIO_COLORS,
  ESTADO_COLORS,
  fmtEur,
  fmtEurShort,
} from "@/lib/projects";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const ESTADO_CLASS: Record<Estado, string> = {
  "En ejecución": "estado-ejecucion",
  "Aprobado": "estado-aprobado",
  "Pendiente aprobar": "estado-pendiente",
};

type SortKey = keyof Proyecto;

export default function Dashboard() {
  const [legis, setLegis] = useState<Legislatura | "todas">("actual");
  const [estado, setEstado] = useState<Estado | "todos">("todos");
  const [q, setQ] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("ayuda");
  const [sortDir, setSortDir] = useState<1 | -1>(-1);

  const filtered = useMemo(() => {
    return PROYECTOS.filter((p) => {
      if (legis !== "todas" && p.legislatura !== legis) return false;
      if (estado !== "todos" && p.estado !== estado) return false;
      if (q) {
        const s = q.toLowerCase();
        if (!p.titulo.toLowerCase().includes(s) && !p.servicio.toLowerCase().includes(s)) return false;
      }
      return true;
    });
  }, [legis, estado, q]);

  const kpis = useMemo(() => {
    const totalCoste = filtered.reduce((s, p) => s + p.costeTotal, 0);
    const totalAyuda = filtered.reduce((s, p) => s + p.ayuda, 0);
    const totalAyto = filtered.reduce((s, p) => s + p.ayto, 0);
    const pct = totalCoste > 0 ? (totalAyuda / totalCoste) * 100 : 0;
    return {
      totalCoste,
      totalAyuda,
      totalAyto,
      pct,
      n: filtered.length,
      ejec: filtered.filter((p) => p.estado === "En ejecución").length,
      aprob: filtered.filter((p) => p.estado === "Aprobado").length,
      pend: filtered.filter((p) => p.estado === "Pendiente aprobar").length,
    };
  }, [filtered]);

  const servicioData = useMemo(() => {
    const by: Record<string, number> = {};
    filtered.forEach((p) => { by[p.servicio] = (by[p.servicio] || 0) + p.ayuda; });
    const entries = Object.entries(by).sort((a, b) => b[1] - a[1]);
    return {
      labels: entries.map((e) => e[0]),
      datasets: [{
        data: entries.map((e) => e[1]),
        backgroundColor: entries.map((e) => SERVICIO_COLORS[e[0]] || "#94a3b8"),
        borderRadius: 4,
        barThickness: 22,
      }],
    };
  }, [filtered]);

  const estadoData = useMemo(() => {
    const by: Record<string, number> = {};
    filtered.forEach((p) => { by[p.estado] = (by[p.estado] || 0) + 1; });
    const labels = Object.keys(by);
    return {
      labels,
      datasets: [{
        data: Object.values(by),
        backgroundColor: labels.map((l) => ESTADO_COLORS[l as Estado] || "#94a3b8"),
        borderWidth: 3,
        borderColor: "#fff",
      }],
    };
  }, [filtered]);

  const topData = useMemo(() => {
    const top = [...filtered].sort((a, b) => b.ayuda - a.ayuda).slice(0, 12);
    return {
      labels: top.map((p) => {
        const t = p.titulo.split("·")[0].trim();
        return (t.length > 45 ? t.substring(0, 42) + "…" : t) + `  (${p.servicio})`;
      }),
      datasets: [{
        data: top.map((p) => p.ayuda),
        backgroundColor: top.map((p) => SERVICIO_COLORS[p.servicio] || "#94a3b8"),
        borderRadius: 4,
      }],
    };
  }, [filtered]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * sortDir;
      return String(av || "").localeCompare(String(bv || "")) * sortDir;
    });
  }, [filtered, sortKey, sortDir]);

  function toggleSort(k: SortKey) {
    if (sortKey === k) setSortDir((d) => (d === 1 ? -1 : 1));
    else {
      setSortKey(k);
      setSortDir(typeof PROYECTOS[0][k] === "number" ? -1 : 1);
    }
  }

  const sortInd = (k: SortKey) => sortKey === k ? (sortDir === 1 ? "▲" : "▼") : "▼";

  return (
    <>
      <div className="toolbar">
        <label>Legislatura:</label>
        <div className="group">
          {(["actual", "anterior", "todas"] as const).map((v) => (
            <button key={v} className={`pill ${legis === v ? "active" : ""}`} onClick={() => setLegis(v)}>
              {v === "actual" ? "Actual" : v === "anterior" ? "Anterior" : "Todas"}
            </button>
          ))}
        </div>
        <label>Estado:</label>
        <div className="group">
          {(["todos", "En ejecución", "Aprobado", "Pendiente aprobar"] as const).map((v) => (
            <button key={v} className={`pill ${estado === v ? "active" : ""}`} onClick={() => setEstado(v)}>
              {v === "todos" ? "Todos" : v === "Pendiente aprobar" ? "Pendiente" : v}
            </button>
          ))}
        </div>
        <div className="search">
          <input type="text" placeholder="Buscar proyecto o servicio..." value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi primary">
          <div className="label">Ayuda captada</div>
          <div className="value">{fmtEur(kpis.totalAyuda)}</div>
          <div className="sub">{kpis.pct.toFixed(0)}% del presupuesto total · fondos europeos, nacionales y privados</div>
        </div>
        <div className="kpi">
          <div className="label">Presupuesto total de proyectos</div>
          <div className="value">{fmtEur(kpis.totalCoste)}</div>
          <div className="sub">Ayuda captada + aportación municipal</div>
        </div>
        <div className="kpi warning">
          <div className="label">Aportación del Ayuntamiento</div>
          <div className="value">{fmtEur(kpis.totalAyto)}</div>
          <div className="sub">Cofinanciación municipal</div>
        </div>
        <div className="kpi success">
          <div className="label">Proyectos</div>
          <div className="value">{kpis.n}</div>
          <div className="sub">{kpis.ejec} en ejecución · {kpis.aprob} aprobados · {kpis.pend} pendientes</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>Ayuda por servicio responsable</h3>
          <div className="card-sub">Importe de ayuda captada (€) agrupado por servicio gestor</div>
          <div className="chart-wrap tall">
            <Bar data={servicioData} options={{
              indexAxis: "y",
              responsive: true, maintainAspectRatio: false,
              plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => fmtEur(c.parsed.x ?? 0) } } },
              scales: {
                x: { ticks: { callback: (v) => fmtEurShort(v as number), font: { size: 11 } }, grid: { color: "#f1f3f5" } },
                y: { ticks: { font: { size: 12, weight: 500 } }, grid: { display: false } },
              },
            }} />
          </div>
        </div>
        <div className="card">
          <h3>Distribución por estado</h3>
          <div className="card-sub">Número de proyectos según estado administrativo</div>
          <div className="chart-wrap tall">
            <Doughnut data={estadoData} options={{
              responsive: true, maintainAspectRatio: false, cutout: "62%",
              plugins: {
                legend: { position: "bottom", labels: { font: { size: 12, weight: 500 }, padding: 14, usePointStyle: true } },
                tooltip: { callbacks: { label: (c) => `${c.label}: ${c.parsed} proyectos` } },
              },
            }} />
          </div>
        </div>
      </div>

      <div className="grid-1">
        <div className="card">
          <h3>Top proyectos por ayuda captada</h3>
          <div className="card-sub">Los 12 proyectos con mayor ayuda captada</div>
          <div className="chart-wrap tall">
            <Bar data={topData} options={{
              indexAxis: "y",
              responsive: true, maintainAspectRatio: false,
              plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => fmtEur(c.parsed.x ?? 0) } } },
              scales: {
                x: { ticks: { callback: (v) => fmtEurShort(v as number), font: { size: 11 } }, grid: { color: "#f1f3f5" } },
                y: { ticks: { font: { size: 11 } }, grid: { display: false } },
              },
            }} />
          </div>
        </div>
      </div>

      <div className="section-title">Listado de proyectos</div>
      <div className="card" style={{ padding: 0, overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th onClick={() => toggleSort("titulo")} className={sortKey === "titulo" ? "sorted" : ""}>Proyecto <span className="sort-ind">{sortInd("titulo")}</span></th>
              <th onClick={() => toggleSort("servicio")} className={sortKey === "servicio" ? "sorted" : ""}>Servicio <span className="sort-ind">{sortInd("servicio")}</span></th>
              <th onClick={() => toggleSort("expediente")} className={sortKey === "expediente" ? "sorted" : ""}>Expediente <span className="sort-ind">{sortInd("expediente")}</span></th>
              <th onClick={() => toggleSort("fechaConc")} className={sortKey === "fechaConc" ? "sorted" : ""}>Fecha concesión <span className="sort-ind">{sortInd("fechaConc")}</span></th>
              <th onClick={() => toggleSort("costeTotal")} className={`num ${sortKey === "costeTotal" ? "sorted" : ""}`}>Presupuesto <span className="sort-ind">{sortInd("costeTotal")}</span></th>
              <th onClick={() => toggleSort("subvencionable")} className={`num ${sortKey === "subvencionable" ? "sorted" : ""}`}>Subv. aprob. <span className="sort-ind">{sortInd("subvencionable")}</span></th>
              <th onClick={() => toggleSort("ayuda")} className={`num ${sortKey === "ayuda" ? "sorted" : ""}`}>Ayuda <span className="sort-ind">{sortInd("ayuda")}</span></th>
              <th onClick={() => toggleSort("ayto")} className={`num ${sortKey === "ayto" ? "sorted" : ""}`}>Aporta Ayto <span className="sort-ind">{sortInd("ayto")}</span></th>
              <th onClick={() => toggleSort("estado")} className={sortKey === "estado" ? "sorted" : ""}>Estado <span className="sort-ind">{sortInd("estado")}</span></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((p, i) => (
              <tr key={i}>
                <td className="proyecto-nombre">{p.titulo}</td>
                <td><span className="servicio-tag">{p.servicio}</span></td>
                <td style={{ fontSize: 11, color: "var(--text-muted)", maxWidth: 140 }}>{p.expediente}</td>
                <td style={{ whiteSpace: "nowrap", fontSize: 12 }}>{p.fechaConc}</td>
                <td className="num">{fmtEur(p.costeTotal)}</td>
                <td className="num">{fmtEur(p.subvencionable)}</td>
                <td className="num" style={{ fontWeight: 600, color: "var(--primary)" }}>{fmtEur(p.ayuda)}</td>
                <td className="num">{fmtEur(p.ayto)}</td>
                <td><span className={`estado-badge ${ESTADO_CLASS[p.estado]}`}>{p.estado}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer>
        Fuente: FONDOS CAPTADOS AREA 202604 (PROYECTOS) · Área de Agenda Digital e Innovación · Ajuntament de València
      </footer>
    </>
  );
}
