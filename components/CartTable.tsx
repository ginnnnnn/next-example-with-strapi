import { FunctionComponent } from "react";
import { CartItem, buildCart, formatCurrency } from "../lib/cart";

interface CartTableProps {
  cartItems: CartItem[];
}

const CartTable: FunctionComponent<CartTableProps> = ({ cartItems }) => {
  const cart = buildCart(cartItems);
  return (
    <table>
      <thead>
        <tr>
          <th className="px-4 py-2">Product</th>
          <th className="px-4 py-2">Price</th>
          <th className="px-4 py-2">Quantity</th>
          <th className="px-4 py-2">Total</th>
        </tr>
      </thead>
      <tbody>
        {cart.items.map((item) => (
          <tr key={item.id}>
            <td className="px-4 py-2">{item.product.title}</td>
            <td className="px-4 py-2 text-right">
              {formatCurrency(item.product.price)}
            </td>
            <td className="px-4 py-2 text-right">{item.quantity}</td>
            <td className="px-4 py-2 text-right">
              {formatCurrency(item.total)}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th className="px-4 py-2 text-left">Total</th>
          <th></th>
          <th></th>
          <th className="px-4 py-2  text-right">
            {formatCurrency(cart.total)}
          </th>
        </tr>
      </tfoot>
    </table>
  );
};

export default CartTable;
