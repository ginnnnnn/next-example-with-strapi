import Head from "next/head";
import { FunctionComponent, useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { getProduct, getProducts, StripProduct } from "../../lib/products";
import { ParsedUrlQuery } from "querystring";
import { ApiError } from "../../lib/api";
import Image from "next/image";
import Page from "../../components/Page";
import { useUser } from "../../hooks/user";
import Button from "../../components/Button";
import AddToCartWidget from "../../components/AddToCartWidget";

interface ProductPageParams extends ParsedUrlQuery {
  id: string;
}
interface ProductPageProps {
  product: StripProduct;
}

export const getStaticPaths: GetStaticPaths<ProductPageParams> = async () => {
  const products = await getProducts();
  return {
    paths: products.map((product) => ({
      params: { id: product.id.toString() },
    })),
    //false wont gen the new page,"blocking" will,frontend need to wait until backend regen the page
    fallback: "blocking",
  };
};
export const getStaticProps: GetStaticProps<
  ProductPageProps,
  ProductPageParams
> = async ({ params: { id } }) => {
  try {
    const product = await getProduct(id);
    return {
      props: {
        product,
      },
      revalidate: parseInt(process.env.REVALIDATE_SECONDS),
    };
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      return {
        notFound: true,
      };
    }
    throw err;
  }
};

const ProductPage: FunctionComponent<ProductPageProps> = ({ product }) => {
  const user = useUser();

  console.log("[ProductPage] render");
  return (
    <Page title="Next Shop">
      <div className="flex flex-col lg:flex-row">
        <div>
          <Image
            src={product.pictureUrl}
            alt="plant"
            width={640}
            height={480}
          />
        </div>
        <div className="flex-1 lg:ml-4">
          <p className="text-sm">{product.description}</p>
          <p className="text-lg font-bold mt-2">{product.price}</p>
          {user && <AddToCartWidget productId={product.id} />}
        </div>
      </div>
    </Page>
  );
};

export default ProductPage;
