import { useState } from "react";
import "./form.css"

const Form = (props) => {

  const [name, setName] = useState(String);
  const [image, setImage] = useState(String);
  const [description, setDescription] = useState(String);
  const [price, setPrice] = useState(String)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:5000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, image, description, price })
        });
        const data = await response.json();
        console.log(data.requisicao);
        console.log(data.message)
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
              type="text" id='price' value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Preço"/>
            </div>
            
            <div className="div-input">
              <input
              type="text" id='description' value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrição"/>
            </div>
            
          </div>
        </form>
        <div className="btn-input">
          <button className="button" onClick={props.togle}>Cancelar</button>
          <button className="button" onClick={handleSubmit}>Enviar</button>
        </div>
      </div>
    </>
   );
}
 
export default Form;