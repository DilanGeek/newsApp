import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  @Input() new: Article;
  @Input() index: number;

  constructor(private inAppBrowser: InAppBrowser) {}

  ngOnInit() {}

  openNew = () => {
    const browser = this.inAppBrowser.create(this.new.url, '_system');
  };
}
