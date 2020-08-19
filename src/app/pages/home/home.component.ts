import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginInformation } from '../../model/login-information';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import * as M from 'materialize-css';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService, private toaster: ToastrService, private formBuilder: FormBuilder,
    private router: Router) {
  }

  modalInstance: any;


  loginForm = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.required]
  });

  ngOnInit(): void {
    this.initializeModalListener();
  }

  ngOnDestroy(): void {
    this.closeModal();
  }

  initializeModalListener(): void {
    document.addEventListener('DOMContentLoaded', () => {
      const elem = document.querySelector('.modal');

      M.Modal.init(elem);
    });
  }

  closeModal(): void {
    const modal = M.Modal.getInstance(document.querySelector('.modal'));
    modal.destroy();
  }


  loginOnApplication(): void {
    const loginInformation = { ...this.loginForm.value } as LoginInformation;

    this.authService.login(loginInformation).subscribe(response => {
      sessionStorage.setItem("userToken", response.token);
      this.goToUserProfile("1");
    }, () => {
      this.toaster.error("Por favor, verifique suas credenciais!", "Login incorreto!")
    })
  }


  displaySignupError(errorMessage: string): void {
    this.toaster.error(errorMessage, "Erro ao tentar registro!");
  }


  goToUserProfile(event: string) {
    this.router.navigate([`user/profile/${event}`])
  }

}
