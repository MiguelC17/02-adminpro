import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';



@NgModule({
  declarations: [
    BreadcrumbsComponent,
    HeaderComponent,
    SideBarComponent,
  ],
  exports: [
    BreadcrumbsComponent,
    HeaderComponent,
    SideBarComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
