import Fetch from './components/renderCard/fetch';
import Header from '../../components/header/header';
import burgueImg from "./images/burguer.png";
import './styles/style.css';

const Index = () => {
  return (
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
          <h2 className="heading"> Pedir <span>Hamburguer</span></h2>

          <div className="box-container">
            <Fetch itemType="hamburguer" /> 
          </div>

          <h2 className="heading"> Pedir <span>Acompanhamento</span></h2>
          <div className='box-container'>
            <Fetch itemType="acompanhamento" />
          </div>

          <h2 className="heading"> Pedir <span>Bebida</span></h2>
          <div className='box-container'>
            <Fetch itemType="bebida" />
          </div>
        </section>
      </div>
    </>
  );
};

export default Index;
