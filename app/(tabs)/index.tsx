import React, { useCallback, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductsAction,
  getProductsMoreAction,
  getRecommendedProductsAction,
} from "@/reduxs/product/product.action";
import { AppDispatch, RootState } from "@/reduxs";
import { Configs } from "@/configs";
import { ItemProductCard } from "@/components/item/ItemProductCard";
import { ThemedSafeAreaView } from "@/components/ui/ThemedSafeArea";
import { FlatListHeader } from "@/components/ui/FlatListHeader";
import { IProduct } from "@/types/product";
import { FlatListLoading } from "@/components/ui/FlatListLoading";
import { ThemedError } from "@/components/ui/ThemedError";
import SkeletonLoading from "expo-skeleton-loading/index";
import { ItemProductCardSkeleton } from "@/components/item/ItemProductCard.skeleton";
import { addToCart, updateQuantity } from "@/reduxs/cart/cart.slice";

const initialPayload = {
  cursor: Configs.cursor,
  limit: Configs.limit,
};

const ProductsScreen = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { recommendedItems, items, loading, page, hasMore, error } =
    useSelector((state: RootState) => state.product);

  const { cart } = useSelector((state: RootState) => state.cart);

  const fetchData = useCallback(() => {
    dispatch(getRecommendedProductsAction())
      .unwrap()
      .then(() => {
        dispatch(getProductsAction(initialPayload));
      });
  }, [dispatch]);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const loadMore = () => {
    if (!loading && hasMore) {
      dispatch(
        getProductsMoreAction({
          ...initialPayload,
          cursor: page + 1,
        })
      );
    }
  };

  const renderItem = ({ item }: { item: IProduct }) => {
    const getProductQuantity = (productId: number) => {
      const productInCart = cart.find((item) => item.product.id === productId);
      return productInCart ? productInCart.quantity : 0;
    };

    const handleAddToCart = (product: IProduct) => {
      dispatch(addToCart({ quantity: 1, product }));
    };

    const handleUpdateQuantity = (productId: number, quantity: number) => {
      dispatch(updateQuantity({ productId, quantity }));
    };

    const quantity = getProductQuantity(item.id);

    return (
      <View style={styles.item}>
        <ItemProductCard
          product={item}
          isEnabledAddToCart={quantity === 0}
          onClickAddToCart={() => handleAddToCart(item)}
          isEnabledQuantity={quantity > 0}
          quantity={quantity}
          onChangeQuantity={(value) => handleUpdateQuantity(item.id, value)}
        />
      </View>
    );
  };

  const ProductListSkeleton = ({ length = 4 }: { length?: number }) => (
    <FlatList
      data={Array.from({ length })}
      renderItem={() => (
        <View style={styles.item}>
          <ItemProductCardSkeleton />
        </View>
      )}
      keyExtractor={(item, index) => `${index}`}
      ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
    />
  );

  return (
    <ThemedSafeAreaView style={styles.container}>
      <FlatList
        data={loading ? [] : items}
        renderItem={renderItem}
        keyExtractor={(item, index) => {
          return `${index}-${item.id}-${item.name}`;
        }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={
          <View style={styles.list}>
            <FlatList
              data={loading ? [] : recommendedItems.slice(0, 4)}
              renderItem={renderItem}
              keyExtractor={(item, index) => {
                return `${index}-${item.id}-${item.name}`;
              }}
              ListHeaderComponent={<FlatListHeader title="Recommend Product" />}
              ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
              ListEmptyComponent={
                loading ? (
                  <ProductListSkeleton length={4} />
                ) : error?.recommended ? (
                  <ThemedError title={error.recommended} onClick={refresh} />
                ) : (
                  <View />
                )
              }
            />
            <FlatListHeader title="Latest Products" />
          </View>
        }
        ListFooterComponent={<FlatListLoading loading={loading} />}
        ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
        ListEmptyComponent={
          loading ? (
            <ProductListSkeleton length={6} />
          ) : error?.recommended ? (
            <ThemedError title={error.recommended} onClick={refresh} />
          ) : (
            <View />
          )
        }
      />
    </ThemedSafeAreaView>
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
});

export default ProductsScreen;
