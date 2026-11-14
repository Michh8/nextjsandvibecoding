'use client';
import { useStudy } from './study-provider';
import { Download } from 'lucide-react';
export function Statistics() {
  const { store, ready } = useStudy();
  const completed = store.tasks.filter((t) => t.done).length;
  const minutes = store.sessions.reduce((sum, s) => sum + s.minutes, 0);
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - 6 + i);
    const key = date.toLocaleDateString('en-CA');
    return {
      label: date.toLocaleDateString('es', { weekday: 'short' }),
      minutes: store.sessions
        .filter((s) => new Date(s.date).toLocaleDateString('en-CA') === key)
        .reduce((n, s) => n + s.minutes, 0),
    };
  });
  const max = Math.max(...days.map((d) => d.minutes), 1);
  function download() {
    const blob = new Blob([JSON.stringify(store, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'focuslab-progreso.json';
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">CADA PASO CUENTA</div>
          <h1>
            Mira cuánto
            <br />
            <em>has avanzado.</em>
          </h1>
          <p className="lead">Tu esfuerzo tiene forma. Este es tu progreso.</p>
        </div>
        <button className="button outline" disabled={!ready} onClick={download}>
          <Download size={18} /> Descargar datos
        </button>
      </div>
      {!ready ? (
        <p role="status">Cargando tu progreso…</p>
      ) : (
        <>
          <div className="stats-grid">
            <div className="card metric">
              <p>Tiempo de enfoque</p>
              <strong>
                {minutes}
                <small> min</small>
              </strong>
            </div>
            <div className="card metric">
              <p>Sesiones completadas</p>
              <strong>{store.sessions.length}</strong>
            </div>
            <div className="card metric">
              <p>Tareas terminadas</p>
              <strong>
                {completed}
                <small> / {store.tasks.length}</small>
              </strong>
            </div>
          </div>
          <section className="card chart-card">
            <div className="section-heading">
              <div>
                <h2>Tu enfoque esta semana</h2>
                <p>Minutos por día · últimos 7 días</p>
              </div>
              <span className="pill">✦ Sigue a tu ritmo</span>
            </div>
            <div
              className="chart"
              role="img"
              aria-label={days.map((d) => `${d.label}: ${d.minutes} minutos`).join(', ')}
            >
              {days.map((d, i) => (
                <div className="chart-column" key={i}>
                  <span>{d.minutes}</span>
                  <div className="bar-track">
                    <div className="bar" style={{ height: `${(d.minutes / max) * 100}%` }} />
                  </div>
                  <small>{d.label}</small>
                </div>
              ))}
            </div>
            {!store.sessions.length && (
              <p className="subtle">
                Completa tu primera sesión de enfoque para ver tu actividad aquí.
              </p>
            )}
          </section>
          <section className="card">
            <h2>Tu lista, en perspectiva</h2>
            <p>
              {completed} de {store.tasks.length} tareas completadas
            </p>
            <progress
              max={Math.max(store.tasks.length, 1)}
              value={completed}
              aria-label="Progreso de tareas"
            />
            <p className="subtle">
              {store.tasks.length === 0
                ? 'Cada gran proyecto empieza con una primera tarea.'
                : completed === store.tasks.length
                  ? 'Todo al día. Date un momento para celebrarlo.'
                  : 'Los pequeños avances también son avances.'}
            </p>
          </section>
        </>
      )}
    </>
  );
}
