import {Component, OnDestroy, OnInit} from '@angular/core';
import {GainService} from "../../../shared/services/gain.service";
import {Subscription} from "rxjs/internal/Subscription";
import {GainCategory} from "../../../shared/interfaces";
import {MatDialog} from "@angular/material/dialog";
import {MaterialService} from "../../../shared/services/material.service";

@Component({
  selector: 'app-gains-categories',
  templateUrl: './gains-categories.component.html',
  styleUrls: ['./gains-categories.component.css']
})
export class GainsCategoriesComponent implements OnInit, OnDestroy {

  sub: Subscription
  gainCategories: GainCategory[]
  isPending = false

  constructor(
    private gainService: GainService,
    public dialog: MatDialog,
    private matService: MaterialService
  ) { }

  ngOnInit(): void {
    this.isPending = true
    this.refreshGainCategories()
  }

  private refreshGainCategories(){
    this.sub = this.gainService.getGainCategories()
      .subscribe(
        (categories: GainCategory[]) => {
          this.gainCategories = categories
          this.isPending = false
        }
      )
  }

  onDeleteCategory(id: string){
    if (window.confirm('Точно удалить?')){
      this.gainService.deleteGainCategory(id).subscribe(
        (data) => {
          this.refreshGainCategories()
          this.matService.showMessage(`${data.message}`)
        }
      )
    }
  }

  ngOnDestroy(): void {
    if (this.sub){
      this.sub.unsubscribe()
    }
  }

}
