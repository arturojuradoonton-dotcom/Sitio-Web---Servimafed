import Image from "next/image";
import Link from "next/link";
import { Calendar, User, Tag, ChevronRight } from "lucide-react";
import {
  blogPosts,
  blogCategories,
  getBlogPostBySlug,
  getRelatedPosts,
  getArchiveMonths,
} from "@/data/blogData";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogSidebar from "@/components/ui/BlogSidebar";
import ShareButtons from "@/components/ui/ShareButtons";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);
  if (!post) return { title: "Artículo no encontrado" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(resolvedParams.slug, 3);
  const archiveMonths = getArchiveMonths();

  return (
    <main className="flex-1 flex flex-col font-sans">
      {/* Page Header Banner */}
      <section className="relative py-20 bg-dark flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={post.img}
            alt={post.title}
            fill
            className="object-cover opacity-15 grayscale"
          />
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-4 uppercase tracking-tight leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-3 font-light text-sm text-gray-400 uppercase tracking-widest flex-wrap">
            <Link href="/" className="hover:text-primary transition-colors">
              Inicio
            </Link>
            <span className="text-gray-600">/</span>
            <Link href="/blog" className="hover:text-primary transition-colors">
              Blog
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-primary truncate max-w-[200px]">
              {post.title}
            </span>
          </div>
        </div>
      </section>

      {/* Article Content + Sidebar */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Main Content */}
            <article className="lg:col-span-8">
              {/* Featured Image */}
              <div className="relative h-[400px] w-full overflow-hidden rounded-sm shadow-lg mb-10">
                <Image
                  src={post.img}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 mb-8 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-widest">
                  <User className="w-4 h-4 text-primary" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-widest">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-widest">
                  <Tag className="w-4 h-4 text-primary" />
                  <span>{post.category}</span>
                </div>
              </div>

              {/* Article Title */}
              <h2 className="text-2xl md:text-3xl font-bold text-dark uppercase tracking-tight mb-8 leading-tight">
                {post.title}
              </h2>

              {/* Article Body */}
              <div className="space-y-6">
                {post.content.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-gray-600 font-light text-base leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Share Icons — below article, before tags */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                <h4 className="text-xs font-bold text-dark uppercase tracking-widest mb-4">
                  Compartir
                </h4>
                <ShareButtons slug={post.slug} title={post.title} />
              </div>

              {/* Tags */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h4 className="text-xs font-bold text-dark uppercase tracking-widest mb-4">
                  Etiquetas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-gray-50 border border-gray-200 text-gray-500 text-[10px] font-bold uppercase tracking-widest px-4 py-2 hover:bg-primary hover:text-dark hover:border-primary transition-all duration-300 cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <BlogSidebar
              relatedPosts={relatedPosts}
              archiveMonths={archiveMonths}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
