import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserGqlAuthService } from '../user-gql-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {email:"",password:""}

  constructor(private _auth: UserGqlAuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  loginUser(userLoginForm: NgForm) {
    console.log(this.loginUserData);
    this._auth.userLogin(this.loginUserData).subscribe(
      (res: { login: string; }) =>{ 
        localStorage.setItem('token', res?.login)
        this._router.navigate(['/user-profile-details'])
        // sessionStorage.setItem(key,value)
        console.log(res)
      },
      (err: any) => console.log(err)
    )
    userLoginForm.reset()
  }

}
