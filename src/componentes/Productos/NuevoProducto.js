import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import {NUEVO_PRODUCTO} from '../../mutations/productosMutations';

export default class NuevoProducto extends Component {

    constructor(props){
        super(props);

        this.state = {
            nombre:'',
            precio:'',
            stock:''
        };
    }

    actualizarStateConCampos = (e)=>{
        const {name,value} = e.target;
        this.setState({
            [name]:value
        });
    }

    validarForm =()=>{
        const {nombre,stock,precio} = this.state;
        const noValido = !nombre || !stock || !precio;
        return noValido;
    }

    registrarProducto = (e,nuevoProducto,input)=>{
        e.preventDefault();
        nuevoProducto();
    }

    render() {
        const {nombre,stock,precio} = this.state;
        const input = {
            nombre,
            precio : Number(precio),
            stock : Number(stock)
        }
        return (
            <React.Fragment>
                <h1 className="text-center mb-5">Nuevo Producto</h1>
                <div className="row justify-content-center">
                    <Mutation mutation={NUEVO_PRODUCTO} variables={{ input:input }} onCompleted={ ()=> this.props.history.push('/productos') }>
                        {(nuevoProducto,{loading,error,data})=>{
                            return (
                                <form className="col-md-8" onSubmit={e => this.registrarProducto(e,nuevoProducto,input)}>
                                    <div className="form-group">
                                        <label>Nombre:</label>
                                        <input 
                                            type="text"
                                            name="nombre" 
                                            className="form-control" 
                                            placeholder="Nombre del Producto"
                                            onChange={this.actualizarStateConCampos}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Precio:</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">$</div>
                                            </div>
                                            <input 
                                                type="number" 
                                                name="precio" 
                                                className="form-control" 
                                                placeholder="Precio del Producto"
                                                onChange={this.actualizarStateConCampos}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Stock:</label>
                                        <input 
                                            type="number" 
                                            name="stock" 
                                            className="form-control" 
                                            placeholder="stock del Producto" 
                                            onChange={this.actualizarStateConCampos}
                                        />
                                    </div>
                                    <button 
                                        disabled={this.validarForm()}
                                        type="submit" 
                                        className="btn btn-success float-right">
                                            Crear Producto
                                    </button>
                                </form>
                            );
                        }}
                    </Mutation>
                </div>
            </React.Fragment>
        )
    }
}
