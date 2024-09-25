import { Link } from "react-router-dom";
import logoChef from "../images/logo-chef-menu.png"
import "./header.css";
import { FaUser } from "react-icons/fa";
import { useItems } from "../../hooks/useItems";

const Header = () => {

  const {user} = useItems()

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
      <Link to="/cart" className="nav-menu-item">Carrinho</Link>
      {user ? <Link to="/user" className="nav-menu-item"><FaUser /></Link> :
      <Link to="/login" className="nav-menu-item">Entrar</Link>
      }
      
    </nav>
  </header>
  )
  
};

export default Header;