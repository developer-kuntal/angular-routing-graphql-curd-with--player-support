import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserGqlAuthService } from '../user-gql-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData =  {name:"",email:"",password:""}
  constructor(private _auth: UserGqlAuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  registerUser(userRegisterForm: NgForm) {
    console.log(this.registerUserData);
    this._auth.userRegister(this.registerUserData).subscribe(
      (res: { register: string; }) =>{ 
        localStorage.setItem('token', res?.register)
        this._router.navigate(['/user-profile-details'])
        console.log(res)
      },
      (err: any) => {
        if(err instanceof HttpErrorResponse) {
          if(err.status === 401) {
            this._router.navigate(['/login'])
          }
          console.log(err)
        }
      }
    )

    userRegisterForm.reset()
  }


}
