import { useRouter } from "next/router";
import { useState } from "react";

import dynamic from "next/dynamic";

const AddToCartModal = dynamic(() => import("@/components/AddToCartModal"), {
  loading: () => <p>Loading... wait please</p>,
  ssr: false,
});

export default function Product() {
  const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false);

  const router = useRouter();

  function handleAddToCart() {
    setIsAddToCartModalVisible(true);
  }

  return (
    <div>
      <h3>{router.query.slug}</h3>

      <button onClick={handleAddToCart}>Add To Cart</button>

      {isAddToCartModalVisible && <AddToCartModal />}
    </div>
  );
}
