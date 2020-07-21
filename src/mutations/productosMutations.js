import gql from "graphql-tag";

export const NUEVO_PRODUCTO = gql`
    mutation NuevoProducto($input:ProductoInput){
        nuevoProducto(input:$input){
            id
        }
    }
`;

export const ACTUALIZAR_PRODUCTO = gql`
    mutation ActualizarProducto($input:ProductoInput){
        actualizarProducto(input:$input){
            id
        }
    }
`;

export const ELIMINAR_PRODUCTO = gql`
    mutation EliminarProducto($id:ID){
        eliminarProducto(id:$id)
    }
`;