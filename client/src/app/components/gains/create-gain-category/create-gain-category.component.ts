import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {GainService} from "../../../shared/services/gain.service";
import {GainCategory} from "../../../shared/interfaces";
import {MaterialService} from "../../../shared/services/material.service";

@Component({
  selector: 'app-create-gain-category',
  templateUrl: './create-gain-category.component.html',
  styleUrls: ['./create-gain-category.component.css']
})
export class CreateGainCategoryComponent implements OnInit {

  form: FormGroup
  editMode = false
  gainCategoryId: string
  gainCategory: GainCategory

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private gainService: GainService,
    private router: Router,
    private matService: MaterialService
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.getParams()
  }

  private initForm(){
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    })
  }

  private getParams(){
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        if (params.has('id')){
          this.gainCategoryId = params.get('id')
          this.editMode = true
          this.getOneCategory(this.gainCategoryId)
        }
      }
    )
  }

  private getOneCategory(id: string){
    this.gainService.getGainCategory(id)
      .subscribe(
        (category: GainCategory) => {
          this.gainCategory = category
          this.form.setValue({
            name: this.gainCategory.name
          })
        }
      )
  }

  onSubmit(){
    if (this.editMode){
      this.gainService.updateGainCategory(this.form.value.name, this.gainCategoryId)
        .subscribe(
          () => this.router.navigate(['/gains'], {
            queryParams: {
              gainUpdated: true
            }
          })
        )
    } else {
      this.gainService.createGainCategory(this.form.value.name)
        .subscribe(
          () => {
            this.dialog.closeAll()
            this.matService.showMessage(`Категория ${this.form.value.name} успешно добавлена`)
          }
        )
    }
  }

}
