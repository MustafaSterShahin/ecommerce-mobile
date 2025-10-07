import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
} from "react-native";
import { Product, CartItem } from "../Types";

const ProductCard: React.FC<{
  item: Product;
  cart: CartItem[];
  dispatch: any;
  navigation: any;
  style?: object;
}> = ({ item, cart, dispatch, navigation, style }) => {
  const cartItem = cart.find((i) => i.id === item.productId);
  const quantity = cartItem ? cartItem.quantity : 0;
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: quantity > 0 ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [quantity]);

  const addToCart = () => {
    if (cartItem) {
      dispatch({ type: "ADD_ITEM", payload: { ...cartItem, quantity: 1 } });
    } else {
      dispatch({
        type: "ADD_ITEM",
        payload: {
          id: item.productId,
          name: item.productName,
          price: item.unitPrice,
          quantity: 1,
          imageUrl: item.imageUrl,
        },
      });
    }
  };

  const removeFromCart = () => {
    if (!cartItem) return;
    if (cartItem.quantity === 1) {
      dispatch({ type: "REMOVE_ITEM", payload: cartItem.id });
    } else {
      dispatch({ type: "ADD_ITEM", payload: { ...cartItem, quantity: -1 } });
    }
  };

  return (
    <View style={[styles.card, style]}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProductDetail", { productId: item.productId })
        }
      >
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <Text style={styles.title}>{item.productName}</Text>
        <Text style={styles.price}>{item.unitPrice} ₺</Text>
      </TouchableOpacity>

      <View style={styles.cartWrapper}>
        <TouchableOpacity style={styles.addButton} onPress={addToCart}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

        {quantity > 0 && (
          <Animated.View
            style={[
              styles.quantityContainer,
              {
                opacity: animValue,
                transform: [
                  {
                    translateY: animValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 5],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.quantityBackground}>
              <Text style={styles.quantity}>{quantity}</Text>
            </View>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={removeFromCart}
            >
              <Text style={styles.controlText}>-</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 5,
    padding: 10,
    elevation: 3,
    position: "relative",
    width: "48%",
  },
  image: { width: "100%", height: 150, borderRadius: 8, marginBottom: 5 },
  title: { fontSize: 16, fontWeight: "600" },
  price: { fontSize: 16, fontWeight: "bold", color: "green", marginTop: 2 },
  cartWrapper: {
    position: "absolute",
    top: 10,
    right: 10,
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#ff6600",
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  quantityContainer: {
    marginTop: 5,
    alignItems: "center",
  },
  quantityBackground: {
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 24,
    alignItems: "center",
  },
  quantity: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  controlButton: {
    backgroundColor: "#ff6600",
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  controlText: { color: "#fff", fontWeight: "bold", fontSize: 20 },
});

export default ProductCard;
