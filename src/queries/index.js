import gql from 'graphql-tag';

export const CLIENTES_QUERY = gql`
    query{
        getClientes{
            id
            nombre
            apellido
        }
    }
`;

export const CLIENTE_QUERY = gql`
    query ConsultarCliente($id:ID!){
        getCliente(id:$id){
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