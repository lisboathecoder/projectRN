import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const resenhaLogo = require("../../assets/resenha-logo.png");

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.hero}>
          <Image
            source={resenhaLogo}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.eyebrow}>API de Animes</Text>
          <Text style={styles.title}>Anime Nexus</Text>
          <Text style={styles.description}>
            Um app de exemplo que consome a API de animes da Codeverse, com
            rotas, abas e modal de exemplo.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>O que temos no aplicativo?</Text>
          <Text style={styles.cardItem}>• Rotas com expo-router</Text>
          <Text style={styles.cardItem}>• Abas</Text>
          <Text style={styles.cardItem}>• Modal de exemplo</Text>
          <Text style={styles.cardItem}>• Componentes reutilizáveis</Text>
        </View>

        <Link href="/modal" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Abrir modal de exemplo</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#000000',
    },
    container: {
        flex: 1,
        padding: 10,
        gap: 10,
    },
    hero: {
        alignItems: 'center',
        gap: 10,
        padding: 24,
        borderRadius: 24,
        backgroundColor: '#b81c1c',
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 4,
    },
    eyebrow: {
        fontSize: 13,
        fontWeight: '700',
        letterSpacing: 1,
        textTransform: 'uppercase',
        color: '#d0e2ff',
        textAlign: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#ffffff',
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#edf5ff',
        textAlign: 'center',
    },
    card: {
        gap: 4,
        padding: 20,
        borderRadius: 20,
        backgroundColor: '#ffffff',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#102542',
    },
    cardItem: {
        fontSize: 15,
        color: '#334e68',
    },
    button: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 16,
        alignItems: 'center',
        backgroundColor: '#b81c1c',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#ffffff',
    },
});
