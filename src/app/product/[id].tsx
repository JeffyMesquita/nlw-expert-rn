import { Image, Text, View } from "react-native";
import { useLocalSearchParams, useNavigation, Redirect } from "expo-router";
import { PRODUCTS } from "@/utils/data/products";
import { formatCurrency } from "@/utils/functions/formatCurrency";
import { Button } from "@/components/Button/Button";
import { Feather } from "@expo/vector-icons";
import { LinkButton } from "@/components/LinkButton/LinkButton";
import { useCartStore } from "@/store/cartStore";

export default function Product() {
  const cartStore = useCartStore();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

  const product = PRODUCTS.find((product) => product.id === id);

  function handleAddToCart() {
    if (!product) return;
    cartStore.addProduct(product);

    navigation.goBack();
  }

  if (!product) {
    return <Redirect href="/" />;
  }

  return (
    <View className="flex-1">
      <Image
        source={product.cover}
        className="w-full h-52"
        resizeMode="cover"
      />

      <View className="p-5 mt-8 flex-1">
        <Text className="text-neutral-100 text-2xl font-heading my-2">
          {product.title}
        </Text>
        <Text className="text-lime-400 text-2xl font-heading">
          {formatCurrency(product.price)}
        </Text>
        <Text className="text-neutral-400 text-body leading-6 mb-6">
          {product.description}
        </Text>

        {product.ingredients.map((ingredient, index) => (
          <Text
            key={`${ingredient}-${index}`}
            className="text-neutral-100 font-subtitle text-base"
          >
            {"\u2022"} {ingredient}
          </Text>
        ))}
      </View>

      <View className="p-5 pb-8 gap-5">
        <Button onPress={handleAddToCart}>
          <Button.Icon>
            <Feather name="plus-circle" size={20} />
          </Button.Icon>
          <Button.Text>Adicionar ao pedido</Button.Text>
        </Button>

        <LinkButton href="/" title="Voltar ao cardápio" />
      </View>
    </View>
  );
}
