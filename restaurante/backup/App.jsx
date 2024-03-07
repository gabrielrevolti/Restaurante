import React, { useState } from 'react';

function App() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:5000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email })
        });
        const data = await response.json();
        console.log(data.requisicao);
        console.log(data.message)
    };

    return (
        <div className="App">
            <h1 className='text-cyan-200'>text</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='name'>Nome:</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            
                <br />
                <br />
                <label htmlFor='email'>E-mail:</label>
                <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                
                <br />
                <br />
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default App;
