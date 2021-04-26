import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';

import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log('graphQLErrors', graphQLErrors);
  }
  if (networkError) {
    console.log('networkError', networkError);
  }
});


Vue.config.productionTip = false

 // Create an http link:
 const httpLink = new HttpLink({uri: 'http://localhost:4000/'});

 const link = ApolloLink.from([errorLink, httpLink]);
 
 const client = new ApolloClient({
   link: link,
   cache: new InMemoryCache({
     addTypename: true
   }),
   connectToDevTools: true,
   onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
 });


Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: client,
})

new Vue({
  vuetify,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
