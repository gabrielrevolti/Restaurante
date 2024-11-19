import React, { useState } from 'react';
import styles from './payment.module.css';
import { IoIosArrowForward } from "react-icons/io";
import Adress from '../adress/adress';
import { useItems } from '../../../hooks/useItems';
import Arrow from '../../components/arrow-icon/Arrow';
import { useAddress } from '../../../hooks/useAddress';
import { FaRegTrashAlt } from "react-icons/fa";
import { ItemToUpdate } from './itemToUpdate'; // Ajuste o caminho conforme necessário

const Payment = () => {
  const { frete } = useAddress();
  const { cartItems, removeToCart } = useItems();
  const [adress, setAdress] = useState(true);
  const [payment, setPayment] = useState(false);
  const [updateItem, setUpdateItem] = useState(null); // Item a ser atualizado

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.itemPrice) * item.itemQuantity,
    0
  );

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
                  <div key={item.itemId} className={styles.item}>
                    <span className={styles.itemInfo}>{item.itemQuantity}x {item.itemName}</span>
                    <span className={styles.price}>R$ {item.itemPrice}</span>
                    <div className={styles.actions}>
                      <span className={styles.update} onClick={() => setUpdateItem(item)}>Atualizar</span> {/* Abre o modal */}
                      <FaRegTrashAlt className={styles.trash} onClick={() => removeToCart(item.itemId)} />
                    </div>
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
                  <span>R$ {frete.price.toFixed(2)}</span>
                </div>
                <div className={styles.total}>
                  <span>Total</span>
                  <span>R$ {(frete.price + totalAmount).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Arrow />
      {updateItem && (
        <ItemToUpdate
          item={updateItem}
          onClose={() => setUpdateItem(null)}
        />
      )}
    </div>
  );
};

export default Payment;
