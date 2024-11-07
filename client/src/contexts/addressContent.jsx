import { createContext, useEffect, useState } from "react";
import calculateFrete from "./cep";

export const AddressContext = createContext({});

export const AddressContextProvider = ({ children }) => {
  const defaultAddress = {
    postalcode: "",
    user: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  };

  const [address, setAddress] = useState(defaultAddress);
  const [frete, setFrete] = useState({ price: 0, error: null });

  const validationPostalCode = !address.neighborhood && !address.city && !address.street;

  const handleChange = (ev) => {
    let { id, value } = ev.target;

    if (id === "postalcode") {
      value = value.replace("-", "");
    }

    setAddress((current) => ({ ...current, [id]: value }));
  };

  const fetchAddressByCep = async () => {
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
        state: data.uf,
      }));

      // Calcular o frete após buscar o endereço pelo CEP
      handleCalculateFrete();
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      alert("Não foi possível buscar o CEP. Tente novamente.");
    }
  };

  const fetchCepByAddress = async () => {
    if (address.city && address.street) {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/SP/${address.city}/${address.street}/json/`
        );
        const data = await response.json();

        if (!data || data.length === 0) {
          alert("Nenhum CEP encontrado para o endereço fornecido.");
          return;
        }

        setAddress((current) => ({
          ...current,
          postalcode: data[0].cep.replace("-", ""),
        }));

        // Calcular o frete após obter o CEP pelo endereço
        handleCalculateFrete();
      } catch (error) {
        console.error("Erro ao buscar o CEP:", error);
        alert("Não foi possível buscar o CEP com os dados fornecidos.");
      }
    }
  };

  useEffect(() => {
    if (address.postalcode.length === 8 && validationPostalCode) {
      fetchAddressByCep();
    }
  }, [address.postalcode]);

  useEffect(() => {
    if (!address.postalcode && address.street && address.neighborhood && address.city && address.state) {
      fetchCepByAddress();
    }
  }, [address.street, address.neighborhood, address.city]);

  const handleCalculateFrete = async () => {
    console.log("Frete calculado")
    try {
      const result = await calculateFrete(address.postalcode);
      setFrete(result);
    } catch (error) {
      console.error("Erro ao calcular o frete:", error);
      setFrete({ price: 0, error: "Erro ao calcular o frete." });
    }
  };

  const info = {
    address,
    frete,
    handleChange,
  };

  return (
    <AddressContext.Provider value={info}>
      {children}
    </AddressContext.Provider>
  );
};

export default AddressContextProvider;
