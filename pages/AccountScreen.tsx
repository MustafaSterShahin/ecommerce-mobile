import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import { RootStackParamList, Address, Order } from "../Types";

const AccountScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { token, logout } = useAuth();
  const [username, setUsername] = useState("Mustafa");
  const [email, setEmail] = useState("mustafa@example.com");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (token) {
      setAddresses([
        { id: 1, title: "Ev", details: "İstanbul, Türkiye" },
        { id: 2, title: "İş", details: "Ankara, Türkiye" },
      ]);
      setOrders([
        {
          id: 101,
          date: "2025-10-01",
          total: 120,
          items: [
            { name: "Kola", quantity: 2, price: 20 },
            { name: "Cips", quantity: 1, price: 80 },
          ],
        },
      ]);
    }
  }, [token]);

  if (!token) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>You need to login to access your account.</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { marginTop: 10 }]} onPress={() => navigation.navigate("Register")}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.email}>{email}</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Adreslerim</Text>
        {addresses.map(addr => (
          <View key={addr.id} style={styles.card}>
            <Text style={styles.cardTitle}>{addr.title}</Text>
            <Text>{addr.details}</Text>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Önceki Siparişlerim</Text>
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Sipariş #{item.id}</Text>
              <Text>Tarih: {item.date}</Text>
              <Text>Toplam: {item.total} ₺</Text>
            </View>
          )}
        />
      </View>
      <TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={async () => { await logout(); navigation.navigate("Login"); }}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  text: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  username: { fontSize: 22, fontWeight: "bold", marginBottom: 4 },
  email: { fontSize: 16, color: "gray", marginBottom: 15 },
  section: { marginTop: 15 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  card: { backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 10, elevation: 2 },
  cardTitle: { fontWeight: "bold", marginBottom: 4 },
  button: { backgroundColor: "#ff6600", padding: 12, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

export default AccountScreen;
