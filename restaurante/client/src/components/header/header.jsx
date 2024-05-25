import { Link } from "react-router-dom";
import logoChef from "../images/logo-chef-menu.png"
import "./header.css";

const Header = () => {



  return (
    <header className="header">
    <a href="#" className="logo">
      <img className="logo-chef" src={logoChef} alt="logo" />
      Cabana do Kratos
    </a>

    <div id="menu-bar" className="fas fa-bars"></div>

    <nav className="navbar">
      <Link to="/" className="nav-menu-item">Home</Link>
      <Link to="#popular" className="nav-menu-item">Popular</Link>
      <Link to="/login" className="nav-menu-item">Entrar</Link>
      <Link to="/cart" className="nav-menu-item">Carrinho</Link>
    </nav>
  </header>
  )
  
};

export default Header;