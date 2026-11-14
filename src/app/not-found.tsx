import Link from 'next/link';
export default function NotFound() {
  return (
    <section className="card">
      <div className="eyebrow">404</div>
      <h1>Este camino no existe.</h1>
      <p>Tu próximo paso te espera en el inicio.</p>
      <Link className="button" href="/">
        Volver al inicio
      </Link>
    </section>
  );
}
