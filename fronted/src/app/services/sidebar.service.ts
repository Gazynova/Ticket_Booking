import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebarOpenSource = new BehaviorSubject<boolean>(false);
  sidebarOpen$ = this.sidebarOpenSource.asObservable();

  toggleSidebar() {
    this.sidebarOpenSource.next(!this.sidebarOpenSource.value);
  }

  openSidebar() {
    this.sidebarOpenSource.next(true);
  }

  closeSidebar() {
    this.sidebarOpenSource.next(false);
  }
}
