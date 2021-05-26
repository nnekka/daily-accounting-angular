import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(
    public snackBar: MatSnackBar
  ) {}

  showMessage(message: string){
    this.snackBar.open(`${message}`, 'Ok', {
      duration: 3000,
      panelClass: 'my-custom-snackbar'
    })
  }
}
