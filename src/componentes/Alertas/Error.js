import React from 'react';

const Error = (props) => {
    const {mensaje} = props;
    return (
        <p className="alert alert-error py-3 text-center my-3">
            {mensaje}
        </p>
    );
};

export default Error;