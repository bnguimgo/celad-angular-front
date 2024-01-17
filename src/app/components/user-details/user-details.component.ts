import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent {
  @Input() viewMode = false;

  @Input() currentUser: User = {
    firstName: '',
    lastName: '',
    email: ''
  };

  message = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
    }
  }

  updateUser(): void {
    this.message = '';

    this.userService
      .updateUser(this.currentUser)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = 'Mise à jour avec succès!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteUser(): void {
    this.userService.deleteUser(this.currentUser.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/users']);
      },
      error: (e) => console.error(e)
    });
  }
}
