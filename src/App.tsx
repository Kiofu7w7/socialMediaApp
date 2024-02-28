import { useDispatch } from 'react-redux';
import './App.css';

import { useState } from 'react';
import { actionListPublicationsAsync } from './Redux/Actions/ActionPublication';

function App() {

  const dispatch:any = useDispatch();
  const [userName, setUserName] = useState('');

  const func = async () => {
    const datos = await dispatch(actionListPublicationsAsync())
    console.log(datos)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };


  return (
    <div className="App">
      <header className="App-header">
        <button>Listar</button>
        <input type="text" value={userName} onChange={handleChange} />
        <button onClick={()=>func()}>Buscar</button>
      </header>
    </div>
  );
}

export default App;
