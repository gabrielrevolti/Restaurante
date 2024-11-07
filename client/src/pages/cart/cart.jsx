import "./cart.css";
import { AiOutlineClose } from "react-icons/ai";
import { useItems } from "../../hooks/useItems";
import Arrow from "../components/arrow-icon/Arrow";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { FaPlus, FaMinus } from "react-icons/fa";

const Cart = () => {
  const { cartItems, removeToCart, increaseQuantity, decreaseQuantity } = useItems();

  // Calcula o total
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.itemPrice) * item.itemQuantity,
    0
  );

  return (
    <div className="cover cart">
      <div className="container-cart">
        <h1 className="title-h1">Carrinho</h1>
        <div className="cart-content">
          {cartItems.map((item) => (
            <div className="items-cart" key={item.itemId}>
              <div className="first-part">
                <div>
                  <img
                    className="image-cart"
                    src={item.itemImage}
                    alt={item.itemName}
                  />
                </div>
                <div className="information">
                  <p className="title-cart">{item.itemName}</p>
                </div>
              </div>
              <div className="quantity-controls-cart">
                <button onClick={() => decreaseQuantity(item.itemId)} className="quantity-button-cart"><FaMinus /></button>
                <span className="quantity-cart">{item.itemQuantity}</span>
                <button onClick={() => increaseQuantity(item.itemId)} className="quantity-button-cart"><FaPlus /></button>
              </div>
              <span className="price-cart">
                R$ {(parseFloat(item.itemPrice) * item.itemQuantity).toFixed(2)}
              </span>
              <AiOutlineClose
                className="x-button"
                onClick={() => removeToCart(item.itemId)}
              />
            </div>
          ))}
        </div>
        {cartItems.length === 0 ? null :
        <>
          <div className="bar"></div>
          <div className="finish_order">
            <p className="price">Total : R$ <strong>{totalAmount.toFixed(2)}</strong></p>
            <Link className="linkCart" to='payment'>Escolher forma de pagamento <IoIosArrowForward className="arrowL"/></Link>
          </div>
        </>
        }
      </div>
      <Arrow />
    </div>
  );
};

export default Cart;
