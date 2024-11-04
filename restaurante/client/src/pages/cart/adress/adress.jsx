import React, { useEffect, useState } from 'react';
import styles from './adress.module.css';
import calculateFrete from './cep';


const Adress = () => {
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
  }, [address.postalcode]); // Esse useEffect vai rodar toda vez que o `cep` mudar

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

  return (
    <div className={styles.container_div}>
      <div className={styles.container_inputs}>
        <div className={styles.userInfo}>
          <input
            className={`${styles.postalcode} ${styles.input}`}
            type="text"
            id='postalcode'
            placeholder='Cep'
            value={address.postalcode}
            onChange={handleChange}
          />
          <input
            className={`${styles.user} ${styles.input}`}
            type="text"
            id='user'
            placeholder='Destinatário'
            value={address.user}
            onChange={handleChange}
          />
        </div>
        {frete.error && <p className={styles.error}>{frete.error}</p>}
        <div>
          <input
            className={`${styles.street} ${styles.input}`}
            type="text"
            id='street'
            placeholder='Rua'
            value={address.street}
            onChange={handleChange}
          />
          <input
            className={`${styles.number} ${styles.input}`}
            type="text"
            id='number'
            placeholder='Número'
            value={address.number}
            onChange={handleChange}
          />
          <input
            className={`${styles.complement} ${styles.input}`}
            type="text"
            id='complement'
            placeholder='Complemento'
            value={address.complement}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            className={`${styles.neighborhood} ${styles.input}`}
            type="text"
            id='neighborhood'
            placeholder='Bairro'
            value={address.neighborhood}
            onChange={handleChange}
          />
          <input
            className={`${styles.city} ${styles.input}`}
            type="text"
            id='city'
            placeholder='Cidade'
            value={address.city}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
      {frete.price !== null && <p>Preço do Frete: R$ {frete.price.toFixed(2)}</p>}
      
        <br />
      </div>
    </div>
  );
};

export default Adress;
