import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { typesLogin } from "../Types/Types";

export const actionRegisterAsync = (email:string, password:string) => {
    return (dispatch:any) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
    }
}

export const actionRegisterSync = (email: string, password: string) => {
    console.log("Usuario Agregado con existo");
    return {
        type: typesLogin.register,
        payload: { email, password },
    };
};