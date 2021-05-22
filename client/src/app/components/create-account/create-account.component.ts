import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Currency} from "../../shared/interfaces";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  form: FormGroup

  currencyArray: string[] = ['рубль', 'евро', 'доллар']
  currency: string


  constructor() { }

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl(null),
      total: new FormControl(null)
    })
  }

  onSubmit(){
    let curr = ''
    if (this.currency == 'рубль'){
      curr = 'rub'
    } else if (this.currency == 'евро'){
      curr = 'euro'
    } else if (this.currency == 'доллар'){
      curr = 'dollar'
    }

    console.log(curr)
  }

}




