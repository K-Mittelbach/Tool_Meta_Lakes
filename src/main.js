import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

import VueApollo from 'vue-apollo';

Vue.config.productionTip = false

const httpLink = new HttpLink({
  uri: 'https://selected-oriole-27.hasura.app/v1/graphql'
})

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
}) 

Vue.use(VueApollo);

new Vue({
  vuetify,
  apolloClient,
  render: h => h(App)
}).$mount('#app')
