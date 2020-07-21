import React, { Component } from 'react';
import {ApolloProvider} from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import Header from './componentes/Layout/Header';
import Clientes from './componentes/Clientes/Clientes';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import NuevoCliente from './componentes/Clientes/NuevoCliente';
import EditarCliente from './componentes/Clientes/EditarCliente';
import NuevoProducto from './componentes/Productos/NuevoProducto';
import Productos from './componentes/Productos/Productos';
import EditarProducto from './componentes/Productos/EditarProducto';
import NuevoPedido from './componentes/Pedidos/NuevoPedido';

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

client.defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only'
  }
};

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Header/>
          <div className="container">
            <Switch>
              <Route exact path="/clientes" component={Clientes}/>
              <Route exact path="/clientes/nuevo" component={NuevoCliente}/>
              <Route exact path="/clientes/editar/:id" component={EditarCliente}/>
              <Route exact path="/productos/nuevo" component={NuevoProducto}/>
              <Route exact path="/productos" component={Productos}/>
              <Route exact path="/productos/editar/:id" component={EditarProducto}/>
              <Route exact path="/pedidos/nuevo/:id" component={NuevoPedido}/>
            </Switch>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    )
  }
}
