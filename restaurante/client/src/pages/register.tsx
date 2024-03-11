import { Button } from "@/components/ui/button";
import { useState } from "react";

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
    <div className="m-5">
      <h1 className="pb-2">Página: Register Product</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='name'>Nome:</label>
          <input className="text-black" 
          type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />

          <br />
          <br />

          <label htmlFor='image'>Imagem:</label>
          <input className="text-black" 
          type="text" id='image' value={image} onChange={(e) => setImage(e.target.value)} />

          <br />
          <br />

          <label htmlFor="description">Descrição</label>
          <input className="text-black" 
          type="text" id='description' value={description} onChange={(e) => setDescription(e.target.value)} />

          <br />
          <br />

          <div className="flex gap-2">
            <Button variant="secondary" type="submit">Enviar</Button>
            <Button variant="secondary"><a href="/">Voltar</a></Button>
          </div>
        </form>
      </div>
    </>
   );
}
 
export default RegisterProduct;