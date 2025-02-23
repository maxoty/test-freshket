import { ActivityIndicator, StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { Colors } from "@/constants/Colors";

export type FlatListLoadingProps = {
  loading: boolean;
};

export function FlatListLoading({ loading }: FlatListLoadingProps) {
  if (!loading) return;

  return (
    <View style={styles.container}>
      <ActivityIndicator size={26} color={Colors.light.primary} />
      <ThemedText type="smallMedium">Loading..</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 90,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
});
