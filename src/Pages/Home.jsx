import Footer from "../components/Footer";
import Cards from "../components/Cards";
import Banner from "../components/Banner";
import Modal from "../Modal";
import {
  Navbar,
  Nav,
  FormControl,

} from "react-bootstrap";
import { Link ,useNavigate } from "react-router-dom";
import {  useCart} from "../components/ContextReducer";
import { useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import Bag from "./Bag";

export default function Home() {
  let data=useCart();
  const navigate=useNavigate();
  const [search, setSearch] = useState(" ");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [bagView,setBagView]=useState(false )

  const loadData = async () => {
    let response = await fetch("http://localhost:3000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setFoodCat(response[1]);
    setFoodItems(response[0]);
    console.log(response[0], response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout=()=>{
localStorage.removeItem("authToken");
navigate("/")
  }

  return (
    <>
   
      <div>
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
              <div className="d-flex">
              
                <FormControl
                  type="search"
                  placeholder="Search "
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                
                {/* <Button variant="outline-success" type="submit">Search</Button> */}
              </div>
            </Navbar.Collapse>
          </div>
        </Navbar>
      </div>
      <div>
        <Banner />
      </div>

      {/* Cards */}
      <div className="container">
        {foodCat.length !== 0 ? (
          foodCat.map((data) => (
            <div key={data._id} className="row mb-3">
              <div className="fs-3 m-3">{data.CategoryName}</div>
              <hr />
              {foodItems.length !== 0 ? (
                foodItems
                  .filter(
                    (item) =>
                      data.CategoryName === item.CategoryName &&
                      item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((filterItem) => (
                    <div
                      key={filterItem._id}
                      className="col-12 col-md-6 col-lg-3"
                    >
                      <Cards 
                        foodItem={filterItem}
                        // foodName={filterItem.name}
                        options={filterItem.options[0]}
                        // imgSrc={filterItem.img}
                        // description={filterItem.description}
                      />
                    </div>
                  ))
              ) : (
                <div>No data found</div>
              )}
            </div>
          ))
        ) : (
          <div>pppppppppppppppppp</div>
        )}
      </div>

      <Footer />
    </>
  );
}
