import { useEffect, useState } from "react";
import Cards from "../cards/card";
import "../cards/cards.css";
import { AiOutlineClose } from "react-icons/ai";
import { useItems } from "../../../../hooks/useItems";
import UpdateModal from "./updateModal/updateCard";
import RegisterCard from "./registerModal/registerCard";
import { ItemToCart } from "./itemToCart/itemToCart";
import { useUser } from "../../../../hooks/useUser";

const Fetch = ({ itemType }) => {
  const { addToCart } = useItems();
  const { user } = useUser();
  const [pratos, setPratos] = useState([]);

  const update = () => {
    const getData = async () => {
      const response = await fetch('http://127.0.0.1:5000');
      const data = await response.json();
      // Filtrar os pratos de acordo com o tipo de item recebido como prop
      const filteredData = data.filter(prato => prato.type === itemType);
      setPratos(filteredData);
    };
    getData();
  };

  const getUser = () => {
    if (user) {
      if (user.role == 'admin') {
        return true
      }
    else {
      return false
    }
    }
    else {
      return null
    }
  }

  useEffect(() => {
    update();
  }, []);

  const handleDeleteItem = async (itemId) => {
    try {
      const apiUrl = `http://127.0.0.1:5000/delete/${itemId}`;
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      };
      const response = await fetch(apiUrl, requestOptions);

      if (!response.ok) {
        throw new Error(`Erro ao remover o card com ID ${itemId}`);
      }
      
      const updatedPratos = pratos.filter(prato => prato.itemId !== itemId);
      setPratos(updatedPratos);
    } catch (error) {
      console.error(`Erro ao remover o card com ID ${itemId}:`, error);
    }
  };

  return (
    <div className="container">
      {pratos.map(prato => (
        <div className="Card" key={prato.itemId}>
          {getUser() ? 
            <div className="icons">
              <UpdateModal item={prato} updatePrato={() => update()} />
              <AiOutlineClose className="icon x-btn" onClick={() => handleDeleteItem(prato.itemId)} />
            </div>
            : null
          }
          <ItemToCart item={prato}>
            <Cards name={prato.itemName} description={prato.itemDescription} image={prato.itemImage} price={prato.itemPrice} />
          </ItemToCart>
        </div>
      ))}
      {getUser() ? 
        <div>
          <RegisterCard updatePrato={() => update()} />
        </div>
        : null
      }
    </div>
  );
};

export default Fetch;
