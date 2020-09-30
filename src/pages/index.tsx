import { useEffect, useState } from "react";
import { Title } from "../styles/pages/Home";

interface IProduct {
  id: string;
  title: string;
}

export default function Home() {
  const [recommendedProcuts, setRecommendedProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetch("http://localhost:3333/recommended")
      .then((response) => response.json())
      .then((data) => setRecommendedProducts(data));
  }, []);

  return (
    <div>
      <section>
        <Title>Products</Title>
        <ul>
          {recommendedProcuts.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
