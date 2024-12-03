import { useEffect, useState } from "react";
import {
  Article,
  ArticleSource,
  PersonalizeFeed,
  Feed,
  Setting,
} from "../types/Article";
import { categories, DEFAULT_PAGE_SIZE } from "../utils/constants";
import {
  fetchApi,
  mapGuardiansApiResultToArticle,
  mapNewsApiResultToArticle,
  mapNewyorkTimesCategoryApiResultToArticle,
} from "../api/services";

export default function useNewsFeed() {
  const [newsList, setNewsList] = useState<Article[]>([]);
  const [personalizedSources, setPersonalizedSources] = useState<
    ArticleSource[]
  >([]);
  const [loading, setLoading] = useState(false);

  const getNewsApiCategoriesUrl = (): PersonalizeFeed[] => {
    const baseUrl = process.env.REACT_APP_NEWS_APP_URL;
    const apiKey = process.env.REACT_APP_NEWS_API_KEY;
    const newsCategories: PersonalizeFeed[] = categories.map((category) => {
      const url = `${baseUrl}/top-headlines?category=${category.id}&pageSize=${DEFAULT_PAGE_SIZE}&apiKey=${apiKey}`;
      return {
        id: category.id,
        url: url,
      };
    });
    return newsCategories;
  };

  const getGuardiansCategoriesUrl = () => {
    const baseUrl = process.env.REACT_APP_GUARDIAN_APP_URL;
    const apiKey = process.env.REACT_APP_GUARDIAN_API_KEY;
    const newsCategories: PersonalizeFeed[] = categories.map((category) => {
      let section = category.id;
      if (category.id === "sports") {
        section = "sport";
      }
      const url = `${baseUrl}/${section}?api-key=${apiKey}&page-size=${DEFAULT_PAGE_SIZE}&show-fields=firstPublicationDate,publication,thumbnail,webUrl,trailText,byline,sectionName`;
      return {
        id: category.id,
        url: url,
      };
    });
    return newsCategories;
  };

  const getNYTCategoriesUrl = () => {
    const baseUrl = process.env.REACT_APP_NEW_YORK_TIMES_URL;
    const apiKey = process.env.REACT_APP_NEW_YORK_TIMES_API_KEY;
    const newsCategories: PersonalizeFeed[] = categories.map((category) => {
      const url = `${baseUrl}/topstories/v2/${category.id}.json?api-key=${apiKey}`;
      return {
        id: category.id,
        url: url,
      };
    });
    return newsCategories;
  };

  const fetchArticles = async (urls: string[], source: ArticleSource) => {
    try {
      const results = await Promise.all(
        urls.map(async (url) => {
          const response = await fetchApi(url);
          if (source === "NewsAPI") {
            return mapNewsApiResultToArticle(response);
          } else if (source === "The Guardian") {
            return mapGuardiansApiResultToArticle(response);
          } else {
            return mapNewyorkTimesCategoryApiResultToArticle(response);
          }
        })
      );

      return results.flat();
    } catch (error) {
      console.error("Error fetching from New York News API:", error);
      throw error;
    }
  };

  const fetchPersonalizedFeeds = async (settings: Setting) => {
    const newsApiSource = getNewsApiCategoriesUrl();
    const guardianSource = getGuardiansCategoriesUrl();
    const nyTimesSource = getNYTCategoriesUrl();
    const feedData: Feed[] = [
      {
        source: "NewsAPI",
        categories: newsApiSource,
      },
      {
        source: "The Guardian",
        categories: guardianSource,
      },
      {
        source: "The New York Times",
        categories: nyTimesSource,
      },
    ];
    const savedSources = settings.sources as ArticleSource[];
    const savedCategories = settings.categories as string[];
    const personalizeFeeds = savedSources
      .map((item) => {
        const isSaved = feedData.find((feed) => feed.source === item);
        if (isSaved) {
          return {
            source: isSaved.source,
            categories: isSaved.categories
              .filter((filter) => savedCategories.includes(filter.id))
              .map((cat) => cat.url),
          };
        }
        return null;
      })
      .filter((item) => item !== null);
    const articleList: Article[] = [];
    for (let request of personalizeFeeds) {
      if (request) {
        const newsApiArticle = await fetchArticles(
          request.categories,
          request.source
        );
        articleList.push(...newsApiArticle);
      }
    }
    setNewsList(articleList);
    setPersonalizedSources(savedSources);
  };

  const personalizedNews = async () => {
    setLoading(true);
    try {
      const settingsStore = localStorage.getItem("settings");
      if (settingsStore) {
        const settings = JSON.parse(settingsStore);
        await fetchPersonalizedFeeds(settings as Setting);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (setting: Setting) => {
    await fetchPersonalizedFeeds(setting);
    setPersonalizedSources(setting.sources);
  };

  useEffect(() => {
    personalizedNews();
    // eslint-disable-next-line
  }, []);

  return {
    articles: newsList,
    newsSources: personalizedSources,
    loading,
    updateSettings,
  };
}
