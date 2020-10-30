import { Component, OnInit } from '@angular/core';
import { onSideNavChange, animateText } from '../../animations/animations';
import { SidenavService } from '../../services/sidenav.service';


interface Page {
  link: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css'],
  animations: [onSideNavChange, animateText]
})
export class LeftMenuComponent implements OnInit {

  public sideNavState = false;
  public linkText = false;

  public pages: Page[] = [
    {name: 'Inbox', link: 'some-link', icon: 'inbox'},
    {name: 'Starred', link: 'some-link', icon: 'star'},
    {name: 'Send email', link: 'some-link', icon: 'send'},
  ];

  // tslint:disable-next-line: variable-name
  constructor(private _sidenavService: SidenavService) { }

  ngOnInit() {
  }

  onSinenavToggle() {
    this.sideNavState = !this.sideNavState;

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200);
    this._sidenavService.sideNavState$.next(this.sideNavState);
  }

}
