import React, { createContext, useContext, useReducer, ReactNode, useEffect } from "react";
import { CartState, CartAction, CartItem } from "../Types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext, useAuth } from "./AuthContext";

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

const initialState: CartState = {
  items: [],
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      return { ...state, items: [...state.items, action.payload] };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "CLEAR_CART":
      return { items: [] };
    case "SET_CART":
      return { items: action.payload };
    default:
      return state;
  }
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { token } = useAuth();

  useEffect(() => {
    const loadCart = async () => {
      if (!token) return;
      const storedCart = await AsyncStorage.getItem(`cart_${token}`);
      if (storedCart) {
        dispatch({ type: "SET_CART", payload: JSON.parse(storedCart) });
      }
    };
    loadCart();
  }, [token]);

  useEffect(() => {
    const saveCart = async () => {
      if (!token) return;
      await AsyncStorage.setItem(`cart_${token}`, JSON.stringify(state.items));
    };
    saveCart();
  }, [state.items, token]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
