import React, { useEffect, useState } from 'react';
import styles from './payment.module.css';
import { IoIosArrowForward } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import Adress from '../adress/adress';
import { useItems } from '../../../hooks/useItems';
import Arrow from '../../components/arrow-icon/Arrow';
import { useAddress } from '../../../hooks/useAddress';
import { ItemToUpdate } from './itemToUpdate';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../hooks/useUser';

const Payment = () => {
  const {user} = useUser()
  const { address, frete } = useAddress();
  const { cartItems, removeToCart } = useItems();
  const [adress, setAdress] = useState(true);
  const [payment, setPayment] = useState(false);
  const [updateItem, setUpdateItem] = useState(null);
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.itemPrice) * item.itemQuantity,
    0
  );

  const handleOrder = () => {
    const validationAddress = address.postalcode && address.city  && address.neighborhood && address.number && address.street && address.user

    if (validationAddress) {
      console.log('Tudo certo');
      const orderData = {
        user_id: user?.id,
        customer_name: address.user,
        postal_code: address.postalcode,
        street: address.street,
        number: address.number,
        complement: address.complement,
        city: address.city,
        neighborhood: address.neighborhood,
        total_amount: totalAmount,
        cart_items: cartItems.map(item => ({
          item_id: item.itemId,
          item_price: item.itemPrice,
          item_quantity: item.itemQuantity,
          item_obs: item.notes
        })),
      };
      console.log(orderData);  // Você pode verificar a estrutura antes de enviar
      
      const createOrder = async () => {
        try {
          const response = await fetch('http://127.0.0.1:5000/createOrder', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),  // Passando os dados do pedido
          });
      
          const data = await response.json();
          if (response.ok) {
            alert('Pedido criado com sucesso! Pedido ID: ' + data.order_id);
          } else {
            alert('Erro ao criar o pedido: ' + data.error);
          }
        } catch (error) {
          alert('Erro ao fazer a requisição: ' + error);
        }
      };

      createOrder()

    } else {
      console.log('não deu certo');
    }
   
  }

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/');
    }
  }, [cartItems.length == 0])

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
                      <FaTrashAlt className={styles.trash} onClick={() => removeToCart(item.itemId)} />
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
                <div>
                  <button className={styles.finishOrder} onClick={() => handleOrder()}>Finalizar</button>
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
