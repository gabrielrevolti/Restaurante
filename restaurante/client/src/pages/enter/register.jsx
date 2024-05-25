import { useState } from "react"
import { Link } from "react-router-dom"

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
      <form onSubmit={handleSubmit}>

        <input 
          type="text" id="name" value={item.name} placeholder="nome" onChange={handleChange}
        />
        

        <br />
        <br />

        <input 
          type="email" id="email" value={item.email} placeholder="email" onChange={handleChange}
        />

        <br/>
        <br/>

        <input 
          type="password" id="password" value={item.password} placeholder="senha" onChange={handleChange}
        />

        <br/>
        <br/>

        <input 
          type="password" id="confirmPassword" value={item.confirmPassword} placeholder="Digite a senha novamente" onChange={handleChange}/>
        <div>
          <Link to="/">Voltar</Link> | 
          <button type="submit">Cadastrar</button>
        </div>
      </form>
    </>
  )
}

export default Register;