import { Image, StyleSheet, View } from "react-native";
import SkeletonLoading from "expo-skeleton-loading/index";
import { Configs } from "@/configs";

export function ItemProductCardSkeleton() {
  return (
    <View style={styles.container}>
      <View style={styles.detail}>
        <Image source={Configs.defaultImage.product} style={styles.image} />

        <View style={styles.skeletonContainer}>
          <SkeletonLoading background={"#E6E0E9"} highlight={"#ffffff"}>
            <View style={styles.content}>
              <View
                style={{
                  backgroundColor: "#E6E0E9",
                  width: "50%",
                  height: 18,
                  borderRadius: 12,
                }}
              />
              <View
                style={{
                  backgroundColor: "#E6E0E9",
                  width: "30%",
                  height: 22,
                  borderRadius: 12,
                }}
              />
            </View>
          </SkeletonLoading>
        </View>
      </View>
    </View>
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
  skeletonContainer: {
    flex: 1,
  },
  content: {
    gap: 20,
    paddingVertical: 8,
    paddingRight: 6,
  },
});
