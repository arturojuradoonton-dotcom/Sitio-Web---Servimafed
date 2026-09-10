export interface NavigationItem {
  name: string;
  href: string;
  img: string;
  desc: string;
}

export const serviciosDropdown: NavigationItem[] = [
  { name: "Gestión de Flota", href: "/servicios/gestion-flota", img: "/images/menu/servicio-gestion.jpg.jpg", desc: "Disponibilidad mecánica y confiabilidad" },
  { name: "Mantenimiento Preventivo", href: "/servicios/mantenimiento-preventivo", img: "/images/menu/servicio-mantenimiento.jpg.jpg", desc: "Planes por horómetro" },
  { name: "Reparación de Componentes", href: "/servicios/reparacion-componentes", img: "/images/menu/servicio-reparacion.jpg.jpg", desc: "Overhaul de motores y bombas" },
  { name: "Mecanizado y Soldadura", href: "/servicios/mecanizado-soldadura", img: "/images/menu/servicio-soldadura.jpg.jpg", desc: "Reforzamiento estructural certificado" },
  { name: "Evaluación y Diagnóstico", href: "/servicios/evaluacion-diagnostico", img: "/images/menu/servicio-evaluacion.jpg.jpg", desc: "Escaneo electrónico avanzado" }
];

export const repuestosDropdown: NavigationItem[] = [
  { name: "Accesorios", href: "/repuestos/accesorios", img: "/images/menu/repuestos-accesorios.jpg.jpg", desc: "Aditamentos y acoples especializados" },
  { name: "Componentes", href: "/repuestos/componentes", img: "/images/menu/repuesto-componentes.jpg.jpg", desc: "Motores, bombas y transmisiones" },
  { name: "Elementos de Desgaste", href: "/repuestos/elementos-desgaste", img: "/images/menu/repuesto-elementos-desgaste.jpg", desc: "Cuchillas, puntas, zapatas y rodillos" },
  { name: "Repuestos de Mantenimiento", href: "/repuestos/mantenimiento", img: "/images/menu/repuesto-mantenimiento.jpg.jpg", desc: "Filtros, sellos, correas y lubricantes" }
];
