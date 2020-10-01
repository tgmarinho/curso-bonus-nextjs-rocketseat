import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { Title } from "@/styles/pages/Home";
import { client } from "@/lib/prismic";
import Link from "next/link";

import Prismic from "prismic-javascript";
import { Document } from "prismic-javascript/types/documents";
import PrismicDOM from "prismic-dom";

interface ProductProps {
  product: Document;
}

export default function Product({ product }: ProductProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>carregando....</h1>;
  }

  return (
    <div>
      <h1>{PrismicDOM.RichText.asText(product.data.title)}</h1>

      <div
        dangerouslySetInnerHTML={{
          __html: PrismicDOM.RichText.asHtml(product.data.description),
        }}
      ></div>

      <img
        src={product.data.thumnail.url}
        width="300"
        alt={product.data.title}
      />

      <p>Price: ${product.data.price}</p>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // gera as páginas dinamicamente se não existir
  // com fallback ele irá criar online.
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<ProductProps> = async (context) => {
  const { slug } = context.params;

  const product = await client().getByUID("product", String(slug), {});
  console.log(product.data);
  return {
    props: {
      product,
    },
    revalidate: 10, // 10 segundos
  };
};
