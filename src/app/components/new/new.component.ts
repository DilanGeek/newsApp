import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from "@ionic/angular";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  @Input() new: Article;
  @Input() index: number;

  constructor(private inAppBrowser: InAppBrowser, private actionSheetCtrl: ActionSheetController, private socialSharing: SocialSharing) { }

  ngOnInit() { }

  openNew = () => {
    const browser = this.inAppBrowser.create(this.new.url, '_system');
  };

  launchMenu = async () => {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [{
        text: 'Share',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          this.socialSharing.share(this.new.title, this.new.source.name, '', this.new.url)
        }
      }, {
        text: 'Favorite',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
