import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, Category } from "../Types";
import axios from "axios";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Category">;

const CategoryScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios
      .get("http://192.168.1.63:5030/api/Category")
      .then((res) => setCategories(res.data.$values))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.categoryId.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryItemButton}
            onPress={() =>
              navigation.navigate("Products", {
                categoryId: item.categoryId,
              })
            }
          >
            <Text style={styles.categoryItemText}>{item.categoryName}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  categoryItemButton: {
    padding: 12,
    backgroundColor: "#ff6600",
    borderRadius: 8,
    marginBottom: 10,
  },
  categoryItemText: { color: "#fff", fontWeight: "bold" },
});

export default CategoryScreen;
