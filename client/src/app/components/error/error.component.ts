import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  message = 'An unknown error'

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
  }

  onClose(){
    this.dialog.closeAll()
  }

}
