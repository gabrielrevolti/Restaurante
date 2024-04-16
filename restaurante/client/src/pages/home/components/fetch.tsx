import { useEffect, useState } from "react";
import Cards from "./cards/card";
import "./cards/cards.css"
import { Link } from "react-router-dom";

interface pratosDB {
  itemId : number,
  itemName: string,
  itemDescription: string,
  itemImage: string
}

const Fetch = () => {

  const [pratos, setPratos] = useState<pratosDB[]>([])

  useEffect( () => {
    const getData = async () => {
    const response = await fetch('http://127.0.0.1:5000')
    const data = await response.json();
    console.log(data)
    setPratos(data)
    }
    getData()
  }, [])

  

  const handleDeleteItem = async (itemId:number) => {
    try {
      const apiUrl = `http://127.0.0.1:5000/delete/${itemId}`;

      const requestOptions = {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
      };

      // Fazer a requisição
      const response = await fetch(apiUrl, requestOptions);

      if (!response.ok) {
          throw new Error(`Erro ao remover o card com ID ${itemId}`);
      }

      const data = await response.json();
      console.log(`Card com ID ${itemId} removido com sucesso!`);
      console.log(data.itemId);
  } catch (error) {
      console.error(`Erro ao remover o card com ID ${itemId}:`, error);
  }
    const updatedPratos = pratos.filter((prato) => prato.itemId !== itemId);
    setPratos(updatedPratos);
  };


  return (
      <div className="container">
        {pratos.map((prato: pratosDB) => (
          <div className="Card" key={prato.itemId}>
            <Cards name={prato.itemName} description={prato.itemDescription} image={prato.itemImage}/>
            <button onClick={() => handleDeleteItem(prato.itemId)}>Excluir</button>
            <button><Link to={`update/${prato.itemId}`}>Mudar</Link></button>
          </div>
        ))}
      </div>
  );
}
 
export default Fetch;