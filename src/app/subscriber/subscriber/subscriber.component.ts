import { Component, OnInit } from '@angular/core';
import { Apollo, ApolloBase, gql, QueryRef } from 'apollo-angular';
import { map } from 'rxjs';

const query = gql`
query {
  messages{
  	text
    createdBy
  }
}
`;

const messageSubscription = gql`
subscription {
  messageCreated{
    createdBy
    text
  }
}
`;


@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.css']
})
export class SubscriberComponent implements OnInit {

  queryRef: QueryRef<any> | undefined;
  messages: any;
  error: any;
  // apolloProvider: any;
  private apollo: ApolloBase;

  constructor(private apolloProvider: Apollo) { 
    
    this.apollo = this.apolloProvider.use('appolloQueryMutationSubscriptionExample');

    this.queryRef = this.apollo.watchQuery({
      query: query
    });

    this.apollo.watchQuery<any>({
      query: query
    }).valueChanges.pipe(
      map(result => result?.data && result?.data?.messages )
    ).subscribe(
      (data) => {
        console.log("RRR:", data);
        this.messages = data
      }, 
      error => this.error = error
    )
  }

  ngOnInit(): void {
    this.subscription();
  }

  subscription() {
    this.queryRef?.subscribeToMore({
      document: messageSubscription,
      updateQuery: (prev, {subscriptionData}) => {
        // console.log("SSS: ",subscriptionData)
        if (!subscriptionData.data) {
          console.log("SSS: ",prev)
          return prev;
        }

        // this.messages = subscriptionData.data?.messageCreated;
        const newMessageItem = subscriptionData.data?.messageCreated;
        // return this.messages;
        return {
          messages: [newMessageItem, ...prev.messages]
        };

      }
    })
  }
}
