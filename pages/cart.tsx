import { FunctionComponent } from "react";
import { useQuery } from "react-query";
import Page from "../components/Page";
import { fetchJson } from "../lib/api";
import CartTable from "../components/CartTable";
import { CartItem } from "../lib/cart";

interface CartPageProps {}

const CartPage: FunctionComponent<CartPageProps> = () => {
  const query = useQuery<CartItem[]>("cartItems", () => fetchJson("api/cart"));
  const cartItems = query.data;
  return (
    <Page title="Cart">
      {query.isLoading && <p>Loading...</p>}
      {cartItems && <CartTable cartItems={cartItems} />}
    </Page>
  );
};

export default CartPage;
