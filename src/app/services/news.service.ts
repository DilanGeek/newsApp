import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseTopHeadLines } from '../interfaces/interfaces'

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getTopHeadLines = () => {
    return this.http.get<ResponseTopHeadLines>(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=abc318cf856a4eef9d40babb846ae7ae`)
  }
}
