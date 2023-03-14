# Authentication

Existem diversas maneiras de se fazer autenticacao com node-js, a intencao deste repo é demonstrar algumas delas tais como o fluxo de jwt, oauth (google, discord, facebook) assim tambem como fazer o gerenciamento de sessions com redis e express-session

### Passport

é basicamente uma lib usada no mundo do node-js para lidar com middleware de autenticacao do usuario se a gente fosse implementar apenas uma autenticacao do tipo email e senha não vejo necessidade de usa-la mais como pretendo implementar varias o passport ajuda

### Strategy

o strategy seria as formas de se fazer login, por exemplo podemos fazer login pelo google, pelo facebook, email e senha, via IAP e entre outros, vale lembrar que o strategy é um padrao de projetos

[RefactoringGuru](https://refactoring.guru/design-patterns/strategy)

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

### GOOGLE STRATEGY zzzz