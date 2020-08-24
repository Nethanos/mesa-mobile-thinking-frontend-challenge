import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../../../model/user';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { LocalStorageManager } from '../../../middlewares/local-storage-manager';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent {

  constructor(private authService: AuthService) { }

  @Output() onSignupError = new EventEmitter<string>();

  @Output() onSuccessFullRegistration = new EventEmitter<any>();


  signUpForm = new FormGroup(
    {

      email: new FormControl(''),
      password: new FormControl('')
    }
  )

  signUp(): void {
    const newUser = { ...this.signUpForm.value } as User;

    this.authService.signUp(newUser).subscribe((response) => {
      if (response.id) {
        this.onSuccessFullRegistration.emit(response.id);
      }
    },
      () => {
        this.onSignupError.emit("There was a problem with your registration, please, Check your data!");

      }
    );
  }
}
