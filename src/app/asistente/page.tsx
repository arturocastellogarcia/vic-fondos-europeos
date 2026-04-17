"use client";
import { useState, useRef, useEffect } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const SUGERENCIAS = [
  "¿Cuál es el total de ayuda europea captada en la legislatura actual?",
  "¿Qué 5 proyectos tienen mayor ayuda captada y a qué servicio pertenecen?",
  "¿Cuántos proyectos gestiona VIC y cuál es su volumen total de ayuda?",
  "Lista los proyectos del programa Horizon Europe con su importe",
  "¿Qué proyectos están pendientes de aprobación y cuánto suman?",
  "¿Qué servicio tiene mejor ratio de cofinanciación europea (menor % Ayto)?",
  "Dame los proyectos FEDER y sus fechas de concesión",
  "¿Qué proyectos se concedieron en 2025?",
  "Compara VIC vs OCI en número y volumen de proyectos",
  "¿Cuál es el proyecto más grande por coste total y qué estado tiene?",
];

function renderMarkdown(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

export default function AsistentePage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    const newMessages: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      if (data.error) {
        setMessages([...newMessages, { role: "assistant", content: `Error: ${data.error}` }]);
      } else {
        setMessages([...newMessages, { role: "assistant", content: data.text }]);
      }
    } catch (e) {
      setMessages([...newMessages, { role: "assistant", content: "Error de red al contactar con el asistente." }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  return (
    <div className="chat-wrap">
      <div className="section-title">Asistente IA sobre los proyectos</div>
      <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 20 }}>
        Pregunta en lenguaje natural sobre la cartera de 38 proyectos europeos del Área. El asistente tiene acceso a todos los datos:
        importes, fechas, servicios, estados y programas europeos.
      </p>

      {messages.length === 0 && (
        <>
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>
            Sugerencias de preguntas
          </div>
          <div className="suggestions">
            {SUGERENCIAS.map((s, i) => (
              <button key={i} className="suggestion" onClick={() => send(s)}>
                {s}
              </button>
            ))}
          </div>
        </>
      )}

      {messages.length > 0 && (
        <div className="chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.role}`}>
              <div className="msg-avatar">{m.role === "user" ? "Tú" : "IA"}</div>
              <div className="msg-content" dangerouslySetInnerHTML={{ __html: renderMarkdown(m.content) }} />
            </div>
          ))}
          {loading && (
            <div className="msg assistant">
              <div className="msg-avatar">IA</div>
              <div className="msg-content">
                <span className="typing"><span></span><span></span><span></span></span>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>
      )}

      <div className="chat-input-wrap">
        <textarea
          className="chat-input"
          placeholder="Pregunta lo que quieras sobre los proyectos..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          rows={1}
          disabled={loading}
        />
        <button className="chat-send" onClick={() => send(input)} disabled={loading || !input.trim()}>
          {loading ? "..." : "Enviar"}
        </button>
      </div>

      {messages.length > 0 && (
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <button className="pill" onClick={() => setMessages([])}>Nueva conversación</button>
        </div>
      )}
    </div>
  );
}
