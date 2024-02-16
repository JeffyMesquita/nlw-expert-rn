import { ProductProps } from "@/utils/data/products";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as cartInMemory from "./helpers/cartInMemory";

export type ProductCartProps = ProductProps & {
  quantity: number;
};

type CartStateProps = {
  products: ProductCartProps[];
  addProduct: (product: ProductProps) => void;
  removeProduct: (productId: string) => void;
  clearCart: () => void;
};

export const useCartStore = create(
  persist<CartStateProps>(
    (set) => ({
      products: [],

      addProduct: (product: ProductProps) =>
        set((state) => ({
          products: cartInMemory.addProduct(state.products, product),
        })),

      removeProduct: (productId: string) =>
        set((state) => ({
          products: cartInMemory.removeProduct(state.products, productId),
        })),

      clearCart: () => set({ products: [] }),
    }),
    {
      name: "nlw-expert:cart",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
