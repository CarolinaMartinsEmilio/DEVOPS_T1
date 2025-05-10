const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Criar tabela se não existir
async function createTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS passaros (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      especie VARCHAR(100) NOT NULL,
      idade INT,
      data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}
createTable();

// Rotas da API
app.get('/passaros', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM passaros ORDER BY id DESC');
  res.json(rows);
});

app.post('/passaros', async (req, res) => {
  const { nome, especie, idade } = req.body;
  const { rows } = await pool.query(
    'INSERT INTO passaros (nome, especie, idade) VALUES ($1, $2, $3) RETURNING *',
    [nome, especie, idade]
  );
  res.status(201).json(rows[0]);
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});