const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const port = 3000;


app.use(cors({
  origin: 'http://frontend', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


app.get('/', (req, res) => {
  res.status(200).json({
    status: 'API funcionando',
    message: 'Bem-vindo à API de Cadastro de Passarinhos',
    endpoints: {
      listar: 'GET /passaros',
      cadastrar: 'POST /passaros'
    }
  });
});


app.get('/passaros', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM passaros ORDER BY id DESC');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar passarinhos' });
  }
});

app.post('/passaros', async (req, res) => {
  const { nome, especie, idade } = req.body;
  
  if (!nome || !especie) {
    return res.status(400).json({ error: 'Nome e espécie são obrigatórios' });
  }

  try {
    const { rows } = await pool.query(
      'INSERT INTO passaros (nome, especie, idade) VALUES ($1, $2, $3) RETURNING *',
      [nome, especie, idade || null]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao cadastrar passarinho' });
  }
});

app.put('/passaros/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, especie, idade } = req.body;

  try {
    const { rows } = await pool.query(
      'UPDATE passaros SET nome = $1, especie = $2, idade = $3 WHERE id = $4 RETURNING *',
      [nome, especie, idade || null, id]
    );
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar passarinho' });
  }
});


app.delete('/passaros/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM passaros WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar passarinho' });
  }
});


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log('Banco de dados configurado com:');
  console.log(`Host: ${process.env.DB_HOST}`);
  console.log(`Database: ${process.env.DB_NAME}`);
});