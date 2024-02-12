import { CategoryButton } from "@/components/CategoryButton/CategoryButton";
import { Header } from "@/components/Header/Header";
import { View, FlatList } from "react-native";

import { CATEGORIES } from "@/utils/data/products";
import { useState } from "react";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);

  function handleCategorySelect(selectedCategory: string) {
    setSelectedCategory(selectedCategory);
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Faça seu pedido" cartQuantityItens={5} />

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
    </View>
  );
}
