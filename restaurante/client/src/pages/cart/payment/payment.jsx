import React, { useState } from 'react';
import styles from './payment.module.css';
import { IoIosArrowForward } from "react-icons/io";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Adress from '../adress/adress';

const Payment = () => {
  const [adress, setAdress] = useState(true);
  const [payment, setPayment] = useState(false);

  return (
    <div className={styles.main}>
      <div className={styles.container_main}>
        <p className={styles.text_order}>Finalizando pedido</p>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.item1left}>
              <div className={styles.info_arrow}>
                <span>Endereço</span>
                <button onClick={() => setAdress(!adress)}>
                  <IoIosArrowForward className={`${styles.arrow} ${adress ? styles.active : ''}`} />
                </button>
              </div>
              {adress && <Adress />}
            </div>
            <div className={styles.item2left}>
              <div className={styles.info_arrow}>
                <span>Pagamento</span>
                <button onClick={() => setPayment(!payment)}>
                  <IoIosArrowForward className={`${styles.arrow} ${payment ? styles.active : ''}`} />
                </button>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <p>Direita</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
