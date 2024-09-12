import { useState } from "react";
import { Link } from "react-router-dom";
import httpClient from "../../hooks/httpClient";


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
    const resp = await httpClient.post("//localhost:5000/login", {
      email,
      password
    })
};

const handleLogout = async () => {
  await httpClient.post("//localhost:5000/logout");
  window.location.href = "/";
}

const handleData = async (e) => {
  e.preventDefault()
    const response = await fetch('http://127.0.0.1:5000/user_info', {
    method: 'GET',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json'
    }

});
  const data = await response.json()
  console.log(data['message'])
}

  return (
    <>
      <form onSubmit={handleSubmit}>
      <input 
          type="email" id="email" value={item.email} placeholder="Email" onChange={handleChange} />
      </form>

      <br/>
      <br/>

      <input type="password" id="password" value={item.password} placeholder="Senha" onChange={handleChange}/>

      <br/>
      <br/>

      <div>
        <button onClick={handleSubmit}>Entrar</button>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleData}>Pegar dados do usuário</button>
      </div>
      <Link to="/">Voltar</Link> |
      <Link to="register">cadastrar</Link>
    </>
  )
  
}

export default Login;