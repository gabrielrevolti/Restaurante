
import { Link } from "react-router-dom";
import "./cart.css"
import { TiArrowLeftThick } from "react-icons/ti";
import { AiOutlineClose } from "react-icons/ai";
import { useItems } from "../../hooks/useItems";

const Cart = () => {
  const {cartItems,removeToCart} = useItems()
  return (
    <>
    <div className="cover cart">
    <Link to="/"><TiArrowLeftThick className="arrow"/></Link> 
      <div className="container-cart">
          <h1>Carrinho</h1>
          {cartItems.map((item) => (
            <div className="items-cart" key={item.itemId}>
            <div className="first-part">
              <div>
                <img className="image-cart" src={item.itemImage} alt={item.itemName} />
              </div>
              <div className="information">
               <p className="title-cart">{item.itemName}</p>
              </div>
            </div>
          
            <span className="quantity-cart">{item.itemQuantity}</span>
            <span className="price-cart">R$ {item.itemPrice}</span>
            <AiOutlineClose className="x-button" onClick={()=> removeToCart(item.itemId)}/>
          </div>
          ))}
        </div>
    </div>
    </>
   
  )
}

export default Cart;