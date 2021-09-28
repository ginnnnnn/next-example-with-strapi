import { FunctionComponent, useState } from "react";
import { useMutation } from "react-query";
import { fetchJson } from "../lib/api";
import { useRouter } from "next/router";

interface AddToCartWidgetProps {
  productId: number;
}

const AddToCartWidget: FunctionComponent<AddToCartWidgetProps> = ({
  productId,
}) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const mutation = useMutation(() =>
    fetchJson("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    })
  );

  return (
    <div className="flex py-2 items-center">
      <div className="mr-4">
        <button
          onClick={(e) => setQuantity((q) => (q += 1))}
          className="px-2 border"
        >
          +
        </button>
        <span className="px-2">{quantity}</span>
        <button
          onClick={(e) =>
            setQuantity((q) => {
              q -= 1;
              return q >= 1 ? q : 1;
            })
          }
          className="px-2 border"
        >
          -
        </button>
      </div>
      <button
        onClick={async (e) => {
          await mutation.mutateAsync();
          router.push("/cart");
        }}
        className="p-3 border rounded-md bg-red-900 text-white"
        type="button"
      >
        Add to cart
      </button>
    </div>
  );
};

export default AddToCartWidget;
