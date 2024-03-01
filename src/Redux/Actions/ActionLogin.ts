import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { typesLogin } from "../Types/Types";
import { googleProvider } from "../../FireBase/Firebase";

// ------------Iniciando con Usuario y Contraseña---------------------//
export const actionLoginAsyn = (email:string, pass:string) => {
    return (dispatch:any) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user, user.displayName, "Bienvenido si estas Registrado");
                dispatch(actionLoginSyn(email, pass));
            })
            .catch((error) => {
                console.warn(error, "Usuario NO Autorizado");
            });
    };
};

export const actionLoginSyn = (email:string, pass:string) => {
    return {
        type: typesLogin.login,
        payload: { email, pass },
    };
};

// ------------Iniciando con Google-----------------------//
export const actionGoogle = () => {
    return (dispatch:any) => {
        const auth = getAuth();
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                let token;
                if (credential) {
                    token = credential.accessToken;
                }
                console.log(token);
                const user = result.user;
                console.log(user);
            })
            .catch((error) => {
                console.log(error);
            });
    };
};