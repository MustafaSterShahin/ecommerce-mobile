import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import MainTabs from "./pages/MainTabs";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer>
          <MainTabs />
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
