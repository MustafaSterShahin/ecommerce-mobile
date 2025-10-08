import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import axios from "axios";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, Product } from "../Types";
import { useCart } from "../context/CartContext";

type Props = NativeStackScreenProps<RootStackParamList, "ProductDetail">;

const ProductDetailScreen: React.FC<Props> = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const { state, dispatch } = useCart();

  const API_URL = `http://192.168.1.63:5030/api/products/${productId}`;

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        const p = res.data;
        const product: Product = {
          productId: p.productId,
          productName: p.productName,
          details: p.details,
          unitPrice: p.unitPrice,
          imageUrl: p.imageUrl,
          unitsInStock: p.unitsInStock || 0,
          categoryId: p.categoryId || 0,
          imageUrls: p.imageUrls?.$values || [],
        };
        setProduct(product);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /><Text>Loading product...</Text></View>;
  if (!product) return <View style={styles.center}><Text>Product not found.</Text></View>;

  const cartItem = state.items.find(i => i.id === product.productId);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    dispatch({ type: "ADD_ITEM", payload: { id: product.productId, name: product.productName, price: product.unitPrice, quantity: 1, imageUrl: product.imageUrl } });
  };

  const handleRemoveFromCart = () => {
    if (!cartItem) return;
    if (cartItem.quantity === 1) dispatch({ type: "REMOVE_ITEM", payload: cartItem.id });
    else dispatch({ type: "ADD_ITEM", payload: { ...cartItem, quantity: -1 } });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} resizeMode="cover" />
      <Text style={styles.title}>{product.productName}</Text>
      <View style={styles.cartWrapper}>
        {quantity === 0 ? (
          <TouchableOpacity style={styles.addButtonFull} onPress={handleAddToCart}>
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.quantityControlsFull}>
            <TouchableOpacity style={styles.controlButton} onPress={handleRemoveFromCart}>
              <Text style={styles.controlText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity style={styles.controlButton} onPress={handleAddToCart}>
              <Text style={styles.controlText}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Text style={styles.price}>{product.unitPrice} ₺</Text>
      <TouchableOpacity onPress={() => setShowDetails(prev => !prev)}>
        <Text style={styles.detailsToggle}>{showDetails ? "Hide Details ▲" : "Show Details ▼"}</Text>
      </TouchableOpacity>
      {showDetails && <Text style={styles.desc}>{product.details}</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { padding: 20, paddingBottom: 50 },
  image: { width: "100%", height: 250, borderRadius: 8, marginBottom: 15 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  desc: { fontSize: 16, marginTop: 10, lineHeight: 22 },
  price: { fontSize: 18, color: "green", fontWeight: "600", marginTop: 15 },
  cartWrapper: { marginVertical: 15, alignItems: "center" },
  addButtonFull: { width: "100%", backgroundColor: "#ff6600", paddingVertical: 12, borderRadius: 8, alignItems: "center" },
  addButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  quantityControlsFull: { flexDirection: "row", justifyContent: "space-between", width: "100%", backgroundColor: "#ffe6cc", borderRadius: 8, paddingVertical: 10, paddingHorizontal: 15, alignItems: "center" },
  controlButton: { backgroundColor: "#ff6600", borderRadius: 16, width: 36, height: 36, justifyContent: "center", alignItems: "center" },
  controlText: { color: "#fff", fontWeight: "bold", fontSize: 20 },
  quantity: { fontSize: 18, fontWeight: "bold" },
  detailsToggle: { fontSize: 16, color: "#007BFF", fontWeight: "600", marginTop: 10 },
});

export default ProductDetailScreen;
