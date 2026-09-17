import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SERVIMAFED S.A.C. | Mantenimiento de Maquinaria Pesada',
    short_name: 'Servimafed',
    description: 'Especialistas en overhaul de motores, diagnóstico avanzado y repuestos OEM para maquinaria pesada en minería y construcción en Perú.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0B0F19',
    theme_color: '#FCB326',
    icons: [
      {
        src: '/favicon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        src: '/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
