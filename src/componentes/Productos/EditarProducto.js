import React, { Component } from 'react'
import { Query } from 'react-apollo';
import { CONSULTAR_PRODUCTO } from '../../queries/productosQueries';
import FormularioEditarProducto from './FormularioEditarProducto';
import { ACTUALIZAR_PRODUCTO } from '../../mutations/productosMutations';

export default class EditarProducto extends Component {
    render() {
        const {id} = this.props.match.params;
        return (
            <React.Fragment>
                <h1 className="text-center">Editar Producto</h1>
                <div className="row justify-content-center">
                    <Query query={CONSULTAR_PRODUCTO} variables={{ "id":id  }} refetchQueries={ACTUALIZAR_PRODUCTO}>
                        {({loading,error,data,refetch})=>{
                            if(loading) return "Cargando...";
                            if(error) return `Error : ${error}`;

                            return (
                                <FormularioEditarProducto
                                    producto = {data.getProducto}
                                    refetch={refetch}
                                />
                            );
                        }}
                    </Query>
                </div>
            </React.Fragment>
        )
    }
}
