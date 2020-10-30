import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '../../../node_modules/@angular/core';
import {CompactType, GridsterConfig, GridsterItem, GridsterItemComponent, GridsterPush, GridType} from 'angular-gridster2';
import { faTimesCircle, faWindowClose } from '@fortawesome/free-regular-svg-icons';
import { faExpand, faCompress, faThumbtack } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-gridsystem',
  templateUrl: './gridsystem.component.html',
  styleUrls: ['./gridsystem.component.scss']
})
export class GridsystemComponent implements OnInit {
  options: GridsterConfig;
  dashboard: Array<GridsterItem>;
  itemToPush: GridsterItemComponent;
  savedLayouts = [];
  order: any;
  faThumbtack = faThumbtack;
  faTimesCircle = faTimesCircle;
  faExpand = faExpand;
  faCompress = faCompress;
  faWindowClose = faWindowClose;

  constructor() { }

  ngOnInit(): void {
    this.savedLayouts = Object.keys(localStorage);
    console.log(JSON.stringify(this.savedLayouts));
    this.options = {
      margin: 4,
      outerMargin: true,
      setGridSize: false,
      gridType: GridType.Fit,
      fixedRowHeight: 100,
      fixedColWidth: 100,
      minRows: 6,
      maxRows: 12,
      minItemRows: 1,
      maxItemRows: 12,
      minCols: 12,
      maxCols: 12,
      maxItemCols: 12,
      minItemCols: 1,
      // defaultItemCols: 1,
      // maxItemArea: 2500,
      // minItemArea: 1,
      allowMultiLayer: true,
      swap: true,
      displayGrid: 'onDrag&Resize',
      // compactType: 'compactUp', // 'compactUp&Left',compactLeft&Up'
      pushItems: true,
      resizable: { enabled: true },
      draggable: {
        enabled: true,
        ignoreContent: true,
        dragHandleClass: 'drag-handler'
      }
    };
    this.order = {
      type: 'Layout'
    };

    this.loadLayout();

    // this.dashboard = [
    //   {cols: 2, rows: 1, y: 0, x: 0, layerIndex: 1},
    //   {cols: 2, rows: 2, y: 0, x: 2, layerIndex: 1}
    // ];

    this.dashboard.forEach( item => {
      // tslint:disable-next-line: max-line-length
      if (this.dashboard[this.dashboard.indexOf(item)].dragEnabled === undefined) {
        this.dashboard[this.dashboard.indexOf(item)].dragEnabled = true;
        this.dashboard[this.dashboard.indexOf(item)].rezizeEnabled = true;
        this.changedOptions();
      }
    });
    console.log(this.dashboard);
  }

  saveLayout() {
    localStorage.setItem('Layout', JSON.stringify(this.dashboard));

    const data = JSON.parse(localStorage.getItem(this.order.type));

    console.log(data);
  }

  callType(value){
    console.log(value);
    this.order.type = value;
    this.loadLayout();
  }

  loadLayout() {
    const data = JSON.parse(localStorage.getItem(this.order.type));
    this.dashboard = data;
    console.log(data);
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

  addItem(): void {
    this.dashboard.push({x: 0, y: 0, cols: 3, rows: 2, layerIndex: 1, dragEnabled: true, resizeEnabled: true});
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
}
