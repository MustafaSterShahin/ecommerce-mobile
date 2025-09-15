import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Types";
import axios from "axios";

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Register">;

const API_URL = "http://192.168.1.63:5030/api/auth/register";

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      await axios.post(API_URL, { username, password });
      setError("");
      navigation.navigate("Login");
    } catch (err: any) {
      setError("Register failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Register</Text>
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {loading ? <ActivityIndicator size="large" color="#ff6600" /> : <Button title="Register" onPress={handleRegister} />}
      <Button title="Back to Login" onPress={() => navigation.navigate("Login")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 6 },
  error: { color: "red", marginBottom: 10 },
});

export default RegisterScreen;
