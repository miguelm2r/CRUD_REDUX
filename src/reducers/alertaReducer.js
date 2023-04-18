import{
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from '../types'

const inicialState = {
    alerta: null
}

export default function(state = inicialState, action){
    switch(action.type){
        case MOSTRAR_ALERTA:
            return{
                ...state,
                alerta: action.payload
            }
        case OCULTAR_ALERTA:
            return{
                ...state,
                alerta: null
            }   
        default:
            return state
    }
}