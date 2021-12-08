import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { interval, observable, Observable, Subscription } from 'rxjs';
import { ToasterPosition } from 'src/models/toast.model';
import { AuthService } from 'src/services/auth.service';
import { ASBToastService } from 'src/services/toast.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoading: boolean = true;
  user: string = 'Konstantinos';
  authForm: FormGroup;

  constructor(
    private toastr: ASBToastService) { }

  ngOnInit() {

    this.authForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'password': new FormControl(null, [Validators.required]),
      'stayLogged': new FormControl(false, [Validators.required])
    })
    this.isLoading = false;
  }

  onSubmit(authFormData: any) {
    if (authFormData.username == 'akb' && authFormData.password == 'akb') {
      this.toastr.asbSuccessToastr('Welcome ' + this.user, 'Successful Login', ToasterPosition.bottomLeft, 3000, true)
    } else {
      this.toastr.asbErrorToastr('Wrong Credentials', 'Error', ToasterPosition.bottomLeft, 3000, true)
    }
  }
}