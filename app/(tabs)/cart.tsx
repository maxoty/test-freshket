import React, { useCallback, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductsAction,
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

const initialPayload = {
  cursor: Configs.cursor,
  limit: Configs.limit,
};

const CartScreen = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { recommendedItems, items, loading, page, hasMore, error } =
    useSelector((state: RootState) => state.product);

  const fetchData = useCallback(() => {
    dispatch(getRecommendedProductsAction());
    dispatch(getProductsAction(initialPayload));
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
        getProductsAction({
          ...initialPayload,
          cursor: page + 1,
        })
      );
    }
  };

  const renderItem = ({ item }: { item: IProduct }) => {
    return (
      <View style={styles.item}>
        <ItemProductCard
          product={item}
          isEnabledAddToCart
          isEnabledQuantity={item.id === 0}
        />
      </View>
    );
  };

  return (
    <ThemedSafeAreaView style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => {
          return `${index}-${item.id}-${item.name}`;
        }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={
          <View style={styles.list}>
            <FlatList
              data={error?.recommended ? [] : recommendedItems.slice(0, 4)}
              renderItem={renderItem}
              keyExtractor={(item, index) => {
                return `${index}-${item.id}-${item.name}`;
              }}
              ListHeaderComponent={<FlatListHeader title="Recommend Product" />}
              ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
              ListEmptyComponent={
                error?.recommended ? (
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

export default CartScreen;
