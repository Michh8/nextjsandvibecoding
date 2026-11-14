# FocusLab · Tu espacio para avanzar

Aplicación para organizar tareas y sesiones de estudio, creada con Next.js 16, React 19, TypeScript y App Router mediante Vibe Coding con Codex.

## Instalación y uso

Requiere Node.js >=20.9 y npm.

```bash
git clone https://github.com/Michh8/nextjsandvibecoding.git
cd nextjsandvibecoding
npm ci
```

Copia `.env.example` a `.env.local` (`Copy-Item .env.example .env.local` en PowerShell). No necesitas claves de API. Después ejecuta `npm run dev` y abre http://localhost:3000.

```bash
npm run typecheck
npm run lint
npm run build
npm start
```

## Funcionalidades y arquitectura

| Ruta            | Función                                               |
| --------------- | ----------------------------------------------------- |
| `/`             | Panel de tareas y métricas reales                     |
| `/tareas`       | Crear, completar, eliminar, buscar y filtrar tareas   |
| `/enfoque`      | Temporizador de 15, 25 o 50 minutos, pausa y reinicio |
| `/estadisticas` | Gráfico semanal, métricas y exportación JSON          |
| `/guia`         | Guía de uso y privacidad                              |
| `/api/tecnicas` | GET con catálogo de técnicas en `{ data: [...] }`     |

`src/app` contiene páginas y layout del servidor. `src/components` contiene componentes cliente con useState, useEffect y contexto. La página de enfoque consume el Route Handler con fetch, cancelación, carga y reintento. El framework tiene `loading.tsx`, `error.tsx` y `not-found.tsx`. CSS responsive y etiquetas accesibles permiten usar la aplicación en móvil y escritorio.

Los datos permanecen en localStorage del navegador, sin cuentas ni sincronización. Borrar el almacenamiento elimina el progreso. La descarga JSON es una copia de consulta, no una función de restauración. El temporizador debe mantenerse en la página de enfoque; salir o recargar descarta la sesión en curso. Solo las sesiones completas se registran.

## Variables

`.env.example` documenta `NEXT_PUBLIC_APP_NAME`, una etiqueta pública opcional. Los secretos futuros deben ir en `.env.local`, ignorado por Git. No hay servicios externos obligatorios. Las fuentes de Google tienen fuentes de sistema de respaldo.

## Validación y despliegue

**Aplicación pública:** https://nextjsandvibecoding.vercel.app

Validado el 14 de noviembre de 2026:

- `npm ci`: instalación limpia desde el lockfile.
- `npm run typecheck`, `npm run lint` y `npm run build`: correctos.
- `npm audit --omit=dev`: cero vulnerabilidades en dependencias de producción. El árbol de herramientas de desarrollo reportó ocho avisos moderados; no se aplicaron actualizaciones forzadas.
- `node scripts/smoke.mjs https://nextjsandvibecoding.vercel.app`: cinco páginas con HTTP 200, contrato JSON de API y HTTP 404 correctos.
- Navegador real en producción: creación y finalización de tarea, persistencia tras recarga, estadísticas de tareas, selección de técnica, inicio, pausa y reinicio del temporizador.
- Revisión visual del temporizador en viewport móvil de 390 × 844. No se esperó una sesión completa de 15 minutos ni se verificó la descarga JSON en navegador.

Se recomienda Node.js 22 para desarrollo y CI. Node 20.16 ejecutó las comprobaciones locales, pero una dependencia de lint recomienda >=20.19. La automatización `.github/workflows/ci.yml` ejecuta lint, tipos y build con Node 22 en cada push.

Para desplegar, importa el repositorio en Vercel, selecciona Next.js y conserva los comandos predeterminados. No requiere base de datos ni secretos. También puedes ejecutar `vercel --prod` con una sesión autenticada.

Prueba manual: crear una tarea, buscarla, completarla y recargar para verificar persistencia; iniciar, pausar y reiniciar el temporizador; revisar el gráfico y la descarga; comprobar la navegación móvil y el JSON de `/api/tecnicas`.

Consulta [VIBE_CODING.md](VIBE_CODING.md) para el proceso y `git log --oneline` para las etapas reales de desarrollo.
