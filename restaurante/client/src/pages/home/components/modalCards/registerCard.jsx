import { useState } from "react";
import "./registerCard.css"
import Form from "./form/form";
import { AiOutlineClose } from "react-icons/ai";

const RegisterCard = () => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Open
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2 className="modal-title">Produto</h2>
            <div className="modal-inputs">
              <Form togle={toggleModal}/>
            </div>
            <AiOutlineClose className="close-btn close-modal" onClick={toggleModal}/>
          </div>
        </div>
      )}
    </>
  );
}

export default RegisterCard;