import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { GridsterModule } from 'angular-gridster2';
import { GridsystemComponent } from './gridsystem/gridsystem.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimesCircle, faWindowClose } from '@fortawesome/free-regular-svg-icons';
import { faExpand, faCompress, faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { HeaderComponent } from './components/header/header.component';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { MaterialModule } from './material.module';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { SidenavService } from './services/sidenav.service';

@NgModule({
  declarations: [
    AppComponent,
    GridsystemComponent,
    HeaderComponent,
    LeftMenuComponent
  ],
  imports: [
    BrowserModule,
    GridsterModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [ SidenavService ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(faTimesCircle, faExpand, faWindowClose, faCompress, faThumbtack);
  }
}
