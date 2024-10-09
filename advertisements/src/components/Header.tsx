import { Container, Nav, Navbar } from "react-bootstrap";

export default function Header() {
  return (
    <>
      <header>
        <Navbar expand="sm" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">
              <img src="/logo.svg" alt="Logo" width="60" height="60" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
              <Nav>
                <Nav.Link href="/">Объявления</Nav.Link>
                <Nav.Link href="/orders">Заказы</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
}
