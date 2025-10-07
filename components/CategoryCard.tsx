import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, Category } from "../Types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

interface CategoryCardProps {
  item: Category;
  navigation: NavigationProp;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ item, navigation }) => {
  const handlePress = () => {
    navigation.navigate("Products", { categoryId: item.categoryId });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image
        source={{ uri: "https://placehold.co/150x150/000000/FFFFFF/png" }}
        style={styles.image}
      />
      <Text style={styles.name}>{item.categoryName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    width: 100,
  },
  image: { width: 60, height: 60, marginBottom: 8, borderRadius: 30 },
  name: { fontSize: 14, fontWeight: "600", textAlign: "center" },
});

export default CategoryCard;
