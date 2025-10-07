import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Dimensions, Image } from "react-native";
import axios from "axios";
import AppHeader from "../components/AppHeader";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import { Product, Category, RootStackParamList } from "../Types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCart } from "../context/CartContext";
import Carousel from "react-native-reanimated-carousel";

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

const { width } = Dimensions.get("window");
const PRODUCT_WIDTH = width * 0.48; 
const sliderImages = [
  "https://picsum.photos/800/300?1",
  "https://picsum.photos/800/300?2",
  "https://picsum.photos/800/300?3",
];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const { state, dispatch } = useCart();

  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get("http://192.168.1.63:5030/api/Category"),
      axios.get("http://192.168.1.63:5030/api/Products"),
    ])
      .then(([catRes, prodRes]) => {
        const cats: Category[] = catRes.data?.$values || catRes.data || [];
        const products: Product[] = prodRes.data?.$values || prodRes.data || [];
        setCategories(cats);
        setFeaturedProducts(products.slice(0, 5));
      })
      .catch((err) => console.error("Error fetching data:", err))
      .finally(() => setLoading(false));
  }, []);

  const renderCategory = ({ item }: { item: Category }) => (
    <CategoryCard item={item} navigation={navigation} />
  );

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard
      item={item}
      cart={state.items}
      dispatch={dispatch}
      navigation={navigation}
      style={{ width: PRODUCT_WIDTH, marginRight: 10 }}
    />
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <View style={{ marginVertical: 10 }}>
          <Carousel
            loop
            width={width}
            height={180}
            autoPlay
            data={sliderImages}
            scrollAnimationDuration={2000}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                style={{ width: width - 20, height: 180, borderRadius: 10, marginHorizontal: 10 }}
                resizeMode="cover"
              />
            )}
          />
        </View>
          <Text style={styles.sectionTitle}>Categories</Text>
        </>
      }
      data={categories}
      keyExtractor={(item) => item.categoryId.toString()}
      renderItem={renderCategory}
      numColumns={3}
      columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: 10, marginBottom: 10 }}
      ListFooterComponent={
        <>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <FlatList
            data={featuredProducts}
            horizontal
            keyExtractor={(item) => item.productId.toString()}
            renderItem={renderProduct}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />
        </>
      }
      contentContainerStyle={{ paddingVertical: 10 }}
    />
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginVertical: 10, marginLeft: 10 },
  carouselItem: { flex: 1, borderRadius: 12, backgroundColor: "#eee", justifyContent: "center", alignItems: "center" },
  carouselText: { fontSize: 18, fontWeight: "bold" },
});

export default HomeScreen;
