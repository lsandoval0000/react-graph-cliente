import gql from "graphql-tag";

export const CONSULTAR_PRODUCTO = gql`
    query ConsultarProducto($id:ID){
        getProducto(id:$id){
            id
            nombre
            precio
            stock
        }
    }
`;

export const CONSULTAR_PRODUCTOS = gql`
    query ConsultarProductos($limite:Int,$offset:Int){
        getProductos(limite:$limite,offset:$offset){
            id
            nombre
            precio
            stock
        }
        totalProductos
    }
`;