import React, { useState } from 'react';

const Perfil = () => {
  const [imagenPerfil, setImagenPerfil] = useState(0); // Estado para la imagen, en useState poner enlace de imagen basica
  const [numeroPublicaciones, setNumeroPublicaciones] = useState(0); // Estado para el número de publicaciones
  const [numeroSeguidos, setNumeroSeguidos] = useState(0); // Estado para el número de seguidos

  const handleEditarPerfil = () => {
    // Función para editar el perfil
    console.log('Editar perfil');
  };

  const handleCompartirPerfil = () => {
    // Función para compartir el perfil
    console.log('Compartir perfil');
  };

  return (
    <div className="perfil">
      <div className="imagen-perfil">
        <img src={imagenPerfil} alt="Imagen de perfil" />
      </div>
      <div className="informacion-perfil">
        <div className="numero-publicaciones">
          {numeroPublicaciones} Publicaciones
        </div>
        <div className="numero-seguidos">
          {numeroSeguidos} Seguidos
        </div>
      </div>
      <div className="botones-perfil">
        <button className="boton editar-perfil" onClick={handleEditarPerfil}>
          Editar perfil
        </button>
        <button className="boton compartir-perfil" onClick={handleCompartirPerfil}>
          Compartir perfil
        </button>
      </div>
    </div>
  );
};

export default Perfil;
