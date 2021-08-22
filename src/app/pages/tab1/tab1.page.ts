import { Component, Input, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article, ResponseTopHeadLines } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  public news: Article[] = [];

  constructor(private newServ: NewsService) {}

  ngOnInit() {
    this.loadNews();
  }

  loadData = (e) => {
    this.loadNews(e);
  };

  loadNews = (e?) => {
    this.newServ.getTopHeadLines().subscribe((data) => {
      if (data.articles.length === 0) {
        e.target.disabled = true;
        e.target.complete();
        return;
      }

      this.news.push(...data.articles);
      if (e) {
        e.target.complete();
      }
    });
  };
}
