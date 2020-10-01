import { GetServerSideProps } from "next";
import { Title } from "../styles/pages/Home";

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: HomeProps) {
  const handleSum = async () => {
    const math = (await import("../lib/math")).default;

    console.log(math.sum(5, 9));
  };

  return (
    <div>
      <section>
        <Title>Products</Title>
        <ul>
          {recommendedProducts.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </section>
      <div>
        <button onClick={handleSum}>Someeee</button>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch("http://localhost:3333/recommended");
  const recommendedProducts = await response.json();
  return { props: { recommendedProducts } };
};
