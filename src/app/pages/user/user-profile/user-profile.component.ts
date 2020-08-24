import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../model/user';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private userService: UserService,
    private router: Router, private formBuilder: FormBuilder, private toasterService: ToastrService,
    private authService: AuthService) { }

  user: User;

  editUserModal: M.Modal;

  logoutModal: M.Modal;


  editUserForm = this.formBuilder.group({
    first_name: ['', Validators.compose([Validators.required])],
    last_name: ['', Validators.required]
  });


  async ngOnInit(): Promise<void> {

    this.loadEditModal();
    this.loadLogoutModal();
    this.user = await this.retrieveUserFromApi();

  }

  loadEditModal(): void {
    const editModal = document.getElementById('edit-user-modal');
    this.editUserModal = M.Modal.init(editModal);

  }

  loadLogoutModal(): void {
    const logoutModal = document.getElementById('logout-modal');
    this.logoutModal = M.Modal.init(logoutModal);
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


  updateUser(): void {
    const userToBeUpdated = {
      id: this.user.id,
      ...this.editUserForm.value
    } as User;

    this.userService.update(userToBeUpdated).subscribe(response => {
      this.user = {
        ...this.user,
        ...response
      }
      this.editUserModal.close();
      this.toasterService.success('As alterações foram salvas com sucesso', 'Operação realizada!')
    });
  }

  logoutApplication(): void {
    this.authService.logout();
    this.logoutModal.close();

    this.router.navigate(['/']);

  }

}
