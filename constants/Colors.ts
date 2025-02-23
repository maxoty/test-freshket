/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#1D192B";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    background: "#FEF7FF",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    primary: "#65558F",
    text: "#1D1B20",
    textPrimary: "#21005D",
    textPrimarySoft: "#4F378B",
    textSecondary: "#625B71",
    error: "#B3261E",
  },
  dark: {
    background: "#65558F",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    primary: "#65558F",
    text: "#FFFFFF",
    textPrimary: "#21005D",
    textPrimarySoft: "#4F378B",
    textSecondary: "#625B71",
    error: "#B3261E",
  },
};
