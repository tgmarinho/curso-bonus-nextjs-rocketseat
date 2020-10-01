import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { Title } from "@/styles/pages/Home";
import { client } from "@/lib/prismic";
import Link from "next/link";

import Prismic from "prismic-javascript";
import { Document } from "prismic-javascript/types/documents";
import PrismicDOM from "prismic-dom";

interface CategoryProps {
  category: Document;
  products: Document[];
}

export default function Category({ category, products }: CategoryProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>carregando....</h1>;
  }

  return (
    <section>
      <Title>{PrismicDOM.RichText.asText(category.data.title)}</Title>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/catalog/products/${product.uid}`}>
              <a>{PrismicDOM.RichText.asText(product.data.title)}</a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await client().query([
    Prismic.Predicates.at("document.type", "category"),
  ]);

  const paths = categories.results.map((category) => {
    return {
      params: { slug: category.uid },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<CategoryProps> = async (
  context
) => {
  const { slug } = context.params;

  const category = await client().getByUID("category", String(slug), {});

  const products = await client().query([
    Prismic.Predicates.at("document.type", "product"), // pega todos os documentos do produto
    Prismic.Predicates.at("my.product.category", category.id), // dinamico = por categoria 'my.XProduc.category' relacionamento...
  ]);

  return {
    props: {
      category,
      products: products.results,
    },
    revalidate: 5, // cinco segundos
  };
};
