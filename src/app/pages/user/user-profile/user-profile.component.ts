import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../model/user';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private userService: UserService,
    private router: Router, private formBuilder: FormBuilder) { }

  user: User;

  isViewingUser = true;

  isEditingUser = !this.isViewingUser;


  editUserForm = this.formBuilder.group({
    first_name: ['', Validators.compose([Validators.required])],
    last_name: ['', Validators.required]
  });


  async ngOnInit(): Promise<void> {

    this.user = await this.retrieveUserFromApi();
    console.log(this.user);


  }

  enableUserEdition() {
    this.isViewingUser = !this.isViewingUser;
    this.isEditingUser = !this.isEditingUser;
    this.editUserForm.reset();
  }



  async retrieveUserFromApi(): Promise<User> {

    const id: string = this.activeRoute.snapshot.params['id'];

    try {
      const apiUserResponse = await this.userService.retrieve(id).toPromise();

      if (apiUserResponse.data) {
        return apiUserResponse.data;
      }
    } catch (exception) {
      this.router.navigate(['']);

    }
  }

  updateUser() {
    const userToBeUpdated = {
      id: this.user.id,
      ...this.editUserForm.value
    } as User;

    this.userService.update(userToBeUpdated).subscribe(response => {
      this.user = {
        ...this.user,
        ...response
      }
      console.log(this.user);
      this.enableUserEdition();
    });
  }


}
