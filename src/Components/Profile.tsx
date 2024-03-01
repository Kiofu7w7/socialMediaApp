import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";


const Profile = () => {
  const [imagenPerfil, setImagenPerfil] = useState("imagen-por-defecto");
  const [numeroPublicaciones, setNumeroPublicaciones] = useState(0);
  const [numeroSeguidos, setNumeroSeguidos] = useState(0);

  const handleCompartirPerfil = () => {
    // Función para compartir el perfil
    console.log("Compartir perfil");
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [nombre, setNombre] = useState("");
  const [usuario, setUsuario] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [edad, setEdad] = useState();
  const [telefono, setTelefono] = useState();

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
        <Button variant="primary" onClick={handleShow}>
          Editar perfil
        </Button>
        <button className="boton cancelar" onClick={handleCompartirPerfil}>
          Compartir perfil
        </button>
      </div>
      <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body className="edit-profile">
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Editar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
