import {Component, OnDestroy, OnInit} from '@angular/core';
import {ExpenditureService} from "../../../shared/services/expenditure.service";
import {ExpenditureCategory} from "../../../shared/interfaces";
import {Subscription} from "rxjs/internal/Subscription";
import {MatDialog} from "@angular/material/dialog";
import {MaterialService} from "../../../shared/services/material.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-expenditure-list',
  templateUrl: './expenditure-list.component.html',
  styleUrls: ['./expenditure-list.component.css']
})
export class ExpenditureListComponent implements OnInit, OnDestroy {

  expCategories: ExpenditureCategory[]
  expSub: Subscription
  isPending = false

  //pagination
  totalCategories: number
  categoriesPerPage = 10
  pageSizeOptions = [5, 10]
  currentPage = 1

  constructor(
    private expService: ExpenditureService,
    public dialog: MatDialog,
    private matService: MaterialService
  ) { }

  ngOnInit(): void {
    this.isPending = true
    this.refresh(this.categoriesPerPage, this.currentPage)

  }

  refresh(perPage: number, curr: number){
    this.expSub = this.expService.getCategories(perPage, curr)
      .subscribe(
        (response) => {
          this.expCategories = response.categories
          this.isPending = false
          this.totalCategories = response.amount
        }
      )
  }

  onDeleteCategory(id: string){
    this.expService.deleteCategory(id).subscribe(
      (data) => {
        this.refresh(this.categoriesPerPage, this.currentPage)
        this.matService.showMessage(`${data.message}`)
      }
    )
  }

  onCloseDialog(){
    this.dialog.closeAll()
  }

  onChangedPage(pageData: PageEvent){
    this.currentPage = pageData.pageIndex + 1
    this.categoriesPerPage = pageData.pageSize
    this.refresh(this.categoriesPerPage, this.currentPage)
  }

  ngOnDestroy(): void {
    if (this.expSub){
      this.expSub.unsubscribe()
    }
  }

}
