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
      <a href="/" className="nav-menu-item">Home</a>
      <a href="#popular" className="nav-menu-item">Popular</a>
      <a href="#pedi" className="nav-menu-item">Pedir</a>
      <a href="/register" className="nav-menu-item">Registrar</a>
    </nav>
  </header>
);

export default Header;