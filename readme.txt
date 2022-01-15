Crie arquivo source.list:
sudo gedit /etc/apt/sources.list.d/pgdg.list

Dentro do arquivo:
deb http://apt.postgresql.org/pub/repos/apt/ bionic-pgdg main

Execute o Comando:
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add
sudo apt-get update

Instalando:
sudo apt-get install postgresql

sudo apt install pgadmin4

sudo su - postgres

psql -d postgres -U postgres

alter user postgres with password 'senha';

Para sair \q ou exit;

Acessar postgresql terminal:

-Gerenciador onde podem ser vistas as tabelas existentes
sudo su - postgres

-Modo edicao
psql -U postgres

Listar Banco de dados
    psql -l

Para voltar ao prompt 
    \q

Criar Banco de dados
    createdb db_aula;

Selecionar o Banco
    psql db_aula;

Exemplo Criar uma Tabela
create table alunos (
id_aluno serial primary key,
nome varchar(50),
telefone varchar(15)
);

Listar tabelas existentes
\dt;

Conectar-se a uma tabela
\c nomeTabela

Mostrar estrutura de uma tabela
\d nomeTabela; 

====================================================================

- Ate o presente momento foi feito a instalacao e primeiro contato com o postgre.

- Ja foram baixadas as lib's que serao usadas.

- Tutorial da aula https://www.youtube.com/watch?v=U7GjS3FuSkA

- Parou a parte que começou a inserir um exemplo de tabela basica no minuto ' 7:13 '

- ja foi baixado o Insomnia porem tem que descompactar e adicionar ao projeto

- foi feito a escolha pelo Postman no lugar do insomnia, o mesmo se encontra na pasta Downloads ja descompactado e pronto para uso.

- No projeto será usado o nodemon para fazer o hotreload, dessa forma o nodemon re-ligará o servidor toda vez que houver uma mudança.

- No arquivo knexfile.js sera usado apenas o objeto 'development' devendo ser excluidos os demais objetos.

- O arquivo de configuracao fica da seguinte forma:

development: {
    client: 'pg',               //nome do pacote usado referente ao BANDO DE DADOS usado na aplicacao
    connection: {
      database: "knex_test",    //nome do banco criado dentro do postgres
      user: "postgres",         //nome do usuario no momentos da criacao do banco descrito na linha de cima
      password: "vik@123456"    // senha criada para acesso ao banco
    }
  }

- Proximo passo é criar os imports no arquivo index.js: 

const knexfile = require('../../knexfile');
const knex = require('knex')(knexfile['development']);

-Na sequencia damos inicio as MIGRATIONS, migration cria um historico das atividades do nosso banco de dados.

-No terminal coloque 'npx knex migrate:make create_table_users'

- Será criado uma pasta com o nome migrations na raiz do arquivo, por razoes de organizacao dos recusos(assets) vamos realoca-lo para dentro da pasta database.

-A pasta migration NAO pode ser movida normalmente, ela tem que ser movida atraves do arquivo de configuracao 'knexfile.js' ainda dentro do objeto 'development: {}' com a seguinte config:

migrations: {
    tableName: 'knex_migrations',
    directory: `${__dirname}/src/database/migrations`
}

-Após esse processo exclua a pasta 'migrations' rode o comando 'npx knex migrate:make create_table_users' novamente para que a pasta seja criado no lugar certo seguindo o caminha definido no arquivo de configuracao.

- Aula pausada no minuto 26:43