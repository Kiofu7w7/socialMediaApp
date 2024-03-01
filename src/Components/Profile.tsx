import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import useForm from "../Helpers/useForm";
import { useDispatch } from "react-redux";
import { actionEditUserAsyn, actionListUserAsyn } from "../Redux/Actions/ActionsUser";

interface User {
  Url_Photo: string,
  cellPhone: string,
  description: string,
  edad: string,
  user_name: string;
}

const Profile = () => {

  const [imagenPerfil, setImagenPerfil] = useState("imagen-por-defecto");
  const [datos, setDatos] =  useState<User | null>(null);

  const dispatch:any = useDispatch()

  useEffect(()=>{
    const info = async () => {
      const data = await dispatch(actionListUserAsyn())
      setDatos(data)
    }
    info()
  },[])
  
  const { reset, handleChange, formValues } = useForm({
    user_name: datos?.user_name || '',
    edad: datos?.edad || '',
    description: datos?.description || '',
    cellPhone: datos?.cellPhone || '',
    Url_Photo: datos?.Url_Photo || 'imagen-por-defecto',
  });

  useEffect(() => {
    if (datos) {
      formValues.user_name = datos?.user_name
      formValues.edad = datos?.edad
      formValues.description = datos?.description
      formValues.cellPhone = datos?.cellPhone
      formValues.Url_Photo = datos?.Url_Photo
    }
  }, [datos]);

  const handleCompartirPerfil = () => {
    // Función para compartir el perfil
    console.log("Compartir perfil");
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitEdit = ( )=> {
    const objFinal = {
      ...datos,
      ...formValues
    }
    dispatch(actionEditUserAsyn(objFinal))
  }

  return (
    <div className="perfil">
      <div className="imagen-perfil">
        <img style={{width:100, height:100}} src={datos?.Url_Photo} alt="Imagen de perfil" />
      </div>
      <h3>{datos?.user_name}</h3>
      <div className="informacion-perfil">
        <div className="numero-publicaciones">
           Seguidores
        </div>
        <div className="numero-seguidos"> Seguidos</div>
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
            <img style={{width:100, height: 100}} src={formValues.Url_Photo} alt="Imagen de perfil" />
          </div>
          <div className="informacion-perfil">
            <input
              className="input-usuario"
              type="text"
              name="user_name"
              placeholder="Usuario"
              value={formValues.user_name}
              onChange={handleChange}
            />
            <input
              className="input-descripcion"
              type="text"
              placeholder="Descripción"
              name="description"
              value={formValues.description}
              onChange={handleChange}
            />
            <input
              className="input-edad"
              type="number"
              name="edad"
              placeholder="Edad"
              value={formValues.edad}
              onChange={handleChange}
            />
            <input
              className="input-telefono"
              type="tel"
              name="cellPhone"
              placeholder="Teléfono"
              value={formValues.cellPhone}
              onChange={handleChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={() => submitEdit()} variant="primary">Editar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
