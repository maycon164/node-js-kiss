# Authentication

Existem diversas maneiras de se fazer autenticacao com node-js, a intencao deste repo é demonstrar algumas delas tais como o fluxo de jwt, oauth (google, discord, facebook) assim tambem como fazer o gerenciamento de sessions com redis e express-session

### Passport

é basicamente uma lib usada no mundo do node-js para lidar com middleware de autenticacao do usuario se a gente fosse implementar apenas uma autenticacao do tipo email e senha não vejo necessidade de usa-la mais como pretendo implementar varias o passport ajuda

### Strategy

o strategy seria as formas de se fazer login, por exemplo podemos fazer login pelo google, pelo facebook, email e senha, via IAP e entre outros, vale lembrar que o strategy é um padrao de projetos

by: [RefactoringGuru](https://refactoring.guru/design-patterns/strategy)

> The Strategy pattern suggests that you take a class that does something specific in a lot of different ways and extract all of these algorithms into separate classes called *strategies*
.
> 

olha só a ideia de implementacoes

```jsx
// no final do dia todas essas classes lidam com a logica de login
export class GoogleStrategy{}
export class JWTStrategy{}
export class LocalStrategy{}
export class FacebookStrategy{}

```

### Session Based Authentication

das diversas maneiras de se fazer login, uma deles é atraves de um cookie de identificacao ao logarmos na aplicacao o servidor backend vai setar um cookie na aplicacao frontend assim cada requisicao que o frontend fizer ele sempre ira vir com esse cookie que pode ser usado para identificar o usuario

o uso de cookies "session.id" é passivel de ataques tipo CSRF, nesse ataque o hacker rouba seu cookie de identificacao e pode fazer requisicoes se passando por voce

um cookie geralmente contem

| name | nome do cookie ex: http://connect.id |
| --- | --- |
| value | o valor do cookie |
| attributes | data de expiracao, domain, path |

### Tipos de cookies 🍪🍪🍪

**First-party cookies:** sao setados pelo website que voce esta interagindo na maioria das vezes sao para identificar sua sessao no servidor (se voce ta logado)

**Third-party cookies:** esses sao os zuados, ja pesquisou algo no google e entrou num site pra ver o produto, depois disso percebeu que aquele item que voce pesquisou aparece como propaganda em outros sites, siginifica que o ecommerce que voce acessou guardou alguns cookies pra trackear voce e mostrar propagandas

Session cookies: usado para manter um registro do que voce estava fazendo naquele website

### Oauth

o fluxo de oauth, è um fluxo de autorizacao e nao autenticacao o que significa que esse repo nao esta respeitando seu uso kkkk, basicamente é usado para pegar informacoes e usar servicos de outras organizacoes como o google imagine que meu app pudesse marcar uma meeting no seu calendar do google ou meu app mostra sua imagem perfil do facebook isso seria feito atraves do fluxo Oauth