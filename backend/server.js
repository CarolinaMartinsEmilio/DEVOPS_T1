const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const port = 3000;

// Configurações essenciais
app.use(cors());
app.use(express.json());

// Conexão com o PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Rota raiz para teste
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

// Rotas da aplicação
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

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log('Banco de dados configurado com:');
  console.log(`Host: ${process.env.DB_HOST}`);
  console.log(`Database: ${process.env.DB_NAME}`);
});