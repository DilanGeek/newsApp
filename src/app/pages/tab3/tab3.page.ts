import { Component } from '@angular/core';
import { DataLocalServiceService } from '../../services/data-local-service.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  }

  constructor(
    public dataLocalServ: DataLocalServiceService
  ) {
    this.dataLocalServ.loadFavotires();
  }


}
