import React, { useState } from "react";
import "./itemToCart.css";
import { AiOutlineClose } from "react-icons/ai";
import { useItems } from "../../../../../hooks/useItems";

export const ItemToCart = ({ children, item }) => {
  const [updateModal, setUpdateModal] = useState(false);
  const { addToCart } = useItems();

  const toggleModal = () => {
    setUpdateModal(!updateModal);
  };

  console.log(item);

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
            <h2 className="modal-title-cart">{item.itemName}</h2>
            <AiOutlineClose className="close-btn close-modal" onClick={toggleModal} />
            <button
              onClick={(event) => {
                event.stopPropagation(); // Impede o fechamento do modal ao clicar no botão
                addToCart(item);
              }}
            >
              Adicionar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};