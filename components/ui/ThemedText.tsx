import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "small"
    | "smallMedium"
    | "default"
    | "title"
    | "defaultMedium"
    | "subtitle"
    | "link"
    | "button"
    | "headline";
  variant?: "default" | "primary" | "primarySoft" | "secondary" | "error";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  variant = "default",
  ...rest
}: ThemedTextProps) {
  const colorName = (variant: string) => {
    switch (variant) {
      case "primary":
        return "textPrimary";
      case "primarySoft":
        return "textPrimarySoft";
      case "secondary":
        return "textSecondary";
      case "error":
        return "error";
      default:
        return "text";
    }
  };

  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorName(variant)
  );

  return (
    <Text
      style={[
        { color },
        type === "small" ? styles.small : undefined,
        type === "smallMedium" ? styles.smallMedium : undefined,
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultMedium" ? styles.defaultMedium : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        type === "button" ? styles.button : undefined,
        type === "headline" ? styles.headline : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  small: {
    fontFamily: "Roboto",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
    letterSpacing: 0.1,
  },
  smallMedium: {
    fontFamily: "RobotoMedium",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    letterSpacing: 0.1,
  },
  default: {
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
    letterSpacing: 0.15,
  },
  defaultMedium: {
    fontFamily: "RobotoMedium",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
    letterSpacing: 0.15,
  },
  title: {
    fontFamily: "Roboto",
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "400",
    letterSpacing: 0,
  },
  subtitle: {
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: "400",
  },
  link: {
    fontFamily: "Roboto",
    lineHeight: 30,
    fontSize: 16,
    fontWeight: "400",
  },
  button: {
    fontFamily: "RobotoMedium",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    letterSpacing: 0.1,
  },
  headline: {
    fontFamily: "Roboto",
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "400",
  },
});
