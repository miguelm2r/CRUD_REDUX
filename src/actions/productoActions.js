import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR,
    COMENZAR_EDICION_PRODUCTO
} from '../types'
import clienteAxios from '../config/axios'
import Swal from 'sweetalert2'

// Crear nuevos productos
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch( agregarProducto() )

        try {
            // Insertar en la API
            await clienteAxios.post('/productos', producto)
            
            // Si todo sale bien, actualizar el state
            dispatch( agregarProductoExito(producto) )

            // Alerta
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            )
        } catch (error) {
            console.log(error)
            // Si hay un error cambiar el state
            dispatch( agregarProductoError(true) )

            // Alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intentalo de nuevo'
            })
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload:true
})

// Si el producto se guarda en la DB
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

// Si se produce un error
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})

// Funcion que descarga los productos de la DB
export function obtenerProductosAction(){
    return async (dispatch) => {
        dispatch( descargarProductos() )

        try {
            const respuesta = await clienteAxios.get('/productos')
            dispatch( descargarProductosExitosa(respuesta.data))
        } catch (error) {
            dispatch( descargarProductosError() )
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const descargarProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})

const descargarProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})

// Selecciona y elimina el producto
export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id))

        try {
            await clienteAxios.delete(`/productos/${id}`)
            dispatch( eliminarProductoExito())

            // Si se elimina, mostrar alerta
            Swal.fire(
                'Eliminado!',
                'El producto se elimino correctamente',
                'success'
            )

        } catch (error) {
            dispatch( eliminarProductoError())
            console.log(error)
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
})

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
})

// Colocar producto en edicion
export function obtenerProductoEditar(producto){
    return (dispatch) => {
        dispatch( obtenerProductoAction(producto))
    }
}

const obtenerProductoAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

// Edita un registro en la API y el state
export function editarProductoAction(producto){
    return async (dispatch) => {
        dispatch(editarProducto())

        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto)
            
            dispatch( editarProductoExito(producto))
        } catch (error) {
            console.log(error)
            dispatch(editarProductoError() )
        }
    }
}

const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO
})

const editarProductoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
})

const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
})