import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SearchStackParamList } from "../stack/SearchStack";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

type NavProp = NativeStackNavigationProp<SearchStackParamList, "Search">;

const SearchScreen = () => {
  const navigation = useNavigation<NavProp>();
  const { state, dispatch } = useCart();
  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://192.168.1.63:5030/api/Products")
      .then((res) => {
        setAllProducts(res.data.$values || res.data || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (text: string) => {
    setQuery(text);
    const filtered = allProducts.filter((p) =>
      p.productName.toLowerCase().includes(text.toLowerCase())
    );
    setResults(filtered);
  };

  const formatImageUrl = (url: string) =>
    url.startsWith("http")
      ? url.replace("localhost", "192.168.1.63")
      : `http://192.168.1.63:5030/${url}`;

  const renderProductCard = ({ item }: { item: any }) => (
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
        <Text>Loading products...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={styles.input}
        placeholder="Ürün ara..."
        value={query}
        onChangeText={handleSearch}
      />

      <FlatList
        data={results}
        keyExtractor={(item) => item.productId.toString()}
        contentContainerStyle={{ padding: 10 }}
        numColumns={2}
        renderItem={renderProductCard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    margin: 10,
  },
});

export default SearchScreen;
