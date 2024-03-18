import { useEffect, useState } from "react";
import Cards from "./cards/card";

interface pratosDB {
  itemId : number,
  itemName: string,
  itemDescription: string,
  itemImage: string
}

const Fetch = () => {

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
    <section>
      <div className="flex gap-8">
        {pratos.map((prato: pratosDB) => (
          <div key={prato.itemId}>
            <Cards name={prato.itemName} description={prato.itemDescription} image={prato.itemImage}/>
          </div>
        ))}
      </div>
    </section>
  );
}
 
export default Fetch;