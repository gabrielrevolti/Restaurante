import { useState } from "react";
import "./form.css"

const Form = (props) => {

  const item = props.itemToUpdate
  const update = props.updatePrato
  const togle = props.togle

  const [name, setName] = useState(item.itemName);
  const [image, setImage] = useState(item.itemImage);
  const [description, setDescription] = useState(item.itemDescription);
  const [price, setPrice] = useState(item.itemPrice)
  const id = item.itemId

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`http://127.0.0.1:5000/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, image, description, price})
    });
    update()
    togle()
  };

  return ( 
    <>
    <div>
        <form>
          <div className="div-input-flex"> 
            <div className="div-input">
            <input 
            type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome"/>
            </div>
            
            <div className="div-input">
              <input
              type="text" id='image' value={image} onChange={(e) => setImage(e.target.value)} placeholder="Imagem"/>
            </div>

            <div className="div-input">
            <input
              type="text" id='price' value={price}  onChange={(e) => setPrice(e.target.value)}  placeholder="Preço"/>
            </div>
            
            <div className="div-input">
              <input
              type="text" id='description' value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrição"/>
            </div>
            
          </div>
        </form>
        <div className="btn-input">
          <button className="button" onClick={() => togle()}>Cancelar</button>
          <button className="button" onClick={handleUpdate}>Mudar</button>
        </div>
      </div>
    </>
   );
}
 
export default Form;