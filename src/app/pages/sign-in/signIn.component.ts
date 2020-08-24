import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginInformation } from '../../model/login-information';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import * as M from 'materialize-css';
import { Router } from '@angular/router';
import { LocalStorageManager } from '../../middlewares/local-storage-manager';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-signIn',
  templateUrl: './signIn.component.html',
  styleUrls: ['./signIn.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private authService: AuthService, private toaster: ToastrService, private formBuilder: FormBuilder,
    private router: Router, private localStorageManager: LocalStorageManager, private userService: UserService) {
  }

  private _mockedLogin: string;


  loginForm = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.required]
  });

  ngOnInit(): void {
    const elem = document.getElementById('new-user-modal');

    M.Modal.init(elem);
  }

  async loginOnApplication(): Promise<void> {
    const loginInformation = { ...this.loginForm.value } as LoginInformation;

    const apiLoginResponse = await this.authService.login(loginInformation).toPromise();

    this.saveUserToken(apiLoginResponse);

    this.saveUserInfo();

    this.router.navigate(['/map'])
  }


  displaySignupError(errorMessage: string): void {
    this.toaster.error(errorMessage, "Error on registration!");
  }

  saveUserToken(apiResponse: any): void {
    if (apiResponse.token) {
      this.localStorageManager.saveUserToken(apiResponse.token);
      return;
    }
    this.toaster.error("Please, check your credentials", "Failed to log in!")
  }

  async saveUserInfo(): Promise<void> {
    const userInfo = await this.userService.retrieve(this._mockedLogin || '1').toPromise();
    this.localStorageManager.saveUser(userInfo.data);
  }


  displaySuccessFullRegistration(id: string) {

    this._mockedLogin = id.toString();

    console.log(id);

    const elem = document.querySelector('.modal');

    M.Modal.getInstance(elem).close();

    this.toaster.success('Use your login information to enter the application!', 'Successfull registered!')
  }

}
