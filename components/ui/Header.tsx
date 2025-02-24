import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { IconSymbol } from "./IconSymbol";
import { Colors } from "@/constants/Colors";

export type HeaderProps = {
  title: string;
  onPressBack?: () => void;
};

export function Header({ title, onPressBack }: HeaderProps) {
  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => onPressBack?.()}>
        <IconSymbol name="arrow.left" color={Colors.light.text} />
      </TouchableOpacity>
      <ThemedText type="title">{title}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
    paddingVertical: 6,
    height: 64,
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
});
