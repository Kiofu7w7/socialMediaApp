import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { dataBase } from "../../FireBase/Firebase";
import { typesUsers } from "../Types/Types";
import { getAuth } from "firebase/auth";


// ------------------Listar--------------------- //
export const actionListUsersAsyn = () => {
    const usuarios: object[] = [];
    return async (dispatch: any) => {
        const productosListar = await getDocs(collection(dataBase, "Users"));
        productosListar.forEach((p) => {
            usuarios.push({
                ...p.data(),
            });
        });
        dispatch(actionListUserSyn(usuarios));
        return usuarios
    }
}

export const actionListUsersSyn = (payload: any) => {
    return {
        type: typesUsers.list,
        payload,
    };
};


// ------------------Listar usuario personal--------------------- //
export const actionListUserAsyn = () => {
    const auth = getAuth();
    const userId = auth.currentUser ? auth.currentUser.uid : null; 
    return async (dispatch: any) => {
        if (userId) {
            try {
                const collectionP = collection(dataBase, "Users");
                const q = query(collectionP, where("UID", "==", userId)); 
                const datosQ = await getDocs(q);
                if (datosQ.empty) {
                    console.warn("No encontrado");
                    return;
                }
                const usuarios:object[] = [];
                datosQ.forEach((docu) => {
                    usuarios.push({
                        ...docu.data(),
                        id: docu.id,
                    });
                });
                const documentReference = datosQ.docs[0].ref;
                const documentSnapshot = await getDoc(documentReference);
                const docData = documentSnapshot.data()
                dispatch(actionListUserSyn(usuarios));
                return docData
            } catch (error) {
                console.log(error);
            }
        } else {
            console.warn("Current user is not authenticated.");
        }
    };
}

export const actionListUserSyn = (payload: any) => {
    return {
        type: typesUsers.list,
        payload,
    };
};

// ------------------Crear--------------------- //
export const actionAddUserAsyn = (payload: object) => {
    const user = getAuth()
    const UID = user.currentUser?.uid;
    const modifiedPayload = { ...payload,
        UID: UID,
        Followers: [],
        Follows: [],
        Likes: [],
        Saved: [] };
    return async (dispatch: any) => {
        await addDoc(collection(dataBase, "Users"), modifiedPayload)
            .then((resp) => {
                dispatch(actionAddUserSyn(modifiedPayload));
                dispatch(actionListUsersAsyn());
            })
            .catch((e) => {
                console.error("Error adding document: ", e);
            });
    };
};
export const actionAddUserSyn = (payload: any) => {
    return {
        type: typesUsers.add,
        payload,
    };
};

// ------------------Editar--------------------- //
export const actionEditUserAsyn = (payload: any) => {
    return async (dispatch: any) => {
        let uid = "";
        const collectionP = collection(dataBase, "Users");
        const q = query(collectionP, where("UID", "==", payload.id));
        const datosQ = await getDocs(q);
        datosQ.forEach((docu) => {
            uid = docu.id;
        });
        const docRef = doc(dataBase, "Users", uid);
        await updateDoc(docRef, payload)
            .then((resp) => {
                dispatch(actionEditUserSyn(payload));
                dispatch(actionListUsersAsyn());
            })
            .catch((error) => console.log(error));
    };
};

export const actionEditUserSyn = (payload: any) => {
    return {
        type: typesUsers.edit,
        payload,
    };
};

// ----------------Eliminar----------------------- //

export const actionDeleteUserAsyn = (payload: number) => {
    return async (dispatch: any) => {
        const productosCollection = collection(dataBase, "Users");
        const q = query(productosCollection, where("UID", "==", payload));
        const dataQ = await getDocs(q);
        console.log(dataQ);

        dataQ.forEach((docu) => {
            deleteDoc(doc(dataBase, "Users", docu.id));
        });
        dispatch(actionDeleteUserSyn(payload));
    };
};

export const actionDeleteUserSyn = (payload: any) => {
    return {
        type: typesUsers.delete,
        payload,
    };
};

// ---------------------- Buscar usuario ----------------- //

export const actionSearchUserAsync = (payload: string) => {
    return async (dispatch: any) => {
        try {
            const userCollection = collection(dataBase, "Users");
            const querySearch = query(userCollection, where("UserName", "==", payload));
            const querySnapshot = await getDocs(querySearch);
            if (querySnapshot.empty) {
                console.warn("No se encontraron documentos para el nombre de usuario");
                return;
            }
            const documentReference = querySnapshot.docs[0].ref;
            const documentSnapshot = await getDoc(documentReference);
            const docData = documentSnapshot.data()
            return docData
        } catch (error) {
            console.error("Error searching user:", error);
        }
    };
};

export const actionSearchUserSyn = (payload: any) => {
    return {
        type: typesUsers.search,
        payload,
    };
}

// --------------------Follow usuario ------------------ //

export const actionFollowUserAsync = (payload: string) => {
    return async (dispatch: any) => {
        try {
            const loggedUserData = await dispatch(actionListUserAsyn());
            const userId = loggedUserData ? loggedUserData.UID : null;
            const userToFollowData = await dispatch(actionSearchUserAsync(payload));

            if (userId && userToFollowData) {
                await updateDoc(doc(dataBase, "Users", userToFollowData.id), {
                    Followers: arrayUnion(userId),
                });

                await updateDoc(doc(dataBase, "Users", userId), {
                    Follows: arrayUnion(userToFollowData.UID),
                });

                dispatch(actionFollowUserSyn(payload));
            } else {
                console.warn("No se encontró al usuario logeado o al usuario para seguir.");
            }
        } catch (error) {
            console.error("Error al seguir al usuario:", error);
        }
    };
}

