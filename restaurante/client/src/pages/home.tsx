import Header from "@/components/header"
import { useEffect, useState } from "react";

interface pratosDB {
  itemId : number,
  itemName: string,
  itemDescription: string,
  itemImage: string
}

const Home = () => {

  const [pratos, setPratos] = useState([])

  useEffect( () => {
    const getData = async () => {
    const response = await fetch('http://127.0.0.1:5000')
    const data = await response.json();
    console.log(data)
    setPratos(data)
    }
    getData()
  }, [])

  return (
    <>
      <Header/>
      <h1 className="m-3">Página: Home</h1>
      {pratos.map((prato: pratosDB) => (
        <div className="mb-5" key={prato.itemId}>
          <h1>Nome do item: {prato.itemName}</h1>
          <p className="text-white">Imagem: {prato.itemImage}</p>
          <p className="text-white">Descrição: {prato.itemDescription}</p>
        </div>
      ))}
    </>
 
   );
}
 
export default Home;