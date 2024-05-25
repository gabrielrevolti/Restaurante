import { useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {

  const defaultItem = {
    email: "",
    password: "",
  }

  const [item, setItem] = useState(defaultItem)

  const handleChange = (ev) => {
    setItem((current) => ({ ...current, [ev.target.id]: ev.target.value }))
  }

  return (
    <>
      <form>
      <input 
          type="email" id="email" value={item.email} placeholder="nome" onChange={handleChange} />
      </form>

      <br/>
      <br/>

      <input type="password" id="password" value={item.password} placeholder="senha" onChange={handleChange}/>

      <br/>
      <br/>

      <div>
        <button type="submit">Entrar</button>
      </div>
      <Link to="/">Voltar</Link> |
      <Link to="register">cadastrar</Link> | <Link to="forgottenPassword">esqueceu a senha</Link>
    </>
  )
  
}

export default Login;