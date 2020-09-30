# Learning NextJS

Curso Bonus de NextJS da Rocketseat

## Iniciando o Projeto com Typescript

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

## PAGINAS E ROTAS

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

## Rotas dinâmicas (parametrizadas)

Para add rotas dinamicas pasta criar um arquivo entre colchetes [] com um nome que será o id (pode ser qualquer nome)

```
src/pages/products/[slug].tsx
```

E usar o useRouter do next para acessar o parametro via query.

http://localhost:3000/products/my-awesome-product

router.query.slug == my-awesome-product

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
