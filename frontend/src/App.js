import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = '/api/passaros';

function App() {
  const [passaros, setPassaros] = useState([]);
  const [form, setForm] = useState({ nome: '', especie: '', idade: '' });
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchPassaros();
    createBirds(); 
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(editingId ? 'Atualizando...' : 'Cadastrando...');

    try {
      const response = await fetch(
        editingId ? `${API_URL}/${editingId}` : API_URL,
        {
          method: editingId ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) throw new Error('Erro na operação');

      await fetchPassaros();
      setForm({ nome: '', especie: '', idade: '' });
      setEditingId(null);
      setStatus(editingId ? 'Atualização feita!' : 'Cadastro realizado!');
    } catch (error) {
      setStatus(`Erro: ${error.message}`);
    }
  };

  const handleEdit = (p) => {
    setForm({ nome: p.nome, especie: p.especie, idade: p.idade });
    setEditingId(p.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja remover?')) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchPassaros();
    } catch (error) {
      setStatus(`Erro ao deletar: ${error.message}`);
    }
  };


  const createBirds = () => {
  const body = document.body;
  const birdCount = 8;
  
  document.querySelectorAll('.bird').forEach(bird => bird.remove());
  
  for (let i = 0; i < birdCount; i++) {
    const bird = document.createElement('div');
    bird.className = 'bird';
    
    const startY = Math.random() * window.innerHeight;
    const duration = 15 + Math.random() * 30;
    const delay = Math.random() * 15;
    const size = 0.5 + Math.random() * 0.7;
    const rotation = Math.random() > 0.5 ? 'rotate(0deg)' : 'rotate(180deg)';
    
    bird.style.top = `${startY}px`;
    bird.style.left = `${Math.random() * 100}px`;
    bird.style.animationDuration = `${duration}s`;
    bird.style.animationDelay = `${delay}s`;
    bird.style.transform = `scale(${size}) ${rotation}`;
    
    body.appendChild(bird);
  }
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

        <button type="submit">
          {editingId ? 'Atualizar' : 'Cadastrar'}
        </button>
        {editingId && (
          <button type="button" onClick={() => {
            setEditingId(null);
            setForm({ nome: '', especie: '', idade: '' });
            setStatus('');
          }}>
            Cancelar
          </button>
        )}
      </form>

      <p>{status}</p>

      <h2>Passarinhos Cadastrados</h2>
      <ul>
        {passaros.map((p) => (
          <li key={p.id}>
            <div className="bird-info">
              {p.nome} - {p.especie} ({p.idade} meses)
            </div>
            <div className="button-group">
              <button onClick={() => handleEdit(p)}>Editar</button>
              <button onClick={() => handleDelete(p.id)}>Remover</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;