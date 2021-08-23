import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class DataLocalServiceService {

  news: Article[] = [];

  constructor(
    private storage: Storage,
    public toastController: ToastController
  ) { }

  saveNew = (report: Article) => {

    const exist = this.news.find(noticia => noticia.title === report.title);

    if (!exist) {
      this.news.unshift(report);
      this.storage.set('favotires', this.news);


      this.presentToast('Your settings have been saved.')
    }

  }

  loadFavotires = async () => {
    const favorites = await this.storage.get('favotires');
    this.news = favorites || [];
  }

  deleteNew = (article: Article) => {
    this.news = this.news.filter(noticia => noticia.title !== article.title);
    this.storage.set('favotires', this.news);
    this.presentToast('Your settings have been deleted.')
  }


  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message:  message,
      duration: 2000
    });
    toast.present();
  }

}
