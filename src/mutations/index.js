import gql from 'graphql-tag';

export const NUEVO_CLIENTE = gql`
    mutation CrearCliente($input:ClienteInput){
        crearCliente(input: $input){
            id
        }
    }
`;

export const ACTUALIZAR_CLIENTE = gql`
    mutation ActualizarCliente($input:ClienteInput){
        actualizarCliente(input:$input){
            id
            nombre
            apellido
            empresa
            emails{
                email
            }
            edad
            tipo
        }
    }
`;