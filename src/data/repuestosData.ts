export interface RepuestoItem {
  name: string;
  desc: string;
  img: string;
}

export interface RepuestoCategory {
  title: string;
  subtitle: string;
  heroImage: string;
  overview: string;
  items: RepuestoItem[];
  features: string[];
  ctaTitle?: string;
  ctaHighlight?: string;
  ctaDesc?: string;
  ctaButton?: string;
}

export const repuestosData: Record<string, RepuestoCategory> = {
  "accesorios": {
    title: "Accesorios",
    subtitle: "Aditamentos de alto rendimiento para Maquinaria Pesada",
    heroImage: "/images/repuestos/accesorios.jpg.jpg",
    overview: "Desbloquee el máximo potencial de su Maquinaria Pesada con nuestra selecta línea de accesorios y aditamentos de grado industrial. Proyectados bajo rigurosos estándares OEM, garantizamos una integración impecable que multiplica la versatilidad y eficiencia productiva en las aplicaciones más demandantes de minería, canteras y construcción pesada.",
    items: [
      { name: "Martillos Hidráulicos", desc: "Implementos de percusión de alto impacto para excavadoras de 20 a 80 toneladas.", img: "/images/repuestos/accesorios/1.jpg" },
      { name: "Acoples Rápidos", desc: "Sistemas avanzados de conexión rápida para optimizar el ciclo de cambio de herramientas.", img: "/images/repuestos/accesorios/2.jpg" },
      { name: "Garfios y Pulpos Industriales", desc: "Soluciones de manipulación robustas para chatarra, escollera y manejo de materiales masivos.", img: "/images/repuestos/accesorios/3.jpg" },
      { name: "Rippers y Escarificadores", desc: "Herramientas de penetración profunda para tractores topadores en minería a tajo abierto.", img: "/images/repuestos/accesorios/4.jpg" }
    ],
    features: [
      "Compatibilidad técnica validada para flotas de Maquinaria Pesada multimarca",
      "Cobertura de garantía de fábrica contra defectos de manufactura",
      "Ingeniería de aplicaciones para la selección del aditamento óptimo",
      "Soporte de instalación en campo y calibración de flujos hidráulicos"
    ],
    ctaTitle: "¿Busca aditamentos o",
    ctaHighlight: "Accesorios?",
    ctaDesc: "Consulte compatibilidad técnica y cotización para martillos hidráulicos, acoples rápidos y herramientas para su maquinaria.",
    ctaButton: "Cotizar Accesorios"
  },
  "componentes": {
    title: "Componentes Mayores",
    subtitle: "Sistemas de potencia: Motores, bombas, transmisiones y mandos finales",
    heroImage: "/images/repuestos/componentes.jpg.jpg",
    overview: "Suministramos componentes mayores estratégicos (motores diésel, bombas hidráulicas, transmisiones y mandos finales) bajo pedido y gestión logística ágil, asegurando compatibilidad técnica y calidad garantizada para su maquinaria pesada.",
    items: [
      { name: "Motores Diésel Industriales", desc: "Configuraciones completas y shortblocks certificados para rangos de potencia de 100 a 3500 HP.", img: "/images/repuestos/componentes/1.jpg" },
      { name: "Transmisiones Powershift", desc: "Trenes de potencia reconstruidos con tecnología planetaria y convertidores de alto torque.", img: "/images/repuestos/componentes/2.jpg" },
      { name: "Sistemas Hidráulicos", desc: "Bombas de pistones axiales y motores de traslación con eficiencia volumétrica garantizada.", img: "/images/repuestos/componentes/3.jpg" },
      { name: "Mandos Finales", desc: "Conjuntos reductores planetarios de alta relación para equipos de tracción por orugas.", img: "/images/repuestos/componentes/4.jpg" }
    ],
    features: [
      "Línea completa de repuestos OEM nuevos y componentes de calidad garantizada",
      "Gestión logística para atención oportuna según requerimiento",
      "Control de calidad y pruebas de estanqueidad y funcionamiento",
      "Respaldo de garantía documentada para su inversión"
    ],
    ctaTitle: "¿Requiere un",
    ctaHighlight: "Componente?",
    ctaDesc: "Consulte disponibilidad y tiempos de entrega para motores, bombas hidráulicas, transmisiones y mandos finales.",
    ctaButton: "Cotizar Componentes"
  },
  "elementos-desgaste": {
    title: "Elementos de Desgaste",
    subtitle: "Soluciones de blindaje GET para impacto y abrasión extrema",
    heroImage: "/images/repuestos/elementos-desgaste.jpg",
    overview: "El tren de rodaje y las herramientas de corte (GET) son el primer punto de contacto de su Maquinaria Pesada con el terreno. Proveemos aleaciones metalúrgicas superiores y aceros antidesgaste premium diseñados para resistir la abrasión severa, prolongando dramáticamente la vida útil estructural en operaciones mineras ininterrumpidas.",
    items: [
      { name: "Cuchillas y Cantoneras", desc: "Perfiles de corte templados para equipos de nivelación y empuje de alta producción.", img: "/images/repuestos/elementos-desgaste/1.jpg" },
      { name: "Sistema de Puntas y Adaptadores", desc: "Conjuntos GET de máxima penetración y retención para cucharones de carga y excavación.", img: "/images/repuestos/elementos-desgaste/2.jpg" },
      { name: "Componentes de Tren de Rodaje", desc: "Cadenas selladas y lubricadas, carriles y zapatas de servicio pesado (Heavy Duty).", img: "/images/repuestos/elementos-desgaste/3.jpg" },
      { name: "Aceros Antidesgaste", desc: "Planchas estructurales Hardox para el acorazado de tolvas y equipos de chancado.", img: "/images/repuestos/elementos-desgaste/4.jpg" }
    ],
    features: [
      "Aleaciones con dureza superior (400-600 HB) y resistencia al impacto",
      "Ingeniería de corte térmico y conformado según requerimientos estructurales",
      "Aplicación de soldadura de recubrimiento duro (Hardfacing)",
      "Auditorías en campo (CTS) para medición de desgaste de carrilería"
    ],
    ctaTitle: "¿Cuchillas, puntas o",
    ctaHighlight: "Desgaste?",
    ctaDesc: "Suministro de cuchillas, cantoneras, puntas, zapatas y planchas antidesgaste para proteger sus equipos en obra.",
    ctaButton: "Cotizar Desgaste (GET)"
  },
  "mantenimiento": {
    title: "Repuestos de Mantenimiento",
    subtitle: "Insumos críticos para el Mantenimiento Preventivo certificado",
    heroImage: "/images/repuestos/repuestos-mantenimiento.jpg",
    overview: "El Mantenimiento Preventivo de excelencia exige componentes de precisión. Garantizamos el suministro continuo de filtros de alta eficiencia, sellos de elastómero y fluidos tribológicos que cumplen o exceden las estrictas especificaciones OEM, protegiendo así el corazón de su Maquinaria Pesada.",
    items: [
      { name: "Sistemas de Filtración", desc: "Filtros de aire primarios/secundarios y unidades absolutas para sistemas hidráulicos y diésel.", img: "/images/repuestos/mantenimiento/1.jpg" },
      { name: "Lubricantes Especializados", desc: "Fluidos de formulación sintética y mineral diseñados para altas cargas térmicas y mecánicas.", img: "/images/repuestos/mantenimiento/2.jpg" },
      { name: "Kits de Sellado Hidráulico", desc: "Conjuntos completos de empaquetaduras y O-rings resistentes a altas presiones y desgaste.", img: "/images/repuestos/mantenimiento/3.jpg" },
      { name: "Elementos de Transmisión de Potencia", desc: "Correas trapezoidales de alta resistencia y mangueras hidráulicas trenzadas a medida.", img: "/images/repuestos/mantenimiento/4.jpg" }
    ],
    features: [
      "Inventario estratégico de piezas OEM para el Mantenimiento Preventivo programado",
      "Cadena de suministro ágil para despachos urgentes a nivel nacional",
      "Consolidación de kits de mantenimiento por intervalos de horómetro (PM Kits)",
      "Alianzas corporativas y esquemas de consignación para flotas mayores"
    ],
    ctaTitle: "¿Kits de filtros o",
    ctaHighlight: "Lubricantes?",
    ctaDesc: "Abastecimiento oportuno de filtros de aire, aceite, combustible y sellos hidráulicos para sus servicios programados.",
    ctaButton: "Cotizar Repuestos"
  }
};
