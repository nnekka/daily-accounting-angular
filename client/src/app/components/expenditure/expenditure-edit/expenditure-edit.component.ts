import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ExpenditureService} from "../../../shared/services/expenditure.service";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-expenditure-edit',
  templateUrl: './expenditure-edit.component.html',
  styleUrls: ['./expenditure-edit.component.css']
})
export class ExpenditureEditComponent implements OnInit {

  form: FormGroup
  categoryId: string
  editMode = false

  constructor(
    private expService: ExpenditureService,
    private route: ActivatedRoute
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
        }
      }
    )
  }

  onSubmit(){
    console.log(this.form.value)
  }

}
