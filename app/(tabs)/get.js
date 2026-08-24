import { React, useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios"; // lib pra callouts http

const API_KEY =
  "cv_zj9zQ1zMsi6PvyG-l73gbZvZupEU0ZlJgchcJcWTVEwOPpCDbaf6QwgBSNCV3kB3"; // Api do codeverse

const api = axios.create({
  baseURL: "https://api-ds.codeverse.dev.br",
  headers: {
    "x-api-key": API_KEY,
  },
});

export default function HeroisListarScreen() {
  const [herois, setHerois] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  async function buscarHerois() {
    setCarregando(true);
    setErro(null);
    try {
      const resposta = await api.get("/api/herois", {
        params: { limit: 50 },
      });
      setHerois(resposta.data.data);
    } catch (error) {
      setErro("Não foi possível carregar dados.");
    } finally {
      setCarregando(false);
    }
  }
  useEffect(() => {
    buscarHerois();
  }, []);
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.conteudo}>
                <View style={styles.header}>
                    <Text style={styles.tituloPagina}>Listar heróis</Text>
                    <Text style={styles.subtitulo}>GET /api/herois</Text>
                </View>

                {carregando && <ActivityIndicator style={{ marginVertical: 16 }} />}

                {erro && <Text style={styles.erro}>{erro}</Text>}

                {!carregando &&
                    herois.map((heroi) => (
                        <View key={heroi.id} style={styles.card}>
                            <Image source={{ uri: heroi.imageUrl }} style={styles.imagem} />
                            <View style={styles.info}>
                                <Text style={styles.titulo}>{heroi.title}</Text>
                                <Text style={styles.categoria}>
                                    {heroi.category} · {heroi.year}
                                </Text>
                            </View>
                        </View>
                    ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#f8fbff" }, // ocupa a tela toda, cor de fundo clara
    conteudo: { padding: 24, paddingBottom: 48 }, // respiro nas bordas do conteúdo
    header: { marginBottom: 16 }, // espaço abaixo do cabeçalho
    tituloPagina: { fontSize: 24, fontWeight: "800", color: "#102542" }, // título grande e escuro
    subtitulo: { fontSize: 14, color: "#5f6b7a", marginTop: 2 }, // texto menor e mais claro, abaixo do título

    erro: { color: "#c62828", marginTop: 12 }, // texto de erro em vermelho
    card: {
        flexDirection: "row", // imagem e texto lado a lado
        gap: 12, // espaço entre imagem e texto
        marginTop: 12, // espaço entre um card e outro
        backgroundColor: "white",
        borderRadius: 10, // cantos arredondados
        overflow: "hidden", // corta a imagem nos cantos arredondados do card
    },
    imagem: { width: 64, height: 64 }, // tamanho fixo da foto do herói
    info: { flex: 1, justifyContent: "center", paddingRight: 12 }, // ocupa o espaço que sobra ao lado da imagem
    titulo: { fontSize: 16, fontWeight: "700" }, // nome do herói em destaque
    categoria: { fontSize: 13, color: "#64748b" }, // categoria/ano em cinza, menor
});