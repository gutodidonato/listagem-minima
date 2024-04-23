import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import Constants from "expo-constants";

export default function App() {
  const [restaurantes, setRestaurantes] = useState([]);

  useEffect(() => {
    const fetchRestaurantes = async () => {
      try {
        const response = await fetch("http://localhost:8080/restaurantes/");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRestaurantes(data);
      } catch (error) {
        console.error("Error fetching restaurantes:", error);
      }
    };

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
        keyExtractor={(item) => item.nome || Math.random().toString()} // Use a unique identifier
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
