import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import HomeStack from "../stack/HomeStack";
import CartStack from "../stack/CartStack";
import AccountStack from "../stack/AccountStack";
import { useCart } from "../context/CartContext";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const { state } = useCart();
  const cartCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          if (route.name === "Home") iconName = "home";
          else if (route.name === "Cart") iconName = "cart";
          else if (route.name === "Account") iconName = "person";

          if (route.name === "Cart") {
            return (
              <View>
                <Ionicons name={iconName} size={size} color={color} />
                {cartCount > 0 && (
                <View
                  style={{
                    position: "absolute",
                    right: -6,
                    top: -3,
                    backgroundColor: "red",
                    borderRadius: 10,
                    paddingHorizontal: 5,
                    paddingVertical: 1,
                    minWidth: 18,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>
                    {cartCount}
                  </Text>
                </View>
              )}
              </View>
            );
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#ff6600",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Cart" component={CartStack} />
      <Tab.Screen name="Account" component={AccountStack} />
    </Tab.Navigator>
  );
}
