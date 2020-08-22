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
export class NewUserComponent implements OnInit {

  constructor(private authService: AuthService, private userService: UserService, private localStorageManager: LocalStorageManager) { }

  @Output() onSignupError = new EventEmitter<string>();

  @Output() onSuccessFullRegistration = new EventEmitter<any>();


  signUpForm = new FormGroup(
    {

      email: new FormControl(''),
      password: new FormControl('')
    }
  )

  ngOnInit(): void {
  }


  signUp() {
    const newUser = { ...this.signUpForm.value } as User;

    this.authService.signUp(newUser).subscribe((response) => {
      if (response.id) {
        this.onSuccessFullRegistration.emit(response.id);
      }
    },
      (error) => {
        this.onSignupError.emit("Houve um problema com seu registro, por favor, verifique seus dados!");
      });

  }

}
