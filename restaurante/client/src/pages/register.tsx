import { useState } from "react";
import { Link } from "react-router-dom";

const RegisterProduct = () => {

  const [name, setName] = useState(String);
  const [image, setImage] = useState(String);
  const [description, setDescription] = useState(String);

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:5000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, image, description })
        });
        const data = await response.json();
        console.log(data.requisicao);
        console.log(data.message)
    };

  return ( 
    <>
    <div>
      <h1>Página: Register Product</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='name'>Nome:</label>
          <input 
          type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />

          <br />
          <br />

          <label htmlFor='image'>Imagem:</label>
          <input
          type="text" id='image' value={image} onChange={(e) => setImage(e.target.value)} />

          <br />
          <br />

          <label htmlFor="description">Descrição</label>
          <input
          type="text" id='description' value={description} onChange={(e) => setDescription(e.target.value)} />

          <br />
          <br />

          <div>
            <button className="button" type="submit">Enviar</button>
            <button className="button"><Link to="/">Voltar</Link></button>
          </div>
        </form>
      </div>
    </>
   );
}
 
export default RegisterProduct;