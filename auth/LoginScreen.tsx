import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Types";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

type LoginScreenProps = {
  onLoginSuccess?: () => void; 
  onGoToRegister?: () => void;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

const API_URL = "http://192.168.1.63:5030/api/auth/login";

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, onGoToRegister }) => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post(API_URL, { username, password });
      await login(res.data.token); // AuthContext ve AsyncStorage
      setError("");
      if (onLoginSuccess) onLoginSuccess();
      else navigation.navigate("MainTabs");
    } catch (err: any) {
      setError("Login failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔑 Login</Text>
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {loading ? <ActivityIndicator size="large" color="#ff6600" /> : <Button title="Login" onPress={handleLogin} />}
      <Button title="Go to Register" onPress={onGoToRegister ? onGoToRegister : () => navigation.navigate("Register")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 6 },
  error: { color: "red", marginBottom: 10 },
});

export default LoginScreen;
