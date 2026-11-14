import type { Metadata } from 'next';
import './globals.css';
import { Shell } from '@/components/shell';
import { StudyProvider } from '@/components/study-provider';
export const metadata: Metadata = {
  title: { default: 'FocusLab · Tu espacio para avanzar', template: '%s · FocusLab' },
  description:
    'Organiza tus tareas, enfócate y celebra tu progreso. Un espacio de estudio sin distracciones.',
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <StudyProvider>
          <Shell>{children}</Shell>
        </StudyProvider>
      </body>
    </html>
  );
}
