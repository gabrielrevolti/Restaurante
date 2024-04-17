import Fetch from './components/fetch';
import Header from '../../components/header'
import burgueImg from "./images/burguer.png"
import './styles/style.css';


const Index = () => (
  
    <>
    <div className='cover'>
    <Header />
  
    <section className="home padding-section" id="home">
      <div className="content">
        <h3>Comidas feitas com carinho</h3>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus
          suscipit ratione cum, dolorem eveniet ut quo reiciendis veniam
          numquam, eius aperiam consequatur fugit aspernatur porro quam, iste
          omnis rem. Placeat.
        </p>
        <a href="#" className="btn">Pedir agora</a>
      </div>

      <div className="image">
        <img src={burgueImg} alt="" />
      </div>
    </section>

    <section className="shopping section-cards" id="shopping">
    <h1 className="heading"> Pedir <span>pratos</span></h1>

    <div className="box-container">
      <Fetch/> {/* Faz um fetch no banco de dados e renderiza na tela*/}
    </div>
    </section>
  </div>
  </>
);

export default Index;
