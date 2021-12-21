import { Component, OnInit } from '@angular/core';
import { IUser } from '../user';
import { UserService } from './../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile-details',
  templateUrl: `user-profile-details.component.html`,
  styleUrls: [`user-profile-details.component.css`]
})

export class UserProfileDetailsComponent implements OnInit {

  // <users> must be of type any...
  public users: any;

  public _user: IUser | undefined;
  public errorMsg = "";
  public Id!: string;
  totalLength:any;
  page:number = 1;
  pageIndex: number = 0;
  // totalLength = this.users.length;

  paginate(event: any) {
    this.pageIndex=event;
  }

  constructor(private _userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this._userService.getUsers()
      .subscribe((data: IUser[]) => 
                        {
                          this.users = data;
                          // console.log("Data: ",data);
                          this.totalLength = data.length;
                          // console.log(this.totalLength);
                          // console.log(this.users);
                        }, error => this.errorMsg = error);
  }

  getUsersDetails() {
    this._userService.getUsers()
      .subscribe((data: IUser[]) => {
        this.users = data;
      },error => this.errorMsg = error);
  } 

  deleteUserProfile(Id: string) {
    console.log(Id)
    this._userService.deleteUser(Id)
      .subscribe((data: IUser) => {
        this._user = data;
        this.getUsersDetails();
      }, error => this.errorMsg = error);
  }

  // editUserProfile(Id: string) {
  //   console.log(Id)
  //   this._userService.deleteUser(Id)
  //     .subscribe((data: IUser) => {
  //       this.user = data;
  //       this.getUsersDetails();
  //     }, error => this.errorMsg = error);
  // }

  onClick(user: IUser) {
    // console.log(user)
    this.router.navigate(['/user-profile-edit',user._id])
  }

  key: string = 'name';
  reverse: boolean = false;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

}


