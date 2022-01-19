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
    \l

Listar tabelas disponiveis
    \dt

Ver conteudo da tabela
    \d nomeTabela

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

Para excluir uma tabela usamos a clausula 'DROP', porem se a mesma possuir um relacionamento com outras tabelas será necessario excluir elas primeiro e dpois excluir a que pretendemos, casocontrario o SGBD nao permitirá. 

====================================================================

- Ate o presente momento foi feito a instalacao e primeiro contato com o postgre.

- Ja foram baixadas as lib's que serao usadas.

- Tutorial da aula https://www.youtube.com/watch?v=U7GjS3FuSkA

- Parou a parte que começou a inserir um exemplo de tabela basica no minuto ' 7:13 '

- ja foi baixado o Insomnia porem tem que descompactar e adicionar ao projeto

- Ja foi feita a descompactacao do insomnia, o mesmo esta no diretorio raiz desta aplicacao, use o comando  'insomnia open' para chamar.

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

- O gitHub so aceita token de autenticacao para acesso remoto ao repositorio, segue o link para o tutorial, o token tem duracao, o que que esta operante no momento expira daqui 29 dias a partir de hoje 15 de janeiro 2022, segue o link do tutorial:
https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token

- Aula parou no minuto 28:00;

- Resolvido problema de autenticacao para subir mudanças para rep remoto.

- O arquivo migration vai ter duas funcoes que terao o metodo responsavel por executar uma acao e um outro metodo desfaze-la caso necessario

- O retorno delas é uma promessa 

- Para conseguir rodar o script depois de configurado usamos o seguinte comando:

- npx knex migrate:latest

- Feito o commit e enviado para o rep remoto 

- Aula parou no minuto 35:06

- Foi adicionado a configuracao do seed no arquivo knex.js ainda dentro do objeto development da seguinte forma:

seeds: {
    directory: `${__dirname}/src/database/seeds`
    }

dessa forma quando for rodado o comando: 'npx knex seed:make numeroAcao_tabela a que se refere' o seed sera criado no mesmo diretorio ques esta as migrations.

NOTA: cada vez que for adicionada uma nova açao no seed é necessario numerar por questao de organizacao, pois o seed ao contrario da migration nao faz a numeracao automatica, entao a composicao do comando fica da seguinte forma: 'numero da acao + nome da tabela a que se refere' EX: 0001_users

NOTA: Tanto a pasta migrations quanto a pasta seeds devem ficar dentro da pasta 'database' e elas sao movidas para a pasta database via configuracao no arquivo knex.js.

- Apos inserir os dados e rodar o comando para criar o seed, agora dentro do arquivo gerado ja vem um template da açao de inserir usando o knex, foi colocado uns usuarios para a tabela ja pter uns dado logo de inicio.

- Após configurar o arquivo gerado pelo seed rode o seguinte comando: npx knex seed:run  dessa forma será executado o que tiver sido configurado.

- Foi configurado o arquivo "server.js" para receber as 'req' e 'res' foi importado o const knex = require('./database');

- Nesse ponto foi usado o insomnia para simular e vericiar a conexao com o banco de dados atraves do verbos 'htttp'

NOTA: Nao se esqueça de estar com o servidor rodando atraves do nodemoon, caso contrario as nao será possivel fazer nehuma acao.

- Foi criado o arquivo routes.js dentro da pasta 'src' para poder separar as responsabilidades, este arquivo ficará responsável somente pelas rotas

- Na arquivo routes foi colocado a rota ./users e exportado ela para o arquivo server.js

-Na sequencia foi criado a pasta 'controllers' dentro da pasta 'src' que será a parte de configuracoes para as funcoes para cada tipo de rota.

- Cada recurso possuirá um arquivo de config dentro da pasta controllers.

- Neste contexto entendemos por recurso as rotas. Por exemplo '/users'

- Como temos um recurso por enquanto, vamos criar o arquivo UserController.js dentro da pasta controllers. nele colocaremos a estrutura de req e res do recurso 'user'

- Neste arquivo deixaremos a estrutura em forma de promisse 'async await', traremos o import do knex pois o mesmo esta sendo usado neste arquivo agora.

- É necessario adicionar a linha  app.use(express.json()) no arquivo  server.js para que as rotas possam receber no body da reequisicao um array de dados em forma de Json()

- Neste ponto criaremos as outras acoes para completar o CRUD do recurso 'users' obviamente dentro do arquivo 'Usercontroller' dessa forma se houver um outro recurso será criado um arquivo dentro do controller para ele com as devidas acoes para cada verbo.

- Dentro da estrutura do verbo CREATE é necessário fazer a extracao das informacoes pertinentes antes de jogalas no banco de dados, dessa forma evitando que de erro e tambem evitando ataques de 'sqlinjection'

- Neste ponto será adicionado uma estrutura para capturar os erros, esta estrutura ficará no arquivo 'server.js'. Esta estrutura se chama 'catch all' e para isso usamos a idea de 'midleware' que significa que tudo que estiver entre a requisicao ate a respsosta é 'midleware' ou seja, do ponto A ao ponto C temos o ponto B entao todo caminho do A ate o C é midleware, entao toda transformacao que os dados sofrem, toda manipulacao é midleware ate que a resposta fique pronta.

- Numa estrutura do tipo 'catch all' usamos os parametros req, res  next e se adicionarmos um quarto parametro ele altomaticamente se torna o que irá receber o erro, portanto colocamos ele em primeiro lugar ficando da seguinte forma:

app.use((error, req, res, next) => {})


- Foram adicionadas as estruturas de  catch all e notFound e finalizado a adicao dos outros verbos para completar o 'CRUD' ja com os devidos tratamentos de erros

- Feito o devido commit do progresso atual

- Aula parou em 1:07:12

 















