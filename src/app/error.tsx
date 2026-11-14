'use client';
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="card">
      <h1>Algo no salió como esperábamos</h1>
      <p>Vuelve a intentar cargar tu espacio.</p>
      <button className="button" onClick={reset}>
        Intentar de nuevo
      </button>
    </section>
  );
}
