# API

API REST construída com [NestJS](https://nestjs.com/), TypeORM e PostgreSQL, organizada em camadas (domínio, aplicação e infraestrutura).

## Módulos

- **Employee** (`/employee`) — cadastro, listagem, consulta e remoção (soft delete) de colaboradores.
- **Document Type** (`/document-type`) — cadastro e listagem de tipos de documento.
- **Requirement** (`/requirement`) — criação, listagem por colaborador e remoção (soft delete) de exigências.
- **Document** (`/document`) — envio de documento (com versionamento), remoção (soft delete), a consulta de exigências pendentes do colaborador e as consultas globais de pendências, percentual de entrega e últimos envios (com filtro opcional por colaborador).

Uma **exigência** (`requirement`) é a obrigação de um colaborador entregar um tipo de documento —
"o colaborador X precisa enviar um comprovante de residência". O documento é a versão enviada para
satisfazer essa exigência. As mensagens da API usam esse vocabulário.

As consultas de exigências e de documentos de um colaborador ficam nos módulos `requirement` e
`document`, que são os donos desse domínio; o módulo `employee` cuida apenas do colaborador. O
`employeeId` chega nessas rotas por query string.

### Storage

O envio de documento grava apenas a **chave** no banco (`document.storage_key`, no formato
`documents/{requirementId}/v{n}.pdf`); o arquivo em si vai para o `StorageGateway`.

O `StorageGateway` é uma **simulação intencional de storage**, por se tratar de um teste técnico:
guarda o arquivo em memória em vez de subir para S3, GCS ou disco. Trocar por um storage real é
mudar a implementação do `upload`, sem tocar no use-case.

Gateways seguem o mesmo padrão dos repositórios: uma classe concreta, registrada direto como
provider, sem classe abstrata servindo de interface.

## Endpoints

| Método | Rota                               | Descrição                                                          |
| ------ | ---------------------------------- | ------------------------------------------------------------------ |
| POST   | `/employee`                        | Cria um colaborador                                                |
| GET    | `/employee/list`                   | Lista colaboradores (paginado, filtros por nome e removidos)       |
| GET    | `/employee/:id`                    | Busca um colaborador por id                                        |
| DELETE | `/employee/:id`                    | Remove um colaborador (soft delete)                                |
| POST   | `/document-type`                   | Cria um tipo de documento                                          |
| GET    | `/document-type/list`              | Lista tipos de documento (paginado, filtro por nome)               |
| POST   | `/requirement`                     | Cria uma exigência de documento                                    |
| GET    | `/requirement/employee/list`       | Exigências de um colaborador (`employeeId`, paginado)              |
| DELETE | `/requirement/:id`                 | Remove uma exigência (soft delete)                                 |
| POST   | `/document`                        | Envia um documento (nova versão)                                   |
| GET    | `/document/employee/pending/list`  | Exigências do colaborador sem documento enviado (paginado)         |
| GET    | `/document/frequent/pending`       | Tipos de documento mais frequentemente pendentes                   |
| GET    | `/document/percentage/submission`  | Percentual global de exigências com documento enviado              |
| GET    | `/document/submission/latest/list` | Últimos envios (paginado, filtros opcionais por período e por colaborador) |
| DELETE | `/document/:id`                    | Remove um documento (soft delete)                                  |

Em `/document/submission/latest/list`, `startDate`, `endDate` e `employeeId` são opcionais —
sem eles, a listagem não filtra. Passando `employeeId`, a rota devolve os últimos envios
daquele colaborador.

## Pré-requisitos

- Node.js 20+
- Docker (para subir o PostgreSQL localmente)

## Configuração

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Copie o arquivo de variáveis de ambiente e preencha os valores:

   ```bash
   cp .env.example .env
   ```

   | Variável            | Obrigatória | Descrição                                            |
   | ------------------- | ----------- | ---------------------------------------------------- |
   | `POSTGRES_HOST`     | sim         | Host do banco                                        |
   | `POSTGRES_PORT`     | sim         | Porta do banco                                       |
   | `POSTGRES_USER`     | sim         | Usuário do banco                                     |
   | `POSTGRES_PASSWORD` | sim         | Senha do banco                                       |
   | `POSTGRES_DB`       | sim         | Nome do banco                                        |
   | `URL_API`           | sim         | Base URL usada pelo `EmployeeGateway`                |
   | `PORT`              | não         | Porta HTTP da aplicação (3000 quando ausente)        |

   As variáveis são lidas e validadas em um único ponto
   (`src/module/shared/infra/config/env.config.ts`). Se alguma obrigatória estiver
   faltando, a aplicação falha no boot dizendo qual é — inclusive nos comandos de
   migration.

3. Suba o banco de dados:

   ```bash
   npm run compose:up
   ```

4. Rode as migrations:

   ```bash
   npm run migration:run
   ```

## Executando a aplicação

```bash
# sobe a aplicação
npm run start

# gera o build de produção
npm run build
```

Ao subir, a aplicação imprime no console a URL da documentação (Swagger), servida em
`http://localhost:{PORT}/docs`.
