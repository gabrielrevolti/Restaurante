import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useItems } from "../../../hooks/useItems";

export const ItemToUpdate = ({ item, onClose }) => {
  const [quantity, setQuantity] = useState(item.itemQuantity);
  const [textA, setTextA] = useState(item.notes || '');  
  const [totalPrice, setTotalPrice] = useState((quantity * parseFloat(item.itemPrice)).toFixed(2));
  const { updateCartItemQuantity } = useItems();

  const handleChange = (event) => {
    setTextA(event.target.value);
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      setTotalPrice((newQuantity * parseFloat(item.itemPrice)).toFixed(2));
      return newQuantity;
    });
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity > 1 ? prevQuantity - 1 : 1;
      setTotalPrice((newQuantity * parseFloat(item.itemPrice)).toFixed(2));
      return newQuantity;
    });
  };

  return (
    <div className="modal-cart">
      <div onClick={onClose} className="overlay-cart"></div>
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
                updateCartItemQuantity(item.itemId, quantity, textA);
                onClose();
              }}> 
                <span>Atualizar</span><span>R$ {totalPrice}</span>
              </button>
            </div>
          </div>
        </div>
        <AiOutlineClose className="close-btn close-modal" onClick={onClose} />
      </div>
    </div>
  );
};

