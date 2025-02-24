import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/reduxs";
import { Configs } from "@/configs";
import { ItemProductCard } from "@/components/item/ItemProductCard";
import { ThemedSafeAreaView } from "@/components/ui/ThemedSafeArea";
import { ThemedText } from "@/components/ui/ThemedText";
import { Header } from "@/components/ui/Header";
import { ICartItem } from "@/types";
import { removeFromCart, updateQuantity } from "@/reduxs/cart/cart.slice";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { ThemedButton } from "@/components/ui/ThemedButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { currencyFormat } from "@/utils";
import { checkoutAction } from "@/reduxs/cart/cart.action";
import { ICheckoutRequest } from "@/services/cart/cart.type";

const calculateTotal = (cart: ICartItem[]) => {
  let subtotal = 0;
  let totalDiscount = 0;
  let total = 0;

  cart.forEach(({ product, quantity }) => {
    const pairs = Math.floor(quantity / 2);
    const remaining = quantity % 2;

    const pairPrice = product.price * 2;
    const discount = pairPrice * Configs.discountRate;
    const totalForPairs = pairs * (pairPrice - discount);
    const totalForRemaining = remaining * product.price;

    const productSubtotal = quantity * product.price;
    const productDiscount = pairs * discount;
    const productTotal = totalForPairs + totalForRemaining;

    subtotal += productSubtotal;
    totalDiscount += productDiscount;
    total += productTotal;
  });

  return { subtotal, totalDiscount, total };
};

const CartScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const insets = useSafeAreaInsets();
  const [isSubmitting, setSubmitting] = useState(false);
  const [isCheckoutSuccess, setCheckoutSuccess] = useState(false);
  const [isCheckoutError, setCheckoutError] = useState<string | undefined>();
  const { cart } = useSelector((state: RootState) => state.cart);

  const renderItem = ({ item }: { item: ICartItem }) => {
    const handleUpdateQuantity = (productId: number, quantity: number) => {
      dispatch(updateQuantity({ productId, quantity }));
      if (quantity === 0) {
        dispatch(removeFromCart(productId));
      }
    };

    const handleRemoveFromCart = (productId: number) => {
      dispatch(removeFromCart(productId));
    };

    const renderRightActions = (productId: number) => (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleRemoveFromCart(productId)}
      >
        <IconSymbol name="trash" size={24} color={Colors.dark.text} />
      </TouchableOpacity>
    );

    return (
      <Swipeable renderRightActions={() => renderRightActions(item.product.id)}>
        <View style={styles.item}>
          <ItemProductCard
            product={item.product}
            isEnabledQuantity={item.quantity > 0}
            quantity={item.quantity}
            onChangeQuantity={(value) =>
              handleUpdateQuantity(item.product.id, value)
            }
          />
        </View>
      </Swipeable>
    );
  };

  const navigateToHome = () => {
    setCheckoutSuccess(false);
    router.navigate("/(tabs)");
  };

  const handleCheckout = () => {
    setSubmitting(true);
    const payload: ICheckoutRequest = {
      products: cart.map((item) => item.product.id),
    };

    dispatch(checkoutAction(payload))
      .unwrap()
      .then(() => {
        setCheckoutSuccess(true);
      })
      .catch((error) => {
        setTimeout(() => {
          setCheckoutError(error);
        }, 400);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const { subtotal, totalDiscount, total } = calculateTotal(cart);

  return (
    <GestureHandlerRootView>
      <ThemedSafeAreaView style={styles.container}>
        <Header title="Cart" onPressBack={navigateToHome} />

        {isCheckoutSuccess ? (
          <View style={styles.successContainer}>
            <ThemedText type="title">Success!</ThemedText>
            <ThemedText type="defaultMedium">
              Thank you for shopping with us!
            </ThemedText>
            <ThemedButton onPress={navigateToHome}>Shop again</ThemedButton>
          </View>
        ) : (
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={(item, index) => {
              return `${index}`;
            }}
            contentContainerStyle={{ flexGrow: 1 }}
            ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <ThemedText type="title">Empty Cart</ThemedText>
                <ThemedButton onPress={navigateToHome}>
                  Go to shopping
                </ThemedButton>
              </View>
            }
          />
        )}
      </ThemedSafeAreaView>

      {cart.length > 0 && (
        <>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryContent}>
              <View style={styles.summary}>
                <ThemedText type="defaultMedium" variant="primary">
                  Subtotal
                </ThemedText>
                <ThemedText type="defaultMedium" variant="primary">
                  {currencyFormat(subtotal)}
                </ThemedText>
              </View>
              <View style={styles.summary}>
                <ThemedText type="defaultMedium" variant="primary">
                  Promotion discount
                </ThemedText>
                <ThemedText type="defaultMedium" variant="error">
                  -{currencyFormat(totalDiscount)}
                </ThemedText>
              </View>
              <View style={[styles.summary, styles.summaryTotal]}>
                <ThemedText type="headline" variant="primary">
                  {currencyFormat(total)}
                </ThemedText>
                <ThemedButton
                  size="large"
                  style={styles.checkoutButton}
                  onPress={handleCheckout}
                  disabled={isSubmitting}
                >
                  Checkout
                </ThemedButton>
              </View>
            </View>

            {!isSubmitting && !!isCheckoutError && (
              <View style={[styles.error, { bottom: insets.bottom }]}>
                <ThemedText type="default" style={styles.errorText}>
                  {isCheckoutError}
                </ThemedText>

                <TouchableOpacity
                  style={styles.errorButton}
                  onPress={() => setCheckoutError(undefined)}
                >
                  <IconSymbol name="xmark" size={20} color={Colors.dark.text} />
                </TouchableOpacity>
              </View>
            )}

            <View style={{ height: insets.bottom }} />
          </View>
        </>
      )}

      <Modal transparent={true} animationType="fade" visible={isSubmitting}>
        <View style={styles.modalBackdrop}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    gap: 24,
  },
  item: {
    paddingHorizontal: 16,
  },
  deleteButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B3261E",
    width: 120,
  },
  summaryContainer: {
    backgroundColor: "#E8DEF8",
  },
  summaryContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 4,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  summaryTotal: {
    paddingVertical: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  successContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  checkoutButton: {
    width: 177,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  error: {
    position: "absolute",
    height: 48,
    width: "100%",
    backgroundColor: Colors.light.error,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
  },
  errorText: {
    flex: 1,
    color: Colors.dark.text,
  },
  errorButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CartScreen;
