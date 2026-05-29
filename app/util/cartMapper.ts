import { Product } from "./type";
import { CartItem } from "./type";

export const mapProductToCartItem = (
  product: Product,
  qty: number
): CartItem => {
  return {
    id: product.id,
    name: product.name,
    price: Number(product.current_price),
    image: product.image_url,
    stock: product.is_active ? 1 : 0,
    quantity: qty,
  };
};