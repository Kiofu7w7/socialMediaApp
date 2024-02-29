import React from 'react'
import { useDispatch } from 'react-redux'
import { actionGoogle } from '../../Redux/Actions/ActionLogin'

const Login = () => {

  const dispatch:any = useDispatch()


  return (
    <div>
      <button onClick={() => dispatch(actionGoogle())}>GOOGLE</button>
    </div>
  )
}

export default Login