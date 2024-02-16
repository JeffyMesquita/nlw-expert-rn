import { Text, View, ScrollView, Alert, Linking } from "react-native";

import { ProductCartProps, useCartStore } from "@/store/cartStore";

import { Header } from "@/components/Header/Header";
import { Product } from "@/components/Product/Product";
import { formatCurrency } from "@/utils/functions/formatCurrency";
import { Input } from "@/components/Input/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "@/components/Button/Button";
import { Feather } from "@expo/vector-icons";
import { LinkButton } from "@/components/LinkButton/LinkButton";
import { useState } from "react";
import { useNavigation } from "expo-router";

export default function Cart() {
  const [address, setAddress] = useState("");
  const cartStore = useCartStore();
  const navigation = useNavigation();

  const PHONE_NUMBER = "5517991305254";

  const total = cartStore.products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  function handleProductRemove(product: ProductCartProps) {
    Alert.alert(
      "Remover produto",
      `Deseja remover ${product.title} do carrinho?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Remover",
          onPress: () => cartStore.removeProduct(product.id),
          style: "destructive",
        },
      ]
    );
  }

  function handleOrder() {
    if (address.trim().length === 0) {
      Alert.alert("Pedido", "Informe o endereço de entrega");
      return;
    }

    const products = cartStore.products
      .map((product) => `\n ${product.quantity}x ${product.title}`)
      .join("");

    const message = `
        🍔 NOVO PEDIDO 🚀
        \n Entregar em: ${address}

        ${products}

        \n Total: ${formatCurrency(total)}
      `;

    Linking.openURL(
      `http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`
    );

    cartStore.clearCart();
    setAddress("");
    navigation.goBack();
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Seu Carrinho" />

      <KeyboardAwareScrollView>
        <ScrollView className="">
          <View className="flex-1 p-5">
            {cartStore.products.length > 0 ? (
              <View className="border-b border-neutral-700">
                {cartStore.products.map((product) => (
                  <Product
                    key={product.id}
                    data={product}
                    onPress={() => handleProductRemove(product)}
                  />
                ))}
              </View>
            ) : (
              <Text className="text-neutral-400 text-2xl font-body text-center my-8">
                Seu carrinho está vazio
              </Text>
            )}
            <View className="flex-row gap-2 items-center mt-5 mb-4">
              <Text className="text-neutral-100 text-2xl font-subtitle">
                Total:
              </Text>
              <Text className="text-lime-400 text-2xl font-heading">
                {formatCurrency(total)}
              </Text>
            </View>
            <Input
              placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento"
              onChangeText={setAddress}
              blurOnSubmit
              onSubmitEditing={handleOrder}
              returnKeyType="next"
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className="p-5 gap-5">
        <Button onPress={handleOrder}>
          <Button.Text>Enviar Pedido</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button>

        <LinkButton href="/" title="Voltar ao cardápio" />
      </View>
    </View>
  );
}
