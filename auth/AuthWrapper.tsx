import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import LoginScreen from "../auth/LoginScreen";
import RegisterScreen from "../auth/RegisterScreen";
import ProductsScreen from "../pages/ProductsScreen";
import ProductDetailScreen from "../pages/ProductDetail";
import MainTabs from "../pages/MainTabs";
import { RootStackParamList } from "../Types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthWrapper: React.FC = () => {
  const { token } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={token ? "MainTabs" : "Login"}
    >
      {!token && <Stack.Screen name="Login" component={LoginScreen} />}
      {!token && <Stack.Screen name="Register" component={RegisterScreen} />}
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
};

export default AuthWrapper;
