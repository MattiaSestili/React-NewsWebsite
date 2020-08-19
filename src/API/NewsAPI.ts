/**
 * Interface to communicate with API newsapi.org
 * TODO Refactor interface objects in a different file. Keep only the API calls.
 * TODO Also for security reasons apiKey should be hidden. Perhaps store in DB and retrieve it server side rather than hardcoded client-side
 */
import { _get } from "./Promises";

interface ISource {
  id: string;
  name: string;
}

export interface IArticle {
  source: ISource;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface INews {
  status: string;
  totalResults: number;
  articles: IArticle[];
}

export class NewsAPI {
  public async GetNewsHeadlines(): Promise<INews> {
    return _get<INews>(
      "http://newsapi.org/v2/top-headlines?country=gb&apiKey=7ae142c688904d75b144ccd774dcf520"
    );
  }

  public GetArticlesByKeyword(query: string): Promise<INews> {
    // TODO expand this call. Replace hardcoded value "sortBy" and "from" with dynamic input from the UI
    return _get<INews>(
      `http://newsapi.org/v2/everything?q=${query}&from=2020-08-17&sortBy=popularity&apiKey=7ae142c688904d75b144ccd774dcf520`
    );
  }
}

/**
 * Static version of API,
 * already instantiated to the default server URL.
 */
export const NewsServer = new NewsAPI();
