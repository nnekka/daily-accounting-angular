import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {GainsCategoriesComponent} from "./gains-categories/gains-categories.component";
import {CreateGainCategoryComponent} from "./create-gain-category/create-gain-category.component";
import {CreateGainItemComponent} from "./create-gain-item/create-gain-item.component";
import {GainService} from "../../shared/services/gain.service";
import {ActivatedRoute, Params} from "@angular/router";
import {MaterialService} from "../../shared/services/material.service";
import {Subscription} from "rxjs/internal/Subscription";
import {Gain, GainCategory} from "../../shared/interfaces";
import {ExpenditureService} from "../../shared/services/expenditure.service";

@Component({
  selector: 'app-gains',
  templateUrl: './gains.component.html',
  styleUrls: ['./gains.component.css']
})
export class GainsComponent implements OnInit, OnDestroy {

  gains = []
  displayedColumns: string[] = [ 'date', 'time', 'category', 'itemPrice', 'edit', 'delete']
  sub: Subscription
  gainCategories: GainCategory[]

  constructor(
    public dialog: MatDialog,
    private gainService: GainService,
    private route: ActivatedRoute,
    private matService: MaterialService,
    private expService: ExpenditureService
  ) {}

  ngOnInit(): void {

    this.getParams()
    this.refreshGains()

    this.gainService.getGainCategories()
      .subscribe(
        (categories: GainCategory[]) => {
          this.gainCategories = categories
        }
      )
    this.expService.refreshSubject.subscribe(
      (state) => {
        if (state){
          this.refreshGains()
        }
      }
    )
  }

  private getParams(){
    this.route.queryParams.subscribe(
      (params: Params) => {
        if (params['gainCategoryUpdated']){
          this.matService.showMessage('Категория обновлена!')
        } else if (params['gainUpdated']){
          this.matService.showMessage('Доход обновлен')
        }
      }
    )
  }

  private refreshGains() {
    this.gainService.getGains()
      .subscribe(
        (gains: Gain[]) => {
          this.gains = gains
        }
      )
  }

  openDialog(){
    this.dialog.open(GainsCategoriesComponent)
  }

  onAddCategoryDialog(){
    this.dialog.open(CreateGainCategoryComponent)
  }

  onAddGainDialog(){
    this.dialog.open(CreateGainItemComponent)
  }

  onDeleteGain(id: string){
    if (window.confirm('Точно удалить?')){
      this.gainService.deleteGain(id).subscribe(
        (data) => {
          this.expService.refreshSubject.next(true)
          this.refreshGains()
          this.matService.showMessage(`${data.message}`)
        }
      )
    }
  }

  ngOnDestroy(): void{
    if (this.sub){
      this.sub.unsubscribe()
    }
  }

}
