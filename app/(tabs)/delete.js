import { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    Pressable,
    StyleSheet,
    Alert,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

const API_KEY = 'cv_D8ljS9Qd0DZntaavU1Fvf0UoNyfYjiH8EAtykKdVWV9RsD2beBn1yD2eMWeiLrXu';

const api = axios.create({
    baseURL: 'https://api-ds.codeverse.dev.br',
    headers: {
        'x-api-key': API_KEY,
    },
});

const API_BASE_URL = 'https://api-ds.codeverse.dev.br';

function imagemCompleta(url) {
    if (!url) return null;
    return url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
}

export default function AnimesExcluirScreen() {
    const [animes, setAnimes] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const [excluindoId, setExcluindoId] = useState(null);

    async function buscarAnimes() {
        setCarregando(true);
        setErro(null);
        try {
            const resposta = await api.get('/api/animes', {
                params: { limit: 50 },
            });
            setAnimes(Array.isArray(resposta.data.data) ? resposta.data.data : []);
        } catch (error) {
            setErro('Não foi possível carregar os animes.');
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        buscarAnimes();
    }, []);

    async function excluirAnime(id) {
        setExcluindoId(id);
        try {
            await api.delete(`/api/animes/${id}`);
            setAnimes((atual) => atual.filter((item) => item.id !== id));
        } catch (error) {
            Alert.alert(
                'Não deu pra excluir o anime',
                'A API respondeu com erro. Tenta de novo em instantes.',
            );
        } finally {
            setExcluindoId(null);
        }
    }

    function confirmarExclusao(anime) {
        Alert.alert(
            'Excluir anime',
            `Tem certeza que quer excluir "${anime.title}"? Essa ação não pode ser desfeita.`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: () => excluirAnime(anime.id),
                },
            ],
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.conteudo}>
                <View style={styles.header}>
                    <Text style={styles.tituloPagina}>Excluir anime</Text>
                    <Text style={styles.subtitulo}>DELETE /api/animes/:id</Text>
                </View>

                {carregando && <ActivityIndicator style={{ marginVertical: 16 }} />}
                {erro && <Text style={styles.erro}>{erro}</Text>}

                {!carregando &&
                    animes.map((anime) => (
                        <View key={anime.id} style={styles.card}>
                            {imagemCompleta(anime.imageUrl) ? (
                                <Image
                                    source={{ uri: imagemCompleta(anime.imageUrl) }}
                                    style={styles.imagem}
                                />
                            ) : (
                                <View style={styles.imagemSemFoto} />
                            )}

                            <View style={styles.info}>
                                <Text style={styles.titulo}>{anime.title}</Text>
                                <Text style={styles.categoria}>
                                    {anime.status} · {anime.estudio}
                                </Text>
                                <Text style={styles.genero}>{anime.genero}</Text>
                            </View>

                            <Pressable
                                style={styles.botaoExcluir}
                                onPress={() => confirmarExclusao(anime)}
                                disabled={excluindoId === anime.id}>
                                <Text style={styles.botaoExcluirTexto}>
                                    {excluindoId === anime.id ? '...' : 'Excluir'}
                                </Text>
                            </Pressable>
                        </View>
                    ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#f8fbff' },
    conteudo: { padding: 24, paddingBottom: 48 },
    header: { marginBottom: 16 },
    tituloPagina: { fontSize: 24, fontWeight: '800', color: '#102542' },
    subtitulo: { fontSize: 14, color: '#5f6b7a', marginTop: 2 },

    erro: { color: '#c62828', marginTop: 12 },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginTop: 12,
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        paddingRight: 12,
    },
    imagem: { width: 64, height: 64 },
    imagemSemFoto: {
        width: 64,
        height: 64,
        backgroundColor: '#e2e8f0',
    },
    info: { flex: 1, justifyContent: 'center', paddingRight: 12 },
    titulo: { fontSize: 16, fontWeight: '700' },
    categoria: { fontSize: 13, color: '#64748b' },
    genero: { fontSize: 13, color: '#64748b', marginTop: 2 },

    botaoExcluir: {
        backgroundColor: '#c62828',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 8,
    },
    botaoExcluirTexto: { color: 'white', fontWeight: '700', fontSize: 13 },
});
