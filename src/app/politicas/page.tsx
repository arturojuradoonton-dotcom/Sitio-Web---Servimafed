import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad y tratamiento de datos personales de Servimafed S.A.C., conforme a la Ley 29733 de Protección de Datos Personales.',
};

const sections = [
  {
    title: "Recopilación de Datos",
    content: "Servimafed S.A.C. recopila información personal cuando usted completa formularios en nuestro sitio web, solicita cotizaciones, envía consultas técnicas o se registra en nuestro portal corporativo. Los datos recopilados pueden incluir: nombre completo, razón social, RUC, dirección de correo electrónico, número de teléfono, dirección postal y datos técnicos relacionados con su flota de maquinaria.\n\nToda la información es proporcionada de manera voluntaria por el usuario. Al enviar sus datos a través de nuestros formularios, usted acepta los términos de esta política."
  },
  {
    title: "Uso de la Información",
    content: "Los datos personales recopilados son utilizados exclusivamente para:\n\n• Responder a solicitudes de cotización y consultas técnicas.\n• Coordinar visitas de inspección y servicios de mantenimiento.\n• Enviar comunicaciones comerciales relevantes sobre nuestros servicios y promociones (solo con consentimiento previo).\n• Gestionar el acceso al portal corporativo ERP Axentra.\n• Cumplir con obligaciones legales y contractuales.\n\nServimafed no vende, alquila ni comparte sus datos personales con terceros no relacionados con la prestación del servicio."
  },
  {
    title: "Cookies y Tecnologías de Rastreo",
    content: "Nuestro sitio web utiliza cookies para mejorar la experiencia del usuario. Las cookies son pequeños archivos de texto almacenados en su dispositivo que nos permiten:\n\n• Recordar sus preferencias de navegación.\n• Analizar patrones de tráfico web para optimizar el rendimiento del sitio.\n• Garantizar el correcto funcionamiento de formularios y herramientas interactivas.\n\nUsted puede configurar su navegador para rechazar cookies, aunque esto puede limitar la funcionalidad del sitio."
  },
  {
    title: "Seguridad de los Datos",
    content: "Implementamos medidas de seguridad técnicas y organizativas para proteger sus datos personales contra acceso no autorizado, pérdida o destrucción. Nuestro sitio web opera bajo protocolo HTTPS con certificado SSL, garantizando la encriptación de los datos transmitidos.\n\nEl acceso a la información personal está restringido exclusivamente al personal autorizado de Servimafed que requiera dicha información para el cumplimiento de sus funciones."
  },
  {
    title: "Derechos del Usuario",
    content: "De acuerdo con la Ley 29733, Ley de Protección de Datos Personales del Perú, usted tiene derecho a:\n\n• Acceder a sus datos personales almacenados en nuestras bases de datos.\n• Rectificar datos inexactos o incompletos.\n• Cancelar o solicitar la supresión de sus datos cuando ya no sean necesarios.\n• Oponerse al tratamiento de sus datos para finalidades distintas a las contratadas.\n\nPara ejercer estos derechos, puede comunicarse con nosotros a través de nuestro correo electrónico: ventas@servimafed.com"
  },
  {
    title: "Modificaciones a esta Política",
    content: "Servimafed se reserva el derecho de modificar esta política de privacidad en cualquier momento. Los cambios serán publicados en esta misma página con la fecha de última actualización. Recomendamos revisar periódicamente esta política para estar informado sobre cómo protegemos su información."
  }
];

export default function PoliticasPage() {
  return (
    <main className="flex-1 flex flex-col font-sans bg-white">
      {/* Page Header */}
      <section className="relative py-24 bg-dark flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/fondos/hero-politicas.jpg" alt="Política de Privacidad" fill className="object-cover opacity-20 grayscale" />
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight text-white">Política de Privacidad</h1>
          <div className="flex items-center justify-center gap-3 font-light text-sm text-gray-400 uppercase tracking-widest">
            <Link href="/" className="text-gray-200 hover:text-primary transition-colors">Inicio</Link>
            <span className="text-gray-600">/</span>
            <span className="text-primary">Políticas</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-400 font-light text-sm mb-12">Última actualización: Enero 2025</p>

            <div className="space-y-12">
              {sections.map((section, i) => (
                <div key={i}>
                  <h3 className="text-lg font-bold text-dark uppercase tracking-widest border-l-2 border-primary pl-4 mb-6">{section.title}</h3>
                  {section.content.split('\n\n').map((paragraph, j) => (
                    <p key={j} className="text-gray-600 font-light text-sm leading-relaxed mb-4 whitespace-pre-line">{paragraph}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
