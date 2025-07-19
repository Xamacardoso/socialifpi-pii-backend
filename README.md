# 🚀 Social IFPI - API de Postagens

Uma API RESTful desenvolvida em TypeScript para gerenciar postagens e comentários, criada como projeto final da disciplina de Programação Web I do IFPI.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Como Usar](#como-usar)
- [Endpoints da API](#endpoints-da-api)
- [Exemplos de Uso](#exemplos-de-uso)


## 🎯 Sobre o Projeto

O **Backend Social IFPI** é uma API RESTful que controla os recursos de uma rede social em formato de blog, permitindo o gerenciamento completo de postagens e comentários. O projeto foi desenvolvido utilizando TypeScript, Express.js e MongoDB.

### Principais Características

- ✅ **CRUD Completo**: Criar, ler, atualizar e deletar postagens
- ✅ **Sistema de Curtidas**: Funcionalidade para curtir postagens
- ✅ **Sistema de Comentários**: Adicionar e remover comentários nas postagens
- ✅ **Banco de Dados MongoDB**: Persistência de dados com Mongoose
- ✅ **TypeScript**: Tipagem estática para maior segurança

## 🚀 Funcionalidades

### Postagens
- **Criar** novas postagens com título e conteúdo
- **Listar** todas as postagens (ordenadas por data)
- **Consultar** postagem específica por ID
- **Editar** título e conteúdo de postagens existentes
- **Excluir** postagens
- **Curtir** postagens (incrementa contador de curtidas)

### Comentários
- **Adicionar** comentários às postagens
- **Remover** comentários específicos
- Cada comentário possui autor, conteúdo e data

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **TypeScript** - Linguagem de programação
- **Express.js** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **dotenv** - Gerenciamento de variáveis de ambiente

## 📁 Estrutura do Projeto

```
back-end/
├── src/
│   ├── app.ts                 # Arquivo principal da aplicação
│   ├── config/
│   │   └── database.ts        # Configuração da conexão com MongoDB
│   ├── model/
│   │   ├── Postagem.ts        # Modelo de dados para postagens
│   │   └── Comentario.ts      # Modelo de dados para comentários
│   └── repository/
│       └── RepositorioDePostagens.ts  # Camada de acesso a dados
├── dist/                      # Arquivos compilados
├── package.json               # Dependências e scripts
├── tsconfig.json              # Configuração do TypeScript
└── README.md                  # Este arquivo
```

## ⚙️ Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Node.js** (versão 14 ou superior)
- **npm** ou **yarn**
- **MongoDB** (local ou MongoDB Atlas)

## 📦 Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/Xamacardoso/socialifpi-pii-backend
   cd socialifpi-pii-backend
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   # Crie um arquivo .env na raiz do projeto
   touch .env
   ```

4. **Adicione a string de conexão do MongoDB**


## ⚡ Como Usar

### Desenvolvimento
```bash
# Compilar e executar
npm run dev

# Ou compilar e executar separadamente
npm run build
npm start
```

### Produção
```bash
npm run build
npm start
```

O servidor estará rodando em `http://localhost:3000`

## 🔗 Endpoints da API

### Base URL
```
http://localhost:3000/socialifpi/postagem
```

### Endpoints Disponíveis

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/socialifpi/postagem` | Listar todas as postagens |
| `GET` | `/socialifpi/postagem/:id` | Consultar postagem por ID |
| `POST` | `/socialifpi/postagem` | Criar nova postagem |
| `PUT` | `/socialifpi/postagem/:id` | Editar postagem |
| `DELETE` | `/socialifpi/postagem/:id` | Excluir postagem |
| `POST` | `/socialifpi/postagem/:id/curtir` | Curtir postagem |
| `POST` | `/socialifpi/postagem/:id/comentario` | Adicionar comentário |
| `DELETE` | `/socialifpi/postagem/:id/comentario/:comentarioId` | Remover comentário |

## 📝 Exemplos de Uso

### Criar uma Postagem
```bash
curl -X POST http://localhost:3000/socialifpi/postagem \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Minha Primeira Postagem",
    "conteudo": "Conteúdo da minha postagem aqui..."
  }'
```

### Listar Todas as Postagens
```bash
curl http://localhost:3000/socialifpi/postagem
```

### Curtir uma Postagem
```bash
curl -X POST http://localhost:3000/socialifpi/postagem/[ID]/curtir
```

### Adicionar Comentário
```bash
curl -X POST http://localhost:3000/socialifpi/postagem/[ID]/comentario \
  -H "Content-Type: application/json" \
  -d '{
    "autor": "João Silva",
    "conteudo": "Excelente postagem!"
  }'
```

### Editar Postagem
```bash
curl -X PUT http://localhost:3000/socialifpi/postagem/[ID] \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Título Atualizado",
    "conteudo": "Conteúdo atualizado..."
  }'
```

## 🗄️ Estrutura dos Dados

### Postagem
```json
{
  "_id": "string",
  "titulo": "string",
  "conteudo": "string",
  "data": "Date",
  "curtidas": "number",
  "comentarios": "Comentario[]"
}
```

### Comentário
```json
{
  "_id": "string",
  "autor": "string",
  "conteudo": "string",
  "data": "Date"
}
```

## 🔧 Scripts Disponíveis

- `npm run build` - Compila o projeto TypeScript
- `npm start` - Executa o servidor em produção
- `npm run dev` - Compila e executa em modo desenvolvimento

## 🚨 Tratamento de Erros

A API retorna códigos de status HTTP apropriados:

- `200` - Sucesso
- `201` - Criado com sucesso
- `400` - Dados inválidos
- `404` - Recurso não encontrado
- `500` - Erro interno do servidor


---

**Xamã Cardoso** - *Trabalho Final de Programação Web I* - IFPI
