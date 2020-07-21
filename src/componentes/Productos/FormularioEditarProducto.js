import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import { ACTUALIZAR_PRODUCTO } from '../../mutations/productosMutations';
import { withRouter } from 'react-router-dom';

class FormularioEditarProducto extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            ...this.props.producto
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

    modificarProducto = (e,actualizarProducto,input)=>{
        e.preventDefault();
        actualizarProducto();
    }

    render() {
        const {id,nombre,stock,precio} = this.state;
        const input = {
            id,
            nombre,
            precio : Number(precio),
            stock : Number(stock)
        }
        return (
            <React.Fragment>
                <Mutation mutation={ACTUALIZAR_PRODUCTO} variables={{ input:input }} onCompleted={ ()=> this.props.refetch().then(()=>{this.props.history.push('/productos')}) }>
                    {(actualizarProducto,{loading,error,data})=>{
                        return (
                            <form className="col-md-8" onSubmit={e => this.modificarProducto(e,actualizarProducto,input)}>
                                <div className="form-group">
                                    <label>Nombre:</label>
                                    <input 
                                        type="text"
                                        name="nombre" 
                                        className="form-control" 
                                        placeholder="Nombre del Producto"
                                        onChange={this.actualizarStateConCampos}
                                        value={nombre}
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
                                            value={precio}
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
                                        value={stock}
                                    />
                                </div>
                                <button 
                                    disabled={this.validarForm()}
                                    type="submit" 
                                    className="btn btn-success float-right">
                                        Guardar Cambios
                                </button>
                            </form>
                        );
                    }}
                </Mutation>
            </React.Fragment>
        )
    }
}

export default withRouter(FormularioEditarProducto);