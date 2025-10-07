import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useCart } from "../context/CartContext";
import { Ionicons } from "@expo/vector-icons";

const CartScreen: React.FC = () => {
  const { state, dispatch } = useCart();

  const handleClear = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (itemId: number, delta: number) => {
    const item = state.items.find(i => i.id === itemId);
    if (!item) return;

    const newQuantity = item.quantity + delta;

    if (newQuantity <= 0) {
      dispatch({ type: "REMOVE_ITEM", payload: itemId });
    } else {
      dispatch({ type: "ADD_ITEM", payload: { ...item, quantity: delta } });
    }
  };

  return (
    <View style={styles.container}>
      {state.items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={state.items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemCard}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.image}
                  resizeMode="cover"
                />
                <View style={styles.itemInfo}>
                  <Text style={styles.name}>{item.name}</Text>
                  {/* Ürünün toplam fiyatı */}
                  <Text style={styles.price}>{item.price * item.quantity} ₺</Text>
                  <View style={styles.qtyContainer}>
                    <TouchableOpacity onPress={() => handleQuantityChange(item.id, -1)}>
                      <Ionicons name="remove-circle-outline" size={28} color="#ff6600" />
                    </TouchableOpacity>
                    <Text style={styles.qty}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => handleQuantityChange(item.id, 1)}>
                      <Ionicons name="add-circle-outline" size={28} color="#ff6600" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ marginLeft: 15 }}
                      onPress={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}
                    >
                      <Ionicons name="trash-outline" size={28} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
          <View style={styles.summary}>
            <Text style={styles.total}>Total: {totalPrice} ₺</Text>
            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
              <Text style={styles.clearText}>Clear Cart</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#f9f9f9" },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 18, color: "gray" },
  itemCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },
  image: { width: 80, height: 80, borderRadius: 8, marginRight: 15 },
  itemInfo: { flex: 1 },
  name: { fontSize: 16, fontWeight: "600", marginBottom: 5 },
  price: { fontSize: 15, color: "green", fontWeight: "bold", marginBottom: 8 },
  qtyContainer: { flexDirection: "row", alignItems: "center" },
  qty: { fontSize: 16, fontWeight: "bold", marginHorizontal: 10 },
  summary: { paddingVertical: 15, borderTopWidth: 1, borderTopColor: "#ccc" },
  total: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  clearButton: {
    backgroundColor: "#ff6600",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  clearText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default CartScreen;
