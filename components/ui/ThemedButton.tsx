import { StyleSheet, TouchableOpacity } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "./ThemedText";
import { PropsWithChildren } from "react";
import { TouchableOpacityProps } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";

export type ThemedButtonProps = PropsWithChildren<TouchableOpacityProps> & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "icon";
  variant?: "primary" | "secondary";
};

export function ThemedButton({
  style,
  lightColor,
  darkColor,
  type = "default",
  variant = "primary",
  children,
  ...rest
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "primary"
  );

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        { backgroundColor },
        type === "default" ? styles.default : undefined,
        type === "icon" ? styles.icon : undefined,
        style,
      ]}
      {...rest}
    >
      <ThemedText
        type="button"
        style={[
          {
            color: variant === "primary" ? Colors.dark.text : Colors.light.text,
            textAlign: "center",
          },
        ]}
      >
        {children}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  default: {
    height: 40,
    borderRadius: 100,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
