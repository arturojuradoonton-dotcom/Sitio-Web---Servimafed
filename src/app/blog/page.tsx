import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, User, Tag } from "lucide-react";
import { blogPosts, getArchiveMonths } from "@/data/blogData";
import type { Metadata } from "next";
import BlogSidebar from "@/modules/Blog/components/BlogSidebar";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artículos técnicos, noticias y actualizaciones sobre mantenimiento de maquinaria pesada, componentes OEM, soldadura estructural y tecnología industrial.",
};

interface BlogPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    archive?: string;
    tag?: string;
    page?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedParams = await searchParams;
  const q = resolvedParams.q?.toLowerCase() || "";
  const category = resolvedParams.category || "";
  const archive = resolvedParams.archive || "";
  const tag = resolvedParams.tag || "";

  // Filter blog posts
  let filteredPosts = [...blogPosts];

  if (q) {
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.content.some((para) => para.toLowerCase().includes(q))
    );
  }

  if (category) {
    filteredPosts = filteredPosts.filter(
      (post) => post.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (archive) {
    // archive is e.g. "2026-05"
    filteredPosts = filteredPosts.filter((post) =>
      post.dateISO.startsWith(archive)
    );
  }

  if (tag) {
    filteredPosts = filteredPosts.filter((post) =>
      post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
    );
  }

  // Get active filter label for display
  let activeFilterLabel = "";
  if (q) activeFilterLabel = `Búsqueda: "${resolvedParams.q}"`;
  else if (category) activeFilterLabel = `Categoría: ${category}`;
  else if (archive) {
    const [year, month] = archive.split("-");
    const monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    activeFilterLabel = `Archivo: ${
      monthNames[parseInt(month, 10) - 1]
    } ${year}`;
  } else if (tag) activeFilterLabel = `Etiqueta: ${tag}`;

  // Get top 3 posts as recent posts for sidebar
  const recentPosts = blogPosts.slice(0, 3);
  const archiveMonths = getArchiveMonths();

  // Paginación
  const page = parseInt(resolvedParams.page || "1", 10);
  const postsPerPage = 3;
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  // Helper para preservar filtros activos en los enlaces de paginación
  const getPageUrl = (pageNum: number) => {
    const params = new URLSearchParams();
    if (resolvedParams.q) params.set("q", resolvedParams.q);
    if (category) params.set("category", category);
    if (archive) params.set("archive", archive);
    if (tag) params.set("tag", tag);
    params.set("page", String(pageNum));
    return `/blog?${params.toString()}`;
  };

  return (
    <main className="flex-1 flex flex-col font-sans">
      {/* Page Header Banner */}
      <section className="relative py-24 bg-dark flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/fondos/hero-blog.jpg"
            alt="Blog y Noticias"
            fill
            className="object-cover opacity-20 grayscale"
            priority
          />
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight text-white">
            Blog y Noticias
          </h1>
          <div className="flex items-center justify-center gap-3 font-light text-sm text-gray-400 uppercase tracking-widest">
            <Link href="/" className="hover:text-primary transition-colors">
              Inicio
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-primary">Blog</span>
          </div>
        </div>
      </section>

      {/* Main Layout Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Blog Listing Column */}
            <div className="lg:col-span-8">
              
              {/* Header Title */}
              <div className="mb-12">
                <span className="text-primary font-bold text-xs uppercase tracking-[0.2em] block mb-3">
                  Conocimiento e Ingeniería
                </span>
                <h2 className="text-3xl font-light text-dark uppercase tracking-tight">
                  Artículos <span className="font-bold text-primary">Técnicos</span>
                </h2>
                <div className="w-12 h-1 bg-primary mt-4"></div>
              </div>

              {/* Active Filters Bar */}
              {activeFilterLabel && (
                <div className="bg-gray-50 border border-gray-100 p-4 rounded-sm flex items-center justify-between mb-10">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                      Filtrado por:
                    </span>
                    <span className="bg-dark text-primary font-bold text-[9px] uppercase tracking-widest px-3 py-1.5 border-l-2 border-primary">
                      {activeFilterLabel}
                    </span>
                  </div>
                  <Link
                    href="/blog"
                    className="text-gray-500 hover:text-primary transition-colors text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 shrink-0"
                  >
                    Limpiar Filtros ×
                  </Link>
                </div>
              )}

              {/* Grid or Empty State */}
              {filteredPosts.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 border border-gray-100 rounded-sm">
                  <span className="text-primary font-bold text-xs uppercase tracking-[0.2em] block mb-3">
                    Sin Resultados
                  </span>
                  <h3 className="text-xl font-bold text-dark uppercase tracking-tight mb-4">
                    No se encontraron artículos
                  </h3>
                  <p className="text-gray-500 font-light text-sm max-w-md mx-auto mb-8">
                    No pudimos encontrar ningún artículo que coincida con tus criterios de búsqueda. Intenta con otros términos o limpia los filtros.
                  </p>
                  <Link
                    href="/blog"
                    className="inline-block bg-primary text-dark font-bold text-[10px] uppercase tracking-widest px-6 py-3 hover:bg-dark hover:text-white transition-colors"
                  >
                    Ver Todos los Artículos
                  </Link>
                </div>
              ) : (
                <div className="space-y-16">
                  {paginatedPosts.map((post) => (
                    <article
                      key={post.slug}
                      className="group flex flex-col pb-16 border-b border-gray-100 last:border-b-0 last:pb-0"
                    >
                      {/* Featured Image */}
                      <div className="relative h-[380px] w-full overflow-hidden rounded-sm bg-gray-50 shadow-md">
                        <Image
                          src={post.img}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-[1000ms] ease-out"
                        />
                        <span className="absolute top-6 left-6 bg-dark text-primary font-bold text-[9px] uppercase tracking-widest px-4 py-2 border-l-2 border-primary">
                          {post.category}
                        </span>
                      </div>

                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-6 mt-6 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-primary" />
                          {post.date}
                        </span>
                        <span className="w-2 h-[2px] bg-gray-200"></span>
                        <span className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-primary" />
                          {post.author}
                        </span>
                      </div>

                      {/* Title & Excerpt */}
                      <h3 className="font-bold text-dark text-2xl md:text-3xl uppercase tracking-tight leading-tight mt-4 mb-4 hover:text-primary transition-colors">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p className="text-gray-500 font-light text-base leading-relaxed mb-6">
                        {post.excerpt}
                      </p>

                      {/* Read More Link */}
                      <div>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-block border-2 border-dark text-dark font-bold text-[10px] uppercase tracking-widest px-8 py-3.5 hover:bg-primary hover:border-primary transition-all duration-300"
                        >
                          Leer Artículo &rarr;
                        </Link>
                      </div>
                    </article>
                  ))}

                  {/* Pagination Bar */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-16 pt-8 border-t border-gray-100">
                      {/* Prev Button */}
                      {page > 1 && (
                        <Link
                          href={getPageUrl(page - 1)}
                          className="w-10 h-10 border border-gray-200 text-dark flex items-center justify-center hover:bg-dark hover:text-white transition-all text-xs font-bold"
                        >
                          &laquo;
                        </Link>
                      )}

                      {/* Page Numbers */}
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <Link
                          key={p}
                          href={getPageUrl(p)}
                          className={`w-10 h-10 border flex items-center justify-center transition-all text-xs font-bold ${
                            p === page
                              ? "bg-primary border-primary text-dark"
                              : "border-gray-200 text-dark hover:bg-dark hover:text-white"
                          }`}
                        >
                          {p}
                        </Link>
                      ))}

                      {/* Next Button */}
                      {page < totalPages && (
                        <Link
                          href={getPageUrl(page + 1)}
                          className="w-10 h-10 border border-gray-200 text-dark flex items-center justify-center hover:bg-dark hover:text-white transition-all text-xs font-bold"
                        >
                          &raquo;
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar Column */}
            <BlogSidebar
              relatedPosts={recentPosts}
              archiveMonths={archiveMonths}
            />

          </div>
        </div>
      </section>
    </main>
  );
}

