import axios from "axios";
import { Article, Multimedia, Person } from "../types/Article";

export const fetchApi = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return error;
  }
};

const combineName = (person: Person[]): string => {
  return person.map((item) => `${item.firstname} ${item.lastname}`).join(",");
};

const getImageUrl = (medias: Multimedia[]): string => {
  const url = medias.filter((item) => item.width >= 600)[0].url;
  return `https://www.nytimes.com/${url}`;
};

export const mapNewsApiResultToArticle = (result: any) => {
  const mappedResult: Article[] = result.articles
    .filter((item: any) => item.author && item.urlToImage)
    .map((item: any) => ({
      url: item.url,
      author: item.author,
      title: item.title,
      publishedAt: new Date(item.publishedAt),
      image: item.urlToImage,
      source: "NewsAPI",
    }));
  return mappedResult;
};

export const mapGuardiansApiResultToArticle = (data: any) => {
  const mappedResult: Article[] = data.response.results.map((item: any) => ({
    url: item.webUrl,
    author: item.fields.byline,
    title: item.webTitle,
    publishedAt: new Date(item.fields.firstPublicationDate),
    image: item.thumbnail,
    source: "The Guardian",
    category: item.pillarName,
  }));
  return mappedResult;
};

export const mapNewyorkTimesApiResultToArticle = (data: any) => {
  const mappedResult: Article[] = data.response.docs.map((item: any) => ({
    url: item.web_url,
    author: combineName(item.byline.person),
    title: item.headline.main,
    publishedAt: new Date(item.pub_date),
    image: item.multimedia.length > 0 ? getImageUrl(item.multimedia) : "",
    source: "The New York Times",
    category: item.section_name,
  }));
  return mappedResult;
};

export const mapNewyorkTimesCategoryApiResultToArticle = (data: any) => {
  const mappedResult: Article[] = data.results.map((item: any) => ({
    url: item.url,
    author: item.byline,
    title: item.title,
    publishedAt: new Date(item.published_date),
    image: item?.multimedia?.length > 0 ? getImageUrl(item.multimedia) : "",
    source: "The New York Times",
    category: item.section,
  }));
  return mappedResult;
};