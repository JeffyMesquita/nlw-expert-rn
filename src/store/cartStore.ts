import { ProductProps } from "@/utils/data/products";
import { create } from "zustand";
import * as cartInMemory from "./helpers/cartInMemory";

export type ProductCartProps = ProductProps & {
  quantity: number;
};

type CartStateProps = {
  products: ProductCartProps[];
  addProduct: (product: ProductProps) => void;
};

export const useCartStore = create<CartStateProps>((set) => ({
  products: [],
  addProduct: (product: ProductProps) =>
    set((state) => ({
      products: cartInMemory.addProduct(state.products, product),
    })),
}));
