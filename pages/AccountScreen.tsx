import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Account">;

const AccountScreen: React.FC = () => {
  const { token, logout } = useAuth();
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      {token ? (
        <>
          <Text style={styles.text}>Welcome to your Account!</Text>
          <TouchableOpacity style={styles.button} onPress={logout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.text}>You need to login to access your account.</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { marginTop: 10 }]} onPress={() => navigation.navigate("Register")}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  text: { fontSize: 20, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  button: { backgroundColor: "#ff6600", padding: 12, borderRadius: 8, width: 200, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

export default AccountScreen;
