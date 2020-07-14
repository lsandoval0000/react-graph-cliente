import React, { Component } from 'react';
import {ApolloProvider} from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import Header from './componentes/Header';
import Clientes from './componentes/Clientes';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import NuevoCliente from './componentes/NuevoCliente';
import EditarCliente from './componentes/EditarCliente';

const client = new ApolloClient({
  uri:"http://localhost:5000/graphql",
  cache:new InMemoryCache({
    addTypename:false
  }),
  onError: ({networkError, graphQLErros})=> {
    console.log('graphQLErros',graphQLErros);
    console.log('networkError',networkError);
  }
});

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Header/>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Clientes}/>
              <Route exact path="/cliente/nuevo" component={NuevoCliente}/>
              <Route exact path="/cliente/editar/:id" component={EditarCliente}/>
            </Switch>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    )
  }
}
