import { useEffect, useState } from "react";
import Cards from "../cards/card";
import "../cards/cards.css"
import { AiOutlineClose } from "react-icons/ai";

import { useItems } from "../../../../hooks/useItems";
import UpdateModal from "./updateModal/updateCard";
import RegisterCard from "./registerModal/registerCard";

const Fetch = () => {

  const {addToCart} = useItems()

  const [pratos, setPratos] = useState([])

  const update = () => {
    const getData = async () => {
      const response = await fetch('http://127.0.0.1:5000')
      const data = await response.json();
      console.log(data)
      setPratos(data)
      }
      getData()
  }

  useEffect( () => {
    update()
  }, [])

  const handleDeleteItem = async (itemId) => {
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
        {pratos.map((prato) => (
          <div className="Card" key={prato.itemId}>
            <Cards name={prato.itemName} description={prato.itemDescription} image={prato.itemImage} price={prato.itemPrice}/>
            <div className="icons">
              <UpdateModal  item={prato} updatePrato={() => update()}/>
              <AiOutlineClose className="icon x-btn" onClick={() => handleDeleteItem(prato.itemId)}/>
            </div>
            <button onClick={() => addToCart(prato)}>adicionar</button>
          </div>
        ))}
        <div>
          <RegisterCard updatePrato={() => update()}/>
        </div>
      </div>
  );
}
 
export default Fetch;