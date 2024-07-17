
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserList } from '../../models/userlist.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  updateUserRequest: UserList = {
    id:0,
    userName: '',
    firstName: '',
    lastName: '',
    email:'',
    status: '',
    department: ''
  };
  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
         const id = params.get('id');

        if (id) {
          this.usersService.getUser(+id).subscribe({
            next: (userlist) => {
              this.updateUserRequest = userlist;
            },
          });
        }
      },
    });
  }
  updateUser() {
    this.usersService
      .updateUser(this.updateUserRequest.id, this.updateUserRequest)
      .subscribe({
        next: (response) => {
          this.router.navigate(['users']);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}