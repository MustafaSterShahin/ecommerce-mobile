import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Dimensions } from "react-native";
import axios from "axios";
import AppHeader from "../components/AppHeader";
import { Product, RootStackParamList } from "../Types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 30) / 2;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const { state, dispatch } = useCart();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://192.168.1.63:5030/api/products")
      .then((res) => {
        const products: Product[] = res.data?.$values || res.data || [];
        setAllProducts(products);
        setFilteredProducts(products);
        setFeaturedProducts(products.slice(0, 5));
      })
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (text: string) => {
    const filtered = allProducts.filter((p) =>
      p.productName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const renderProductCard = ({ item }: { item: Product }) => (
    <ProductCard
      item={item}
      cart={state.items}
      dispatch={dispatch}
      navigation={navigation}
    />
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading products...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={filteredProducts}
      keyExtractor={(item) => item.productId.toString()}
      renderItem={renderProductCard}
      numColumns={2}
      contentContainerStyle={{ padding: 10 }}
      ListHeaderComponent={
        <>
          <AppHeader onSearch={handleSearch} />
          <Text style={styles.sectionTitle}>All Products</Text>
        </>
      }
    />
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
});

export default HomeScreen;
