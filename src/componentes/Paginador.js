import React, { Component } from 'react'

export default class Paginador extends Component {

    constructor(props){
        super(props);
        this.state = {
            paginador:{
                paginas: Math.ceil(Number(this.props.totalElementos) / this.props.limite)
            }
        };
    }

    render() {
        const {actual} = this.props;
        const btnAnt = (actual>1)? <button className="btn btn-success mr-2" type="button" onClick={this.props.paginaAnterior}>&laquo; Anterior</button>:'';
        const btnSig = (actual<this.state.paginador.paginas)? <button className="btn btn-success" type="button" onClick={this.props.paginaSiguiente}>Siguiente &raquo;</button>:'';
        return (
            <div className="mt-5 d-flex justify-content-center">
                {btnAnt}
                {btnSig}
            </div>
        )
    }
}
