import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



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
    CommonModule,
    RouterModule,
    FormsModule,
  ]
})
export class SharedModule { }
