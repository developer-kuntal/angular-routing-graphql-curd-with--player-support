
import { throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IUser } from './user';
import { User } from './models/user';



@Injectable()
export class UserService {

  private _url: string = "http://localhost:3000/eshram-profile";
  // private Id: string | undefined;
  private _editProfileEndpointURL = "http://localhost:3000/edit-user-profile";
  private _addProfileEndpointURL = "http://localhost:3000/eshram";
  constructor(private http:HttpClient) { }

  submitUserProfile(user: User): Observable<IUser[]>{
    return this.http.post<IUser[]>(this._addProfileEndpointURL, user);
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this._url)
  }

  getUsersById(id: string | undefined | null ): Observable<IUser> {
    let _personByIdURL  = "http://localhost:3000/person-profile?id="+id;
    return this.http.get<IUser>(_personByIdURL)
  }
  
  deleteUser(Id: string): Observable<IUser> {
    const deleteUserEndpoint = 'http://localhost:3000/delete-user-profile?id=' + Id;
    return this.http.delete<IUser>(deleteUserEndpoint);
  }

  updateUserProfile(user: User): Observable<IUser> {
    return this.http.put<IUser>(this._editProfileEndpointURL, user);
    // console.log("Update: ", user1);
    // return user1;
  }

  errorHandler(error: HttpErrorResponse){
    return observableThrowError(error.message || "Server Error");
  }

}
