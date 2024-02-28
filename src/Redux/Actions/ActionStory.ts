import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { typesStorys } from "../Types/Types";
import { dataBase } from "../../FireBase/Firebase";

export const actionCreateStoryAsync = (payload: object) => {
    return async (dispatch: any) => {
        try {
            const publicationDocRef = doc(dataBase, "Stories", crypto.randomUUID());
            const newPublication = {
                ...payload,
                id: publicationDocRef.id,
            };
            await setDoc(publicationDocRef, newPublication);
            dispatch(actionCreateStorySyn(newPublication));
        } catch (error) {
            console.error("Error al crear la historia:", error);
        }
    };
};

const actionCreateStorySyn = (payload: any) => {
    return {
        type: typesStorys.add,
        payload,
    };
};

// ----------------- READ ONE STORIE ------------------ //

export const actionReadStoryAsync = (payload: string) => {
    return async (dispatch: any) => {
        try {
            const publicationDocRef = doc(dataBase, "Stories", payload);
            const publicationDocSnap = await getDoc(publicationDocRef);

            if (publicationDocSnap.exists()) {
                const publicationData = publicationDocSnap.data();
                dispatch(actionReadStorySyn(publicationData));
                return publicationData;
            } else {
                console.warn("No se encontró la publicación.");
            }
        } catch (error) {
            console.error("Error al leer la historia:", error);
        }
    };
};

const actionReadStorySyn = (payload: any) => {
    return {
        type: typesStorys.list,
        payload,
    };
};

// ----------------- READ ALL STORIE ------------------ //

export const actionListStoryAsync = () => {
    return async (dispatch: any) => {
        try {
            const querySnapshot = await getDocs(collection(dataBase, "Stories"));
            const publications: object[] = [];

            querySnapshot.forEach((doc) => {
                publications.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            dispatch(actionListStorySyn(publications));
            return publications;
        } catch (error) {
            console.error("Error al obtener las historias:", error);
        }
    };
};

const actionListStorySyn = (payload: any) => {
    return {
        type: typesStorys.list,
        payload,
    };
};

// ----------------- UPDATE A STORIE ------------------ //

export const actionUpdateStoryAsync = (payload: any) => {
    return async (dispatch: any) => {
        try {
            const publicationDocRef = doc(dataBase, "Stories", payload.id);
            const publicationDocSnap = await getDoc(publicationDocRef);

            if (!publicationDocSnap.exists()) {
                console.warn("No se encontró la historia.");
                return;
            }

            await updateDoc(publicationDocRef, payload);
            dispatch(actionUpdateStorySyn(payload));
        } catch (error) {
            console.error("Error al actualizar la historia:", error);
        };
    };
}

const actionUpdateStorySyn = (payload: any) => {
    return {
        type: typesStorys.edit,
        payload,
    };
};

// ----------------- DELETE A STORIE ------------------ //

export const actionDeleteStoryAsync = (payload: string) => {
    return async (dispatch: any) => {
        try {
            const publicationDocRef = doc(dataBase, "Stories", payload);
            await deleteDoc(publicationDocRef);
            dispatch(actionDeleteStorySyn(payload));
        } catch (error) {
            console.error("Error al eliminar la historia:", error);
        }
    };
};

const actionDeleteStorySyn = (payload: any) => {
    return {
        type: typesStorys.delete,
        payload,
    };
};