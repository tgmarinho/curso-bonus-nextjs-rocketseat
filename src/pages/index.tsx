import { GetServerSideProps } from "next";
import Link from "next/link";
import { Title } from "@/styles/pages/Home";
import SEO from "@/components/SEO";
import { client } from "@/lib/prismic";
import Prismic from "prismic-javascript";
import PrismicDOM from "prismic-dom";
import { Document } from "prismic-javascript/types/documents";

interface HomeProps {
  recommendedProducts: Document[];
}

export default function Home({ recommendedProducts }: HomeProps) {
  return (
    <div>
      <SEO
        title="DevCommerce | boosting your dev things"
        image="boost.png"
        shouldExcludeTitleSuffix
      />
      <section>
        <Title>Products</Title>
        <ul>
          {recommendedProducts.map((product) => (
            <li key={product.id}>
              <Link href={`catalog/products/${product.uid}`}>
                <a>{PrismicDOM.RichText.asText(product.data.title)}</a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const recommendedProducts = await client().query([
    Prismic.Predicates.at("document.type", "product"),
  ]);

  return {
    props: { recommendedProducts: recommendedProducts.results },
  };
};
