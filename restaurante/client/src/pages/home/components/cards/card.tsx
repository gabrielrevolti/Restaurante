interface CardProps {
  name: string;
  description: string;
  image: string;
}

const Cards = ( props: CardProps) => {
  return ( 
      <>
        <h2 className="nameFood">{props.name}</h2>
        <div className="card-img">
          <img src={props.image} alt={props.name} />
        </div>
      </>
   );
}
 
export default Cards;