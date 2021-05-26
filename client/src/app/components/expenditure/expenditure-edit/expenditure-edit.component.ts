import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ExpenditureService} from "../../../shared/services/expenditure.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ExpenditureCategory} from "../../../shared/interfaces";
import {MatDialog} from "@angular/material/dialog";
import {ExpenditureListComponent} from "../expenditure-list/expenditure-list.component";
import {MaterialService} from "../../../shared/services/material.service";


@Component({
  selector: 'app-expenditure-edit',
  templateUrl: './expenditure-edit.component.html',
  styleUrls: ['./expenditure-edit.component.css']
})
export class ExpenditureEditComponent implements OnInit {

  form: FormGroup
  categoryId: string
  editMode = false
  category: ExpenditureCategory

  constructor(
    private expService: ExpenditureService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private matService: MaterialService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    })

    this.getParams()
  }

  private getParams(){
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        if (params.has('id')){
          this.categoryId = params.get('id')
          this.editMode = true
          this.expService.getCategoryById(this.categoryId).subscribe(
            (category: ExpenditureCategory) => {
              this.category = category
              this.form.setValue({
                name: category.name
              })
            }
          )
        }
      }
    )
  }

  onSubmit(){
    if (this.editMode){

      this.expService.updateExpCategoryName(this.form.value.name, this.categoryId)
        .subscribe(
          (category: ExpenditureCategory) => {
            this.dialog.open(ExpenditureListComponent)
            this.router.navigate(['/expenditure'])
          }
        )
    } else {
      this.expService.createExpCategory(this.form.value.name)
        .subscribe(
          (category: ExpenditureCategory) => {
            this.dialog.closeAll()
            this.matService.showMessage(`Категория ${category.name} успешно добавлена!`)
          }
        )
    }

  }

}
