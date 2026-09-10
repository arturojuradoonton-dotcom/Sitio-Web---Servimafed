export interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  alignment: 'left' | 'center' | 'right';
}

export const slides: HeroSlide[] = [
  {
    image: '/images/inicio/slider-1.jpg',
    title: 'Gestión de Flota',
    subtitle: 'DISPONIBILIDAD MECÁNICA Y CONFIABILIDAD',
    description: 'Maximizamos el tiempo operativo de su flota con planes de mantenimiento que reducen fallas y tiempos de reparación.',
    alignment: 'left'
  },
  {
    image: '/images/inicio/slider-2.jpg',
    title: 'Motores Diésel',
    subtitle: 'RENDIMIENTO INDUSTRIAL',
    description: 'Overhaul completo, calibración de inyección y pruebas de potencia para garantizar operaciones sin interrupciones.',
    alignment: 'center'
  },
  {
    image: '/images/inicio/slider-3.jpg',
    title: 'Mecánica Estructural',
    subtitle: 'SOLDADURA Y REFORZAMIENTO',
    description: 'Recuperación de chasis, baldes y estructuras metálicas bajo estrictos estándares internacionales de soldadura.',
    alignment: 'right'
  }
];
