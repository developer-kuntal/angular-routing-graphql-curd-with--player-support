import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css']
})

export class UserProfileEditComponent implements OnInit {

  public genders = ["MALE","FEMALE","OTHERS"];

  public userModel = new User("","",new Date(),
  "FEMALE","Crop Farm Laboures","Bahara, Mayureswar II, Birbhum, West Bengal-731234",
  "6302571879","7116 2306 9235");

  constructor(private _userService: UserService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.router.snapshot.paramMap.get('id');
    console.log(id);
    this._userService.getUsersById(id).subscribe(
      data => {
        console.log("Edit Section: ",data);
        this.userModel = data;
        this.userModel.dob = new Date(data.dob)
      },
      error => {
        console.error('Error!', error);
      }
    )
  }

  onSubmit( ) {
    console.log("Edit Section Onsubmit: ",this.userModel);
    this._userService.updateUserProfile(this.userModel).subscribe(
      data => console.log('Update Success!', data),
      error => console.error('Error!', error)
    )
  }

}
