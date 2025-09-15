import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, Category } from "../Types";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Products">;

interface AppHeaderProps {
  onSearch: (text: string) => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ onSearch }) => {
  const navigation = useNavigation<NavigationProp>();
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios
      .get("http://192.168.1.63:5030/api/Category")
      .then(res => setCategories(res.data.$values))
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    onSearch(text);
  };

  const handleCategoryPress = () => {
    navigation.navigate("Category");
  };

  return (
    <View style={styles.header}>
      <TextInput
        placeholder="Search products..."
        value={searchText}
        onChangeText={handleSearchChange}
        style={styles.searchBar}
      />

      <TouchableOpacity style={styles.categoryButton} onPress={handleCategoryPress}>
        <Text style={styles.categoryText}>Categories</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#ff6600",
    alignItems: "center",
  },
  searchBar: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    marginRight: 10,
  },
  categoryButton: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
  },
  categoryText: {
    color: "#ff6600",
    fontWeight: "bold",
  },
});

export default AppHeader;
