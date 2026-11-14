export const metadata = { title: 'Guía de estudio' };
export default function Page() {
  return (
    <>
      <div className="eyebrow">APRENDE A TU RITMO</div>
      <h1>
        Pequeños hábitos.
        <br />
        Grandes resultados.
      </h1>
      <p className="lead">No necesitas hacerlo todo hoy. Solo dar el siguiente paso.</p>
      <div className="guide-grid">
        {[
          [
            '01',
            'Vacía tu mente',
            'Añade tus pendientes en Mis tareas. Divide los proyectos grandes en acciones pequeñas y elige una prioridad.',
          ],
          [
            '02',
            'Protege tu atención',
            'Abre Enfoque y elige un intervalo. Silencia las notificaciones y dedícate a una sola cosa hasta terminar.',
          ],
          [
            '03',
            'Descansa de verdad',
            'Al terminar, levántate, toma agua y aparta la vista de la pantalla. El descanso también es parte del proceso.',
          ],
          [
            '04',
            'Mira lo que avanzaste',
            'Consulta Mi progreso para ver tus sesiones y tareas completadas. Ajusta tus objetivos a tu energía.',
          ],
        ].map(([n, t, d]) => (
          <article className="card" key={n}>
            <span className="step">{n}</span>
            <h2>{t}</h2>
            <p>{d}</p>
          </article>
        ))}
      </div>
      <section className="card privacy">
        <h2>Tu espacio, tus datos</h2>
        <p>
          FocusLab guarda tareas y sesiones en este navegador usando localStorage. No requiere
          cuenta, no sincroniza entre dispositivos y no envía tus tareas a un servidor. Si borras
          los datos del navegador, perderás tu progreso. Puedes descargar una copia desde Mi
          progreso.
        </p>
      </section>
    </>
  );
}
