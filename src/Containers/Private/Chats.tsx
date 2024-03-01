import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { actionFindChatAsync } from '../../Redux/Actions/ActionChat'
import { getAuth } from '@firebase/auth'
import { actionSearchUserAsync } from '../../Redux/Actions/ActionsUser';

const Chats = () => {

  const dispatch:any = useDispatch()
  const user = getAuth()

  const [chats, setChats] = useState([])

  useEffect(() => {
    async function fetchChats() {
      const datos = await dispatch(actionFindChatAsync());
      setChats(datos);
    }
    fetchChats();
  }, []);


  const fun = (uid: string) => {
    const buscarUser = async () => {
      const user2 = await dispatch(actionSearchUserAsync(uid))
      return user2.url_photo;
    }
    buscarUser()
  }


  return (
    <div>
      {chats.map((chat:any, index) => (
        <div key={index}>
          {}
          {chat.Messages.length > 0 && (
            <h1>
              {chat?.Messages[chat?.Messages.length - 1]?.UID === user?.currentUser?.uid && (
                'TU: '
              ) || ''}
              {chat.Messages[chat.Messages.length - 1].UID !==
                user?.currentUser?.uid && (
                  <img
                  src={fun()}
                    alt=""
                  />
                )}
              
            </h1>
          )}
        </div>
      ))}
    </div>
  );
};


export default Chats