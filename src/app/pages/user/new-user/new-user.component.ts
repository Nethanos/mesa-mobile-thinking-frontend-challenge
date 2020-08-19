import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../../../model/user';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  constructor(private authService: AuthService) { }

  @Output() onSignupError = new EventEmitter<string>();


  signUpForm = new FormGroup(
    {

      userName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('')
    }
  )

  ngOnInit(): void {
  }


  signUp() {
    const newUser = { ...this.signUpForm.value } as User;

    this.authService.signUp(newUser).subscribe((response) => { console.log(response) },
      (error) => {
        console.error(error);
        this.onSignupError.emit("Houve um problema com seu registro, por favor, verifique seus dados!");
      });

  }

}
