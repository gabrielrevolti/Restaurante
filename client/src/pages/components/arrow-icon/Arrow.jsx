import { TiArrowLeftThick } from "react-icons/ti";
import "./arrow.css"
import { Link } from "react-router-dom";

const Arrow = () => {
  return (
    <Link to="/">
      <div className="div-back">
        <div>
          <TiArrowLeftThick className="arrow"/>
        </div>
        
      </div>
    </Link> 
  )
}

export default Arrow;