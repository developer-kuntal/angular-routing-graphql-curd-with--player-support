import { Component, OnInit } from '@angular/core';
import { IUser } from '../user';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile-search',
  templateUrl: './user-profile-search.component.html',
  styleUrls: ['./user-profile-search.component.css']
})
export class UserProfileSearchComponent implements OnInit {

  public users: any;
  public _user: IUser | undefined;
  public errorMsg = "";
  public searchValue: any;
  page:number = 1;
  pageIndex: number = 0;
  totalLength:any;

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
        // this.getUsersDetails();
      }, error => this.errorMsg = error);
  }

  onClick(user: IUser) {
    // console.log(user)
    this.router.navigate(['/user-profile-edit',user._id])
  }

  // Search() {
  //   if(this.name == "") {
  //     this.ngOnInit();
  //   } else {
  //     this.users = this.users.filter((res: any) => {
  //       // console.log(res.name);
  //       console.log(this.name);
  //       // return res.name.toLocalLowerCase().includes(this.name.toLocalLowerCase());
  //     })
  //   }
  // }

}
