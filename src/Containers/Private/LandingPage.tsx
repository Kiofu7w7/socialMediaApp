import { getAuth, signOut } from "firebase/auth";
import { Col, Container, Image, Nav, Navbar, Row } from "react-bootstrap";
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
          <Row>
            <Col xs={6} md={4}>
              <Image style={{width: 71, height: 80}} src="https://res.cloudinary.com/dyepe4ih7/image/upload/v1709271888/socialmedia/fmvllbewbmltam4puxv5.jpg" roundedCircle />
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={4}>
              <Image style={{width: 71, height: 80}} src="https://res.cloudinary.com/dyepe4ih7/image/upload/v1709272334/socialmedia/rmx0u3z9mbuaz6gyi9ek.svg" roundedCircle />
            </Col>
          </Row>
        </Container>
      </label>
    </div>
  );
};

export default LandingPage;
