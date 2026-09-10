import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.servimafed.com';
  const lastModified = new Date();

  const staticRoutes = [
    '',
    '/nosotros',
    '/contacto',
    '/servicios',
    '/repuestos',
    '/libro-reclamaciones',
    '/politicas',
    '/bolsa-trabajo',
    '/comprobantes',
    '/blog',
  ];

  const serviciosSlugs = [
    'gestion-flota',
    'mantenimiento-preventivo',
    'reparacion-componentes',
    'evaluacion-diagnostico',
    'mecanizado-soldadura',
  ];

  const repuestosSlugs = [
    'accesorios',
    'componentes',
    'elementos-desgaste',
    'mantenimiento',
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  const serviciosEntries: MetadataRoute.Sitemap = serviciosSlugs.map((slug) => ({
    url: `${baseUrl}/servicios/${slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const repuestosEntries: MetadataRoute.Sitemap = repuestosSlugs.map((slug) => ({
    url: `${baseUrl}/repuestos/${slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const blogSlugs = [
    'tendencias-mantenimiento-predictivo-analisis-aceite',
    'reconstruccion-estructural-cucharones-tolvas',
    'importancia-componentes-oem-motores-alta-potencia',
  ];

  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticEntries, ...serviciosEntries, ...repuestosEntries, ...blogEntries];
}
