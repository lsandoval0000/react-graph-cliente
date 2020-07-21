import React, { Component } from 'react'
import {Query, Mutation} from 'react-apollo';
import { CLIENTES_QUERY } from '../../queries/clientesQueries';
import { Link } from 'react-router-dom';
import { ELIMINAR_CLIENTE } from '../../mutations/clientesMutations';
import Paginador from '../Paginador';
import Exito from '../Alertas/Exito';

export default class Clientes extends Component {

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
        const {alerta:{mostrar,mensaje}} = this.state;
        const alerta = (mostrar)?<Exito mensaje={mensaje}/>:'';
        return (
            <Query query={CLIENTES_QUERY} pollInterval={1000} variables={ {limite:this.limite,offset:this.state.paginador.offset} }>
                {({ loading,error,data, startPolling,stopPolling })=>{
                    if(loading) return "Cargando...";
                    if(error) return `Error: ${error.message}`;
                    return(
                        <React.Fragment>
                            <h2 className="text-center">Listado de Clientes</h2>
                            {alerta}
                            <ul className="list-group">
                                {data.getClientes.map(cliente=>{
                                const {id} = cliente;
                                return (
                                    <li key={cliente.id} className="list-group-item">
                                        <div className="row justify-content-between align-items-center">
                                            <div className="col-md-8 d-flex justify-content-between align-items-center">
                                                {cliente.nombre} {cliente.apellido}
                                            </div>
                                            <div className="col-md-4 d-flex justify-content-end">
                                                <Link to={`/pedidos/nuevo/${id}`} className="btn btn-warning d-block d-md-inline-block mr-2">&#43; Nuevo Pedido</Link>
                                                <Mutation mutation={ELIMINAR_CLIENTE} onCompleted={(data)=>{
                                                    this.setState({
                                                        alerta : {
                                                            mostrar: true,
                                                            mensaje : data.eliminarCliente
                                                        }
                                                    },()=>{
                                                        setTimeout(() => {
                                                            this.setState({
                                                                alerta : {
                                                                    mostrar: false,
                                                                    mensaje : ''
                                                                }
                                                            });
                                                        }, 3000);
                                                    });
                                                }}>
                                                    {eliminarCliente =>(
                                                        <button type="button" className="btn btn-danger d-block d-md-inline-block mr-2" onClick={()=>{
                                                            if(window.confirm("¿Seguro que deseas eliminar este cliente?")){
                                                                eliminarCliente({
                                                                    variables:{id:id}
                                                                });
                                                            }
                                                        }}>
                                                            &times; Eliminar Cliente
                                                        </button>
                                                    )}
                                                </Mutation>
                                                <Link to={`/clientes/editar/${cliente.id}`} className="btn btn-success d-block d-md-inline-block">
                                                    Editar Cliente
                                                </Link>
                                            </div>
                                        </div>
                                    </li>
                                )})}
                            </ul>
                            <Paginador
                                actual={this.state.paginador.actual}
                                totalElementos = {data.totalClientes}
                                limite = {this.limite}
                                paginaAnterior = {this.paginaAnterior}
                                paginaSiguiente = {this.paginaSiguiente}
                            />
                        </React.Fragment>
                    );
                }}
            </Query>
        )
    }
}
