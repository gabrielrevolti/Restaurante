import { useState } from "react";
import "./registerCard.css"
import { AiOutlineClose } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import Form from "../form/form";

const RegisterCard = (props) => {
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
      <button onClick={toggleModal} className="Card">
        <FaPlus className="icon-plus"/>
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2 className="modal-title">Registrar</h2>
            <div className="modal-inputs">
              <Form toggle={toggleModal} updatePrato={props.updatePrato}/>
            </div>
            <AiOutlineClose className="close-btn close-modal" onClick={toggleModal}/>
          </div>
        </div>
      )}
    </>
  );
}

export default RegisterCard;