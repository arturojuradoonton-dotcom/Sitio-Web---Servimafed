import type { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blogData';
import { serviciosData } from '@/data/serviciosData';
import { repuestosData } from '@/data/repuestosData';

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

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  const serviciosEntries: MetadataRoute.Sitemap = Object.keys(serviciosData).map((slug) => ({
    url: `${baseUrl}/servicios/${slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const repuestosEntries: MetadataRoute.Sitemap = Object.keys(repuestosData).map((slug) => ({
    url: `${baseUrl}/repuestos/${slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.dateISO ? new Date(post.dateISO) : lastModified,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticEntries, ...serviciosEntries, ...repuestosEntries, ...blogEntries];
}
