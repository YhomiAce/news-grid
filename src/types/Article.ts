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

export interface CategoryItem {
  id: string;
  name: string;
}

export interface Person {
  firstname: string;
  lastname: string;
};

export interface Multimedia {
  url: string;
  height: number;
  width: number;
};

export interface PersonalizeFeed {
  id: string;
  url: string;
}

export interface Feed {
  source: ArticleSource;
  categories: PersonalizeFeed[];
}

export interface ArticleFeed {
  source: ArticleSource;
  categories: string[];
}

export interface Setting {
  sources: ArticleSource[];
  categories: string[];
}