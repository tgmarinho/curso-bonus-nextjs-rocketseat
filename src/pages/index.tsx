import { GetServerSideProps } from "next";
import { Title } from "@/styles/pages/Home";
import SEO from "@/components/SEO";

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

    console.log(process.env.NEXT_PUBLIC_API_URL);

    console.log(math.sum(5, 9));
  };

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
  console.log(process.env.NEXT_PUBLIC_API_URL);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/recommended`
  );
  const recommendedProducts = await response.json();
  return { props: { recommendedProducts } };
};
