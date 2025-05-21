import React, { useState, useEffect } from 'react';
import './App.css';

// Rota relativa, será redirecionada via NGINX para o backend
const API_URL = '/api/passaros';


function App() {
  const [passaros, setPassaros] = useState([]);
  const [form, setForm] = useState({ nome: '', especie: '', idade: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchPassaros();
  }, []);

  const fetchPassaros = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setPassaros(data);
    } catch (error) {
      setStatus(`Erro: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Cadastrando...');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error('Falha no cadastro');

      await fetchPassaros();
      setForm({ nome: '', especie: '', idade: '' });
      setStatus('Cadastro realizado!');
    } catch (error) {
      setStatus(`Erro: ${error.message}`);
    }
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
          placeholder="Nome"
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
          placeholder="Idade"
        />

        <button type="submit">Cadastrar</button>
      </form>

      <p>{status}</p>

      <h2>Passarinhos Cadastrados</h2>
      <ul>
        {passaros.map((p) => (
          <li key={p.id}>
            {p.nome} - {p.especie} ({p.idade} meses)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
