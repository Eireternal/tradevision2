import { Injectable } from '@angular/core';
import { GridsterConfig, GridsterItem, GridsterItemComponent, GridsterPush } from 'angular-gridster2';
import { Subject } from 'rxjs';


@Injectable()
export class SidenavService {

  // With this subject you can save the sidenav state and consumed later into other pages.
  public sideNavState$: Subject<boolean> = new Subject();
  // public savedLayouts$: Subject<Array<object>> = new Subject();
  options: GridsterConfig;
  dashboard: Array<GridsterItem>;
  itemToPush: GridsterItemComponent;
  savedLayouts = [];
  order: any;
  activeLayout = '';

  getLayouts() {
    this.savedLayouts = Object.keys(localStorage);
    return this.savedLayouts;
  }

  saveLayout(layout) {
    localStorage.setItem(layout, JSON.stringify(this.dashboard));
  }

  // callType(value){
  //   console.log(value);
  //   this.order.type = value;
  //   this.loadLayout(this.order.type);
  // }

  // Check if user has saved layouts, otherwise load a default
  loadLayout(layout = null) {
    if (layout !== null) {
      // API will get layout here
      this.savedLayouts = Object.keys(localStorage);
      this.dashboard = JSON.parse(localStorage.getItem(layout));

    } else {
      // default layout
      this.dashboard = [
        {cols: 5, rows: 2, y: 0, x: 0, layerIndex: 1},
        {cols: 2, rows: 2, y: 0, x: 2, layerIndex: 1},
        {cols: 5, rows: 2, y: 0, x: 0, layerIndex: 1},
        {cols: 12, rows: 4, y: 0, x: 0, layerIndex: 1}
      ];
    }
    this.dashboard.forEach( item => {
      // tslint:disable-next-line: max-line-length
      if (this.dashboard[this.dashboard.indexOf(item)].dragEnabled === undefined) {
        this.dashboard[this.dashboard.indexOf(item)].dragEnabled = true;
        this.dashboard[this.dashboard.indexOf(item)].resizeEnabled = true;
        // this.changedOptions();
      }
    });
    return this.dashboard;
  }

  changedOptions(): void {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  pinItem($event: MouseEvent | TouchEvent, item): void {
    console.log('Pinned Item', item);
    $event.preventDefault();
    $event.stopPropagation();
    this.dashboard[this.dashboard.indexOf(item)].dragEnabled = !this.dashboard[this.dashboard.indexOf(item)].dragEnabled;
    this.dashboard[this.dashboard.indexOf(item)].resizeEnabled = !this.dashboard[this.dashboard.indexOf(item)].resizeEnabled;
    this.changedOptions();
  }

  removeItem($event: MouseEvent | TouchEvent, item): void {
    console.log('Removed Item');
    $event.preventDefault();
    $event.stopPropagation();
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  expandItem($event: MouseEvent | TouchEvent, item): void {
    console.log('Expand Item', item);
    $event.preventDefault();
    $event.stopPropagation();
    if (this.dashboard[this.dashboard.indexOf(item)].layerIndex === 1){
      this.dashboard[this.dashboard.indexOf(item)].layerIndex = 2;
      console.log('2');
    }else{
      this.dashboard[this.dashboard.indexOf(item)].layerIndex = 1;
      console.log('1');
    }
  }

  addItem(matrixType): void {
    this.dashboard.push({x: 0, y: 0, cols: 3, rows: 2, layerIndex: 1, dragEnabled: true, resizeEnabled: true, title: matrixType});
    console.log(matrixType);
  }

  initItem(item: GridsterItem, itemComponent: GridsterItemComponent): void {
    this.itemToPush = itemComponent;
  }

  pushItem(): void {
    const push = new GridsterPush(this.itemToPush); // init the service
    this.itemToPush.$item.rows += 4; // move/resize your item
    if (push.pushItems(push.fromNorth)) { // push items from a direction
      push.checkPushBack(); // check for items can restore to original position
      push.setPushedItems(); // save the items pushed
      this.itemToPush.setSize();
      this.itemToPush.checkItemChanges(this.itemToPush.$item, this.itemToPush.item);
    } else {
      this.itemToPush.$item.rows -= 4;
      push.restoreItems(); // restore to initial state the pushed items
    }
    push.destroy(); // destroy push instance
    // similar for GridsterPushResize and GridsterSwap
  }

  getItemComponent(): void {
    if (this.options.api && this.options.api.getItemComponent) {
      console.log(this.options.api.getItemComponent(this.dashboard[0]));
    }
  }


  constructor() { }

}
