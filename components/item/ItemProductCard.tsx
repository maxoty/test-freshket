import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { IProduct } from "@/types/product";
import { Configs } from "@/configs";
import { ThemedButton } from "../ui/ThemedButton";
import { InputQuantity } from "../ui/InputQuantity";
import { currencyFormat } from "@/utils";

type Props = {
  product: IProduct;
  isEnabledQuantity: boolean;
  quantity: number;
  onChangeQuantity: (value: number) => void;
  isEnabledAddToCart?: boolean;
  onClickAddToCart?: () => void;
};

export function ItemProductCard({
  product,
  isEnabledQuantity,
  quantity,
  onChangeQuantity,
  isEnabledAddToCart,
  onClickAddToCart,
}: Props) {
  const theme = useColorScheme() ?? "light";

  const renderActions = () => {
    switch (true) {
      case isEnabledQuantity:
        return (
          <InputQuantity quantity={quantity} onChange={onChangeQuantity} />
        );
      case isEnabledAddToCart:
        return (
          <ThemedButton
            onPress={onClickAddToCart}
            style={styles.addToCartButton}
          >
            Add to cart
          </ThemedButton>
        );
      default:
        return null;
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.detail}>
        <Image
          source={
            product?.media
              ? { uri: product?.media }
              : Configs.defaultImage.product
          }
          style={styles.image}
        />

        <View style={styles.content}>
          <ThemedText type="defaultMedium" variant="primary" numberOfLines={1}>
            {product.name}
          </ThemedText>
          <View style={styles.priceContainer}>
            <ThemedText type="title" variant="primarySoft">
              {currencyFormat(product.price)}
            </ThemedText>
            <ThemedText type="smallMedium" variant="secondary">
              {" "}
              / {product?.unit ?? "unit"}
            </ThemedText>
          </View>
        </View>
      </View>

      {renderActions()}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  image: {
    width: 76,
    height: 76,
    borderRadius: 16,
  },
  content: {
    gap: 8,
    paddingVertical: 8,
    paddingRight: 6,
    flex: 1,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  addToCartButton: {
    width: 120,
  },
});
