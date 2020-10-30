import { Component } from '@angular/core';
import { SidenavService } from './services/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tradevision';
  public onSideNavChange: boolean;

  constructor(private sidenavService: SidenavService) {
    this.sidenavService.sideNavState$.subscribe( res => {
      console.log(res);
      this.onSideNavChange = res;
    });
  }
}
