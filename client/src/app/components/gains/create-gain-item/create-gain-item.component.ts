import { Component, OnInit } from '@angular/core';
import {GainService} from "../../../shared/services/gain.service";
import {AccountService} from "../../../shared/services/account.service";
import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Account, Expenditure, Gain, GainCategory} from "../../../shared/interfaces";
import {ExpenditureService} from "../../../shared/services/expenditure.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MaterialService} from "../../../shared/services/material.service";

@Component({
  selector: 'app-create-gain-item',
  templateUrl: './create-gain-item.component.html',
  styleUrls: ['./create-gain-item.component.css']
})
export class CreateGainItemComponent implements OnInit {

  form: FormGroup
  editMode = false
  gainCategories: GainCategory[]
  accounts: Account[]
  selectedGainCategoryId: string
  selectedAccountId: string
  gainId: string
  gainToEdit: Gain


  constructor(
    private gainService: GainService,
    private accountService: AccountService,
    private dialog: MatDialog,
    private expService: ExpenditureService,
    private route: ActivatedRoute,
    private router: Router,
    public matService: MaterialService
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.getParams()


    this.gainService.gainCategoriesSubject.subscribe(
      (gainCategories: GainCategory[]) => {
        if (gainCategories){
          this.gainCategories = gainCategories
        }
      }
    )

    this.accountService.accountsSubject
      .subscribe(
        (accounts: Account[]) => {
          this.accounts = accounts
        }
      )
  }

  private initForm(){
    this.form = new FormGroup({
      sum: new FormControl(null, Validators.required)
    })
  }

  private getParams(){
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        if (params.has('id')) {
          this.gainId = params.get('id')
          this.gainService.getGain(this.gainId).subscribe(
            (gain: Gain) => {
              this.gainToEdit = gain
              this.editMode = true
              this.form.setValue({
                sum: this.gainToEdit.sum
              })
            }
          )
        }
      }
    )
  }

  selectGainCategory(id: string){
    this.selectedGainCategoryId = id
  }
  selectAccount(id: string){
    this.selectedAccountId = id
  }

  onSubmit(){
    if (this.editMode){
      this.gainService.updateGain(this.form.value.sum, this.gainId)
        .subscribe(
          (gain: Gain) => {
            this.expService.refreshSubject.next(true)
            this.router.navigate(['/gains'], {
              queryParams: {
                gainUpdated: true
              }
            })
          }
        )
    } else {
      this.gainService.createGain(
        this.form.value.sum,
        this.selectedGainCategoryId,
        this.selectedAccountId
      ).subscribe(
        (data) => {
          this.dialog.closeAll()
          this.expService.refreshSubject.next(true)
        }
      )
    }
  }

}
