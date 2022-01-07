import { Injectable } from '@angular/core';
import { Apollo, ApolloBase, gql } from 'apollo-angular';
import { map } from 'rxjs';
import { Router } from '@angular/router';

const USER_REGISTER = gql`
mutation UserRegistration($name:String,$email:String,$password:String) {
  register(name:$name,email:$email,password:$password)
}
`;

const USER_LOGIN = gql`
mutation UserLogin($email:String,$password:String){
  login(email:$email,password:$password)
}
`;

@Injectable({
  providedIn: 'root'
})
export class UserGqlAuthService {

  private apollo: ApolloBase;

  constructor(private apolloProvider: Apollo, private _router: Router) {
    this.apollo = this.apolloProvider.use('userAuthentication');
  }

  userRegister(user: any): any {
    return this.apollo.mutate({
      mutation: USER_REGISTER,
      variables: {
        name: user.name,
        email: user.email,
        password: user.password,
      }
    }).pipe(
      map(result => {
        // console.log("RRR: ",result);
        return result?.data;
        // return response?.data && response?.data?.updateSongbyId
      })
    )
  }

  userLogin(user: any): any {
    return this.apollo.mutate({
      mutation: USER_LOGIN,
      variables: {
        email: user.email,
        password: user.password,
      }
    }).pipe(
      map(result => {
        // console.log("RRR: ",result);
        return result?.data;
        // return response?.data && response?.data?.updateSongbyId
      })
    )
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  logoutUser() {
    localStorage.removeItem('token')
    this._router.navigate(['/musics-dashboard'])
  }

  getToken() {
    return localStorage.getItem('token')
  }

}
