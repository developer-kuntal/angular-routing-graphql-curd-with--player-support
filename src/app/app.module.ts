import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule, AppRoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './user.service';
import { UserGqlAuthService } from './user-gql-auth.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ListEmployeesComponent } from './employees/list-employees.component';
import { UserProfileSearchComponent } from './user-profile-search/user-profile-search.component';
import { OrderModule } from 'ngx-order-pipe';
// import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgSelectModule } from '@ng-select/ng-select';
import { UserserachfilterPipe } from './user-profile-search/userserachfilter.pipe';

import { APOLLO_OPTIONS, APOLLO_NAMED_OPTIONS, NamedOptions } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

import { split, ApolloClientOptions } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

import { HttpLinkModule, } from 'apollo-angular-link-http';
import { GraphqlMusicApiService } from './musics/graphql-music-api.service';
import { MusicsSearchFilterPipe } from './musics/musics-dashboard/musics-search-filter.pipe';
import { SubscriberComponent } from './subscriber/subscriber/subscriber.component';



@NgModule({
  declarations: [
    AppComponent,
    AppRoutingComponents,
    ListEmployeesComponent,
    UserProfileSearchComponent,
    UserserachfilterPipe,
    MusicsSearchFilterPipe,
    SubscriberComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    NgxPaginationModule,
    OrderModule,
    // AutocompleteLibModule,
    NgSelectModule,
    HttpLinkModule
  ],
  providers: [
    {
    provide: APOLLO_NAMED_OPTIONS,
    useFactory: (httpLink: HttpLink) => {

      // Create an http link:
      const http = httpLink.create({
        uri: 'http://localhost:3000/graphql',
      });

      // Create a WebSocket link:
      const ws = new WebSocketLink({
        uri: 'ws://localhost:3000/graphql',
        options: {
          reconnect: true,
        },
      });

      // using the ability to split links, you can send data to each link
      // depending on what kind of operation is being sent
      const link = split(
        // split based on operation type
        ({query}) => {
          const definition = getMainDefinition(query);
          // const {kind, operation} = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
          );
        },
        ws,
        http,
      );

      return {
        newClientName: {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'https://48p1r2roz4.sse.codesandbox.io',
          }),
        },
        userAuthentication: {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:3000/graphql',
          }),
        },
        graphqlMusicsClient: {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:4400/graphql',
          }),
        },
        appolloQueryMutationSubscriptionExample: {
          cache: new InMemoryCache(),
          link: link,
        }
      };
    },
    deps: [HttpLink],
  }, UserService, UserGqlAuthService, GraphqlMusicApiService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  } ],
  // UserService],
  bootstrap: [AppComponent]
})

export class AppModule { }
