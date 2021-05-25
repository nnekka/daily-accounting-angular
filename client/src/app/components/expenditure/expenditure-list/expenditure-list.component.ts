import {Component, OnDestroy, OnInit} from '@angular/core';
import {ExpenditureService} from "../../../shared/services/expenditure.service";
import {ExpenditureCategory} from "../../../shared/interfaces";
import {Subscription} from "rxjs/internal/Subscription";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-expenditure-list',
  templateUrl: './expenditure-list.component.html',
  styleUrls: ['./expenditure-list.component.css']
})
export class ExpenditureListComponent implements OnInit, OnDestroy {

  expCategories: ExpenditureCategory[]
  expSub: Subscription
  isPending = false

  constructor(
    private expService: ExpenditureService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.isPending = true
    this.refresh()
  }

  refresh(){
    this.expSub = this.expService.getCategories()
      .subscribe(
        (categories: ExpenditureCategory[]) => {
          this.expCategories = categories
          this.isPending = false
        }
      )
  }

  onDeleteCategory(id: string){
    this.expService.deleteCategory(id).subscribe(
      (data) => {
        this.refresh()
        this.snackBar.open(`${data.message}`, 'Ok', {
          duration: 3000,
          panelClass: 'my-custom-snackbar'
        })
      }
    )
  }

  onCloseDialog(){
    this.dialog.closeAll()
  }

  ngOnDestroy(): void {
    if (this.expSub){
      this.expSub.unsubscribe()
    }
  }

}
