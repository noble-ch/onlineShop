/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import {
  Navbar,
  Nav,
  Container,
  Row,
  NavDropdown,
  Offcanvas,
  Collapse
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header style={{  fontFamily: "CustomFont",background:'#ceceda'  }}>
      <Container fluid className=" p-0 ">
        {["md"].map((expand) => (
          <Navbar
            // fixed="top"
            bg="dark"
            variant="dark"
            collapseOnSelect
            key={expand}
            expand={expand}
            className="brand py-3">
            <Container fluid>
              <LinkContainer to="/">
                <Navbar.Brand className="py-0">OTICSHOP</Navbar.Brand>
              </LinkContainer>

              <Navbar.Toggle className="rounded-5 "
                aria-controls={`offcanvasNavbar-expand-${expand}`}
              />

              <Navbar.Offcanvas style={{width:'14rem', fontsize:'large', background:'#ceceda', padding:'1rem', color:'black' }} 
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end">
                <Offcanvas.Header closeButton></Offcanvas.Header>
                
                <Nav >
                <SearchBox />
                  <Nav className="ml-auto">
                    <LinkContainer to="/products">
                      <Nav.Link> <b>Products</b> </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/contacts">
                      <Nav.Link>Contacts</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/about">
                      <Nav.Link>About</Nav.Link>
                    </LinkContainer>
                  </Nav>
                  <Nav className="m-auto"></Nav>

                  <Nav className="ml-auto">
                    <LinkContainer to="/cart">
                      <Nav.Link>
                        <i className="fas fa-shopping-cart"></i>Cart
                      </Nav.Link>
                    </LinkContainer>
                    {userInfo ? (
                      <NavDropdown title={userInfo.name} id="username">
                        <LinkContainer to="/profile">
                          <NavDropdown.Item>Profile</NavDropdown.Item>
                        </LinkContainer>

                        <NavDropdown.Item onClick={logoutHandler}>
                          Logout
                        </NavDropdown.Item>
                      </NavDropdown>
                    ) : (
                      <LinkContainer to="/login">
                        <Nav.Link>
                          <i className="fas fa-user"></i>Login
                        </Nav.Link>
                      </LinkContainer>
                    )}

                    {userInfo && userInfo.isAdmin && (
                      <NavDropdown title="Admin" id="adminmenue">
                        <LinkContainer to="/admin/userlist">
                          <NavDropdown.Item>Users</NavDropdown.Item>
                        </LinkContainer>

                        <LinkContainer to="/admin/productlist">
                          <NavDropdown.Item>Products</NavDropdown.Item>
                        </LinkContainer>

                        <LinkContainer to="/admin/orderlist">
                          <NavDropdown.Item>Orders</NavDropdown.Item>
                        </LinkContainer>
                      </NavDropdown>
                    )}
                  </Nav>
                </Nav>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
      </Container>
    </header>
  );
}

export default Header;

// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Navbar, Nav, Container, Row, NavDropdown } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";
// import SearchBox from "./SearchBox";
// import { logout } from "../actions/userActions";

// function Header() {
//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const dispatch = useDispatch();

//   const logoutHandler = () => {
//     dispatch(logout());
//   };

//   return (
//     <header >
//       <Container fluid>
//         <Navbar   bg="dark" variant="dark" expand="lg" collapseOnSelect>
//           <Container fluid className="borders">
//             <LinkContainer to="/">
//               <Navbar.Brand>ProShop</Navbar.Brand>
//             </LinkContainer>

//             <Navbar.Toggle aria-controls="basic-navbar-nav" />
//             <Navbar.Collapse id="basic-navbar-nav">
//               <SearchBox />
//               <Container></Container>
//               <Nav className="m-auto">
//                 <LinkContainer to="/products">
//                   <Nav.Link>Products</Nav.Link>
//                 </LinkContainer>
//                 <LinkContainer to="/contacts">
//                   <Nav.Link>Contacts</Nav.Link>
//                 </LinkContainer>
//                 <LinkContainer to="/cart">
//                   <Nav.Link>
//                     <span className="fas fa-shopping-cart"></span>
//                   </Nav.Link>
//                 </LinkContainer>

//                 {userInfo ? (
//                   <NavDropdown title={userInfo.name} id="username">
//                     <LinkContainer to="/profile">
//                       <NavDropdown.Item>Profile</NavDropdown.Item>
//                     </LinkContainer>

//                     <NavDropdown.Item onClick={logoutHandler}>
//                       Logout
//                     </NavDropdown.Item>
//                   </NavDropdown>
//                 ) : (
//                   <LinkContainer to="/login">
//                     <Nav.Link>
//                       <i className="fas fa-user"></i>
//                     </Nav.Link>
//                   </LinkContainer>
//                 )}

//                 {userInfo && userInfo.isAdmin && (
//                   <NavDropdown title="Admin" id="adminmenue">
//                     <LinkContainer to="/admin/userlist">
//                       <NavDropdown.Item>Users</NavDropdown.Item>
//                     </LinkContainer>

//                     <LinkContainer to="/admin/productlist">
//                       <NavDropdown.Item>Products</NavDropdown.Item>
//                     </LinkContainer>

//                     <LinkContainer to="/admin/orderlist">
//                       <NavDropdown.Item>Orders</NavDropdown.Item>
//                     </LinkContainer>
//                   </NavDropdown>
//                 )}
//               </Nav>
//             </Navbar.Collapse>
//           </Container>
//         </Navbar>
//       </Container>
//     </header>
//   );
// }

// export default Header;
