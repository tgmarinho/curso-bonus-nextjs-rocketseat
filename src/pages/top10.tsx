import { GetStaticProps } from "next";
import { Title } from "../styles/pages/Home";

interface IProduct {
  id: string;
  title: string;
}

interface Top10Props {
  top10Products: IProduct[];
}

export default function top10({ top10Products }: Top10Props) {
  return (
    <div>
      <section>
        <Title>Products</Title>
        <ul>
          {top10Products.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps<Top10Props> = async () => {
  const response = await fetch("http://localhost:3333/products");
  const top10Products = await response.json();
  return {
    props: {
      top10Products,
    },
    revalidate: 5,
  };
};
