import { Component } from '@angular/core';
import { SideBarService } from '../../services/side-bar.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styles: ``
})
export class SideBarComponent {

  menuItems: any[];

  constructor( private sideBarService: SideBarService ) {
    this.menuItems = sideBarService.menu
  }

}
