import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Expenditure, ExpenditureCategory} from "../../../shared/interfaces";
import {ExpenditureService} from "../../../shared/services/expenditure.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {Account} from "../../../shared/interfaces";
import {AccountService} from "../../../shared/services/account.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MaterialService} from "../../../shared/services/material.service";

@Component({
  selector: 'app-create-expenditure',
  templateUrl: './create-expenditure.component.html',
  styleUrls: ['./create-expenditure.component.css']
})
export class CreateExpenditureComponent implements OnInit {

  form: FormGroup
  expCategories: ExpenditureCategory[]
  selectedCategoryId: string
  accounts: Account[]
  selectedAccountId: string
  editMode = false
  expenditureId: string
  expenditureToEdit: Expenditure


  constructor(
    private expService: ExpenditureService,
    public dialog: MatDialog,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private matService: MaterialService
  ) {
  }

  ngOnInit(): void {
    this.expService.expCategoriesSubject.subscribe(
      (response) => {
        this.expCategories = response.categories
      }
    )
    this.initForm()
    this.getParams()

    this.accountService.getAccounts()
      .subscribe(
        (accounts: Account[]) => {
          this.accounts = accounts
        }
      )

  }

  private getParams() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        if (params.has('id')) {
          this.expenditureId = params.get('id')
          this.expService.getExpenditure(this.expenditureId).subscribe(
            (exp: Expenditure) => {
              this.expenditureToEdit = exp
              this.editMode = true
              this.form.setValue({
                description: this.expenditureToEdit.description,
                itemPrice: this.expenditureToEdit.itemPrice
              })
            }
          )
        }
      }
    )
  }

  private initForm() {
    this.form = new FormGroup({
      description: new FormControl(null),
      itemPrice: new FormControl(null, Validators.required)
    })
  }

  selectCategory(categoryId: string) {
    this.selectedCategoryId = categoryId
  }

  selectAccount(accountId: string) {
    this.selectedAccountId = accountId

  }

  onSubmit() {

    const accountSum = this.accounts.find(p => p._id.toString() === this.selectedAccountId)
      ? this.accounts.find(p => p._id.toString() === this.selectedAccountId).total
      : this.accounts.find(p => p._id.toString() === this.expenditureToEdit.account).total

    if (this.form.value.itemPrice > accountSum) {
      this.matService.showMessage(`На этом счету не хватает денег :(`)
    } else {
      if (this.editMode) {
        this.expService.updateExpenditure(
          this.form.value.itemPrice,
          this.form.value.description,
          this.expenditureToEdit.account,
          this.expenditureId
        )
          .subscribe(
            (exp: Expenditure) => {
              this.router.navigate(['/expenditure'])
              this.expService.refreshSubject.next(true)
            }
          )
      } else {
        this.expService.addExpenditure(
          this.form.value.itemPrice,
          this.form.value.description,
          this.selectedCategoryId,
          this.selectedAccountId
        )
          .subscribe(
            (exp: Expenditure) => {
              this.dialog.closeAll()
              this.expService.refreshSubject.next(true)
            }
          )
      }

    }

  }

}
