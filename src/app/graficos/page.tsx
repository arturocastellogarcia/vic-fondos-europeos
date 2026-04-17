"use client";
import { useMemo } from "react";
import { Bar, Doughnut, Scatter, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { PROYECTOS, SERVICIO_COLORS, PROGRAMA_COLORS, fmtEur, fmtEurShort } from "@/lib/projects";

ChartJS.register(
  CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend, TimeScale
);

function parseFecha(s: string): Date | null {
  if (!s || s === "—" || s === "tbc") return null;
  const m = s.match(/(\d{1,2})[/](\d{1,2})[/](\d{4})/);
  if (!m) return null;
  return new Date(parseInt(m[3]), parseInt(m[2]) - 1, parseInt(m[1]));
}

export default function GraficosPage() {
  // 1) Timeline concesiones por año-mes
  const timeline = useMemo(() => {
    const byMonth: Record<string, number> = {};
    PROYECTOS.forEach((p) => {
      const firstDate = p.fechaConc.split("·")[0].trim();
      const d = parseFecha(firstDate);
      if (!d) return;
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      byMonth[key] = (byMonth[key] || 0) + p.ayuda;
    });
    const sorted = Object.entries(byMonth).sort((a, b) => a[0].localeCompare(b[0]));
    let acc = 0;
    const accData = sorted.map((e) => (acc += e[1], acc));
    return {
      labels: sorted.map((e) => e[0]),
      datasets: [
        {
          type: "bar" as const,
          label: "Ayuda concedida (mes)",
          data: sorted.map((e) => e[1]),
          backgroundColor: "#0ea5e9",
          borderRadius: 4,
          yAxisID: "y",
        },
        {
          type: "line" as const,
          label: "Acumulado",
          data: accData,
          borderColor: "#C8102E",
          backgroundColor: "rgba(200,16,46,0.1)",
          tension: 0.3,
          pointRadius: 4,
          pointBackgroundColor: "#C8102E",
          fill: true,
          yAxisID: "y",
        },
      ],
    };
  }, []);

  // 2) Scatter coste vs ayuda
  const scatter = useMemo(() => {
    const groups: Record<string, { x: number; y: number; label: string }[]> = {};
    PROYECTOS.forEach((p) => {
      if (!groups[p.servicio]) groups[p.servicio] = [];
      groups[p.servicio].push({ x: p.costeTotal, y: p.ayuda, label: p.titulo });
    });
    return {
      datasets: Object.entries(groups).map(([serv, points]) => ({
        label: serv,
        data: points,
        backgroundColor: SERVICIO_COLORS[serv] || "#94a3b8",
        pointRadius: 6,
        pointHoverRadius: 9,
      })),
    };
  }, []);

  // 3) Ayuda por programa europeo
  const programaData = useMemo(() => {
    const by: Record<string, number> = {};
    PROYECTOS.forEach((p) => { by[p.programa] = (by[p.programa] || 0) + p.ayuda; });
    const entries = Object.entries(by).sort((a, b) => b[1] - a[1]);
    return {
      labels: entries.map((e) => e[0]),
      datasets: [{
        data: entries.map((e) => e[1]),
        backgroundColor: entries.map((e) => PROGRAMA_COLORS[e[0]] || "#94a3b8"),
        borderRadius: 4,
        barThickness: 18,
      }],
    };
  }, []);

  // 4) Cofinanciación media por servicio (% coste asumido por Ayto)
  const cofinanciacion = useMemo(() => {
    const by: Record<string, { coste: number; ayto: number }> = {};
    PROYECTOS.forEach((p) => {
      if (!by[p.servicio]) by[p.servicio] = { coste: 0, ayto: 0 };
      by[p.servicio].coste += p.costeTotal;
      by[p.servicio].ayto += p.ayto;
    });
    const entries = Object.entries(by)
      .map(([s, v]) => ({ s, pct: v.coste > 0 ? (v.ayto / v.coste) * 100 : 0, ayto: v.ayto, coste: v.coste }))
      .sort((a, b) => b.pct - a.pct);
    return {
      labels: entries.map((e) => e.s),
      datasets: [{
        label: "% cofinanciación Ayto",
        data: entries.map((e) => e.pct),
        backgroundColor: entries.map((e) => SERVICIO_COLORS[e.s] || "#94a3b8"),
        borderRadius: 4,
        barThickness: 30,
      }],
      raw: entries,
    };
  }, []);

  // 5) Stack: ayuda vs ayto por servicio
  const stack = useMemo(() => {
    const by: Record<string, { ayuda: number; ayto: number }> = {};
    PROYECTOS.forEach((p) => {
      if (!by[p.servicio]) by[p.servicio] = { ayuda: 0, ayto: 0 };
      by[p.servicio].ayuda += p.ayuda;
      by[p.servicio].ayto += p.ayto;
    });
    const entries = Object.entries(by).sort((a, b) => (b[1].ayuda + b[1].ayto) - (a[1].ayuda + a[1].ayto));
    return {
      labels: entries.map((e) => e[0]),
      datasets: [
        { label: "Ayuda europea", data: entries.map((e) => e[1].ayuda), backgroundColor: "#1e3a8a", borderRadius: 4 },
        { label: "Aporta Ayto", data: entries.map((e) => e[1].ayto), backgroundColor: "#f59e0b", borderRadius: 4 },
      ],
    };
  }, []);

  // 6) Distribución tamaño proyecto
  const tamanyo = useMemo(() => {
    const buckets = { "< 100K": 0, "100K-500K": 0, "500K-1M": 0, "1M-3M": 0, "> 3M": 0 };
    PROYECTOS.forEach((p) => {
      const c = p.costeTotal;
      if (c < 100_000) buckets["< 100K"]++;
      else if (c < 500_000) buckets["100K-500K"]++;
      else if (c < 1_000_000) buckets["500K-1M"]++;
      else if (c < 3_000_000) buckets["1M-3M"]++;
      else buckets["> 3M"]++;
    });
    return {
      labels: Object.keys(buckets),
      datasets: [{
        data: Object.values(buckets),
        backgroundColor: ["#0ea5e9", "#10b981", "#f59e0b", "#C8102E", "#1e3a8a"],
        borderWidth: 3,
        borderColor: "#fff",
      }],
    };
  }, []);

  return (
    <>
      <div className="section-title">Análisis visual ampliado</div>
      <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 20, maxWidth: 800 }}>
        Seis visualizaciones complementarias para analizar la cartera desde ángulos distintos: temporal, eficiencia de captación, programas europeos y perfil financiero.
      </p>

      <div className="grid-1">
        <div className="card">
          <h3>Línea temporal de concesiones</h3>
          <div className="card-sub">Ayuda concedida mensual y acumulado · basado en proyectos con fecha de concesión registrada</div>
          <div className="chart-wrap xtall">
            <Bar data={timeline as never} options={{
              responsive: true, maintainAspectRatio: false,
              plugins: {
                legend: { position: "top", labels: { font: { size: 12 }, usePointStyle: true } },
                tooltip: { callbacks: { label: (c) => `${c.dataset.label}: ${fmtEur(c.parsed.y ?? 0)}` } },
              },
              scales: {
                x: { ticks: { font: { size: 11 } } },
                y: { ticks: { callback: (v) => fmtEurShort(v as number), font: { size: 11 } } },
              },
            }} />
          </div>
        </div>
      </div>

      <div className="grid-2-even">
        <div className="card">
          <h3>Ayuda por programa europeo</h3>
          <div className="card-sub">Captación agrupada por línea de financiación (FEDER, Horizon, Digital Europe, etc.)</div>
          <div className="chart-wrap xtall">
            <Bar data={programaData} options={{
              indexAxis: "y",
              responsive: true, maintainAspectRatio: false,
              plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => fmtEur(c.parsed.x ?? 0) } } },
              scales: {
                x: { ticks: { callback: (v) => fmtEurShort(v as number), font: { size: 11 } } },
                y: { ticks: { font: { size: 11 } }, grid: { display: false } },
              },
            }} />
          </div>
        </div>

        <div className="card">
          <h3>Distribución por tamaño de proyecto</h3>
          <div className="card-sub">Número de proyectos por rango de coste total</div>
          <div className="chart-wrap xtall">
            <Doughnut data={tamanyo} options={{
              responsive: true, maintainAspectRatio: false, cutout: "55%",
              plugins: {
                legend: { position: "bottom", labels: { font: { size: 12 }, padding: 12, usePointStyle: true } },
                tooltip: { callbacks: { label: (c) => `${c.label}: ${c.parsed} proyectos` } },
              },
            }} />
          </div>
        </div>
      </div>

      <div className="grid-2-even">
        <div className="card">
          <h3>Coste total vs. ayuda captada</h3>
          <div className="card-sub">Cada punto es un proyecto · diagonal implícita = 100% financiado · por debajo = cofinanciación municipal</div>
          <div className="chart-wrap tall">
            <Scatter data={scatter} options={{
              responsive: true, maintainAspectRatio: false,
              plugins: {
                legend: { position: "bottom", labels: { font: { size: 11 }, usePointStyle: true, padding: 10 } },
                tooltip: {
                  callbacks: {
                    label: (c) => {
                      const p = (c.raw as { label: string; x: number; y: number });
                      return [`${p.label}`, `Coste: ${fmtEur(p.x)}`, `Ayuda: ${fmtEur(p.y)}`];
                    },
                  },
                },
              },
              scales: {
                x: { title: { display: true, text: "Coste total (€)", font: { size: 11 } }, ticks: { callback: (v) => fmtEurShort(v as number), font: { size: 10 } } },
                y: { title: { display: true, text: "Ayuda captada (€)", font: { size: 11 } }, ticks: { callback: (v) => fmtEurShort(v as number), font: { size: 10 } } },
              },
            }} />
          </div>
        </div>

        <div className="card">
          <h3>% cofinanciación municipal por servicio</h3>
          <div className="card-sub">Porcentaje del coste total asumido por el Ayuntamiento (menor % = mejor ratio de captación)</div>
          <div className="chart-wrap tall">
            <Bar data={cofinanciacion} options={{
              responsive: true, maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: {
                  callbacks: {
                    label: (c) => `${(c.parsed.y ?? 0).toFixed(1)}% (${fmtEur((cofinanciacion.raw[c.dataIndex] as { ayto: number }).ayto)} de ${fmtEur((cofinanciacion.raw[c.dataIndex] as { coste: number }).coste)})`,
                  },
                },
              },
              scales: {
                x: { ticks: { font: { size: 11 } } },
                y: { ticks: { callback: (v) => `${v}%`, font: { size: 11 } }, max: 100 },
              },
            }} />
          </div>
        </div>
      </div>

      <div className="grid-1">
        <div className="card">
          <h3>Composición financiera por servicio</h3>
          <div className="card-sub">Ayuda europea vs. aportación municipal · apilado</div>
          <div className="chart-wrap tall">
            <Bar data={stack} options={{
              responsive: true, maintainAspectRatio: false,
              plugins: {
                legend: { position: "top", labels: { usePointStyle: true, font: { size: 12 } } },
                tooltip: { callbacks: { label: (c) => `${c.dataset.label}: ${fmtEur(c.parsed.y ?? 0)}` } },
              },
              scales: {
                x: { stacked: true, ticks: { font: { size: 11 } } },
                y: { stacked: true, ticks: { callback: (v) => fmtEurShort(v as number), font: { size: 11 } } },
              },
            }} />
          </div>
        </div>
      </div>

      <footer>
        {PROYECTOS.length} proyectos analizados · Fuente: FONDOS CAPTADOS AREA 202604 · Ajuntament de València
      </footer>
    </>
  );
}
