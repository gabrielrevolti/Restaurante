import { useState } from "react"
import "./styles/register.css"
import Arrow from "../components/arrow-icon/Arrow";

const Register = () => {
  const defaultItem = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  }

  const [item, setItem] = useState(defaultItem)
  
  const handleChange = (ev) => {
    setItem((current) => ({ ...current, [ev.target.id]: ev.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        
        body: JSON.stringify({item})
    });
    setItem(defaultItem)
};

  return (
    <>
    <div className="container-register">
      <div className="container-div-register">
        <p className="text-login">Cadastrar</p>
        <div className="container-inputs">
          <input className="inputs-register"
                type="text" id="name" value={item.name} placeholder="nome" onChange={handleChange}
              />

              <input className="inputs-register"
                type="email" id="email" value={item.email} placeholder="email" onChange={handleChange}
              />

              <input className="inputs-register"
                type="password" id="password" value={item.password} placeholder="senha" onChange={handleChange}
              />

              <input className="inputs-register"
                type="password" id="confirmPassword" value={item.confirmPassword} placeholder="Digite a senha novamente" onChange={handleChange}/>
        </div>
          <div>
            <button className="button-input" onClick={handleSubmit}>Cadastrar</button>
          </div>
      </div>
      <Arrow/>
    </div>
    </>
  )
}

export default Register;