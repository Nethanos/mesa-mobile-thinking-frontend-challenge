import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginInformation } from '../../model/login-information';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import * as M from 'materialize-css';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private toaster: ToastrService, private formBuilder: FormBuilder) {
  }


  loginForm = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.required]
  });

  ngOnInit(): void {
    this.initializeModalListener();
  }

  initializeModalListener(): void {
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elems, {});
    });
  }


  loginOnApplication(): void {
    const loginInformation = { ...this.loginForm.value } as LoginInformation;

    this.authService.login(loginInformation).subscribe((response) => { }, () => {
      this.toaster.error("Por favor, verifique suas credenciais!", "Login incorreto!")
    })
  }


  displaySignupError(errorMessage: string): void {
    this.toaster.error(errorMessage, "Erro ao tentar registro!");
  }

}
