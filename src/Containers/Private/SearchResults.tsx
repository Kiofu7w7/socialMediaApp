import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { actionSearchProductAsyn } from '../../Redux/Actions/ActionsUser';

const SearchResults = () => {
  const { searchTerm } = useParams();
  const [searchResults, setSearchResults] = useState<any[]>([]); 
  const dispatch: any = useDispatch();

  useEffect(() => {
    const buscar = async () => {
      if (searchTerm) { 
        const datosEncontrados = await dispatch(actionSearchProductAsyn(searchTerm));
        setSearchResults(datosEncontrados); 
      }
    };

    buscar();
  }, []);

  const mostrar = () => {
    console.log(searchResults)
  }

  return (
    <div>
      <h3>TERMINOS {searchResults.length > 0 ? searchTerm : 'No search term provided'}</h3>
      <button onClick={()=>{mostrar()}}>asda</button>
      {
        searchResults?.map((p,index) => (
          <div key={index}>
            <img style={{ height: 100 }} src={p.Url_Photo} alt="foto" />
            <h3>{p.user_name}</h3>
            <p>{p.description}</p>
          </div>
        ))
      }
    </div>
  );
};

export default SearchResults;