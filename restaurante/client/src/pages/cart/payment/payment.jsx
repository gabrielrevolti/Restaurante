import React, { useState } from 'react';
import styles from './payment.module.css';
import { IoIosArrowForward } from "react-icons/io";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Adress from '../adress/adress';
import { useItems } from '../../../hooks/useItems';
import Arrow from '../../components/arrow-icon/Arrow';


const Payment = () => {

  const {cartItems} = useItems()
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.itemPrice) * item.itemQuantity,
    0
  );
  const delivery = 10

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
            <p className={styles.title}>Pedido</p>
            <div className={styles.boxOrder}>
              <div className={styles.orders}>
                {cartItems.map(item => (
                  <div className={styles.item}>
                    <span className={styles.itemInfo}>{item.itemQuantity}x {item.itemName}</span>
                    <span className={styles.price}>R$ {item.itemPrice}</span>
                  </div>
                ))}
              </div>
              <div className={styles.box}>
              <div className={styles.subtotal}>
                <span>Subtotal</span>
                <span>R$ {totalAmount.toFixed(2)}</span>
              </div>

              <div className={styles.delivery}>
                <span>Taxa de entrega</span>
               <span>R$ {delivery.toFixed(2)}</span>
              </div>

              <div className={styles.total}>
                <span>Total</span>
                <span>R$ {(delivery + totalAmount).toFixed(2)}</span>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Arrow/>
    </div>
  );
};

export default Payment;
