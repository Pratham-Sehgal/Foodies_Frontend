import {
  Navbar,
  Nav,
  Badge,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./ContextReducer";
import { useState } from "react";
import Bag from "../Pages/Bag";
import Modal from "../Modal";

export default function NavBar() {

  let data=useCart();
  const navigate=useNavigate();
const [bagView,setBagView]=useState(false )
  const handleLogout=()=>{
    localStorage.removeItem("authToken");
    navigate("/")
      }
  return (
    <Navbar bg="light" expand="lg">
    <div className="container-fluid">
      <Navbar.Brand
        as={Link}
        to="/"
        className="display-4  fst-italic fw-bolder fs-1 font-weight-bold text-primary text-uppercase font-italic"
      >
        Foodies
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarSupportedContent" />
      <Navbar.Collapse id="navbarSupportedContent">
        <Nav className="me-auto">
          <Nav.Link
            as={Link}
            to="/"
            className="nav-link"
            aria-current="page"
          >
            Home
          </Nav.Link>
          {localStorage.getItem("authToken") ? (
            <Nav.Link
              as={Link}
              to="/myOrder"
              className="nav-link"
              aria-current="page"
            >
              My Order
            </Nav.Link>
          ) : (
            ""
          )}
          {!localStorage.getItem("authToken") ? (
            <div className="d-flex">
              <Nav.Link
                as={Link}
                to="/login"
                className="btn bg-blue-200 text-success"
              >
                Login
              </Nav.Link>
              <Nav.Link
                as ={Link}
                to="/createUser"
                className="btn text-success"
              >
                SignUp
              </Nav.Link>
            </div>
          ) : (
            <div>
            <div className="btn text-danger" onClick={()=>{setBagView(true)}}>My Bag {" "}
             <Badge pill bf="danger" > {data.length}</Badge>

            </div>
            {bagView?<Modal onClose={()=>setBagView(false)}><Bag></Bag></Modal>:null}
            <div className="btn text-danger" onClick={handleLogout}>LogOut</div>
            </div>
          )}

          {/* <NavDropdown title="Dropdddown" id="navbarDropdown">
      <NavDropdown.Item href="#">Action</NavDropdown.Item>
      <NavDropdown.Item href="#">Another action</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#">Something else here</NavDropdown.Item>
    </NavDropdown> */}
          {/* <Nav.Link as={Link}  to="#" className="nav-link disabled" tabIndex="-1" aria-disabled="true">Disabled</Nav.Link> */}
        </Nav>
       
      </Navbar.Collapse>
    </div>
  </Navbar>
  );
}
