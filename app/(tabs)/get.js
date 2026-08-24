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

export default function AnimesListarScreen() {
  const [animes, setAnimes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  async function buscarAnimes() {
    setCarregando(true);
    setErro(null);
    try {
      const resposta = await api.get("/api/animes", {
        params: { limit: 50 },
      });
      setAnimes(resposta.data.data);
    } catch (error) {
      setErro("Não foi possível carregar dados.");
    } finally {
      setCarregando(false);
    }
  }
  useEffect(() => {
    buscarAnimes();
  }, []);
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.conteudo}>
                <View style={styles.header}>
                    <Text style={styles.tituloPagina}>Listar animes</Text>
                    <Text style={styles.subtitulo}>GET /api/animes</Text>
                </View>

                {carregando && <ActivityIndicator style={{ marginVertical: 16 }} />}

                {erro && <Text style={styles.erro}>{erro}</Text>}

                {!carregando &&
                    animes.map((anime) => (
                        <View key={anime.id} style={styles.card}>
                            <Image source={{ uri: anime.imageUrl }} style={styles.imagem} />
                            <View style={styles.info}>
                                <Text style={styles.titulo}>{anime.title}</Text>
                                <Text style={styles.infos}>
                                    {anime.estudio} · {anime.genero}
                                </Text>
                            </View>
                        </View>
                    ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#f8fbff" },
    conteudo: { padding: 24, paddingBottom: 48 },
    header: { marginBottom: 16 },
    tituloPagina: { fontSize: 24, fontWeight: "800", color: "#421010" },
    subtitulo: { fontSize: 14, color: "#5f6b7a", marginTop: 2 },

    erro: { color: "#c62828", marginTop: 12 },
    card: {
        flexDirection: "row",
        gap: 12,
        marginTop: 12,
        backgroundColor: "white",
        borderRadius: 10,
        overflow: "hidden",
    },
    imagem: { width: 64, height: 64 },
    info: { flex: 1, justifyContent: "center", paddingRight: 12 },
    titulo: { fontSize: 16, fontWeight: "700" },
    infos: { fontSize: 13, color: "#64748b" },
});