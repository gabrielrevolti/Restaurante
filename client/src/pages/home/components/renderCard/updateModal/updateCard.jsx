import "./updateCard.css"

import { AiOutlineClose } from "react-icons/ai";
import { FaPencil } from "react-icons/fa6";
import { useState } from "react";
import Form from "../form/form";

const UpdateModal = (props) => {
  const [updateModal, setUpdateModal] = useState()

  const togleModal = () => {
    setUpdateModal(!updateModal)
  }

  if(updateModal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }


  return (
    <>
     <FaPencil className="icon" onClick={togleModal}/>
      {updateModal && (
        <div className="modal">
          <div onClick={togleModal} className="overlay"></div>
          <div className="modal-content">
            <h2 className="modal-title">Atualizar</h2>
            <div className="modal-inputs">
              <Form toggle={togleModal} itemToUpdate={props.item} updatePrato={props.updatePrato}/>
            </div>
            <AiOutlineClose className="close-btn-cart close-modal-cart" onClick={togleModal}/>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateModal;