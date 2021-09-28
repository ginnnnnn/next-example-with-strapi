import { FunctionComponent } from "react";
import Image from "next/image";
import Link from "next/link";
import { StripProduct } from "../lib/products";
interface ProductCardProps {
  product: StripProduct;
}

const ProductCard: FunctionComponent<ProductCardProps> = ({ product }) => {
  return (
    <div className="border w-80 shadow hover:shadow-xl">
      <Link href={`/products/${product.id}`}>
        <a>
          <Image
            src={product.pictureUrl}
            alt="plant"
            width="320"
            height="240"
          />
          <div className="flex p-2 justify-between items-baseline">
            <h2 className="text-lg font-bold">{product.title}</h2>
            <span>{product.price}</span>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ProductCard;
