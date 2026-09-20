import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function ModalScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>
            Crie, Busque, Exclue e Atualize!
          </Text>
          <Text style={styles.description}>
            Use as rotas de exemplo para interagir com a API de animes da Codeverse. 
            {"\n"}Você pode listar, buscar por ID, deletar e atualizar animes.
          </Text>
      </View>

      <View style={styles.crud}>
        <Link href="/get" asChild>
          <Pressable style={styles.button}>
              <Text style={styles.buttonText}>
                Listar todos os Animes
              </Text>
          </Pressable>
        </Link>
        <Link href="/getbyid" asChild>
          <Pressable style={styles.button}>
              <Text style={styles.buttonText}>
                Buscar um anime por id
              </Text>
          </Pressable>
        </Link>
        <Link href="/post" asChild>
          <Pressable style={styles.button}>
              <Text style={styles.buttonText}>
                Criar um novo Anime
              </Text>
          </Pressable>
        </Link>
        <Link href="/update" asChild>
          <Pressable style={styles.button}>
              <Text style={styles.buttonText}>
                Atualizar informações de um Anime
              </Text>
          </Pressable>
        </Link>
        <Link href="/delete" asChild>
          <Pressable style={styles.button}>
              <Text style={styles.buttonText}>
                Excluir um Anime
              </Text>
          </Pressable>
        </Link>
        <Link href="/" asChild>
          <Pressable style={styles.buttonHome}>
              <Text style={styles.buttonTextHome}>
                Voltar para a Home
              </Text>
          </Pressable>
        </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000000",
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fafafa",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#da1a1a",
  },
  button: {
    backgroundColor: "#b81c1c",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  crud: {
    flex: 1,
    padding: 24,
    gap: 12,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  buttonHome: {
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonTextHome: {
    color: "#b81c1c",
    fontWeight: "bold",
  },
});
