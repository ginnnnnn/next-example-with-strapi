//use getStaticProps
//use with Incremental Stati Regeneration
import { GetStaticProps } from "next";
import { StripProduct, getProducts } from "../lib/products";
import ProductCard from "../components/ProductCard";
import Page from "../components/Page";
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
    revalidate: parseInt(process.env.REVALIDATE_SECONDS), //seconds
  };
};

const HomePage: React.FC<HomePageProps> = ({ products }) => {
  console.log("[HomePage] render", products);

  return (
    <Page title="Indoor Plants">
      <ul className="grid grid-cols-1 lg:grid-cols-3 gap-4 justify-items-center">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </Page>
  );
};
export default HomePage;
