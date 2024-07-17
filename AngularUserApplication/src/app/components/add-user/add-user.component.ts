
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserList } from '../../models/userlist.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {

  newUser: UserList = {
    id:0,
    userName: '',
    firstName: '',
    lastName: '',
    email:'',
    status: '',
    department: '',
  };
  
  constructor(
    private usersService: UsersService,
    private router: Router
  ) {}

  async addUser() 
  {
    this.usersService.addUser(this.newUser).subscribe({
        next: (userList) => {
          this.router.navigate(['users']);
        },
        error: (response) => {
          console.log(response);
        },
    });   
  }
}