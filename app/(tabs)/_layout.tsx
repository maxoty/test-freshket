import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";

import { HapticTab } from "@/components/ui/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ui/ThemedText";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState } from "@/reduxs";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  const { cart } = useSelector((state: RootState) => state.cart);

  const quantity = cart.map((item) => item.quantity).reduce((a, b) => a + b, 0);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            height: 80 + insets.bottom,
            position: "absolute",
            paddingHorizontal: 20,
            paddingTop: 10,
            paddingBottom: 10,
            backgroundColor: "#F3EDF7",
          },
          default: {
            height: 80 + insets.bottom,
            paddingHorizontal: 20,
            paddingTop: 10,
            paddingBottom: 10,
            backgroundColor: "#F3EDF7",
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <View style={[focused ? styles.focused : undefined]}>
              <IconSymbol
                size={28}
                name={focused ? "star.circle.fill" : "star.circle"}
                color={color}
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <ThemedText
              type={focused ? "defaultMedium" : "default"}
              style={[styles.label, focused ? styles.labelFocused : undefined]}
            >
              Shopping
            </ThemedText>
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={28}
              name={focused ? "star.circle.fill" : "star.circle"}
              color={color}
            />
          ),
          tabBarStyle: {
            display: "none",
          },
          tabBarLabel: ({ focused }) => (
            <ThemedText
              style={[styles.label, focused ? styles.labelFocused : undefined]}
            >
              Cart {quantity > 0 ? `(${quantity})` : ""}
            </ThemedText>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  focused: {
    backgroundColor: "#e8def8",
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 100,
  },
  label: {
    marginTop: 5,
    fontSize: 12,
    color: "gray",
  },
  labelFocused: {
    color: "#000",
  },
});
