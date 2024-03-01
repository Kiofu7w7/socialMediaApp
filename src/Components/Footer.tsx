import {
  Container,
  Image,
  Nav,
  Navbar
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
    const navigate = useNavigate();

  return (
    <div>
      <footer style={{display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#FF7674"}}>
        <Navbar data-bs-theme="dark" >
          <Container>
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate("/landingpage")}><Image src="https://res.cloudinary.com/dyepe4ih7/image/upload/v1709311997/socialmedia/s0o2qrxqpkklwxbmtgaz.png"/></Nav.Link>
            </Nav>
            <Nav className="me-auto">  
              <Nav.Link onClick={() => navigate("/search")}><Image src="https://res.cloudinary.com/dyepe4ih7/image/upload/v1709311997/socialmedia/aljtpnt2wgm5oqq0dxru.png"/></Nav.Link>
            </Nav>
            <Nav className="me-auto">  
            <Nav.Link href="#new"><Image src="https://res.cloudinary.com/dtmapxnao/image/upload/v1709072583/workshop/Vector_4_dyqict.png"/></Nav.Link>
            </Nav>
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate("/newcomer")}><Image style={{ width: 34, height: 34}} src="https://res.cloudinary.com/dyepe4ih7/image/upload/v1709315673/socialmedia/nktnddnkc2ierssctj78.png"/></Nav.Link>
            </Nav>
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate("/profile")}><Image style={{ width: 40, height: 40}} src="https://res.cloudinary.com/dyepe4ih7/image/upload/v1709271888/socialmedia/fmvllbewbmltam4puxv5.jpg" roundedCircle/></Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </footer>
    </div>
  )
}

export default Footer
