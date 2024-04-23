import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import Constants from "expo-constants";
import axios from "axios";

export default function App() {
  const api = axios.create({
    baseURL: "http://localhost:8080",
  });
  const [restaurantes, setRestaurantes] = useState([]);

  useEffect(() => {
    async function fetchRestaurantes() {
      try {
        const response = await api.get("/restaurantes/");
        console.log(response);
        const data = response.data;
        console.log(data);
        setRestaurantes(data);
      } catch (error) {
        console.error("Error fetching restaurantes:", error);
      }
    }

    fetchRestaurantes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Lista de Restaurantes</Text>
      <FlatList
        data={restaurantes}
        renderItem={({ item }) => (
          <View style={styles.restaurante}>
            <Text style={styles.restauranteTexto}>Nome: {item.nome}</Text>
            <Text style={styles.restauranteTexto}>Status: {item.status}</Text>
          </View>
        )}
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
