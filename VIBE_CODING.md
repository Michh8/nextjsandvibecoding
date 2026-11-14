# Proceso de Vibe Coding — FocusLab

## Solicitud inicial y herramienta

El usuario entregó la consigna completa y pidió: «puedes hacer este proyecto completo con todo y commits y pushearlo». Asistente utilizado: Codex. El usuario definió los requisitos académicos; el asistente propuso la temática FocusLab y generó la implementación. No se atribuyen al estudiante revisiones que no realizó.

## Iteraciones realizadas

1. Revisar el repositorio vacío, elegir un organizador personal y crear la estructura Next.js 16 con TypeScript.
2. Separar páginas y layout del servidor de componentes interactivos cliente. Crear cinco rutas y el Route Handler `/api/tecnicas`.
3. Implementar tareas con filtros, prioridades y persistencia; validar la estructura recuperada de localStorage y avisar si el navegador no permite guardar.
4. Añadir temporizador con tres técnicas, pausa, reinicio y registro único al completar. Usar una fecha límite absoluta para reducir la deriva del intervalo.
5. Añadir métricas reales, gráfico semanal y exportación JSON. No simular datos personales.
6. Crear diseño responsive, navegación accesible, estados de carga y error, cancelación de fetch y reintento.
7. Ejecutar comprobaciones, corregir problemas observados, documentar y registrar commits de las etapas reales.

## Prompts e instrucciones de implementación

El prompt principal fue la consigna original del usuario. Estas instrucciones reproducibles sintetizan las decisiones que guiaron la generación del asistente; no son mensajes adicionales enviados por el estudiante:

- «Construye un organizador de estudio con App Router, TypeScript y cinco páginas. Mantén los datos en el navegador y consume un catálogo mediante una API interna».
- «Separa Server Components y Client Components; usa contexto con useState/useEffect y valida datos persistidos antes de usarlos».
- «Implementa un temporizador con pausa y reinicio, y registra únicamente sesiones completas sin duplicarlas».
- «Crea una interfaz responsive con indicadores reales, formularios accesibles y estados de carga y error».
- «Valida TypeScript, lint y compilación; documenta límites y despliegue sin inventar resultados».

## Decisiones técnicas

- API interna para cumplir el requisito sin depender de claves externas.
- Persistencia local adecuada para una herramienta personal sin autenticación; no sincroniza entre dispositivos.
- CSS propio con media queries; Tailwind y CSS Modules eran recomendaciones de la actividad.
- Exportación JSON para consultar una copia del progreso. No existe importación.
- Páginas de contenido y layout del servidor, componentes de interacción del cliente.
- Variables de entorno opcionales y archivos sensibles excluidos de Git.
- Mantener abierta la página del temporizador: no se promete continuidad tras navegar o recargar.

## Desafíos y revisión

La instalación y Vercel presentaron errores de certificados HTTPS. Se inspeccionaron los registros y se preparó un paquete temporal de certificados de confianza de Windows para `NODE_EXTRA_CA_CERTS`, conservando la verificación TLS. Vercel también informó que la credencial configurada no era válida; publicar requiere una cuenta autenticada.

La autenticación de Vercel se renovó y el despliegue terminó correctamente. La instalación inicial dejó archivos incompletos y se reparó con una instalación limpia `npm ci`. ESLint detectó actualizaciones de estado en efectos de hidratación: se documentaron dos excepciones locales para sincronizar con almacenamiento externo después del renderizado del servidor, conservando el resto de las reglas. También se protegió la validación frente a entradas nulas.

Las comprobaciones ejecutadas y el resultado final se documentan en README.md. Los commits son del trabajo real de esta sesión; no se retrofechan para simular trabajo dentro del plazo académico.
