import React, { useState } from "react";
import "./itemToCart.css";
import { AiOutlineClose } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { useItems } from "../../../../../hooks/useItems";

export const ItemToCart = ({ children, item }) => {
  const [updateModal, setUpdateModal] = useState(false);
  const [textA, setTextA] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(parseFloat(item.itemPrice)); // Estado para o preço total
  const { addToCart } = useItems();

  const toggleModal = () => {
    setUpdateModal(!updateModal);
    setQuantity(1); // Reseta a quantidade para 1 toda vez que o modal é aberto
    setTotalPrice(parseFloat(item.itemPrice)); // Reseta o preço total para o preço do item
  };

  const handleChange = (event) => {
    setTextA(event.target.value);
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      setTotalPrice((newQuantity * parseFloat(item.itemPrice)).toFixed(2)); // Atualiza o preço total
      return newQuantity;
    });
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity > 1 ? prevQuantity - 1 : 1;
      setTotalPrice((newQuantity * parseFloat(item.itemPrice)).toFixed(2)); // Atualiza o preço total
      return newQuantity;
    });
  };

  if (updateModal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <div onClick={toggleModal} className="card-container">
      {/* Div envolvente que abre o modal */}
      {children}

      {/* Modal de detalhes do item */}
      {updateModal && (
        <div className="modal-cart">
          <div onClick={toggleModal} className="overlay-cart"></div>
          <div className="modal-content-cart" onClick={(e) => e.stopPropagation()}>
            <div>
              <img className="modal-content-img" src={item.itemImage} alt="" />
            </div>
            <div className="modal-content-main">
              <h2 className="modal-title-cart">{item.itemName}</h2>
              <div className="modal-content-text">
                <p>{item.itemDescription}</p>
              </div>
              <div className="modal-content-client-text">
                <p className="obs">Observações : </p>
                <textarea 
                  className="text-area" 
                  value={textA} 
                  onChange={handleChange} 
                  rows="10" 
                  cols="40" 
                  placeholder="Ex: tirar a cebola, maionese à parte etc."
                />
              </div>
              <div className="buttons-modal">
                <div className="quantity-controls">
                  <button onClick={decreaseQuantity} className="quantity-button"><FaMinus/></button>
                  <span className="quantity-display">{quantity}</span>
                  <button onClick={increaseQuantity} className="quantity-button"><FaPlus/></button>
                </div>
                <div>
                <button className="button-add-cart" onClick={(event) => {
                  event.stopPropagation();
                  addToCart(item, quantity); // Passando a quantidade atualizada para o carrinho
                  toggleModal(); // Fechar modal após adicionar
                }}> 
                  <span>Adicionar</span><span> R$ {totalPrice}</span> {/* Exibe o preço total atualizado */}
                </button>
              </div>
              </div>
             
            </div>
            <AiOutlineClose className="close-btn close-modal" onClick={toggleModal} />
          </div>
        </div>
      )}
    </div>
  );
};
