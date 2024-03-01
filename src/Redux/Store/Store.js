import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { thunk } from "redux-thunk";
import loginReducer from "../Reducers/LoginReducer";

const middleware = [thunk];

// Ojo: solo para el entorno de desarrollo ye sto me permite ver a la extensión de Redux en la consola
const composeEnhancers =
    (typeof window !== "undefined" &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;


const reducers = combineReducers({
    loginStore: loginReducer,
});

export const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(...middleware))
);