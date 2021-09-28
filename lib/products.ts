import { fetchJson } from "./api";
const CMS_URL = process.env.CMS_URL;

export interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  picture: {
    url: string;
  };
}
export interface StripProduct {
  id: number;
  title: string;
  description: string;
  price: string;
  pictureUrl: string;
}

export async function getProduct(id: string): Promise<StripProduct> {
  const product: Product = await fetchJson(`${CMS_URL}/products/${id}`);
  return stripProduct(product);
}

export async function getProducts() {
  const products: Product[] = await fetchJson(`${CMS_URL}/products`);
  return products.map(stripProduct);
}
function stripProduct(product: Product) {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    price: "$" + parseFloat(product.price).toFixed(2),
    pictureUrl: CMS_URL + product.picture.url,
  };
}
