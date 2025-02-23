import { StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { IconSymbol } from "./IconSymbol";
import { Colors } from "@/constants/Colors";
import { ThemedButton } from "./ThemedButton";

export type ThemedErrorProps = {
  title: string;
  onClick?: () => void;
};

export function ThemedError({ title, onClick }: ThemedErrorProps) {
  return (
    <ThemedView style={styles.container}>
      <IconSymbol name="x.circle" color={Colors.light.error} size={54} />
      <ThemedText type="title">{title}</ThemedText>
      {onClick && (
        <ThemedButton type="default" onPress={onClick}>
          Refresh
        </ThemedButton>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 24,
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
