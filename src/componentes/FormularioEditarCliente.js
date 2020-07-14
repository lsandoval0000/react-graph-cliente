import React, { Component } from 'react';
import {Mutation} from 'react-apollo';
import { ACTUALIZAR_CLIENTE } from '../mutations';
import { withRouter } from 'react-router-dom';

class FormularioEditarCliente extends Component {
    constructor(props){
        super(props);
        this.nombre = React.createRef();
        this.apellido = React.createRef();
        this.empresa = React.createRef();
        this.edad = React.createRef();
        this.tipoCliente = React.createRef();

        this.state = {
            error : false,
            emails : []
        };
    }

    componentDidMount() {
        const cliente = this.props.cliente;
        this.nombre.current.value = cliente.nombre;
        this.apellido.current.value = cliente.apellido;
        this.empresa.current.value = cliente.empresa;
        this.edad.current.value = cliente.edad;
        this.tipoCliente.current.value = cliente.tipo;
        this.setState({
            emails:cliente.emails
        });
    }

    nuevoCampo= ()=>{
        this.setState({
            emails: this.state.emails.concat([{email:""}])
        });
    }

    eliminarCampo = (i)=>()=>{
        this.setState({
            emails : this.state.emails.filter( (email,index) => i !== index )
        });
    }

    leerCampo= (i)=>(e)=>{
        const nuevoEmail = this.state.emails.map((email,index)=>{
            if(index !== i)
                return email;
            else
                return {
                    ...email,
                    email:e.target.value
                }
        });
        this.setState({
            emails : nuevoEmail
        });
    }

    render() {
        const {error} = this.state;
        let respuesta = (error)? <p className="alert alert-danger p-3 text-center">Todos los campos son obligatorios</p>:'';
        return (
            <React.Fragment>
                {respuesta}
                <div className="row justify-content-center">
                    <Mutation mutation={ACTUALIZAR_CLIENTE} onCompleted={ ()=> this.props.refetch().then(()=>{this.props.history.push('/')}) }>
                        { actualizarCliente => (
                            <form className="col-md-8 m-3" onSubmit={ e =>{
                                e.preventDefault();

                                if(this.nombre.current.value === '' ||
                                this.apellido.current.value === '' ||
                                this.empresa.current.value === '' ||
                                this.edad.current.value === '' ||
                                this.tipoCliente.current.value === ''
                                ){
                                    this.setState({
                                        error : true
                                    });
                                    return;
                                }

                                this.setState({
                                    error : false
                                });

                                const input = {
                                    id:this.props.cliente.id,
                                    nombre:this.nombre.current.value,
                                    apellido:this.apellido.current.value,
                                    empresa:this.empresa.current.value,
                                    edad: Number(this.edad.current.value),
                                    tipo:this.tipoCliente.current.value,
                                    emails:this.state.emails
                                };

                                actualizarCliente({
                                    variables: {input: input}
                                });
                            } }>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Nombre</label>
                                        <input type="text" className="form-control" placeholder="Nombre" ref={this.nombre}/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Apellido</label>
                                        <input type="text" className="form-control" placeholder="Apellido" ref={this.apellido}/>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <label>Empresa</label>
                                        <input type="text" className="form-control" placeholder="Empresa" ref={this.empresa}/>
                                    </div>
                                    <div className="form-group d-flex justify-content-center col-md-12">
                                        <button className="btn btn-warning" type="button" onClick={this.nuevoCampo}>+ Agregar Email</button>
                                    </div>
                                </div>
                                <div className="form-row">
                                {this.state.emails.map( (email,index)=>(
                                    <div key={index} className="form-group col-md-12">
                                        <label>Correo: {index+1}</label>
                                        <div className="input-group">
                                            <input type="email" placeholder="Email" className="form-control" onChange={this.leerCampo(index)} value={email.email}/>
                                            <div className="input-group-append">
                                                <button type="button" className="btn btn-danger" onClick={this.eliminarCampo(index)}>&times; Eliminar</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Edad</label>
                                        <input type="text" className="form-control" placeholder="Edad" ref={this.edad}/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Tipo Cliente</label>  
                                        <select className="form-control" ref={this.tipoCliente}>
                                            <option value="">Elegir...</option>
                                            <option value="PREMIUM">PREMIUM</option>
                                            <option value="BASICO">BÁSICO</option>
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-success float-right">Guardar Cambios</button>
                            </form>
                        )}
                    </Mutation>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(FormularioEditarCliente);