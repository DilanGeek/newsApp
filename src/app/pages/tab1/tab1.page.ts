import { Component, Input } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces/interfaces'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  public news: Article[] = [];

  constructor(private newServ: NewsService) { }

  ngOnInit(): void {
    this.newServ.getTopHeadLines().subscribe((data) => {
      // this.news = data.articles
      this.news.push(...data.articles);
    })
  }

}
