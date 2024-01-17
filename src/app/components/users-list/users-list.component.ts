import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  users?: User[];
  currentUser: User = {};
  currentIndex = -1;
  firstName = '';
  lastName = '';

  constructor(private userService:UserService,
    private router: Router) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  public getAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  public refreshList(): void {
    this.getAllUsers();
    this.currentUser = {};
    this.currentIndex = -1;
  }

  deleteSelectedUser(user: User, index: number): void {
    this.currentUser = user;
    this.currentIndex = index;
    this.deleteUser();
    //this.refreshList();
  }

  deleteUser(): void {
    this.userService.deleteUser(this.currentUser.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/users']);
        this.refreshList();
      },
      error: (e) => console.error(e)
    });
  }

  searchByFirstNameOrLastName(): void {
    
    this.currentUser = {};
    this.currentIndex = -1;

    if(this.firstName!=""){
      this.currentUser.firstName=this.firstName;
    }
    if(this.firstName!=""){
      this.currentUser.lastName=this.lastName;
    }
    this.userService.findByFirstNameOrLastName(this.currentUser).subscribe({
      next: (data) => {
        this.users = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
}
