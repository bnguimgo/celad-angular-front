import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  user: User = {
    firstName: '',
    lastName: '',
    email: ''
  };
  submitted = false;

  constructor(private userService: UserService) {}

  createUser(): void {
    const data = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email
    };

    this.userService.createUser(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  addNewUser(): void {
    this.submitted = false;
    this.user = {
      firstName: '',
      lastName: '',
      email: ''
    };
  }

}
