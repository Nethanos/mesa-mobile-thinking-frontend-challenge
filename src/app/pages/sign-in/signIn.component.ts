import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginInformation } from '../../model/login-information';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import * as M from 'materialize-css';
import { Router } from '@angular/router';
import { Modal } from 'materialize-css';
@Component({
  selector: 'app-signIn',
  templateUrl: './signIn.component.html',
  styleUrls: ['./signIn.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private authService: AuthService, private toaster: ToastrService, private formBuilder: FormBuilder,
    private router: Router) {
  }

  modalInstance: any;


  loginForm = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.required]
  });

  ngOnInit(): void {
    const elem = document.getElementById('new-user-modal');

    M.Modal.init(elem);
  }

  loginOnApplication(): void {
    const loginInformation = { ...this.loginForm.value } as LoginInformation;

    this.authService.login(loginInformation).subscribe(response => {
      sessionStorage.setItem("userToken", response.token);

      this.router.navigate(['/home']);
    }, () => {
      this.toaster.error("Por favor, verifique suas credenciais!", "Login incorreto!")
    })
  }


  displaySignupError(errorMessage: string): void {
    this.toaster.error(errorMessage, "Erro ao tentar registro!");
  }


  goToHome(event: string) {

    const elem = document.querySelector('.modal');

    M.Modal.getInstance(elem).close();

    this.router.navigate(['/home']);
  }

}
