import React, { Component } from 'react';
import {Mutation} from 'react-apollo';
import { NUEVO_CLIENTE } from '../mutations';

export default class NuevoCliente extends Component {

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
                <h2 className="text-center">Nuevo Cliente</h2>
                {respuesta}
                <div className="row justify-content-center">
                    <Mutation mutation={NUEVO_CLIENTE} onCompleted={ ()=> this.props.history.push('/') }>
                        { crearCliente => (
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
                                    nombre:this.nombre.current.value,
                                    apellido:this.apellido.current.value,
                                    empresa:this.empresa.current.value,
                                    edad: Number(this.edad.current.value),
                                    tipo:this.tipoCliente.current.value,
                                    emails:this.state.emails
                                };

                                crearCliente({
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
                                {this.state.emails.map( (input,index)=>(
                                    <div key={index} className="form-group col-md-12">
                                        <label>Correo: {index+1}</label>
                                        <div className="input-group">
                                            <input type="email" placeholder="Email" className="form-control" onChange={this.leerCampo(index)}/>
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
                                <button type="submit" className="btn btn-success float-right">Registrar Cliente</button>
                            </form>
                        )}
                    </Mutation>
                </div>
            </React.Fragment>
        )
    }
}
