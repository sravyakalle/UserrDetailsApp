import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { UserList } from '../../models/userlist.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  userlists: UserList[] = [];

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usersService.getAllUsers().subscribe({
      next: (userlists: UserList[]) => {
        this.userlists = userlists;
        
      },
      error: (response: any) => {
        console.log(response);
      },
    });
  }

  deleteUser(id: number) 
  {
    this.usersService.deleteUser(id).subscribe({
      next: (response: any) => {
        let currentUrl = this.router.url;
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate([currentUrl]);
          });
      }
    });
  }
}




