import { useState } from "react";
import "./form.css"

const Form = (props) => {
  const defaultItem = {
    itemName: "",
    itemImage: "",
    itemDescription: "",
    itemPrice: "",
    itemId: +"",
    itemQuantity: 0
  }

  const items = props.itemToUpdate

  const [item, setItem] = useState(items ? items :defaultItem)

  const toggle = props.toggle
  const updatePrato = props.updatePrato
  
  const handleChange = (ev) => {
    setItem((current) => ({...current, [ev.target.id]: ev.target.value}))
  }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch('http://127.0.0.1:5000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({item})
        });
        setItem(defaultItem)
        updatePrato()
        toggle()
    };

    const handleUpdate = async (e) => {
      e.preventDefault();
      await fetch(`http://127.0.0.1:5000/update/${item.itemId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({item})
      });
      updatePrato()
      toggle()
    };

  return ( 
    <>
    <div>
        <form>
          <div className="div-input-flex"> 
            <div className="div-input">
            <input 
            type="text" id="itemName" value={item.itemName} onChange={handleChange} placeholder="Nome"/>
            </div>
            
            <div className="div-input">
              <input
              type="text" id='itemImage' value={item.itemImage} onChange={handleChange} placeholder="Imagem"/>
            </div>

            <div className="div-input">
            <input
              type="text" id='itemPrice' value={item.itemPrice} onChange={handleChange} placeholder="Preço"/>
            </div>
            
            <div className="div-input">
              <input
              type="text" id='itemDescription' value={item.itemDescription} onChange={handleChange} placeholder="Descrição"/>
            </div>
            
          </div>
        </form>
        <div className="btn-input">
          <button className="buttons is-danger" onClick={() => toggle()}>Cancelar</button>
          {props.itemToUpdate ? 
          <button className="buttons" onClick={handleUpdate}>Atualizar</button> :
          <button className="buttons" onClick={handleSubmit}>Enviar</button>
          }
          
        </div>
      </div>
    </>
   );
}
 
export default Form;