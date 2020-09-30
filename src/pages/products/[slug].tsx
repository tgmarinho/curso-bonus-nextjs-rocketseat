import { useRouter } from "next/router";

export default function Product() {
  const router = useRouter();

  return <h3>{router.query.slug}</h3>;
}
