import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SidenavService } from '../../services/sidenav.service';

export interface DialogData {
  layoutName: string;
  name: string;
}

@Component({
  selector: 'app-matrix-popup',
  templateUrl: './matrix-popup.component.html',
  styleUrls: ['./matrix-popup.component.css']
})
export class MatrixPopupComponent implements OnInit {

  layoutName: string;
  name: string;

  // tslint:disable-next-line: variable-name
  constructor(public dialog: MatDialog, private _sidenavService: SidenavService) {}

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '250px',
      data: {name: this.name, layoutName: this.layoutName}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result !== undefined) {
        this.layoutName = result;
        this._sidenavService.saveLayout(this.layoutName);
      }
    });
  }

}

@Component({
  selector: 'app-popup',
  templateUrl: 'popup.html',
})
export class PopupComponent {

  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
