import { useEffect, useState } from "react";
import Head from "next/head";
//component
import Title from "../components/Title";
import { StripProduct } from "../lib/products";
//get from internal api route

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<StripProduct[]>([]);
  useEffect(() => {
    (async () => {
      const resJson = await fetch("/api/products");
      const prds: StripProduct[] = await resJson.json();

      setProducts(prds);
    })();
  }, []);

  console.log("[HomePage] render:", products);

  return (
    <>
      <Head>
        <title>Next Shop</title>
      </Head>
      <main className="px-6 py-4">
        <Title>Next Shop</Title>
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </main>
    </>
  );
};
export default HomePage;
