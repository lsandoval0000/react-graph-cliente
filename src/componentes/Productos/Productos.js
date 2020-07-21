import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo';
import {CONSULTAR_PRODUCTOS} from '../../queries/productosQueries';
import {ELIMINAR_PRODUCTO} from '../../mutations/productosMutations';
import Paginador from '../Paginador';
import { Link } from 'react-router-dom';
import Exito from '../Alertas/Exito';

export default class Productos extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            paginador: {
                offset:0,
                actual:1
            },
            alerta : {
                mostrar: false,
                mensaje : ''
            }
        };

        this.limite = 5;
    }

    paginaAnterior = ()=>{
        this.setState({
            paginador:{
                offset:this.state.paginador.offset - this.limite,
                actual:this.state.paginador.actual - 1
            }
        });
    }

    paginaSiguiente = ()=>{
        this.setState({
            paginador:{
                offset:this.state.paginador.offset + this.limite,
                actual:this.state.paginador.actual + 1
            }
        });
    }

    render() {
        const {alerta: {mostrar,mensaje}} = this.state;
        const alerta = (mostrar)? <Exito mensaje={mensaje}/>:'';
        return (
            <React.Fragment>
                <h1 className="text-center mb-5">Productos</h1>
                {alerta}
                <Query query={CONSULTAR_PRODUCTOS} pollInterval={1000} variables={ {limite:this.limite,offset:this.state.paginador.offset} }>
                    {({ loading,error,data, startPolling,stopPolling })=>{
                        if(loading) return "Cargando...";
                        if(error) return `Error: ${error.message}`;
                        return(
                            <React.Fragment>
                                <table className="table">
                                    <thead>
                                        <tr className="table-primary">
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Precio</th>
                                            <th scope="col">Stock</th>
                                            <th scope="col">Eliminar</th>
                                            <th scope="col">Editar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.getProductos.map(item=>{
                                            const {id} = item;
                                            return (
                                                <tr key={id}>
                                                    <td>{item.nombre}</td>
                                                    <td>{item.precio}</td>
                                                    <td>{item.stock}</td>
                                                    <td>
                                                        <Mutation mutation={ELIMINAR_PRODUCTO} onCompleted={(data)=>{
                                                            this.setState({
                                                                alerta:{
                                                                    mostrar:true,
                                                                    mensaje:data.eliminarProducto
                                                                }
                                                            },()=>{
                                                                setTimeout(() => {
                                                                    this.setState({
                                                                        alerta:{
                                                                            mostrar:false,
                                                                            mensaje:''
                                                                        }
                                                                    });
                                                                }, 3000);
                                                            });
                                                        }}>
                                                            { eliminarProducto => (
                                                                <button type="button" className="btn btn-danger" onClick={()=>{
                                                                    if(window.confirm("¿Seguro que deseas eliminar este producto?")){
                                                                        eliminarProducto({
                                                                            variables:{id:id}
                                                                        });
                                                                    }
                                                                }}>
                                                                    &times; Eliminar
                                                                </button>
                                                            )}
                                                        </Mutation>
                                                    </td>
                                                    <td>
                                                        <Link className="btn btn-success" to={`/productos/editar/${id}`}>Editar Producto</Link>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                <Paginador
                                    actual={this.state.paginador.actual}
                                    totalElementos = {data.totalProductos}
                                    limite = {this.limite}
                                    paginaAnterior = {this.paginaAnterior}
                                    paginaSiguiente = {this.paginaSiguiente}
                                />
                            </React.Fragment>
                        );
                    }}
                </Query>
            </React.Fragment>
        )
    }
}
