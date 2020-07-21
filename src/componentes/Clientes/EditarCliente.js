import React, { Component } from 'react';
import {Query} from 'react-apollo';
import { CLIENTE_QUERY } from '../../queries/clientesQueries';
import FormularioEditarCliente from './FormularioEditarCliente';
import { ACTUALIZAR_CLIENTE } from '../../mutations/clientesMutations';

export default class EditarCliente extends Component {
    render() {
        const {id} = this.props.match.params;
        return (
            <React.Fragment>
                <h2 className="text-center">Editar Cliente</h2>
                <Query query={CLIENTE_QUERY} variables={{ "id":id }} refetchQueries={ACTUALIZAR_CLIENTE}>
                    {({ loading,error,data,refetch })=>{
                        if(loading) return "Cargando...";
                        if(error) return `Error:! ${error}`;
                        return(
                            <FormularioEditarCliente
                                cliente={data.getCliente}
                                refetch={refetch}
                            />
                        );
                    }}
                </Query>
            </React.Fragment>
        )
    }
}
