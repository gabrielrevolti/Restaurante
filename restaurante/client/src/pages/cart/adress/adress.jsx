import React, { useEffect, useState } from 'react';
import styles from './adress.module.css';
import calculateFrete from './cep';
import { useAddress } from '../../../hooks/useAddress';


const Adress = () => {

  const {address, frete, handleChange, handleCep} = useAddress()

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
