import React from 'react';

const Exito = (props) => {
    const {mensaje} = props;
    return (
        <p className="alert alert-success py-3 text-center my-3">
            {mensaje}
        </p>
    );
};

export default Exito;