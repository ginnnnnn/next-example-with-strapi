export interface CartItem {
  id: number;
  product: {
    id: number;
    title: string;
    price: number;
  };
  quantity: number;
}
interface Cart {
  items: (CartItem & { total: number })[];
  total: number;
}

export function formatCurrency(value: number): string {
  return "$" + value.toFixed(2);
}

export const buildCart = (cartItems: CartItem[]): Cart => {
  let total = 0;
  const items = [];
  for (const cartItem of cartItems) {
    const price = cartItem.product.price;
    const quantity = cartItem.quantity;
    const subTotal = price * quantity;
    total += subTotal;
    items.push({ ...cartItem, total: subTotal });
  }
  return { items, total };
};
