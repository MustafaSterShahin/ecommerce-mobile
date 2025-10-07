import React from "react";
import { View, StyleSheet, Text } from "react-native";

const AppHeader: React.FC = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>My Store</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 10,
    backgroundColor: "#ff6600",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default AppHeader;
