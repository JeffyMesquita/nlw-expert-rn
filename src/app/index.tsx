import { CategoryButton } from "@/components/CategoryButton/CategoryButton";
import { Header } from "@/components/Header/Header";
import { View, FlatList, SectionList, Text } from "react-native";
import { Link } from "expo-router";

import { CATEGORIES, MENU } from "@/utils/data/products";
import { useState, useRef } from "react";
import { Product } from "@/components/Product/Product";
import { useCartStore } from "@/store/cartStore";

export default function Home() {
  const cartStore = useCartStore();
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const sectionListRef = useRef<SectionList>(null);

  const cartQuantityItens = cartStore.products.reduce(
    (total, product) => total + product.quantity,
    0
  );

  function handleCategorySelect(selectedCategory: string) {
    setSelectedCategory(selectedCategory);

    const sectionIndex = CATEGORIES.findIndex(
      (category) => category === selectedCategory
    );

    if (sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        sectionIndex,
        itemIndex: 0,
        animated: true,
      });
    }
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Faça seu pedido" cartQuantityItens={cartQuantityItens} />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={selectedCategory === item}
            onPress={() => handleCategorySelect(item)}
          />
        )}
        horizontal
        className="max-h-10 mt-5"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
      />

      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-xl text-white font-heading mt-8 mb-3">
            {title}
          </Text>
        )}
        className="flex-1 p-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
