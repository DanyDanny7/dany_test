import { BASE_URL, NEWS_API_KEY } from '@env';
import axios from 'axios';

export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

axios.defaults.baseURL = BASE_URL;

export const getTopHeadlines = async (page: number = 1, pageSize: number = 20): Promise<NewsResponse> => {
  try {
    const response = await axios.get("/top-headlines", {
      params: {
        country: 'us',
        language: 'en',
        page: page,
        pageSize: pageSize,
        apiKey: NEWS_API_KEY
      },    
    });

    if (response.status !== 200) {
      throw new Error(`Error fetching news: ${response.statusText}`);   
    }
    
    return response.data as NewsResponse;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};
