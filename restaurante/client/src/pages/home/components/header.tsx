import menuChef from "../images/logo-chef-menu.png"

const Header = () => (
  <header>
    <a href="#" className="logo">
      <img className="logo-chef" src={menuChef} alt="logo" />
      Gourmet Star
    </a>

    <div id="menu-bar" className="fas fa-bars"></div>

    <nav className="navbar">
      <a href="/" className="nav-menu-item">Home</a>
      <a href="#popular" className="nav-menu-item">Popular</a>
      <a href="#pedi" className="nav-menu-item">Pedir</a>
      <a href="/register" className="nav-menu-item">Registrar</a>
    </nav>
  </header>
);

export default Header;