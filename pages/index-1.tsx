import Head from "next/head";
//component
import Title from "../components/Title";
//use getStaticProps
import { GetStaticProps } from "next";
import { StripProduct, getProducts } from "../lib/products";
interface HomePageProps {
  products: StripProduct[];
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  console.log("[HomePage] getStaticProps()");
  const products = await getProducts();
  return {
    props: {
      products: products,
    },
  };
};

const HomePage: React.FC<HomePageProps> = ({ products }) => {
  console.log("[HomePage] render", products);

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
