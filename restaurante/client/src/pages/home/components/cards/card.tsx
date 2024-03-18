interface CardProps {
  name: string;
  description: string;
  image: string;
}

const Cards = ( props: CardProps) => {
  return ( 
      <>
        <h2 className="text-xl">{props.name}</h2>
        <img className="w-[200px] h-[260px]" src={props.image} alt={props.name} />
        <p className="text-lg">{props.description}</p>
      </>
   );
}
 
export default Cards;