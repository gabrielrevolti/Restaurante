import { useState } from "react";
import "./form.css"

const Form = (props) => {
  const defaultItem = {
    name: "",
    image: "",
    description: "",
    price: ""
  }

  const [item, setItem] = useState(defaultItem)

  const toggle = props.toggle
  const updatePrato = props.updatePrato

  const handleChange = (ev) => {
    setItem((current) => ({...current, [ev.target.id]: ev.target.value}))
  }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = item.name
        const image = item.image
        const description = item.description
        const price = item.price
        await fetch('http://127.0.0.1:5000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, image, description, price})
        });
        setItem(defaultItem)
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
            type="text" id="name" value={item.name} onChange={handleChange} placeholder="Nome"/>
            </div>
            
            <div className="div-input">
              <input
              type="text" id='image' value={item.image} onChange={handleChange} placeholder="Imagem"/>
            </div>

            <div className="div-input">
            <input
              type="text" id='price' value={item.price} onChange={handleChange} placeholder="Preço"/>
            </div>
            
            <div className="div-input">
              <input
              type="text" id='description' value={item.description} onChange={handleChange} placeholder="Descrição"/>
            </div>
            
          </div>
        </form>
        <div className="btn-input">
          <button className="button" onClick={() => toggle()}>Cancelar</button>
          <button className="button" onClick={handleSubmit}>Enviar</button>
        </div>
      </div>
    </>
   );
}
 
export default Form;