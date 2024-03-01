import { useState } from 'react';
import { getAuth, signOut } from "firebase/auth";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const logOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/LandingPAge">
            <img
              src="https://res.cloudinary.com/dyepe4ih7/image/upload/v1709270601/socialmedia/u8a9wbdepycp3r5wmrao.svg"
              alt="findy"
            />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/newcomer")}>NewComer</Nav.Link>
            <Nav.Link onClick={() => navigate("/search")}>Search</Nav.Link>
            <Nav.Link onClick={() => navigate("../../Components/Profile")}>
              Perfil
            </Nav.Link>
            <Nav.Link onClick={() => logOut()}>Log OUT</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <label>
        <Container>
          <Row style={{ gap: 20 }}>
            <Col
              xs={7}
              md={5}
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: 10,
                position: "relative"
              }}
            >
              <Image
                style={{
                  position: "absolute",
                  zIndex: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  top: 27
                }}
                src="https://res.cloudinary.com/dtmapxnao/image/upload/v1709072583/workshop/Vector_4_dyqict.png"
              />
              <Image
                style={{ width: 71, height: 80, filter: "brightness(0.3)" }}
                src="https://res.cloudinary.com/dyepe4ih7/image/upload/v1709271888/socialmedia/fmvllbewbmltam4puxv5.jpg"
                roundedCircle
              />
              <p style={{ fontSize: 10, textAlign: "center" }}> Tu historia </p>
            </Col>
            <Col
              xs={7}
              md={5}
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: 10
              }}
            >
              {/* mapeo de seguidos */}
              <Image
                style={{  }}
                src="https://res.cloudinary.com/dyepe4ih7/image/upload/v1709272334/socialmedia/rmx0u3z9mbuaz6gyi9ek.svg"
                roundedCircle
              />
              <p style={{ fontSize: 10, textAlign: "center" }}> Seguido </p>
            </Col>
          </Row>
        </Container>
      </label>
      <nav onClick={handleShow}>
        {/* mapeo de publicacion */}
        <Card style={{ width: "20rem" }} show={show} onHide={handleClose} closeButton>
          <section>
            <Image style={{width: 30, height: 30}} src="https://res.cloudinary.com/dyepe4ih7/image/upload/v1709271888/socialmedia/fmvllbewbmltam4puxv5.jpg" roundedCircle/>
            <Card.Title>Card Title</Card.Title>
          </section>
          <Card.Img variant="top" src="https://res.cloudinary.com/dyepe4ih7/image/upload/v1709271888/socialmedia/fmvllbewbmltam4puxv5.jpg" />
          <section style={{display: "flex", flexDirection: "row", gap: 5, textAlign: "center"}}>
            <nav>
              <Button variant="primary">like</Button>
              <p>1K</p>
            </nav>
            <nav>
              <Button variant="primary">comment</Button>
              <p>200</p>
            </nav>
            <nav>
              <Button variant="primary">share</Button>
              <p>85</p>
            </nav>
            <nav>
              <Button variant="primary">save</Button>
            </nav>
          </section>
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Darkrai, el espectro carmesi.
            </Card.Text>
          </Card.Body>
        </Card>
      </nav>
    </div>
  );
};

export default LandingPage;
