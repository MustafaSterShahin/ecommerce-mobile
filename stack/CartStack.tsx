import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from "../pages/CartScreen";

export type CartStackParamList = {
  Cart: undefined;
};

const Stack = createNativeStackNavigator<CartStackParamList>();

export default function CartStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: "#ff6600",
      }}
    >
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
}
