import { Injectable } from '@angular/core';
import { UserList } from '../models/userlist.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseApiUrl: string = "https://localhost:7292";

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserList[]> {
    return this.http.get<UserList[]>(this.baseApiUrl + '/api/users');
  }


  addUser(newUser: UserList): Observable<UserList> {
    return this.http.post<UserList>(this.baseApiUrl + '/api/users', newUser);
  }
  
  getUser(id: number): Observable<UserList> {
    return this.http.get<UserList>(this.baseApiUrl + '/api/users/' + id);
  }
  
  updateUser(id: number, updateUserRequest: UserList): Observable<UserList> {
    return this.http.put<UserList>(this.baseApiUrl + '/api/users/' + id, updateUserRequest);
  }
  
  deleteUser(id: number): Observable<UserList> {
    return this.http.delete<UserList>(this.baseApiUrl + '/api/users/' + id);
  }
  
}

function guid(arg0: string): string & { isGuid: true; } {
  throw new Error('Function not implemented.');
}
