"use client";

import { useState, useEffect } from 'react';

const WHATSAPP_NUMBER = "51993667182";
const WHATSAPP_MESSAGE = "Hola, necesito información sobre sus servicios de mantenimiento para maquinaria pesada.";

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <div
      id="whatsapp-floating-button"
      className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[90] transition-all duration-700 ease-out ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-75'
      }`}
    >
      {/* Tooltip (Desktop only) */}
      <div
        className={`hidden sm:block absolute bottom-full right-0 mb-3 whitespace-nowrap transition-all duration-300 pointer-events-none ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <div className="bg-dark text-white text-xs font-medium px-4 py-2.5 rounded-lg shadow-xl relative">
          ¿Necesitas una cotización? ¡Escríbenos!
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-dark rotate-45" />
        </div>
      </div>

      {/* Pulse rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="absolute w-full h-full rounded-full bg-[#25D366]/30 animate-ping" />
        <span className="absolute w-[calc(100%+12px)] h-[calc(100%+12px)] rounded-full bg-[#25D366]/10 animate-pulse" />
      </div>

      {/* Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] rounded-full shadow-[0_6px_24px_rgba(37,211,102,0.45)] hover:shadow-[0_8px_32px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <svg
          viewBox="0 0 32 32"
          fill="white"
          className="w-7 h-7 sm:w-8 sm:h-8"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.004 2.003c-7.721 0-13.993 6.272-13.993 13.993 0 2.467.655 4.876 1.898 6.993L2 30l7.207-1.89A13.94 13.94 0 0 0 16.004 30c7.721 0 13.993-6.272 13.993-13.993S23.725 2.003 16.004 2.003zm0 25.586a11.57 11.57 0 0 1-5.898-1.617l-.423-.251-4.384 1.15 1.17-4.275-.276-.439a11.56 11.56 0 0 1-1.773-6.161c0-6.393 5.2-11.593 11.593-11.593S27.6 9.603 27.6 15.996 22.397 27.589 16.004 27.589zm6.353-8.676c-.348-.174-2.061-1.017-2.381-1.133-.32-.116-.553-.174-.786.174-.233.348-.902 1.133-1.106 1.366-.204.233-.407.261-.755.087-.348-.174-1.47-.542-2.8-1.727-1.034-.922-1.733-2.061-1.936-2.41-.204-.348-.022-.536.153-.709.157-.157.348-.407.522-.611.174-.204.232-.348.348-.58.116-.233.058-.436-.029-.611-.087-.174-.786-1.895-1.077-2.595-.284-.68-.572-.588-.786-.599l-.67-.011c-.233 0-.611.087-.931.436-.32.348-1.22 1.192-1.22 2.907s1.249 3.372 1.423 3.604c.174.233 2.458 3.752 5.955 5.262.832.36 1.482.575 1.99.736.836.266 1.597.228 2.198.138.67-.1 2.061-.843 2.351-1.657.29-.814.29-1.512.204-1.657-.087-.145-.32-.232-.669-.407z" />
        </svg>
      </a>
    </div>
  );
}
