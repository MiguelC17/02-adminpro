import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {

  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Main', url: '/' },
        { title: 'Progress Bar', url: '/dashboard/progress' },
        { title: 'Charts', url: '/dashboard/charts1' },
        { title: 'Promises', url: '/dashboard/promises' },
        { title: 'RXJS', url: '/dashboard/rxjs' },
      ]
    }
  ]

  constructor() { }
}
