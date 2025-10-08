import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Types";
import axios from "axios";

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Register">;

const API_URL = "http://192.168.1.63:5030/api/auth/register";

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User"); // Default role
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(API_URL, { username, email, password, role });
      if (res.status === 201 || res.status === 200) {
        Alert.alert("Success", "Registered successfully!", [
          { text: "OK", onPress: () => navigation.replace("Login") }
        ]);
      } else {
        Alert.alert("Error", "Register failed. Try again.");
      }
    } catch (err: any) {
      Alert.alert("Error", err.response?.data?.message || "Register failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Register</Text>
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} autoCapitalize="none" />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      {loading ? <ActivityIndicator size="large" color="#ff6600" /> : <Button title="Register" onPress={handleRegister} />}
      <Button title="Back to Login" onPress={() => navigation.replace("Login")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 6 },
});

export default RegisterScreen;
