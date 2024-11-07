const Cards = (props) => {
  return ( 
      <>
        <h2 className="nameFood">{props.name}</h2>
        <div className="card-img">
          <img src={props.image} alt={props.name} />
        </div>
        <p className="card-price">R$ {props.price}</p>
      </>
   );
}
 
export default Cards;