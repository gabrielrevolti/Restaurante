import { useState } from "react";
import { Link } from "react-router-dom";
import httpClient from "../../hooks/httpClient";
import "./styles/login.css"
import Arrow from "../components/arrow-icon/Arrow";


const Login = () => {

  const defaultItem = {
    email: "",
    password: "",
  }

  const [item, setItem] = useState(defaultItem)

  const handleChange = (ev) => {
    setItem((current) => ({ ...current, [ev.target.id]: ev.target.value }))
  }

const handleSubmit = async () => {
    const email = item.email
    const password = item.password
    await httpClient.post("//localhost:5000/login", {
      email,
      password
    })

    setItem(defaultItem)
    window.location.href = "/";
};




  return (
    <>
    <div className="container-login">
      <div className="container-div">
        <p className="text-login">Login</p>
        <div className="container-inputs">
          <input className="inputs-login" type="email" id="email" value={item.email} placeholder="Email" onChange={handleChange} />
          <input className="inputs-login" type="password" id="password" value={item.password} placeholder="Senha" onChange={handleChange}/>
        </div>
      <div>
        <button className="button-input" onClick={handleSubmit}>Entrar</button>
        <br />
        <div className="div-register">
          <span>Não tem cadastro?</span><Link className="link" to="register">Cadastre-se</Link>
        </div>
      </div>
      
    </div>
    
    <div>
    </div>
    <Arrow/>
    </div>
    </>
  )
  
}

export default Login;