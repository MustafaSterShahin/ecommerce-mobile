import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import AuthWrapper from "./auth/AuthWrapper";
const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer>
          <AuthWrapper />
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
