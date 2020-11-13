import { Component, OnInit, Input } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { onMainContentChanged } from '../../animations/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [onMainContentChanged]
})
export class HeaderComponent implements OnInit {

  @Input() sidenav: MatSidenavModule;
  isShowing: boolean;

  constructor() { }

  ngOnInit() {
  }

  toggleSidenav() {
    this.isShowing = !this.isShowing;
  }

  callMethods() {
    this.toggleSidenav();
  }

}
