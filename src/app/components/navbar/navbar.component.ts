import { Component, OnInit } from '@angular/core';
import { LocalStorageManager } from '../../middlewares/local-storage-manager';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private localStorageManager: LocalStorageManager) { }

  ngOnInit(): void {
  }


  goToProfile() {
    const user = this.localStorageManager.getUser();

    return [`/profile/${user.id}`]
  }

}
