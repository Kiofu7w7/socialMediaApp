import { getAuth, signOut } from 'firebase/auth'
import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const LandingPage = () => {

  const navigate = useNavigate()

  const logOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
    }).catch((error) => {
    });
  }

  return (
    <div>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/LandingPAge"><img src="https://res.cloudinary.com/dyepe4ih7/image/upload/v1709270601/socialmedia/u8a9wbdepycp3r5wmrao.svg" alt="findy" /></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/newcomer">NewComer</Nav.Link>
            <Nav.Link href="/search">Search</Nav.Link>
            <Nav.Link href="../../Components/Profile">Profile</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <button onClick={() => navigate("/newcomer")}>NewComer</button>
      <button onClick={() => navigate("/search")}>Search</button>
      <button onClick={() => navigate("../../Components/Profile")}>Perfil</button>
      <button onClick={()=> logOut()}>Log OUT</button>
    </div>
  )
}

export default LandingPage