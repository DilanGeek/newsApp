import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseTopHeadLines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders().set('X-Api-key', apiKey);

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  headLinesPage = 0;
  currentCategory = '';
  categoryPage = 0;

  constructor(private http: HttpClient) {}

  getTopHeadLines = () => {
    this.headLinesPage++;

    const query = this.executeQuery<ResponseTopHeadLines>(
      `/top-headlines?country=us&page=${this.headLinesPage}`
    );
    return query;
  };

  getTopHeadLinesByCategory = (category: string) => {
    if (this.currentCategory === category) {
      this.categoryPage++;
    } else {
      this.categoryPage = 1;
      this.currentCategory = category;
    }

    const query = this.executeQuery<ResponseTopHeadLines>(
      `top-headlines?country=us&category=${category}&page=${this.categoryPage}`
    );
    return query;
  };

  private executeQuery<T>(query: string) {
    return this.http.get<T>(apiUrl + query, { headers });
  }
}
