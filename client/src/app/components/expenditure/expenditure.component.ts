import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ExpenditureService} from "../../shared/services/expenditure.service";
import {Expenditure, ExpenditureCategory} from "../../shared/interfaces";
import {Subscription} from "rxjs/internal/Subscription";
import {MatDialog} from "@angular/material/dialog";
import {ExpenditureListComponent} from "./expenditure-list/expenditure-list.component";
import {ExpenditureEditComponent} from "./expenditure-edit/expenditure-edit.component";
import {CreateExpenditureComponent} from "./create-expenditure/create-expenditure.component";
import {MaterialService} from "../../shared/services/material.service";

@Component({
  selector: 'app-expenditure',
  templateUrl: './expenditure.component.html',
  styleUrls: ['./expenditure.component.css']
})
export class ExpenditureComponent implements OnInit, OnDestroy {


  isPending = false
  displayedColumns: string[] = [ 'date', 'time', 'category', 'itemPrice', 'description', 'edit', 'delete']

  expCategories: ExpenditureCategory[]
  expSub: Subscription

  expenditures: Expenditure[]
  expenditureSub: Subscription
  toRefresh = false


  constructor(
    private expService: ExpenditureService,
    public dialog: MatDialog,
    private matService: MaterialService
  ) {}

  ngOnInit(): void {


    this.isPending = true
    this.expSub = this.expService.getCategories(100,1)
      .subscribe(
        (response) => {
          this.expCategories = response.categories
          console.log(this.expCategories)
        }
      )
    this.refresh()
    this.expService.refreshSubject.subscribe(
      (data) => {
        if (data){
          this.refresh()
        }
      }
    )

  }

  refresh(){
    this.expenditureSub = this.expService.getExpenditures()
      .subscribe(
        (exps: Expenditure[]) => {
          this.expenditures = exps
          this.isPending = false
        }
      )
  }

  openDialog() {
    this.dialog.open(ExpenditureListComponent);
  }

  onOpenAddDialog(){
    this.dialog.open(ExpenditureEditComponent)
  }

  onAddExpenditureDialog(){
    this.dialog.open(CreateExpenditureComponent)
  }

  onDeleteExpenditure(id: string){
    if (window.confirm('Точно удалить?')){
      this.expService.deleteExpenditure(id).subscribe(
        (data) => {
          this.expService.refreshSubject.next(true)
          this.matService.showMessage(`${data.message}`)
        }
      )
    }

  }

  ngOnDestroy(): void {
    if (this.expSub){
      this.expSub.unsubscribe()
    }
    if (this.expenditureSub){
      this.expenditureSub.unsubscribe()
    }
  }



}
