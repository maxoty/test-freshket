import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedButton } from "./ThemedButton";
import { IconSymbol } from "./IconSymbol";
import { Colors } from "@/constants/Colors";

export type InputQuantityProps = {
  quantity: number;
  onChange: (quantity: number) => void;
};

export function InputQuantity({ quantity, onChange }: InputQuantityProps) {
  return (
    <View style={styles.container}>
      <ThemedButton type="icon" onPress={() => onChange(quantity - 1)}>
        <IconSymbol size={12} name="minus" color={Colors.dark.text} />
      </ThemedButton>
      <ThemedText type="defaultMedium" style={styles.quantity}>
        {quantity}
      </ThemedText>
      <ThemedButton type="icon" onPress={() => onChange(quantity + 1)}>
        <IconSymbol size={12} name="plus" color={Colors.dark.text} />
      </ThemedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    width: 120,
  },
  quantity: {
    width: 28,
    textAlign: "center",
  },
});
