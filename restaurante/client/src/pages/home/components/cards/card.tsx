interface CardProps {
  name: string;
  description: string;
  image: string;
}

const Cards = ( props: CardProps) => {
  return ( 
      <>
      <div>
        <h2>{props.name}</h2>
        <img className="img" src={props.image} alt={props.name} />
        <p>{props.description}</p>
      </div>
       
      </>
   );
}
 
export default Cards;