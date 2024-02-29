import { getAuth, signOut } from 'firebase/auth'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {

  const navigate = useNavigate()

  const logOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
    }).catch((error) => {
    });
  }

  return (
    <div>

      <button onClick={() => navigate("/newcomer")}>NewComer</button>
      <button onClick={() => navigate("/search")}>Search</button>
      <button onClick={() => navigate("../../Components/Profile")}>Perfil</button>
      <button onClick={()=> logOut()}>Log OUT</button>

    </div>
  )
}

export default LandingPage