export const techniques = [
  {
    id: 'pomodoro',
    name: 'Pomodoro',
    minutes: 25,
    description: 'Un paso a la vez. 25 minutos de atención y después una pausa.',
    tag: 'EL FAVORITO',
    color: 'orange',
  },
  {
    id: 'deep',
    name: 'Trabajo profundo',
    minutes: 50,
    description: 'Espacio para entrar en ritmo y resolver lo que necesita más de ti.',
    tag: 'SIN DISTRACCIONES',
    color: 'purple',
  },
  {
    id: 'quick',
    name: 'Impulso rápido',
    minutes: 15,
    description: 'Empieza pequeño. Un bloque corto para vencer la procrastinación.',
    tag: 'PARA EMPEZAR',
    color: 'green',
  },
] as const;
