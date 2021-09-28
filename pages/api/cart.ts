import { NextApiHandler } from "next";
import { fetchJson } from "../../lib/api";
import { CartItem } from "../../lib/cart";
const { CMS_URL } = process.env;
const stripCartItem = (cartItem: any): CartItem => {
  return {
    id: cartItem.id,
    quantity: cartItem.quantity,
    product: {
      id: cartItem.product.id,
      title: cartItem.product.title,
      price: cartItem.product.price,
    },
  };
};
const getCartHandler: NextApiHandler = async (req, res) => {
  const { jwt } = req.cookies;
  if (!jwt) {
    res.status(401).end();
    return;
  }
  try {
    const cartItems = await fetchJson(`${CMS_URL}/cart-items`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    res.status(200).json(cartItems.map((cartItem) => stripCartItem(cartItem)));
  } catch (err) {
    console.log(err);
    res.status(401).end();
    return;
  }
};

const postCartHandler: NextApiHandler = async (req, res) => {
  const { jwt } = req.cookies;
  if (!jwt) {
    res.status(401).end();
    return;
  }
  const { productId, quantity }: { productId: number; quantity: number } =
    req.body;
  try {
    const cartItem = await fetchJson(`${CMS_URL}/cart-items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        product: productId,
        quantity: quantity,
      }),
    });
    res.status(200).json(stripCartItem(cartItem));
  } catch (err) {
    res.status(401).end();
  }
};

const cartHandler: NextApiHandler = (req, res) => {
  console.log(req.method);
  switch (req.method) {
    case "GET":
      return getCartHandler(req, res);
    case "POST":
      return postCartHandler(req, res);
    default:
      return res.status(405).end();
  }
};
export default cartHandler;
