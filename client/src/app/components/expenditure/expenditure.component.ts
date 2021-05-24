import {Component, OnDestroy, OnInit} from '@angular/core';
import {ExpenditureService} from "../../shared/services/expenditure.service";
import {ExpenditureCategory} from "../../shared/interfaces";
import {Subscription} from "rxjs/internal/Subscription";
import {MatDialog} from "@angular/material/dialog";
import {ExpenditureListComponent} from "./expenditure-list/expenditure-list.component";

@Component({
  selector: 'app-expenditure',
  templateUrl: './expenditure.component.html',
  styleUrls: ['./expenditure.component.css']
})
export class ExpenditureComponent implements OnInit, OnDestroy {

  expCategories: ExpenditureCategory[]
  expSub: Subscription
  constructor(
    private expService: ExpenditureService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.expSub = this.expService.getCategories()
      .subscribe(
        (categories: ExpenditureCategory[]) => {
          this.expCategories = categories
        }
      )
  }

  openDialog() {
    const dialogRef = this.dialog.open(ExpenditureListComponent);
  }

  ngOnDestroy(): void {
    if (this.expSub){
      this.expSub.unsubscribe()
    }
  }

}
