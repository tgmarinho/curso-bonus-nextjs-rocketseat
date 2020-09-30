# Learning NextJS

> Curso Bonus de NextJS da Rocketseat

## Fundamentos

### Iniciando o Projeto com Typescript

- Para criar um app com NextJS

```
yarn create next-app curso-nextjs
```

Instalar typescript

```
yarn add typescript @types/react @types/node -D
```

Renomear os arquivos usando a extensão `.tsx`

Iniciar o app com

```
yarn dev
```

Vai ser detectado o typescript no projeto, e o nextjs vai gerar o arquivo `tsconfig.json`

E iniciar o app em `localhost:3000` ;)

NEXT já vem com fast reload refrash e mantem os estados e não causa reload da pagina top!

Com SSR o next já vai ter um server node renderizando a página pronta para o browser, posso desabilitar o js e o app vai funcionar, lá no app.rocketseat.com.br não funciona…

É um diferencial bem legal

Pq a página fica disponível para webcrawlers do google e outros (bing)

### PAGINAS E ROTAS

Rotas estaticas
Não precisamos instalar nenhuma lib pra gerenciar rotas, o next já vem com essa feature,

não podemos excluir ou renomear a pasta pages, mas podemos deixar ela dentro de uma pasta `src`.

src/pages/products/product.tsx

Acessando a rota:

```
localhost:3000/pages/products/product
```

Se mudar a pasta pages para dentro de src tem q reiniciar o app

Dentro de pages todos os arquivos e pastas q estiverem la dentro se tornam uma rota, exceto arquivos iniciados com \_, a exemplo do \_app.tsx.

### Rotas dinâmicas (parametrizadas)

Para add rotas dinamicas pasta criar um arquivo entre colchetes [] com um nome que será o id (pode ser qualquer nome)

```
src/pages/products/[slug].tsx
```

E usar o useRouter do next para acessar o parametro via query.

http://localhost:3000/products/my-awesome-product

router.query.slug == my-awesome-product

### Estilização

Pode utilizar várias libs para esse fim, vamos usar CSS in JS, com styled-components

Para instalar:

```
yarn add styled-components
```

Tipos:

```
yarn add @types/styled-components -D

```

criar o estilo global e uma pasta styles e comeár a criar os estilos

styled-components não tem suporte nativo ao SSR, portanto se desabilitar o JS do browser vamos perceber que os estilos não são aplicados.

Para funcionar precisamos criar um componente \_Document.tsx e seguir os passos da DOC do Styledcomponent para configurar o babel.

- https://github.com/vercel/next.js/blob/master/examples/with-styled-components/.babelrc
- https://github.com/vercel/next.js/blob/master/examples/with-styled-components/package.json (ver as lib q tem q instalar para funcionar o babel)
- https://styled-components.com/docs/advanced#server-side-rendering

tudo configurado pode testar habilitando e desabilitando o JavaScript do navegador. xP

## Lidando com Dados

### Servidor Fake

para simular um CRUD completo vamos criar um server.json na raiz do projeto:

```
{
  "categories": [
    { "id": "camisetas", "title": "Camisetas" },
    { "id": "calcas", "title": "Calças" }
  ],
  "products": [
    { "id": 1, "title": "Camiseta Front-end", "price": 79.9, "category_id": "camisetas", "slug": "camiseta-front-ends"},
    { "id": 2, "title": "Camiseta CSharpolin", "price": 69.9, "category_id": "camisetas", "slug": "camiseta-csharpolin"},
    { "id": 3, "title": "Calça preta back-end", "price": 129.9, "category_id": "calcas", "slug": "calca-preta-back-end"},
    { "id": 4, "title": "Calça azul do React", "price": 109.9, "category_id": "calcas", "slug": "calca-azul-react"}
  ],
  "recommended": [
    { "id": 1, "title": "Camiseta Front-end", "price": 79.9, "category_id": "camisetas", "slug": "camiseta-front-ends"},
    { "id": 4, "title": "Calça azul do React", "price": 109.9, "category_id": "calcas", "slug": "calca-azul-react"}
  ]
}
```

e rodar no terminal:

```
npx json-server server.json -p 3333 -w
```

E o server vai rodar em http://localhost:3333

```
Resources
  http://localhost:3333/categories
  http://localhost:3333/products
  http://localhost:3333/recommended

  Home
  http://localhost:3333

```

### Client Side Fetch

Podemos usar o axios ou SWR para fazer busca de dados pelo lado cliente, ou até mesmo o fetch API do JS.

Quando usamos useEffect e alguma das libs acima e a implementação desse commit, a busca só é feita pelo navegador, e com useEffect assim que a tela é montada, e esses registros não são indexados no google por exemplo, não são lidos pelos webcrawlers.

Precisamos de outra solução. Vamos ver a seguir, porém fique com exemplo de código de uma client side fetch.

Quando utilizar CSF, qndo não precisar q os itens sejam indexados na busca (motores de busca).

### Server Side Rendering

Browser <-> Next (Node.js - SSR) <-> API
Navegador (client, motores de busca) via HTTP invoca um recurso, o nextJS processa, busca na API, retorna a renderização para o navegador. A renderização é feita no servidor, e no browser apenas exibe o que o Next Node.js fez por baixo dos panos.

- adicionando delay no servidor fake:

```
npx json-server server.json -p 3333 -w -d 2000
```

`getServerSideProps` é uma estratégia de SSR executando o código desse commit, observamos que toda a tela é carregada apos 2 segundos, isso pq o componente Home é renderizado no servidor, após 2 segundo e exibido o seu conteudo posteriormente. Essa estratégica é útil quando precisamos que items sejam indexados pelos motores de busca. Precisa seguir o nome `getServerSideProps`, isso não é inventado

> Above my comments and Bellow NextJS README.md

### Next JS - stuffs

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
