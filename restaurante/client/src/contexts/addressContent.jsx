import { createContext, useEffect, useState } from "react"

export const AddressContext = createContext({})

export const AdressContextProvider = ({children}) => {
  const defaultAddress = {
    postalcode: "",
    user: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
  };

  const [address, setAddress] = useState(defaultAddress);
  const [frete, setFrete] = useState({ price: null, error: null });

  const handleChange = (ev) => {
    setAddress((current) => ({ ...current, [ev.target.id]: ev.target.value }));
  };

  useEffect(() => {
    if (address.postalcode.length === 8) {
      console.log('Uma pesquisa')
      handleCep()
      console.log("não está em loop")
    }
  }, [address.postalcode]);

  const handlePostalcodeInfo = async () => {
    if (address.postalcode.length !== 8) {
      alert("Por favor, insira um CEP válido com 8 dígitos.");
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${address.postalcode}/json/`);
      const data = await response.json();

      if (data.erro) {
        alert("CEP não encontrado.");
        return;
      }

      setAddress((current) => ({
        ...current,
        street: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
      }));
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      alert("Não foi possível buscar o CEP. Tente novamente.");
    }
  };

  const handleCalculateFrete = async () => {
    const result = await calculateFrete(address.postalcode);
    setFrete(result);
  };

  const handleCep = async () => {
    await handlePostalcodeInfo();
    // await handleCalculateFrete();
  }

  const info = {
    address,
    frete,
    handleChange,
    handleCep
  }

  return (
    <AddressContext.Provider value={info}>
      {children}
    </AddressContext.Provider>
    ) 
}

export default AdressContextProvider;