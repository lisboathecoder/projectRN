import { View, Text, StyleSheet } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo a resenhaa!</Text>
      <Text style={styles.subtitle}>
        Resenhexx no clubex
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eff6ff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0d47a1",
  },
  subtitle: {
    fontSize: 14,
    color: "#475569",
    marginTop: 8,
  },
});