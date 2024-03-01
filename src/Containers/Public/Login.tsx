import { useDispatch } from 'react-redux'
import { actionGoogle, actionLoginAsyn } from '../../Redux/Actions/ActionLogin'
import useForm from '../../Helpers/useForm'
import { Link } from 'react-router-dom'

const Login = () => {

  const dispatch:any = useDispatch()
  const { reset, handleChange, formValues } = useForm({
    user: "",
    pass: "",
  });

  const { email, pass } = formValues;
  const handleSubmit = (e:any) => {
    e.preventDefault();

    dispatch(actionLoginAsyn(email, pass));
    reset();
  };



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" name="email" onChange={handleChange} value={email} />
        <br></br>
        <input type="password" placeholder="Password"  name="pass" onChange={handleChange} value={pass} autoComplete="true" />
        <button type="submit">Login</button>
      </form>
      <br></br>
      <p>No tienes cuenta? <Link to="/register">Registrate gratis</Link></p>
      <br></br>
      <button onClick={() => dispatch(actionGoogle())}>GOOGLE</button>
    </div>
  )
}

export default Login