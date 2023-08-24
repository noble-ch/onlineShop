/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import {
  Navbar,
  Nav,
  Container,
  Row,
  NavDropdown,
  Offcanvas
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
    <header style={{ margin: "6rem" }}>
      {["lg"].map((expand) => (
        <Navbar
          fixed="top"
          key={expand}
          expand={expand}
          className="bg-body-tertiary mb-3 ">
          <Container fluid>
            <LinkContainer to="/">
              <Navbar.Brand id="brand">OTICSHOP</Navbar.Brand>
            </LinkContainer>

            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end">
              <Offcanvas.Header closeButton></Offcanvas.Header>

              <Nav style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <LinkContainer to="/products">
                    <Nav.Link>Products</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/contacts">
                    <Nav.Link>Contacts</Nav.Link>
                  </LinkContainer>
                </div>
                <div>
                  <SearchBox />
                </div>
                <div style={{ display: "flex" }}>
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
                </div>
              </Nav>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </header>
  );
}

export default Header;
