import { useState } from "react";
import { Article } from "../types/Article";
import {
  fetchApi,
  mapGuardiansApiResultToArticle,
  mapNewsApiResultToArticle,
  mapNewyorkTimesApiResultToArticle,
} from "../api/services";
import {
  DateFilterOption,
  DateFilterState,
  FIlters,
} from "../types/DateFilterOption";
import { isSameDay } from "date-fns";
import { DEFAULT_PAGE_SIZE } from "../utils/constants";

export default function useNews() {
  const [newsList, setNewsList] = useState<Article[]>([]);
  const [searchResults, setsearchResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const fetchFromNewsApi = (search: string): string => {
    const baseUrl = process.env.REACT_APP_NEWS_APP_URL;
    const apiKey = process.env.REACT_APP_NEWS_API_KEY;
    const url = `${baseUrl}/everything?q=${search}&pageSize=${DEFAULT_PAGE_SIZE}&apiKey=${apiKey}`;
    return url;
  };

  const fetchFromGuardianNewsApi = (search: string) => {
    const baseUrl = process.env.REACT_APP_GUARDIAN_APP_URL;
    const apiKey = process.env.REACT_APP_GUARDIAN_API_KEY;
    const url = `${baseUrl}/search?q=${search}&api-key=${apiKey}&page-size=${DEFAULT_PAGE_SIZE}&show-fields=firstPublicationDate,publication,thumbnail,webUrl,trailText,byline,sectionName`;
    return url;
  };

  const fetchFromNewYorkNewsApi = (search: string) => {
    const baseUrl = process.env.REACT_APP_NEW_YORK_TIMES_URL;
    const apiKey = process.env.REACT_APP_NEW_YORK_TIMES_API_KEY;
    const url = `${baseUrl}/search/v2/articlesearch.json?q=${search}&api-key=${apiKey}`;
    return url;
  };

  const aggregateNews = async (search: string) => {
    try {
      setLoading(true);
      const newsApiSource = fetchApi(fetchFromNewsApi(search));
      const guardianSource = fetchApi(fetchFromGuardianNewsApi(search));
      const newyorktimesSource = fetchApi(fetchFromNewYorkNewsApi(search));

      const [newsApiResult, guardianNewsResult, newyorkTimesResult] =
        await Promise.all([newsApiSource, guardianSource, newyorktimesSource]);

      const mappedApinewsResult = mapNewsApiResultToArticle(newsApiResult);
      const mappedGuardianNewsResult =
        mapGuardiansApiResultToArticle(guardianNewsResult);
      const mappedNewyorkTimesNewsResult =
        mapNewyorkTimesApiResultToArticle(newyorkTimesResult);

      const aggregations = [
        ...mappedApinewsResult,
        ...mappedGuardianNewsResult,
        ...mappedNewyorkTimesNewsResult,
      ];

      setLoading(false);
      setNewsList(aggregations);
      setsearchResults(aggregations);
    } catch (error) {
      setLoading(false);
      setError("An Error occurred");
    }
  };

  function filterArticleByDates(
    articles: Article[],
    filter: DateFilterState
  ): Article[] {
    switch (filter.criteria) {
      case DateFilterOption.BETWEEN:
        if (!filter.from && !filter.to) {
          throw new Error(
            'startDate and endDate must be provided for "between" criteria'
          );
        }
        return articles.filter(
          (article) =>
            article.publishedAt >= new Date(filter.from) &&
            article.publishedAt <= new Date(filter.to as string)
        );

      case DateFilterOption.GREATER_THAN:
        return articles.filter(
          (article) => article.publishedAt > new Date(filter.from)
        );

      case DateFilterOption.LESS_THAN:
        return articles.filter(
          (article) => article.publishedAt < new Date(filter.from)
        );

      case DateFilterOption.IS_EQUAL:
        return articles.filter((article) =>
          isSameDay(article.publishedAt, new Date(filter.from))
        );

      default:
        return articles;
    }
  }

  const filterArticles = (filters: FIlters) => {
    let articles = [...newsList];
    if (filters.dateFilter) {
      articles = filterArticleByDates(articles, filters.dateFilter);
    }
    if (filters.sourceFilters && filters.sourceFilters.length > 0) {
      articles = articles
        .filter((article) => {
          if (filters.sourceFilters.includes(article.source)) {
            return article;
          }
          return null;
        })
        .filter((item) => item);
    }
    if (filters.categoryFilters && filters.categoryFilters.length > 0) {
      articles = articles
        .filter((article) => {
          if (
            article.category &&
            filters.categoryFilters.includes(article.category)
          ) {
            return article;
          }
          return null;
        })
        .filter((item) => item);
    }
    setNewsList(articles);
  };

  const clearFliters = () => {
    const articles = [...searchResults];
    setNewsList(articles);
  };

  return {
    aggregateNews,
    loading,
    error,
    newsList,
    filterArticles,
    clearFliters,
    showFilter: searchResults.length > 0,
  };
}
