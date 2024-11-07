import "./User.css"
import { FaUser } from "react-icons/fa";
import Arrow from "../components/arrow-icon/Arrow";
import httpClient from "../../hooks/httpClient";
import { useUser } from "../../hooks/useUser";

const User = () => {

  const {user} = useUser()

  const handleLogout = async () => {
    await httpClient.post("//localhost:5000/logout");
    window.location.href = "/";
  }

  return (
    <div className='user-container'>
      <div className="user-div">
        <FaUser className="user-icon"/>
        <h2 className="user-name">{user.nome}</h2>
        <h2 className="user-email">{user.email}</h2>
        <button className="button-input" onClick={handleLogout}>Logout</button>
      </div>
      <Arrow/>
    </div>
  )
}

export default User;