import { blogPosts, type BlogPost } from "./blogData";

export interface NewsPost {
  slug: string;
  title: string;
  desc: string;
  img: string;
  date: string;
  category: string;
}

// Extracted from blog data for the News component
export const newsPosts: NewsPost[] = blogPosts.map((post: BlogPost): NewsPost => ({
  slug: post.slug,
  title: post.title,
  desc: post.excerpt,
  img: post.img,
  date: post.date,
  category: post.category,
}));
