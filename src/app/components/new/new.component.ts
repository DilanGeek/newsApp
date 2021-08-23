import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from "@ionic/angular";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { DataLocalServiceService } from '../../services/data-local-service.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  @Input() new: Article;
  @Input() index: number;
  @Input() favorites = false;

  constructor(private inAppBrowser: InAppBrowser,
    private actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing,
    private dataLocalServ: DataLocalServiceService
  ) { }

  ngOnInit() { }

  openNew = () => {
    const browser = this.inAppBrowser.create(this.new.url, '_system');
  };

  launchMenu = async () => {


    let addDeleteBtn;

    if (this.favorites) {
      addDeleteBtn = {
        text: 'Remove',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          this.dataLocalServ.deleteNew(this.new);
        }
      }
    } else {
      addDeleteBtn = {
        text: 'Favorite',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          this.dataLocalServ.saveNew(this.new);
        }
      }
    }

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [{
        text: 'Share',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          this.socialSharing.share(this.new.title, this.new.source.name, '', this.new.url)
        }
      },
        addDeleteBtn,
      {
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
