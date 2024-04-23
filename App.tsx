import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import Constants from "expo-constants";

export default function App() {
  const [restaurantes, setRestaurantes] = useState([]);

  const makeAPICall = async () => {
    try {
      const response = await fetch("http://192.168.0.83:8080/restaurantes", {
        mode: "cors", // Remove this if CORS is configured correctly on your server
      });
      const data = await response.json();
      console.log({ data });
      setRestaurantes(data); // Update state with fetched data
    } catch (e) {
      console.error("Error fetching restaurantes:", e);
    }
  };

  useEffect(() => {
    makeAPICall();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Lista de Restaurantes</Text>
      <FlatList
        data={restaurantes} // Use the fetched restaurants data
        renderItem={({ item }) => (
          <View style={styles.restaurante}>
            <Text style={styles.restauranteTexto}>Nome: {item.nome}</Text>
            <Text style={styles.restauranteTexto}>Status: {item.status}</Text>
          </View>
        )}
        keyExtractor={(item) => item.nome} // Use a unique identifier for each item
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  restaurante: {
    backgroundColor: "white",
    margin: 20,
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },
  restauranteTexto: {
    color: "black",
    fontSize: 16,
  },
});
