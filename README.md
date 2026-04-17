# VIC · Fondos Europeos Captados

Dashboard de seguimiento de proyectos financiados con fondos europeos del Área de Agenda Digital e Innovación del Ajuntament de València.

## Stack

- Next.js 15 (App Router)
- Chart.js + react-chartjs-2
- Claude API (módulo IA)
- Desplegado en Vercel

## Secciones

- `/` — Dashboard con KPIs, filtros y tabla completa
- `/graficos` — Análisis visual ampliado (timeline, scatter, por programa europeo)
- `/asistente` — Chat con IA sobre los proyectos

## Desarrollo

```bash
npm install
cp .env.example .env.local   # añade tu ANTHROPIC_API_KEY
npm run dev
```
