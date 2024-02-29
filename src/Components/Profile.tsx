import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [imagenPerfil, setImagenPerfil] = useState("imagen-por-defecto");
  const [numeroPublicaciones, setNumeroPublicaciones] = useState(0);
  const [numeroSeguidos, setNumeroSeguidos] = useState(0);
  const navigate = useNavigate()

  const handleCompartirPerfil = () => {
    // Función para compartir el perfil
    console.log("Compartir perfil");
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
        <div className="numero-seguidos">{numeroSeguidos} Seguidos</div>
      </div>
      <div className="botones-perfil">
        <button
          className="boton editar-perfil"
          onClick={() => navigate("/EditProfile")}
        >
          Editar Perfil
        </button>
        <button
          className="boton compartir-perfil"
          onClick={handleCompartirPerfil}
        >
          Compartir perfil
        </button>
      </div>
    </div>
  );
};

export default Profile;
