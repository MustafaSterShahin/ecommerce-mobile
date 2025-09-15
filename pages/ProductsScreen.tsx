import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, Product } from "../Types";
import AppHeader from "../components/AppHeader";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard"; // ProductCard import edildi

type Props = NativeStackScreenProps<RootStackParamList, "Products">;

const ProductsScreen: React.FC<Props> = ({ route, navigation }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { state, dispatch } = useCart();

  const categoryId = route.params?.categoryId;
  const API_URL = categoryId
    ? `http://192.168.1.63:5030/api/Category/${categoryId}`
    : "http://192.168.1.63:5030/api/Products";

  useEffect(() => {
    setLoading(true);
    axios
      .get(API_URL)
      .then((res) => {
        const allProducts: Product[] = categoryId
          ? res.data.products?.$values || []
          : res.data?.$values || res.data || [];
        setProducts(allProducts);
        setFilteredProducts(allProducts);
      })
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, [categoryId]);

  const handleSearch = (text: string) => {
    const filtered = products.filter((p) =>
      p.productName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const formatImageUrl = (url: string) =>
    url.startsWith("http")
      ? url.replace("localhost", "192.168.1.63")
      : `http://192.168.1.63:5030/${url}`;

  const renderProductCard = ({ item }: { item: Product }) => (
    <ProductCard
      item={{ ...item, imageUrl: formatImageUrl(item.imageUrl) }}
      cart={state.items}
      dispatch={dispatch}
      navigation={navigation}
    />
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <AppHeader onSearch={handleSearch} />
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.productId.toString()}
        contentContainerStyle={{ padding: 10 }}
        numColumns={2}
        renderItem={renderProductCard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default ProductsScreen;
