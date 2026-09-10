"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { newsPosts, type NewsPost } from "@/data/newsData";

export function HomeNews() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? newsPosts.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === newsPosts.length - 1 ? 0 : prev + 1));
  }, []);

  // Memoize visible posts calculation to optimize rendering
  const { firstPost, secondPost, listPosts } = useMemo(() => {
    if (newsPosts.length === 0) {
      return { firstPost: null, secondPost: null, listPosts: [] };
    }

    const first = newsPosts[activeIndex];
    const second = newsPosts[(activeIndex + 1) % newsPosts.length];
    
    // Two additional dynamic posts for the left-side list
    const list = [
      newsPosts[(activeIndex + 2) % newsPosts.length],
      newsPosts[(activeIndex + 3) % newsPosts.length],
    ];

    return { firstPost: first, secondPost: second, listPosts: list };
  }, [activeIndex]);

  // Handle empty state gracefully
  if (!firstPost) {
    return null; 
  }

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-4">
            <span className="text-primary font-bold text-[10px] uppercase tracking-[0.2em] block mb-2">
              Conocimiento e Ingeniería
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-dark leading-tight uppercase tracking-tight">
              Noticias y <span className="font-bold text-dark">actualizaciones</span>
            </h2>
            <div className="w-16 h-1 bg-primary mt-3 mb-12" aria-hidden="true"></div>

            {/* Vertical News Items list */}
            <div className="space-y-8">
              {listPosts.map((post, idx) => (
                <NewsListItem key={`${post.slug}-${idx}`} post={post} />
              ))}
            </div>

            {/* View all link */}
            <div className="mt-8">
              <Link
                href="/blog"
                className="text-xs font-bold text-dark hover:text-primary transition-colors uppercase tracking-widest flex items-center gap-2"
              >
                Ver Todos los Artículos &rarr;
              </Link>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-8 relative mt-12 lg:mt-0">
            {/* Background watermark */}
            <div 
              className="absolute -top-16 left-0 text-[8rem] sm:text-[10rem] font-bold text-gray-50 select-none pointer-events-none uppercase tracking-widest leading-none z-0"
              aria-hidden="true"
            >
              Noticias
            </div>

            {/* Carousel Controls */}
            <div className="flex justify-between items-center mb-8 relative z-10">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
                Destacados
              </span>
              <div className="flex gap-2">
                <ControlButton 
                  onClick={handlePrev} 
                  icon={<ChevronLeft className="w-4 h-4" />} 
                  ariaLabel="Ver noticias anteriores" 
                />
                <ControlButton 
                  onClick={handleNext} 
                  icon={<ChevronRight className="w-4 h-4" />} 
                  ariaLabel="Ver siguientes noticias" 
                />
              </div>
            </div>

            {/* Slider cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              <NewsCard post={firstPost} />
              {secondPost && <NewsCard post={secondPost} hiddenOnMobile />}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// --- Sub-components for cleaner markup ---

interface NewsCardProps {
  post: NewsPost;
  hiddenOnMobile?: boolean;
}

function NewsCard({ post, hiddenOnMobile = false }: NewsCardProps) {
  return (
    <article
      className={`group bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 rounded-sm overflow-hidden flex flex-col justify-between ${
        hiddenOnMobile ? "hidden md:flex" : "flex"
      }`}
    >
      <div>
        <div className="relative h-60 w-full overflow-hidden bg-gray-50">
          <Image
            src={post.img}
            alt={`Imagen representativa de ${post.title}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <span className="absolute top-4 left-4 bg-dark text-primary font-bold text-[9px] uppercase tracking-widest px-3 py-1.5 border-l-2 border-primary">
            {post.category}
          </span>
        </div>

        {/* Overlapping Info Card */}
        <div className="bg-white p-6 mx-4 -mt-10 relative z-10 shadow-lg rounded-sm border-b-2 border-transparent group-hover:border-primary transition-all duration-300">
          <div className="flex items-center gap-2">
            <time dateTime={post.date} className="text-gray-400 text-[9px] font-bold uppercase tracking-widest">
              {post.date}
            </time>
            <span className="w-6 h-[2px] bg-primary block" aria-hidden="true" />
          </div>
          <h3 className="font-bold text-sm text-dark uppercase tracking-wide leading-snug mt-3 mb-2 line-clamp-2">
            {post.title}
          </h3>
        </div>
      </div>

      <div className="px-6 pb-6 pt-4 mt-auto">
        <Link
          href={`/blog/${post.slug}`}
          className="text-gray-500 font-light text-xs tracking-wide flex items-center gap-2 group-hover:text-gray-900 transition-colors inline-block"
        >
          Leer más <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}

interface NewsListItemProps {
  post: NewsPost;
}

function NewsListItem({ post }: NewsListItemProps) {
  return (
    <article className="group border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
      <time dateTime={post.date} className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-2">
        {post.date}
      </time>
      <Link
        href={`/blog/${post.slug}`}
        className="font-bold text-dark text-base uppercase leading-snug group-hover:text-primary transition-colors duration-300 block mb-2"
      >
        {post.title}
      </Link>
      <p className="text-gray-500 font-light text-xs leading-relaxed line-clamp-2">
        {post.desc}
      </p>
    </article>
  );
}

interface ControlButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  ariaLabel: string;
}

function ControlButton({ onClick, icon, ariaLabel }: ControlButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      type="button"
      className="w-9 h-9 border border-gray-200 hover:border-primary text-dark hover:text-white hover:bg-primary rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer"
    >
      {icon}
    </button>
  );
}
