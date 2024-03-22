import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SideBarService } from '../services/side-bar.service';

declare function customInitFunctions(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: ``
})
export class PagesComponent implements OnInit {

  constructor(
    private settingsService: SettingsService,
    private sideBarService: SideBarService
  ) { }

  ngOnInit(): void {
    customInitFunctions()
    this.sideBarService.cargarMenu()
  }

}
