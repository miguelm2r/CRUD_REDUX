import { combineReducers } from "redux";
import productosReducers from "./productosReducers";
import alertaReducer from "./alertaReducer";

export default combineReducers({
    productos: productosReducers,
    alerta: alertaReducer
})