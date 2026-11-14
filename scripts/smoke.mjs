import assert from 'node:assert/strict';

const base = process.argv[2] || 'http://localhost:3000';
for (const route of ['/', '/tareas', '/enfoque', '/estadisticas', '/guia']) {
  const response = await fetch(new URL(route, base));
  assert.equal(response.status, 200, `${route} debe responder 200`);
  assert.match(await response.text(), /<h1[ >]/, `${route} debe mostrar un título`);
  console.log(`OK ${route}`);
}
const api = await fetch(new URL('/api/tecnicas', base));
assert.equal(api.status, 200);
const { data } = await api.json();
assert.equal(data.length, 3);
assert.deepEqual(
  data.map((item) => item.minutes).sort((a, b) => a - b),
  [15, 25, 50],
);
assert.equal(new Set(data.map((item) => item.id)).size, 3);
assert.ok(data.every((item) => typeof item.description === 'string'));
console.log('OK API: catálogo completo, intervalos válidos e identificadores únicos');
assert.equal((await fetch(new URL('/ruta-inexistente', base))).status, 404);
console.log('OK 404');
