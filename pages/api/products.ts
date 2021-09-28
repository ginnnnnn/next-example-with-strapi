import { NextApiHandler } from "next";
import { getProducts } from "../../lib/products";

const handler: NextApiHandler = async (req, res) => {
  console.log("[/api/products] handler");
  const products = await getProducts();
  res.status(200).json(products);
};

export default handler;
