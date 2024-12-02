export type ArticleSource  = "NewsAPI" | "The Guardian" | "The New York Times"

export interface Article {
  image: string;
  url: string;
  title: string;
  source: ArticleSource;
  author: string;
  publishedAt: Date;
  category?: string;
}
