import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalServiceService {

  news: Article[] = [];

  constructor(private storage: Storage) { }

  saveNew = (report: Article) => {
    this.news.unshift(report);
    this.storage.set('favotires', report);
  }

  loadFavotires = () => { }
}
