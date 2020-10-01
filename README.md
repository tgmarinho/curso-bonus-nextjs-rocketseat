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

### Static Side Generation

`getStaticProps` é uma estratégia de fetch de dados de maneira estática, quando é feito a build do projeto os dados são carregados, e armazenados no servidor, ficando disponível e rapidamente podemos acessar esses dados. Vantagem que os dados ficam disponíveis instaneamente, desvantagem que se os dados ficam desatualizados é necessário outra build para atualizar os dados. Porém com nextjs tem o revalidate que recebe um valor numérico que se referente de quanto em quanto tempo os dados serão recarregados.

Essa estratégia foi amplamente utilizada no Gatsby, e os melhores casos de uso são Blogs, feed de notícias, onde basicamente não mudam, não são dinamicos, e se são alterados são poucas vezes...

Para testar esse cenário de SSG, execute o build do projeto e depois inicie o projeto pela build, em modo de desenvolvimento não é possível reproduzir.

No proprio processo de build é possível verificar quais páginas SSG foram geradas. (SSG bolinha pintada)

`revalidate` só dá para testar em produção

```
yarn build
```

```
yarn start
```

depois navegar na página top10.

### Páginas estáticas dinâmicas

Página estáticas dinamicas são páginas que embora seja estáticas precisam de algum dado dinamico para serem geradas.

`getStaticProps` esse método nesse commit precisa do slug e o slug é dinamico, então é necessário ter os slugs estáticos tbm. E ai usamos `getStaticPaths` que irão carregas as dependencias do `getStaticProps`. Quando é feito o `yarn build` podemos ver os slugs criados.

Quando chamo no navegador o slug ele já traz o resultado estático, pois tudo já foi executado no build, e foi feito uma mistura de páginas estáticas com dados dinâmicos, ou podemos dizer que uma página estática foi gerada dinamicamente:

```
http://localhost:3000/categories/calcas
```

```
calcas
Calça preta back-end
Calça azul do React
```

### Incremental Static Generation

Permite criar páginas estáticas conforme solicitado pelo usuário em tempo de execução.
no método `getStaticPaths` quando `fallback: true`, se o usuário acessar algum recurso q não existe, ele é criado:

```
http://localhost:3000/categories/meias

```

Ele vai criar a página meias

```
http://localhost:3000/categories/cuecas

```

Ele vai criar a página cuecas, e se tiver alguma cueca em products ela será listada no frontend.

O `router` tem um propriedade `isFallback` que verifica se está sendo criada a página, se estiver criando (primeiro acesso) vai demorar um pouco. Ai precisa deixar algum loading para o usuário.

```
if (router.isFallback) {
    return <h1>carregando....</h1>;
  }
```

Mas depois que o recurso é criado, ele se torna estático e fica acessível de forma rápida e estática.

Esse recurso é bem interssante pq permite criar páginas sem precisar parar o APP, o processo é feito quando o app está online, ou seja, não precisa de executar o `yarn build`.

OBS: Que feature massa demais!!!!

## Preparando para Produção

### Página 404 customizada

Para customizar a página 404, pasta criar um componente com nome `404.tsx` dentro da pasta `pages` e pronto! Só estilizar e já vai estar funcionando.

### Utilizando import dinamico

Serve para importar o código quando ele for realmente utilizado.
Algumas vezes o código é carregado na página porém nem é utilizado, e demora para carregar a página atoa.

import dinamico veio para resolver isso.

```
 const handleSum = async () => {
    const math = (await import("../lib/math")).default;

    console.log(math.sum(5, 9));
  };
```

Na aba network dá para ver que apenas foi importado arquivo quando clicado no botão sommeeee

### Lazy load components

Carregamento preguiçoso de componentes! lol

importa um componente quando ele realmente for necessário, no NextJS usamos a função dynamic para isso, importando o componente como primeiro parametro e o segundo um objeto de configuração.

Podemos passar uma função para carregar um loading na tela, na prop loading.

ssr: true indica que o componente será renderizado no lado servidor e false lado cliente. `false` é util quando precisamos usar algum variável que fica disponível apenas no lodo cliente, por exemplo `window` e `document` do navegador.

Código:

```
import dynamic from "next/dynamic";

const AddToCartModal = dynamic(
  () => import("../../components/AddToCartModal"),
  {
    loading: () => <p>Loading... wait please</p>,
    ssr: false,
  }
);
```

### Variáveis de ambiente

Podemos criar arquivo `.env.local` na raiz do projeto, esse arquivo é apenas local e fica no .gitignore, já `.env.development` ou `.env.production` são compartilhadas.

As variáveis ficam disponíveis apenas no lado servidor, se for usar de maneira tradicional.

```
API_URL=http://localhost:3333
```

Com NextJS podemos ter acesso as variáveis no lado cliente, apenas passando o prefixo: `NEXT_PUBLIC_`

```
NEXT_PUBLIC_API_URL=http://localhost:3333
```

com isso podemos fazer um `process.env.NEXT_PUBLIC_API_URL` dentro do html e ter acesso ao conteúdo da variável.

Detalhe que nem é necessário utilizar o pacote `.dotenv` o NextJS já consegue fazer o carregamento dinamico e cada alteração na variável nem precisa reniciar o app.

quando roda o comando `yarn dev` a variável de ambiente que sobe é `.env.development` automagicamente o next faz isso pra gente xD

### Paths no TypeScript

root imports com next.js fica bem mais simples.

tsconfig.json:

```
"baseUrl": "./src",
    "paths": {
      "@/*": ["./*"]
    }
```

sem:

```
import("../../components/AddToCartModal"),
```

com:

```
import("@/components/AddToCartModal")

```

Código fica mais limpo e o VsCode consegue entender super bem.

Caso ñ consiga reconhecer, faça um reload na IDE.

Melhora bastante a organização do projeto.

### Criando componentes de SEO

Criamos um componente `SEO.tsx` para poder incluir tags (meta e title) no head do html.

NextJS ajuda muito com o recurso: `next/head` que inclui o conteudo no head da página, independente de onde colocamos o <SEO /> na página.

Veja `SEO.tsx` e a utilizando `<SEO title="Potato" />`

### Criando Documento Customizado

Para customizar o html da página, podemos alterar o `_document.tsx` e no método render incluir as tags (componentes) <Html>, <Head>, body, <Main> e <NextScript>.

Adicionamos a fonte Roboto no projeto. Ver commits.

## Usando CMS em produção

### Opções de CMS

Segundo a opnião do Diego

- Prismic: landing page, sites;
- Strapi: sites pequenos sem muitos relacionamentos
- Ghost: Blog (editor de texto muito bom) -- Verdade esse bilete!

### Configurando Prismic

- [crie uma conta](https://prismic.io/docs)

E cadastre os produtos nas categorias, seguindo o exemplo do server fake...

### Utilizando o SDK do Prismic

Dando uma limpa no projeto para se adequar ao DevCommerce.

- adicionar as libs do prismic ver a DOC (package.json)
- pegar url do endpoint no site do projeto prismic -- conectar a aplicação next com prismic
- programar a busca dos dados (ver commits)
- prestar atenção nas interfaces TS do prismic

---

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
