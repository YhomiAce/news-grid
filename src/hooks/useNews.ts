import { useState } from "react";
import { Article } from "../types/Article";
import { fetchApi } from "../api/services";

const DEFAULT_PAGE_SIZE = 10;

type Person = {
  firstname: string;
  lastname: string;
};

type Multimedia = {
  url: string;
  height: number;
  width: number;
};

export default function useNews() {
  const [newsList, setNewsList] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const combineName = (person: Person[]): string => {
    return person.map((item) => `${item.firstname} ${item.lastname}`).join(",");
  };

  const getImageUrl = (medias: Multimedia[]): string => {
    const url = medias.filter(item => item.width >= 600)[0].url;
    return `https://www.nytimes.com/${url}`
  };

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
    const url = `${baseUrl}?q=${search}&api-key=${apiKey}`;
    return url;
  };

  const mapNewsApiResultToArticle = (result: any) => {
    const mappedResult: Article[] = result.articles
      .filter((item: any) => item.author && item.urlToImage)
      .map((item: any) => ({
        url: item.url,
        author: item.author,
        title: item.title,
        publishedAt: new Date(item.publishedAt),
        image: item.urlToImage,
        source: item.source.name,
      }));
    return mappedResult;
  };

  const mapGuardiansApiResultToArticle = (data: any) => {
    const mappedResult: Article[] = data.response.results.map((item: any) => ({
      url: item.webUrl,
      author: item.fields.byline,
      title: item.webTitle,
      publishedAt: new Date(item.fields.firstPublicationDate),
      image: item.thumbnail,
      source: item.fields.publication,
      category: item.pillarName,
    }));
    return mappedResult;
  };

  const mapNewyorkTimesApiResultToArticle = (data: any) => {
    const mappedResult: Article[] = data.response.docs.map((item: any) => ({
      url: item.web_url,
      author: combineName(item.byline.person),
      title: item.headline.main,
      publishedAt: new Date(item.pub_date),
      image: getImageUrl(item.multimedia),
      source: item.source,
      category: item.section_name
    }));
    return mappedResult;
  };

  const aggregateNews = async (search: string) => {
    try {
      setLoading(true);
      const newsApiSource = fetchApi(fetchFromNewsApi(search));
      const guardianSource = fetchApi(fetchFromGuardianNewsApi(search));
      const newyorktimesSource = fetchApi(fetchFromNewYorkNewsApi(search));

      const [newsApiResult, guardianNewsResult, newyorkTimesResult] =
      await Promise.all([newsApiSource, guardianSource, newyorktimesSource]);
      console.log("🚀 ~ aggregateNews ~ newsApiResult, guardianNewsResult, newyorkTimesResult:", newsApiResult, guardianNewsResult, newyorkTimesResult)

      const aggregations = [
        ...mapNewsApiResultToArticle(newsApiResult),
        ...mapGuardiansApiResultToArticle(guardianNewsResult),
        ...mapNewyorkTimesApiResultToArticle(newyorkTimesResult),
      ];

      console.log({aggregations: aggregations.length});
      

      setLoading(false);
      setNewsList(aggregations);
    } catch (error) {
      setLoading(false);
      setError("An Error occurred");
    }
  };

  return {
    aggregateNews,
    loading,
    error,
    newsList,
  };
}
