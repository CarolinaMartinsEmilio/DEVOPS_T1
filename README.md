# 🐦 Aplicação de Cadastro de Passarinhos

Bem-vindo ao sistema de **Cadastro de Passarinhos**!  
Esse repositório foi feito para a matéria **DEVOPS - DC - UFSCar**, ofertada no primeiro semestre de 2025 pelo professor **Delano Beder**.  
**Aluna:** Carolina Martins Emilio | Homenagem ao meu amigo passarinho Frodo 🐤  

---
## 🧭 Funcionalidades da Aplicação:

- Cadastrar novos passarinhos 🐣
- Listar todos os passarinhos cadastrados
- Editar informações de um passarinho
- Remover passarinhos


## 🛠️ Tecnologias
| Componente   | Stack           |
|--------------|-----------------|
| Frontend     | React           |
| Backend      | Node.js/Express |
| Banco        | PostgreSQL 15   |
| Orquestração | Docker Compose  |

---

## 🚀 Instalação
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

## ⚙️ Funcionamento dos Containers
1. **Backend**
- Função: Container que executa a aplicação backend.
- Configurações: É construído a partir do Dockerfile no diretório ./backend
- Recebe variáveis de ambiente para conexão com o banco de dados (usuário, senha, nome do DB, host e porta)
- Conecta-se à rede app-network

2. **Frontend**

- Função: Container que executa a aplicação frontend (interface web para os usuários).
- Configurações: É construído a partir do Dockerfile no diretório ./frontend
- Expõe a porta 80 do container na porta 80 da máquina host
- Conecta-se à rede app-network

3. **DB (Banco de Dados)**
- Função: Container que executa um servidor PostgreSQL para armazenar dados.
- Configurações: Usa a imagem oficial postgres:15-alpine (versão 15 com Alpine Linux)
- Define variáveis de ambiente para usuário, senha e nome do banco de dados
- Usa um volume chamado postgres_data para persistir os dados do banco
- Tem um healthcheck que verifica se o PostgreSQL está pronto para conexões
- Conecta-se à rede app-network


Infraestrutura compartilhada:
- Rede: app-network (do tipo bridge) que permite a comunicação entre os containers
- Volume: postgres_data que persiste os dados do PostgreSQL mesmo quando o container é recriado

### 🐋 Estrutura
```mermaid
graph LR
    A[PostgreSQL] -->|Healthcheck| B[Backend]
    B --> C[Frontend]
```

### 🔄 Ordem de Inicialização
1. **Banco de Dados** (PostgreSQL)
   - Volume persistente
   - Healthcheck com `pg_isready`

2. **Backend** (Node.js)
   - Espera DB ficar "healthy"
   - Expõe API REST

3. **Frontend** (React)
   - Porta 80 exposta
   - Comunica com backend

---

## 📡 Endpoints da API
| Método | Rota           | Função               |
|--------|----------------|----------------------|
| GET    | /passaros      | Lista todos          |
| POST   | /passaros      | Cadastra novo        |
| PUT    | /passaros/:id  | Atualiza             | 
| DELETE | /passaros/:id  | Remove               |

---

## 🛑 Comandos Úteis
```bash
# Rodar em background
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar serviços
docker-compose down

```
---

> Uma aplicação leve. Ideal para quem ama organizar dados e ama ainda mais os passarinhos 🧡

---


## 📬 Contribuições

Sinta-se à vontade para abrir issues e enviar pull requests  🐧🐓🦉🦜

---
