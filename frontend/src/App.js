import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [passaros, setPassaros] = useState([]);
  const [form, setForm] = useState({ nome: '', especie: '', idade: '' });

  useEffect(() => {
    fetch('http://backend:3000/passaros')
      .then(res => res.json())
      .then(data => setPassaros(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://backend:3000/passaros', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    .then(res => res.json())
    .then(newPassaro => {
      setPassaros([newPassaro, ...passaros]);
      setForm({ nome: '', especie: '', idade: '' });
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="App">
      <h1>Cadastro de Passarinhos</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Nome do passarinho"
          required
        />
        <input
          name="especie"
          value={form.especie}
          onChange={handleChange}
          placeholder="Espécie"
          required
        />
        <input
          name="idade"
          type="number"
          value={form.idade}
          onChange={handleChange}
          placeholder="Idade (meses)"
        />
        <button type="submit">Cadastrar</button>
      </form>

      <div className="lista">
        <h2>Passarinhos Cadastrados</h2>
        <ul>
          {passaros.map(p => (
            <li key={p.id}>
              <strong>{p.nome}</strong> - {p.especie} ({p.idade || '?'} meses)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;