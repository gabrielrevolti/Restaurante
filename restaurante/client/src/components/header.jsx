import { Link } from "react-router-dom";
import logoChef from "../components/images/logo-chef-menu.png"
// import hamburguerKratos from "../components/images/hamburguerKratos.png"

const Header = () => (
  <header className="header">
    <a href="#" className="logo">
      <img className="logo-chef" src={logoChef} alt="logo" />
      Cabana do Kratos
    </a>

    <div id="menu-bar" className="fas fa-bars"></div>

    <nav className="navbar">
      <Link to="/" className="nav-menu-item">Home</Link>
      <Link to="#popular" className="nav-menu-item">Popular</Link>
      <Link to="#pedi" className="nav-menu-item">Pedir</Link>
      <Link to="/register" className="nav-menu-item">Registrar</Link>
    </nav>
  </header>
);

export default Header;