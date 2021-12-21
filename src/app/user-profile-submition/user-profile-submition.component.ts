import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../models/user';
import { UserService } from './../user.service';

@Component({
  selector: 'app-user-profile-submition',
  templateUrl: `user-profile-submition.component.html`,
  styleUrls: [`user-profile-submition.component.css`]
})

export class UserProfileSubmitionComponent implements OnInit {

  public genders = ["MALE","FEMALE","OTHERS"];
  public userModel = new User("","",new Date(),
                        "FEMALE","Crop Farm Laboures","Bahara, Mayureswar II, Birbhum, West Bengal-731234",
                        "6302571879","7116 2306 9235");
  constructor(private _userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit( userForm: NgForm) {
    console.log(this.userModel);
    this._userService.submitUserProfile(this.userModel).subscribe(
      data => console.log('Success!', data),
      error => console.error('Error!', error)
    )
    userForm.reset(this.userModel);
  }

}
