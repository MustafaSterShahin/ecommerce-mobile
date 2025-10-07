import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "../pages/SearchScreen";
import ProductDetailScreen from "../pages/ProductDetail";

export type SearchStackParamList = {
  Search: undefined;
  ProductDetail: { productId: number };
};

const Stack = createNativeStackNavigator<SearchStackParamList>();

const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ 
        headerTitleAlign: "center",
        headerTintColor: "#ff6600", }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: "Product Detail" }}
      />
    </Stack.Navigator>
  );
};

export default SearchStack;
