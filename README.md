# Sistema Escola — Node.js, Express, MySQL e Sequelize

Projeto didático de gerenciamento escolar com modelos relacionais para alunos, professores, turmas, cursos e áreas.

## Tecnologias
- Node.js e Express para servidor e rotas
- MySQL com Sequelize como ORM
- EJS para as páginas HTML

## Modelo de dados
- Aluno: cadastro do estudante e ano de matrícula.
- Professor: docentes cadastrados.
- Curso, Área e Turma: organização acadêmica.
- Relacionamentos entre alunos e turmas nos modelos Sequelize.

## Como executar localmente
1. Instale Node.js e MySQL. Crie um banco vazio de desenvolvimento e um usuário com permissões adequadas.
2. Instale as dependências: npm ci
3. Defina DB_HOST, DB_PORT, DB_USER, DB_PASSWORD e DB_NAME nas variáveis de ambiente do processo Node. O arquivo .env.example é apenas referência e não é carregado automaticamente.
4. Verifique/crie as tabelas correspondentes aos modelos em database/models; este repositório não inclui uma migração SQL completa nem deve ser usado para modificar dados reais sem backup.
5. Inicie: npm start (ou npm run dev). Abra http://localhost:3000 no navegador.

Exemplo de variáveis de ambiente para seu ambiente local:

    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_NAME=escola_teste
    DB_USER=usuario_teste
    DB_PASSWORD=defina_sua_senha_localmente

Os valores acima são exemplos, não credenciais reais. Jamais envie senhas reais ao GitHub ou por mensagens.

## Rotas principais
- GET /alunos: lista os alunos.
- GET /alunos/matricula/:ano e GET /alunos/nome/:nome: filtros.
- GET /professores, POST /professores, PUT /professores/:id, DELETE /professores/:id.
- GET /dashboard: visão administrativa.
- GET/POST /alunos/novo; GET/POST /alunos/:id: formulários de aluno.

## Qualidade e segurança
Execute npm test para conferir as configurações sem conectar no banco. O GitHub Actions verifica também a sintaxe dos arquivos JS; ainda faltam testes integrados de rotas com MySQL.

IMPORTANTE: o sistema original não possui autenticação/controle de acesso completo. Não publique seus endpoints de escrita na internet com dados reais. Configure controle de acesso e HTTPS antes de usar em produção.

Credenciais que possam ter constado em versões anteriores permanecem no histórico Git; caso sejam reais, faça a rotação das senhas no serviço MySQL.

Origem: projeto recuperado de AlineDaniel/sistema-escola.
