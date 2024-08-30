# Shopper Desafio Tecnico Back-End

Este projeto é um back-end para um serviço que gerencia a leitura de consumo de água e gás. O serviço utiliza Inteligência Artificial (IA) para obter a medição através de fotos de medidores. O objetivo é proporcionar uma forma eficiente e automatizada de monitorar o consumo de recursos com base em imagens.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **Fastify**: Framework web para Node.js, utilizado para criar o servidor.
- **Prisma**: ORM para interagir com o banco de dados PostgreSQL.
- **PostgreSQL**: Banco de dados relacional.
- **Cloudflare**: Para gerenciar o upload de imagens.
- **API Gemini**: Para a extração de valores a partir de imagens dos medidores.

## Funcionalidades

- **Upload de Imagem**: Permite o envio de imagens de medidores de água e gás.
- **Confirmação de Leitura**: Verifica e valida a leitura extraída da imagem.
- **Listagem de Medidas**: Fornece uma lista de medidas realizadas por cliente.
- **Validação de Tipos de Imagem**: Garante que as imagens enviadas estão no formato correto (JPEG, PNG).
- **Integração com APIs**: Utiliza a API Gemini e a API OpenAI para processar e extrair dados das imagens.

## Configuração do Ambiente

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```dotenv
# PORT
PORT=3333

# IA
GEMINI_API_KEY="sua-chave-api-gemini"

# DB
DATABASE_URL="postgresql://docker:docker@localhost:5432/shopper-desafio-tecnico-db?schema=public"

# R2 Cloudflare ou S3 AWS
CLOUDFLARE_SUBDOMAIN="https://seu-subdominio.r2.dev"
CLOUDFLARE_ACCOUNT_ID="seu-id-conta-cloudflare"
AWS_ACCESS_KEY_ID="sua-chave-acesso-aws"
AWS_SECRET_KEY_ID="sua-chave-secreta-aws"
AWS_BUCKET_NAME="seu-bucket-aws"
```

### Docker

O projeto utiliza Docker para facilitar a configuração e o gerenciamento do ambiente. Certifique-se de que você tem o Docker e o Docker Compose instalados.

#### Construir e Iniciar Contêineres
Execute o comando abaixo para construir e iniciar os contêineres:

```bash
docker compose up --build
```
#### Parar e Remover Contêineres

```bash
docker compose down
```
## Endpoints da API

### Upload de Imagem

- Método: POST
- Endpoint: /upload
- Descrição: Permite o upload de uma imagem em base64 de um medidor.
- Parâmetros: Imagem em formato base64.
- Resposta: Status da operação e identificador da leitura.

### Confirmação de Leitura

- Método: POST
- Endpoint: /confirm
- Descrição: Confirma a leitura extraída da imagem.
- Parâmetros: Identificador da leitura.
- Resposta: Status da confirmação e detalhes da leitura.

### Listagem de Medidas

- Método: GET
- Endpoint: /measures
- Descrição: Lista todas as medidas realizadas por cliente.
- Parâmetros: clientId (opcional).
- Resposta: Lista de medidas com detalhes.

