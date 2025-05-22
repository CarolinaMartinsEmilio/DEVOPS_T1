# 🐦 Aplicação de Cadastro de Passarinhos

Bem-vindo ao sistema de **Cadastro de Passarinhos**!  

Esse repositório foi feito para a matéria **DEVOPS - DC - UFSCar**, ofertada no primeiro semestre de 2025 pelo professor **Delano Beder**.  
**Aluno: Carolina Martins Emilio**

🎖️ *Motivo do tema:* homenagem ao meu amigo passarinho **Frodo** 🐤

---

## 🌐 Tecnologias Utilizadas

- **React** no frontend (`/frontend`)
- **Node.js + Express** no backend (`/backend`)
- **PostgreSQL** como banco de dados (`/db`)
- **Docker Compose** para orquestração

---

## 🚀 Como Rodar a Aplicação

### Pré-requisitos

- [Docker](https://www.docker.com/) instalado
- [Docker Compose](https://docs.docker.com/compose/install/) instalado

### Passos

1. Clone este repositório:

   ```bash
   git clone https://github.com/CarolinaMartinsEmilio/DEVOPS_T1.git
   ```

2. Suba os contêineres com:

   ```bash
   docker-compose up --build
   ```

3. Acesse no navegador:

   👉 [http://localhost:80](http://localhost:80)

---

## 🧭 Funcionalidades

- Cadastrar novos passarinhos 🐣
- Listar todos os passarinhos cadastrados
- Editar informações de um passarinho
- Remover passarinhos

---

## 🗃️ Endpoints da API

- `GET /passaros`: Lista todos os passarinhos
- `POST /passaros`: Cadastra um novo passarinho
- `PUT /passaros/:id`: Atualiza um passarinho existente
- `DELETE /passaros/:id`: Remove um passarinho

---

## 🧹 Parar os Contêineres

```bash
docker-compose down
```

---


## 🐥 Visual dos Passarinhos

```
     \
      \
         🐦
        <)___
         (o o)
    --oOO--(_)---OOo--
```

> Uma aplicação leve. Ideal para quem ama organizar dados e ama ainda mais os passarinhos 🧡

---


## 📬 Contribuições

Sinta-se à vontade para abrir issues e enviar pull requests  🐧🐓🦉🦜

---
