import { Component } from '@angular/core';
import { UserGqlAuthService } from './user-gql-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  constructor(public _auth: UserGqlAuthService) { }
}
