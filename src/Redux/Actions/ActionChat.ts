import { getAuth } from "firebase/auth";
import { arrayUnion, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { dataBase } from "../../FireBase/Firebase";
import { typesChats } from "../Types/Types";

export const actionFindChatAsync = () => {
    return async (dispatch: any) => {
        try {
            const auth = getAuth();
            if (auth && auth.currentUser) {
                const uid = auth.currentUser.uid;
                const chatQuery = query(
                    collection(dataBase, "Chat"),
                    where("UID1", "==", uid)
                );
                const chatQuery2 = query(
                    collection(dataBase, "Chat"),
                    where("UID2", "==", uid)
                );
                const chatSnapshot = await getDocs(chatQuery);
                const chatSnapshot2 = await getDocs(chatQuery2);
                if (chatSnapshot) {
                    let chats = chatSnapshot.docs.map((doc) => ({ Id: doc.id, ...doc.data() }));
                    chats = chats.concat(chatSnapshot2.docs.map((doc) => ({ Id: doc.id, ...doc.data() })));
                    dispatch(actionFindChatsync());
                    return chats;
                } else {
                    console.warn("No se encontraron chats.");
                }
            } else {
                console.warn("No esta uthenticado");
            }
        } catch (error) {
            console.error("Error al obtener los chats:", error);
        }
    };
};

const actionFindChatsync = () => {
    return {
        type: typesChats.list
    };
};

export const actionAddMessageToChatAsync = (chatId: string, message: string) => {
    return async (dispatch: any) => {
        try {
            const auth = getAuth();
            if (auth && auth.currentUser) {
                const docRef = doc(dataBase, "Chat", chatId);
                if (docRef) {
                    await updateDoc(docRef, {
                        Messages: arrayUnion({
                            UID: auth.currentUser.uid,
                            Message: message
                        })
                    });
                    const obj = {
                        chatId: chatId,
                        message: message,
                        UID: auth.currentUser.uid,
                    }
                    dispatch(actionAddMessageToChatSync(obj));
                } else {
                    console.warn("No se encontró el documento de chat.");
                }
            } else {
                console.warn("No se encontró el usuario.");
            }
        } catch (error) {
            console.error("Error al agregar el mensaje al chat:", error);
        }
    }
};

const actionAddMessageToChatSync = (payload: object) => {
    return {
        type: typesChats.list,
        payload
    };
};