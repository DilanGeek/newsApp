import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { Article } from '../../interfaces/interfaces';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  @ViewChild(IonSegment, { static: true }) segment: IonSegment;

  categories = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
  ];

  news: Article[] = [];

  constructor(private newServ: NewsService) {}

  ngOnInit() {
    this.segment.value = this.categories[0];
    this.loadNews(this.categories[0]);
  }

  findByCategorie = (e) => {
    this.news = [];
    this.loadNews(e.detail.value);
  };

  loadNews = (category: string, event?) => {
    this.newServ.getTopHeadLinesByCategory(category).subscribe((data) => {
      this.news.push(...data.articles);

      if (event) {
        event.target.complete();
      }
    });
  };

  loadData = (e) => {
    this.loadNews(this.segment.value, e);
  };
}
