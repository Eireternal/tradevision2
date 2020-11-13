import { Component, OnInit } from '@angular/core';
import { onSideNavChange, animateText, onMainContentChanged } from '../../animations/animations';
import { SidenavService } from '../../services/sidenav.service';
import { faChartPie, faChartLine, faChartBar, faChartArea, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import { faCaretSquareLeft, faCaretSquareRight} from '@fortawesome/free-solid-svg-icons';
interface Page {
  link: string;
  name: string;
  icon: object;
}

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css'],
  animations: [onSideNavChange, animateText, onMainContentChanged]
})
export class LeftMenuComponent implements OnInit {
  faChartPie = faChartPie;
  faCaretSquareLeft = faCaretSquareLeft;
  faCaretSquareRight = faCaretSquareRight;

  public sideNavState = false;
  public linkText = false;
  public onSideNavChange = false;

  public pages: Page[] = [
    {name: 'Currency', link: 'some-link', icon: faChartPie},
    {name: 'Trend', link: 'some-link', icon: faChartLine},
    {name: 'BVQ', link: 'some-link', icon: faChartBar},
    {name: 'Scalping', link: 'some-link', icon: faChartArea},
    {name: 'Starred', link: 'some-link', icon: faProjectDiagram},
  ];

  // tslint:disable-next-line: variable-name
  constructor(private _sidenavService: SidenavService) {
    this._sidenavService.sideNavState$.subscribe( res => {
      console.log(res);
      this.onSideNavChange = res;
    });
  }

  ngOnInit() {
  }

  onSidenavToggle() {
    this.sideNavState = !this.sideNavState;

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200);
    this._sidenavService.sideNavState$.next(this.sideNavState);
  }

  addItem(matrixType) {
    this._sidenavService.addItem(matrixType);
  }

}
