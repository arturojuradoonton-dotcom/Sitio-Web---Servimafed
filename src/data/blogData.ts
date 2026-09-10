export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  img: string;
  date: string;
  dateISO: string;
  author: string;
  category: string;
  tags: string[];
}

export const blogCategories = [
  "Mantenimiento",
  "Estructural",
  "Componentes",
  "Minería",
  "Tecnología",
  "Normativa",
  "Industria",
] as const;

export const blogPosts: BlogPost[] = [
  // ── 2026 ──────────────────────────────────────────────
  {
    slug: "tendencias-mantenimiento-predictivo-analisis-aceite",
    title: "Tendencias en el Mantenimiento Predictivo con Análisis de Aceite",
    excerpt:
      "Cómo el análisis de fluidos S.O.S. y la telemetría previenen fallas catastróficas en motores diésel de alta potencia.",
    content: [
      "El mantenimiento predictivo ha revolucionado la forma en que las operaciones mineras y de construcción gestionan sus flotas de maquinaria pesada. En el centro de esta transformación se encuentra el análisis de aceite, una herramienta de diagnóstico que permite anticipar fallas antes de que se conviertan en paradas no programadas costosas.",
      "El programa S.O.S. (Scheduled Oil Sampling) de Caterpillar, por ejemplo, permite monitorear el estado interno de motores, transmisiones y sistemas hidráulicos mediante el análisis periódico de muestras de fluidos. Cada muestra revela información crítica sobre niveles de desgaste metálico, contaminación por partículas, dilución de combustible y degradación del lubricante.",
      "En SERVIMAFED implementamos protocolos de muestreo alineados con las recomendaciones OEM de cada fabricante. Nuestros técnicos de campo recolectan muestras en intervalos definidos por horómetro y las enviamos a laboratorios certificados para su análisis espectrométrico. Los resultados se integran a nuestro sistema ERP Axentra, donde el cliente puede visualizar tendencias históricas y recibir alertas automáticas cuando los valores superan los umbrales críticos.",
      "Entre los beneficios más destacados del análisis predictivo de aceite se encuentran: la reducción de hasta un 40% en costos de reparaciones mayores, la extensión de la vida útil de componentes críticos como camisas, pistones y cojinetes, y la optimización de los intervalos de cambio de aceite basados en condición real en lugar de intervalos fijos.",
      "La integración de sensores de telemetría en tiempo real con plataformas de análisis de datos está llevando el mantenimiento predictivo al siguiente nivel. Sistemas como Cat Product Link y Komatsu KOMTRAX transmiten datos operativos continuamente, permitiendo detectar anomalías en temperatura, presión y vibración que, combinados con el historial de análisis de aceite, ofrecen un panorama completo del estado de salud de cada equipo.",
    ],
    img: "/images/blog/1.jpg",
    date: "15 May, 2026",
    dateISO: "2026-05-15",
    author: "Departamento Técnico",
    category: "Mantenimiento",
    tags: ["Análisis de aceite", "Mantenimiento predictivo", "S.O.S.", "Motores diésel"],
  },
  {
    slug: "reconstruccion-estructural-cucharones-tolvas",
    title: "Reconstrucción Estructural Pesada de Cucharones y Tolvas",
    excerpt:
      "Detalles del proceso de soldadura certificada y revestimiento técnico con aceros de alta resistencia a la abrasión.",
    content: [
      "Los cucharones y tolvas de equipos de movimiento de tierras están sometidos a condiciones extremas de abrasión, impacto y fatiga estructural. La reconstrucción de estos componentes requiere un enfoque de ingeniería que combine soldadura especializada, selección precisa de materiales y control de calidad riguroso.",
      "En nuestro taller de SERVIMAFED, el proceso de reconstrucción comienza con una evaluación dimensional completa del componente. Utilizamos equipos de medición láser para identificar deformaciones, fisuras y zonas de desgaste crítico. Esta información se documenta en un informe técnico que sirve como línea base para el plan de reparación.",
      "La soldadura estructural pesada se realiza bajo procedimientos calificados (WPS) con soldadores certificados según normas AWS D1.1 y D14.3. Para cucharones de excavadoras y cargadores, empleamos procesos FCAW y SMAW con electrodos de alta resistencia que garantizan uniones con propiedades mecánicas superiores a las del material base.",
      "El revestimiento de zonas de alto desgaste se ejecuta con planchas de acero antidesgaste de dureza controlada (400-500 HBW). Estas planchas se fijan mediante soldadura y pernos de anclaje, creando una barrera sacrificial que protege la estructura principal y extiende significativamente la vida útil del componente.",
      "Cada reconstrucción finaliza con pruebas de inspección no destructiva (NDT), incluyendo ensayos de partículas magnéticas y ultrasonido, para verificar la integridad de las soldaduras. El componente reconstruido se entrega con un certificado de calidad que documenta todos los procesos aplicados, materiales utilizados y resultados de inspección.",
    ],
    img: "/images/blog/2.jpg",
    date: "28 Abr, 2026",
    dateISO: "2026-04-28",
    author: "Departamento Técnico",
    category: "Estructural",
    tags: ["Soldadura", "Cucharones", "Reconstrucción", "Acero antidesgaste"],
  },
  {
    slug: "importancia-componentes-oem-motores-alta-potencia",
    title: "La Importancia de los Componentes OEM en Motores de Alta Potencia",
    excerpt:
      "Análisis comparativo de desgaste físico y durabilidad entre componentes de fricción alternativos frente a repuestos certificados OEM.",
    content: [
      "La decisión entre utilizar componentes OEM (Original Equipment Manufacturer) o repuestos alternativos en motores diésel de maquinaria pesada tiene implicaciones directas en la confiabilidad operativa, los costos de mantenimiento a largo plazo y la vida útil del equipo.",
      "Los componentes OEM son diseñados, fabricados y probados bajo las especificaciones exactas del fabricante original. Cada pieza pasa por controles de calidad que incluyen verificaciones dimensionales de alta precisión, ensayos metalúrgicos y pruebas de rendimiento bajo condiciones simuladas de operación extrema.",
      "En nuestra experiencia en SERVIMAFED, hemos documentado casos donde la instalación de componentes alternativos en motores Caterpillar C15 y C18 resultó en fallas prematuras de camisas y pistones antes de alcanzar el 60% de la vida útil esperada. Las causas principales fueron tolerancias dimensionales fuera de especificación, tratamientos térmicos inadecuados y acabados superficiales deficientes.",
      "El costo inicial más bajo de los repuestos alternativos frecuentemente se ve superado por los costos asociados a fallas prematuras: paradas no programadas, daños colaterales a otros componentes, mano de obra de reinstalación y pérdida de producción.",
      "En SERVIMAFED trabajamos exclusivamente con proveedores certificados y distribuidores autorizados de las principales marcas (Caterpillar, Komatsu, Volvo, John Deere) para garantizar la autenticidad y trazabilidad de cada componente que instalamos en los equipos de nuestros clientes.",
    ],
    img: "/images/blog/3.jpg",
    date: "12 Abr, 2026",
    dateISO: "2026-04-12",
    author: "Departamento Técnico",
    category: "Componentes",
    tags: ["Componentes OEM", "Motores diésel", "Repuestos", "Calidad"],
  },
  // ── 2025 ──────────────────────────────────────────────
  {
    slug: "caterpillar-lanza-nueva-generacion-excavadoras-stage-v",
    title: "Caterpillar Lanza Nueva Generación de Excavadoras con Motor Stage V",
    excerpt:
      "La serie 300 GC de Caterpillar incorpora motores con tecnología Stage V que reducen emisiones y mejoran el consumo de combustible hasta un 15%.",
    content: [
      "Caterpillar ha presentado oficialmente la nueva generación de excavadoras hidráulicas de la serie 300 GC, equipadas con motores que cumplen la normativa de emisiones Stage V. Esta actualización representa un salto significativo en eficiencia energética y sostenibilidad para el sector de la construcción y la minería.",
      "Los nuevos motores C4.4 y C7.1 ACERT incorporan sistemas de postratamiento de gases de escape más compactos, incluyendo filtros de partículas diésel (DPF) y catalizadores de reducción selectiva (SCR) que reducen las emisiones de NOx y partículas en suspensión por debajo de los límites más estrictos de la industria.",
      "Desde la perspectiva del mantenimiento, estos motores presentan cambios importantes: los intervalos de servicio del filtro de partículas se extienden a 5,000 horas, el sistema de inyección common rail opera a presiones de hasta 2,200 bar, y los sensores de diagnóstico integrados permiten la detección temprana de anomalías en el sistema de escape.",
      "Para los operadores de flota en Perú, esta transición implica considerar la disponibilidad de AdBlue (solución de urea) en las zonas de operación, la capacitación del personal de mantenimiento en los nuevos sistemas de postratamiento, y la actualización de las herramientas de diagnóstico electrónico (Cat ET) a las versiones compatibles con Stage V.",
      "En SERVIMAFED estamos actualizando nuestros protocolos de servicio y capacitando a nuestro equipo técnico para dar soporte completo a esta nueva generación de equipos, asegurando que nuestros clientes puedan integrar estas máquinas a sus flotas sin interrupciones operativas.",
    ],
    img: "/images/blog/4.jpg",
    date: "18 Nov, 2025",
    dateISO: "2025-11-18",
    author: "Departamento Técnico",
    category: "Industria",
    tags: ["Caterpillar", "Stage V", "Excavadoras", "Emisiones"],
  },
  {
    slug: "guia-interpretar-reporte-analisis-aceite-sos",
    title: "Guía Práctica: Cómo Interpretar un Reporte de Análisis de Aceite S.O.S.",
    excerpt:
      "Aprenda a leer los indicadores clave de un reporte de análisis de fluidos y tome decisiones informadas sobre el mantenimiento de su flota.",
    content: [
      "Un reporte de análisis de aceite S.O.S. contiene decenas de valores numéricos que, correctamente interpretados, pueden revelar el estado interno de un motor, transmisión o sistema hidráulico antes de que aparezcan síntomas visibles de falla. Sin embargo, muchos supervisores de mantenimiento no aprovechan todo el potencial de esta herramienta por falta de conocimiento en la interpretación de resultados.",
      "Los metales de desgaste son los indicadores más directos del deterioro de componentes internos. Niveles elevados de hierro (Fe) pueden indicar desgaste en camisas, engranajes o ejes. El aluminio (Al) suele provenir de pistones o cojinetes. El cromo (Cr) señala desgaste en anillos de pistón. Cada metal cuenta una historia diferente sobre qué componente está sufriendo deterioro acelerado.",
      "La viscosidad del aceite es otro parámetro crítico. Un aceite que pierde viscosidad puede estar diluyéndose con combustible (indicando problemas en inyectores o anillos), mientras que un aumento de viscosidad sugiere oxidación del lubricante o contaminación por hollín, común en motores que operan con cargas pesadas constantes.",
      "El conteo de partículas y el código ISO de limpieza revelan el nivel de contaminación sólida en el sistema. Un sistema hidráulico con código ISO superior a 18/16/13 está operando fuera de los límites recomendados por la mayoría de fabricantes de bombas y válvulas, lo que acelera exponencialmente el desgaste de componentes de precisión.",
      "En SERVIMAFED integramos los resultados de análisis de aceite a nuestro sistema ERP Axentra, permitiendo a nuestros clientes visualizar tendencias históricas equipo por equipo y recibir alertas automáticas cuando algún parámetro supera los umbrales de precaución o de alarma definidos por el fabricante.",
    ],
    img: "/images/blog/5.jpg",
    date: "05 Ago, 2025",
    dateISO: "2025-08-05",
    author: "Departamento Técnico",
    category: "Mantenimiento",
    tags: ["Análisis de aceite", "S.O.S.", "Diagnóstico", "Guía técnica"],
  },
  {
    slug: "komatsu-komtrax-sistema-monitoreo-remoto-flotas",
    title: "Komatsu KOMTRAX: Cómo el Monitoreo Remoto Transforma la Gestión de Flotas",
    excerpt:
      "El sistema telemático KOMTRAX de Komatsu permite rastrear ubicación, horómetro, consumo de combustible y alertas de mantenimiento en tiempo real.",
    content: [
      "KOMTRAX (Komatsu Tracking System) es una de las plataformas telemáticas más avanzadas del sector de maquinaria pesada. Instalado de fábrica en todos los equipos Komatsu desde 2004, este sistema transmite datos operativos vía satélite las 24 horas del día, proporcionando a los propietarios y gestores de flota una visión completa del rendimiento de cada máquina.",
      "Entre los datos que KOMTRAX monitorea se incluyen: ubicación GPS en tiempo real, horómetro de motor y de trabajo, consumo de combustible instantáneo y acumulado, alertas de mantenimiento programado, códigos de falla del sistema electrónico, modos de operación (excavación, traslado, ralentí) y patrones de uso del operador.",
      "Para los gestores de flota, la información de KOMTRAX permite optimizar la utilización de los equipos identificando máquinas subutilizadas, detectar comportamientos de operación ineficientes como el exceso de ralentí que puede representar hasta un 30% del tiempo total de operación, y planificar el mantenimiento preventivo basado en horas reales de trabajo en lugar de estimaciones.",
      "La integración de datos telemáticos con programas de mantenimiento predictivo multiplica el valor de ambas herramientas. Por ejemplo, un equipo que muestra temperaturas del sistema hidráulico consistentemente por encima del rango normal puede estar indicando un problema en el enfriador de aceite o una restricción en el circuito de retorno que, si no se atiende, derivará en daños costosos a la bomba principal.",
      "En SERVIMAFED utilizamos los datos de KOMTRAX y plataformas similares como Cat Product Link y John Deere JDLink como insumo para nuestros planes de mantenimiento, permitiéndonos programar intervenciones proactivas basadas en la condición real de cada equipo.",
    ],
    img: "/images/blog/6.jpg",
    date: "22 Mar, 2025",
    dateISO: "2025-03-22",
    author: "Departamento Técnico",
    category: "Tecnología",
    tags: ["Komatsu", "KOMTRAX", "Telemetría", "Gestión de flota"],
  },
  // ── 2024 ──────────────────────────────────────────────
  {
    slug: "servimafed-lanza-plataforma-erp-axentra",
    title: "SERVIMAFED Lanza su Plataforma de Gestión Digital ERP Axentra",
    excerpt:
      "La nueva plataforma permite a nuestros clientes corporativos visualizar reportes técnicos, cotizaciones y estado de componentes en tiempo real.",
    content: [
      "En línea con nuestra visión de digitalización de procesos, SERVIMAFED ha lanzado oficialmente ERP Axentra, una plataforma de gestión integral desarrollada específicamente para el sector de mantenimiento de maquinaria pesada. Esta herramienta representa un paso decisivo hacia la transparencia operativa y la eficiencia en la gestión de servicios técnicos.",
      "ERP Axentra permite a nuestros clientes corporativos acceder a un portal donde pueden visualizar en tiempo real el estado de sus órdenes de trabajo, consultar el historial de mantenimiento de cada equipo, descargar reportes técnicos de campo, revisar cotizaciones pendientes y hacer seguimiento de la facturación.",
      "El sistema integra los datos de análisis de aceite, registros fotográficos de inspecciones, mediciones de desgaste y reportes de diagnóstico electrónico en un único dashboard por equipo. Esto elimina la dependencia de correos electrónicos y documentos físicos, centralizando toda la información técnica en un formato accesible desde cualquier dispositivo.",
      "Para nuestro equipo interno, Axentra optimiza la asignación de técnicos, el control de inventario de repuestos, la programación de mantenimientos preventivos y la generación de indicadores de gestión como disponibilidad mecánica, MTBF (tiempo medio entre fallas) y MTTR (tiempo medio de reparación).",
      "La plataforma está disponible para todos nuestros clientes con contratos de mantenimiento activos y puede ser accedida desde cualquier navegador web o dispositivo móvil.",
    ],
    img: "/images/blog/7.jpg",
    date: "10 Oct, 2024",
    dateISO: "2024-10-10",
    author: "Gerencia General",
    category: "Tecnología",
    tags: ["ERP Axentra", "Digitalización", "Gestión", "Plataforma"],
  },
  {
    slug: "comparativa-aceros-antidesgaste-hardox-creusabro",
    title: "Comparativa Técnica: Aceros Antidesgaste Hardox vs Creusabro",
    excerpt:
      "Análisis de propiedades mecánicas, resistencia a la abrasión y aplicaciones recomendadas para cada tipo de acero en componentes de maquinaria pesada.",
    content: [
      "La selección del acero antidesgaste adecuado es una decisión crítica en la fabricación y reconstrucción de componentes sometidos a alto desgaste abrasivo, como cucharones, tolvas, chutes de descarga y revestimientos de cajas de camiones mineros. Dos de las marcas más reconocidas en el mercado son Hardox (SSAB, Suecia) y Creusabro (Industeel, Francia).",
      "Hardox 400 y 500 son aceros martensíticos de alta dureza (400 y 500 HBW respectivamente) con excelente resistencia al desgaste por deslizamiento y moderada tenacidad al impacto. Su composición química está optimizada para facilitar el conformado y la soldadura, lo que los hace versátiles para una amplia gama de aplicaciones.",
      "Creusabro 4800 y 8000, por su parte, incorporan carburos de cromo y niobio dispersos en la matriz que les confieren una resistencia superior al desgaste abrasivo severo, especialmente en condiciones de impacto simultáneo. Las pruebas de laboratorio según norma ASTM G65 muestran tasas de desgaste entre 20% y 40% menores que aceros de dureza equivalente sin carburos.",
      "La elección entre uno y otro depende de la aplicación específica. Para revestimientos de tolvas y chutes donde predomina el desgaste por deslizamiento, Hardox 500 ofrece una relación costo-beneficio excelente. Para cucharones de excavadoras que trabajan en roca abrasiva con alto impacto, Creusabro 8000 proporciona una vida útil significativamente superior.",
      "En SERVIMAFED contamos con inventario permanente de ambas marcas en espesores desde 6mm hasta 50mm, y nuestros ingenieros de soldadura están calificados para trabajar con ambos materiales bajo los procedimientos de soldadura recomendados por cada fabricante.",
    ],
    img: "/images/blog/8.jpg",
    date: "15 Jun, 2024",
    dateISO: "2024-06-15",
    author: "Departamento Técnico",
    category: "Estructural",
    tags: ["Hardox", "Creusabro", "Acero antidesgaste", "Soldadura"],
  },
  // ── 2023 ──────────────────────────────────────────────
  {
    slug: "requisitos-iso-9001-2015-talleres-maquinaria-pesada",
    title: "Requisitos ISO 9001:2015 para Talleres de Maquinaria Pesada",
    excerpt:
      "Qué implica la certificación de calidad ISO 9001 en el contexto de talleres de reparación y mantenimiento de equipos pesados en el Perú.",
    content: [
      "La norma ISO 9001:2015 establece los requisitos para un sistema de gestión de calidad (SGC) que una organización debe implementar para demostrar su capacidad de proporcionar consistentemente productos y servicios que cumplan con los requisitos del cliente y las regulaciones aplicables.",
      "Para talleres de maquinaria pesada, la implementación de ISO 9001:2015 abarca aspectos como la gestión de competencias técnicas del personal (soldadores certificados, mecánicos con formación OEM), el control de equipos de medición y ensayo (calibración de torquímetros, manómetros, equipos de diagnóstico), y la trazabilidad de los procesos de reparación desde la recepción hasta la entrega.",
      "Uno de los requisitos más relevantes para nuestro sector es el control de productos no conformes y la gestión de reclamos del cliente. Cada componente reparado debe pasar por puntos de inspección definidos antes de ser liberado para despacho, y cualquier desviación debe ser documentada, analizada y corregida mediante acciones correctivas verificables.",
      "La gestión de proveedores es otro pilar fundamental. Los talleres certificados deben evaluar y calificar a sus proveedores de repuestos, insumos de soldadura y servicios subcontratados, manteniendo registros que demuestren que solo se utilizan materiales y componentes que cumplen las especificaciones técnicas requeridas.",
      "En SERVIMAFED, nuestro sistema de gestión de calidad está alineado con los principios de ISO 9001:2015, lo que nos permite ofrecer a nuestros clientes la garantía de procesos controlados, documentados y en mejora continua.",
    ],
    img: "/images/blog/9.jpg",
    date: "20 Nov, 2023",
    dateISO: "2023-11-20",
    author: "Gerencia de Calidad",
    category: "Normativa",
    tags: ["ISO 9001", "Calidad", "Certificación", "Talleres"],
  },
  {
    slug: "5-senales-transmision-necesita-overhaul",
    title: "5 Señales de que la Transmisión de su Equipo Necesita un Overhaul",
    excerpt:
      "Identifique los síntomas tempranos de desgaste en transmisiones powershift y evite paradas no programadas costosas.",
    content: [
      "La transmisión es uno de los componentes más costosos y críticos de la maquinaria pesada. Un overhaul a tiempo puede evitar daños catastróficos que multiplican los costos de reparación y el tiempo de parada. A continuación, presentamos las cinco señales más comunes que indican que una transmisión necesita intervención mayor.",
      "Primera señal: Cambios de marcha bruscos o retardados. Una transmisión powershift en buen estado ejecuta los cambios de marcha de forma suave y precisa. Si los cambios se vuelven bruscos, tardan más de lo normal o se sienten resbalones momentáneos, es probable que los discos de fricción y las placas separadoras estén desgastados o que las presiones del sistema de embrague estén fuera de especificación.",
      "Segunda señal: Temperatura de operación elevada. La temperatura normal del aceite de transmisión varía según el modelo, pero generalmente debe mantenerse entre 82°C y 107°C. Temperaturas consistentemente por encima de este rango aceleran la degradación del aceite y los sellos, e indican problemas como un convertidor de torque desgastado, enfriador obstruido o bomba de carga con baja eficiencia volumétrica.",
      "Tercera señal: Ruidos metálicos o vibración anormal. Golpeteos rítmicos, zumbidos o vibraciones que varían con la velocidad del equipo pueden indicar desgaste en engranajes planetarios, rodamientos de salida dañados o juego excesivo en ejes. Estos síntomas tienden a empeorar rápidamente si no se atienden.",
      "Cuarta señal: Pérdida de potencia en pendientes. Si el equipo pierde velocidad o fuerza al subir pendientes que antes negociaba sin problemas, puede estar ocurriendo un resbalamiento interno en los paquetes de embrague que reduce la transmisión efectiva del torque del motor a las ruedas o cadenas. Quinta señal: Presencia de partículas metálicas en el aceite. El análisis de aceite de transmisión que revela niveles elevados de hierro, cobre o bronce es una indicación directa de desgaste activo de componentes internos.",
    ],
    img: "/images/blog/10.jpg",
    date: "14 Jul, 2023",
    dateISO: "2023-07-14",
    author: "Departamento Técnico",
    category: "Mantenimiento",
    tags: ["Transmisión", "Overhaul", "Diagnóstico", "Powershift"],
  },
  // ── 2022 ──────────────────────────────────────────────
  {
    slug: "nuevas-normas-hseq-contratistas-mineros-peru",
    title: "Nuevas Normas HSEQ para Contratistas Mineros en el Perú",
    excerpt:
      "El Ministerio de Energía y Minas actualiza los requisitos de seguridad, salud y medio ambiente para empresas contratistas del sector minero.",
    content: [
      "El Ministerio de Energía y Minas del Perú ha publicado las actualizaciones al Reglamento de Seguridad y Salud Ocupacional en Minería (DS 024-2016-EM y sus modificatorias), que introducen nuevos requisitos para las empresas contratistas que prestan servicios en unidades mineras. Estos cambios tienen impacto directo en empresas como SERVIMAFED que realizan mantenimiento de maquinaria pesada en minas activas.",
      "Entre los cambios más significativos se encuentran: la obligatoriedad de contar con un Comité de Seguridad específico para cada proyecto minero con más de 20 trabajadores, la implementación de un programa de fatiga y somnolencia para personal que trabaja en turnos nocturnos o jornadas extendidas, y la exigencia de certificaciones específicas para trabajos en caliente (soldadura, oxicorte) dentro de áreas operativas de la mina.",
      "Los trabajos en espacios confinados, frecuentes en el mantenimiento de tanques de combustible y componentes de gran tamaño, ahora requieren un procedimiento escrito de rescate específico para cada intervención, con personal de rescate capacitado y equipado presente durante toda la duración del trabajo.",
      "La gestión ambiental también se refuerza con requisitos más estrictos para el manejo de residuos peligrosos generados durante el mantenimiento, como aceites usados, filtros contaminados, solventes y residuos de soldadura. Los contratistas deben presentar planes de manejo de residuos aprobados por la titular minera y mantener registros de disposición final verificables.",
      "En SERVIMAFED hemos actualizado todos nuestros procedimientos de trabajo seguro (PETS), matrices IPERC y planes de contingencia para cumplir con las nuevas exigencias, garantizando a nuestros clientes del sector minero una operación alineada con los más altos estándares de seguridad.",
    ],
    img: "/images/blog/11.jpg",
    date: "08 Sep, 2022",
    dateISO: "2022-09-08",
    author: "Gerencia HSEQ",
    category: "Normativa",
    tags: ["HSEQ", "Minería", "Seguridad", "Regulación"],
  },
  {
    slug: "volvo-ce-presenta-cargador-electrico-l25",
    title: "Volvo CE Presenta el Primer Cargador Frontal 100% Eléctrico para Construcción",
    excerpt:
      "El Volvo L25 Electric marca el inicio de la transición hacia equipos de construcción de cero emisiones en operaciones urbanas.",
    content: [
      "Volvo Construction Equipment ha comenzado la producción comercial del L25 Electric, el primer cargador frontal compacto totalmente eléctrico de la industria. Este equipo de 5 toneladas fue diseñado para operaciones de construcción urbana, manejo de materiales en almacenes y trabajos en espacios cerrados donde las emisiones de escape son un factor crítico.",
      "El L25 Electric está equipado con dos motores eléctricos de litio-ion que proporcionan un rendimiento equivalente al modelo diésel convencional, con la ventaja adicional de niveles de ruido significativamente inferiores (menos de 85 dB frente a los 104 dB del modelo diésel), lo que permite su operación en zonas residenciales y en horarios extendidos sin restricciones por contaminación acústica.",
      "Desde la perspectiva del mantenimiento, los equipos eléctricos presentan diferencias fundamentales respecto a sus contrapartes diésel: eliminan la necesidad de cambios de aceite de motor, filtros de combustible, sistemas de escape y todos los componentes asociados al tren motriz convencional. Sin embargo, introducen nuevos requerimientos como el mantenimiento del sistema de gestión de baterías (BMS), la inspección de cables de alta tensión y la calibración de los sistemas de regeneración de energía durante el frenado.",
      "Si bien la adopción de equipos eléctricos en la minería peruana está todavía en etapas tempranas, la tendencia es clara: las principales compañías mineras están incluyendo metas de reducción de emisiones en sus planes estratégicos, y los fabricantes están respondiendo con una oferta creciente de equipos electrificados e híbridos para operaciones subterráneas y de superficie.",
      "En SERVIMAFED seguimos de cerca esta evolución tecnológica para preparar a nuestro equipo técnico ante los cambios que la electrificación traerá al mantenimiento de maquinaria pesada en los próximos años.",
    ],
    img: "/images/blog/12.jpg",
    date: "15 Mar, 2022",
    dateISO: "2022-03-15",
    author: "Departamento Técnico",
    category: "Industria",
    tags: ["Volvo", "Eléctrico", "Cargador", "Emisiones cero"],
  },
  // ── 2021 ──────────────────────────────────────────────
  {
    slug: "servimafed-homologa-contratista-operaciones-mineras-sur",
    title: "SERVIMAFED se Homologa como Contratista en Operaciones Mineras del Sur del Perú",
    excerpt:
      "La empresa completa el proceso de homologación bajo estándares internacionales para operar como contratista de soporte permanente en minería.",
    content: [
      "SERVIMAFED ha completado satisfactoriamente el proceso de homologación requerido para operar como empresa contratista de mantenimiento mecánico en importantes operaciones mineras del sur del Perú. Este logro representa un hito en la trayectoria de la empresa y valida años de inversión en capacitación, infraestructura y sistemas de gestión.",
      "El proceso de homologación involucró la evaluación exhaustiva de múltiples dimensiones de la empresa: capacidad técnica y experiencia del personal, infraestructura de taller y equipamiento, sistemas de gestión de calidad y seguridad, solidez financiera, cumplimiento legal y laboral, y trazabilidad de procesos de reparación.",
      "Los evaluadores verificaron en campo las competencias de nuestros soldadores certificados, la calibración de nuestros equipos de medición, los procedimientos de trabajo seguro para actividades de alto riesgo, y la implementación efectiva de nuestro plan de gestión ambiental. La auditoría documental revisó contratos anteriores, certificados de capacitación, registros de mantenimiento de equipos propios y estados financieros.",
      "Como contratista homologado, SERVIMAFED ahora puede participar directamente en los procesos de licitación para servicios de mantenimiento mecánico, overhaul de componentes, soporte técnico en campo y suministro de repuestos dentro de las operaciones mineras, sin necesidad de subcontratar a través de terceros.",
      "Este paso estratégico nos acerca a nuestra visión de consolidarnos como socio técnico de referencia para el sector minero peruano, ofreciendo servicios de ingeniería de mantenimiento con los más altos estándares de calidad, seguridad y responsabilidad ambiental.",
    ],
    img: "/images/blog/13.jpg",
    date: "25 May, 2021",
    dateISO: "2021-05-25",
    author: "Gerencia General",
    category: "Minería",
    tags: ["Homologación", "Minería", "Contratista", "Certificación"],
  },
  // ── 2020 ──────────────────────────────────────────────
  {
    slug: "protocolos-mantenimiento-maquinaria-pesada-covid19",
    title: "Protocolos de Mantenimiento de Maquinaria Pesada durante la Pandemia COVID-19",
    excerpt:
      "Adaptación de procedimientos de trabajo en campo y taller para garantizar la continuidad operativa con medidas de bioseguridad.",
    content: [
      "La pandemia de COVID-19 obligó al sector minero y de construcción a replantear completamente sus protocolos de operación y mantenimiento. Como empresa de servicios esenciales para la cadena productiva de la minería, SERVIMAFED implementó un plan integral de bioseguridad que permitió mantener la continuidad de nuestros servicios sin comprometer la salud de nuestro personal ni de nuestros clientes.",
      "Los protocolos incluyeron la reorganización de turnos de trabajo para reducir la densidad de personal en taller, la implementación de puntos de desinfección en todas las áreas de trabajo, el uso obligatorio de EPP adicional (mascarillas N95, protectores faciales, guantes de nitrilo) y la desinfección sistemática de herramientas, equipos de diagnóstico y cabinas de maquinaria antes y después de cada intervención.",
      "Para los servicios en campo, se establecieron protocolos de viaje que incluían pruebas de descarte previas al traslado, cuarentena en las instalaciones de la mina antes del ingreso a zona operativa, y monitoreo de síntomas durante toda la duración del servicio. Los reportes técnicos y documentación migraron a formato completamente digital para eliminar el intercambio de documentos físicos.",
      "La experiencia de la pandemia aceleró la adopción de herramientas digitales en nuestras operaciones. El uso de videoconferencias para reuniones técnicas con clientes, la firma digital de órdenes de trabajo y la transmisión en tiempo real de datos de diagnóstico desde el campo se convirtieron en prácticas permanentes que mejoraron la eficiencia de nuestros procesos.",
      "Hoy, muchas de las medidas implementadas durante la pandemia se mantienen como parte de nuestros estándares operativos, habiendo demostrado que no solo protegen la salud del personal sino que también mejoran la productividad y la calidad de nuestros servicios.",
    ],
    img: "/images/blog/14.jpg",
    date: "12 Jun, 2020",
    dateISO: "2020-06-12",
    author: "Gerencia HSEQ",
    category: "Normativa",
    tags: ["COVID-19", "Bioseguridad", "Protocolos", "Continuidad operativa"],
  },
  // ── 2019 ──────────────────────────────────────────────
  {
    slug: "ampliacion-taller-nueva-area-mecanizado-precision",
    title: "Ampliación del Taller: Nueva Área de Mecanizado de Precisión",
    excerpt:
      "SERVIMAFED inaugura nueva nave industrial con tornos CNC y fresadoras de gran capacidad para la recuperación de componentes de maquinaria pesada.",
    content: [
      "SERVIMAFED ha inaugurado una nueva área de mecanizado de precisión como parte de nuestro plan de expansión de infraestructura. La inversión incluye la construcción de una nave industrial de 400 m² equipada con maquinaria de última generación para la recuperación dimensional de componentes críticos de maquinaria pesada.",
      "El nuevo taller incorpora un torno paralelo de 3 metros entre puntos con capacidad para piezas de hasta 2 toneladas, ideal para el mecanizado de ejes de transmisión, muñones de eje de mando final y bujes de gran diámetro. También se instaló una fresadora universal con mesa de trabajo de 1.5 x 0.5 metros para el maquinado de superficies de montaje, alojamientos de rodamientos y bases de motor.",
      "Una de las capacidades más relevantes que aporta esta ampliación es el line boring (mandrinado en sitio), que permite la recuperación de alojamientos de pasadores en estructuras de excavadoras y cargadores sin necesidad de desmontar el componente completo. Este proceso reduce significativamente los tiempos de reparación y los costos de transporte de componentes de gran tamaño.",
      "El área de mecanizado cuenta con un sistema de control de calidad dimensional que incluye micrómetros de exteriores e interiores calibrados, comparadores de carátula, rugosímetro superficial y un equipo de alineación láser para la verificación de concentricidad en ejes reconstruidos.",
      "Con esta ampliación, SERVIMAFED refuerza su capacidad de ofrecer soluciones integrales de mantenimiento, desde el diagnóstico y desmontaje hasta la reconstrucción de componentes y reinstalación, reduciendo la dependencia de servicios subcontratados y los tiempos de entrega.",
    ],
    img: "/images/blog/15.jpg",
    date: "20 Oct, 2019",
    dateISO: "2019-10-20",
    author: "Gerencia de Operaciones",
    category: "Tecnología",
    tags: ["Mecanizado", "Taller", "CNC", "Infraestructura"],
  },
  // ── 2017 ──────────────────────────────────────────────
  {
    slug: "intervalos-mantenimiento-horometro-excavadoras-cat-320",
    title: "Guía de Intervalos de Mantenimiento por Horómetro para Excavadoras CAT 320/336",
    excerpt:
      "Referencia completa de los servicios programados cada 250, 500, 1000 y 2000 horas para las excavadoras más utilizadas en minería y construcción.",
    content: [
      "Las excavadoras Caterpillar de la serie 300 (modelos 320 y 336) son de los equipos más utilizados en la minería y construcción en el Perú. Mantener un programa riguroso de mantenimiento por horómetro es fundamental para maximizar la disponibilidad mecánica y prevenir fallas costosas que impacten la producción.",
      "Servicio cada 250 horas: Cambio de aceite y filtro de motor, inspección y limpieza del filtro de aire primario, verificación del nivel de refrigerante y concentración de anticorrosivo, engrase de todos los puntos del boom, stick y bucket, inspección visual de mangueras hidráulicas y conexiones, y verificación del estado y tensión de la cadena de rodado.",
      "Servicio cada 500 horas: Todo lo anterior más el cambio del filtro hidráulico de retorno, drenaje de agua del tanque de combustible, verificación y ajuste de las presiones del sistema hidráulico (bomba principal, alivio, pilotaje), inspección del sistema de refrigeración (mangueras, abrazaderas, radiador), y revisión del turbocompresor (juego axial y radial).",
      "Servicio cada 1,000 horas: Todo lo anterior más el cambio de aceite y filtro del sistema hidráulico, cambio del filtro de combustible secundario, toma de muestra de aceite S.O.S. para análisis de laboratorio, inspección y ajuste de la holgura de válvulas del motor, verificación del sistema de inyección y calibración de presión si es necesario.",
      "Servicio cada 2,000 horas: Todo lo anterior más el cambio de refrigerante del sistema de enfriamiento, inspección del alternador y motor de arranque, evaluación del estado de los mandos finales (nivel de aceite, temperatura de operación, presencia de partículas metálicas), inspección completa del undercarriage (rodillos, ruedas guía, cadenas, zapatas) y verificación del estado del convertidor de torque del sistema de giro.",
    ],
    img: "/images/blog/16.jpg",
    date: "08 Mar, 2017",
    dateISO: "2017-03-08",
    author: "Departamento Técnico",
    category: "Mantenimiento",
    tags: ["Caterpillar", "Excavadoras", "Horómetro", "Mantenimiento preventivo"],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  return blogPosts
    .filter((post) => post.slug !== currentSlug)
    .slice(0, limit);
}

export function getArchiveMonths(): { label: string; yearMonth: string; count: number }[] {
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
  ];
  const map = new Map<string, number>();

  blogPosts.forEach((post) => {
    const d = new Date(post.dateISO);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    map.set(key, (map.get(key) ?? 0) + 1);
  });

  return Array.from(map.entries())
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([ym, count]) => {
      const [year, month] = ym.split("-");
      return {
        label: `${monthNames[parseInt(month, 10) - 1]} ${year}`,
        yearMonth: ym,
        count,
      };
    });
}