export const actionFollowUserSyn = (payload: any) => {
    return {
        type: typesUsers.follow,
        payload,
    };
}

// --------------------UnFollow usuario ------------------ //

export const actionUnfollowUserAsync = (payload: string) => {
    return async (dispatch: any) => {
        try {
            const loggedUserData = await dispatch(actionListUserAsyn());
            const userId = loggedUserData ? loggedUserData.UID : null;
            const userToUnfollowData = await dispatch(actionSearchUserAsync(payload));

            if (userId && userToUnfollowData) {
                await updateDoc(doc(dataBase, "Users", userToUnfollowData.id), {
                    Followers: arrayRemove(userId),
                });
                await updateDoc(doc(dataBase, "Users", userId), {
                    Follows: arrayRemove(userToUnfollowData.UID),
                });

                dispatch(actionUnfollowUserSyn(payload));
            } else {
                console.warn("No se encontró al usuario logeado o al usuario para dejar de seguir.");
            }
        } catch (error) {
            console.error("Error al dejar de seguir al usuario:", error);
        }
    };
}

export const actionUnfollowUserSyn = (payload: any) => {
    return {
        type: typesUsers.unfollow,
        payload,
    };
}

// ------------------------- LIKE POST ---------------------- //
export const actionLikePostAsync = (payload: string) => {
    return async (dispatch: any) => {
        try {
            const loggedUserData = await dispatch(actionListUserAsyn());
            const userId = loggedUserData ? loggedUserData.UID : null;

            const postDocRef = doc(dataBase, "Publications", payload);
            const postDocSnap = await getDoc(postDocRef);

            if (postDocSnap.exists() && userId) {
                const postData = postDocSnap.data();
                const postLikes = postData.Likes;

                const hasLiked = postLikes.includes(userId);

                if (hasLiked) {
                    await updateDoc(postDocRef, {
                        Likes: arrayRemove(userId),
                    });

                    await updateDoc(doc(dataBase, "Users", userId), {
                        Likes: arrayRemove(payload),
                    });
                } else {
                    await updateDoc(postDocRef, {
                        Likes: arrayUnion(userId),
                    });

                    await updateDoc(doc(dataBase, "Users", userId), {
                        Likes: arrayUnion(payload),
                    });
                }

                dispatch(actionLikePostSyn(payload));
            } else {
                console.warn("No se encontró la publicación o el usuario en firstore.");
            }
        } catch (error) {
            console.error("Error al dar o quitar 'me gusta' a la publicación:", error);
        }
    };
}

const actionLikePostSyn = (payload: any) => {
    return {
        type: typesUsers.like,
        payload,
    };
}

// ------------- SAVE POST -------------------- //

export const actionSavePostAsync = (payload: string) => {
    return async (dispatch: any) => {
        try {
            const loggedUserData = await dispatch(actionListUserAsyn());
            const userId = loggedUserData ? loggedUserData.UID : null;

            if (userId) {
                const userDocRef = doc(dataBase, "Users", userId);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    const savedPosts = userData.Saved;
                    const hasSaved = savedPosts.includes(payload);
                    if (hasSaved) {
                        await updateDoc(userDocRef, {
                            Saved: arrayRemove(payload),
                        });

                        dispatch(actionSavePostSyn(payload));
                    } else {
                        await updateDoc(userDocRef, {
                            Saved: arrayUnion(payload),
                        });

                        dispatch(actionSavePostSyn(payload));
                    }
                } else {
                    console.warn("No se encontró el usuario en firestore.");
                }
            } else {
                console.warn("No se encontró el usuario logeado.");
            }
        } catch (error) {
            console.error("Error al guardar o eliminar una publicación:", error);
        }
    };
}

const actionSavePostSyn = (payload: any) => {
    return {
        type: typesUsers.saved,
        payload,
    };
}

// ------------------------- LIKE STORIE ---------------------- //
export const actionLikeStorieAsync = (payload: string) => {
    return async (dispatch: any) => {
        try {
            const loggedUserData = await dispatch(actionListUserAsyn());
            const userId = loggedUserData ? loggedUserData.UID : null;

            const postDocRef = doc(dataBase, "Stories", payload);
            const postDocSnap = await getDoc(postDocRef);

            if (postDocSnap.exists() && userId) {
                const postData = postDocSnap.data();
                const postLikes = postData.Likes;

                const hasLiked = postLikes.includes(userId);

                if (hasLiked) {
                    await updateDoc(postDocRef, {
                        Likes: arrayRemove(userId),
                    });

                    await updateDoc(doc(dataBase, "Users", userId), {
                        Likes: arrayRemove(payload),
                    });
                } else {
                    await updateDoc(postDocRef, {
                        Likes: arrayUnion(userId),
                    });

                    await updateDoc(doc(dataBase, "Users", userId), {
                        Likes: arrayUnion(payload),
                    });
                }

                dispatch(actionLikeStorieSyn(payload));
            } else {
                console.warn("No se encontró la historia o el usuario en firstore.");
            }
        } catch (error) {
            console.error("Error al dar o quitar 'me gusta' a la historia:", error);
        }
    };
}

const actionLikeStorieSyn = (payload: any) => {
    return {
        type: typesUsers.like,
        payload,
    };
}
