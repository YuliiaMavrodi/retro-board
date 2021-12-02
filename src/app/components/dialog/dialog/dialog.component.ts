import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogBodyComponent} from "../dialog-body/dialog-body.component";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  @Input() question: string | undefined
  @Output() emitText: EventEmitter<any> = new EventEmitter<any>()

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBodyComponent, {
      width: '400px',
      data: {question: this.question},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.emitText.emit(result)
    });
  }
}

