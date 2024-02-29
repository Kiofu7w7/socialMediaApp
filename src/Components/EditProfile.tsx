import React, { useState } from 'react';

const EditProfile = () => {
  const [imagenPerfil, setImagenPerfil] = useState('imagen-por-defecto');
  const [nombre, setNombre] = useState('');
  const [usuario, setUsuario] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [edad, setEdad] = useState(0); 
  const [telefono, setTelefono] = useState('');

  const handleEditarPerfil = () => {
    // Función para editar el perfil
    console.log('Editar perfil');
  };

  const handleCancelar = () => {
    // Función para cancelar la edición
    console.log('Cancelar edición');
  };

  return (
    <div className="edit-profile">
      <div className="imagen-perfil">
        <img src={imagenPerfil} alt="Imagen de perfil" />
      </div>
      <div className="informacion-perfil">
        <input
          className="input-nombre"
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          className="input-usuario"
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <textarea
          className="input-descripcion"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <input
          className="input-edad"
          type="number"
          placeholder="Edad"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
        />
        <input
          className="input-telefono"
          type="tel"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
      </div>
      <div className="botones-perfil">
        <button className="boton editar-perfil" onClick={handleEditarPerfil}>
          Editar perfil
        </button>
        <button className="boton cancelar" onClick={handleCancelar}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default EditProfile;

