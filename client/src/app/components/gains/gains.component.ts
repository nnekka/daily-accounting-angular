import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {GainsCategoriesComponent} from "./gains-categories/gains-categories.component";
import {CreateGainCategoryComponent} from "./create-gain-category/create-gain-category.component";
import {CreateGainItemComponent} from "./create-gain-item/create-gain-item.component";
import {GainService} from "../../shared/services/gain.service";
import {ActivatedRoute, Params} from "@angular/router";
import {MaterialService} from "../../shared/services/material.service";

@Component({
  selector: 'app-gains',
  templateUrl: './gains.component.html',
  styleUrls: ['./gains.component.css']
})
export class GainsComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private gainService: GainService,
    private route: ActivatedRoute,
    private matService: MaterialService
  ) {}

  ngOnInit(): void {
    this.getParams()
  }

  private getParams(){
    this.route.queryParams.subscribe(
      (params: Params) => {
        if (params['gainUpdated']){
          this.matService.showMessage('Категория обновлена!')
        }
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

}
