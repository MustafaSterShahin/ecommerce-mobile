import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../pages/HomeScreen";
import CategoryScreen from "../pages/CategoryScreen";
import ProductsScreen from "../pages/ProductsScreen";
import ProductDetailScreen from "../pages/ProductDetail";

export type HomeStackParamList = {
  Home: undefined;
  Category: undefined;
  Products: { categoryId?: number };
  ProductDetail: { productId: number };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: "#ff6600",
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}
