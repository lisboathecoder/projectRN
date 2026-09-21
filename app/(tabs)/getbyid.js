import { useState } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    Pressable,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

const API_KEY = 'cv_wMNeS1xWfSLeiV4uXHcIdQiTqFxSPYR8t5oVvXt6kloBkaMGr7z-OVZRbGNCC_CH';
const api = axios.create({
    baseURL: 'https://api-ds.codeverse.dev.br',
    headers: {
        'x-api-key': API_KEY,
    },
});

export default function AnimesByIdScreen() {
    const [id, setId] = useState('');
    const [anime, setAnime] = useState(null);
    const [buscando, setBuscando] = useState(false);
    const [erro, setErro] = useState(null);
    const [naoEncontrado, setNaoEncontrado] = useState(false);

    async function buscarPorId() {
        if (!id) {
            setErro('Digite um id pra buscar.');
            return;
        }

        Keyboard.dismiss(); // fecha o teclado quando clicar no botão de buscar
        setBuscando(true);
        setErro(null);
        setNaoEncontrado(false);
        setAnime(null);

        try {
            const resposta = await api.get(`/api/animes/${id}`);
            setAnime(resposta.data);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                // se der erro, vai mostrar que não encontrou
                setNaoEncontrado(true);
            } else {
                setErro('Não foi possível buscar o anime. Tenta de novo em instantes.');
            }
        } finally {
            setBuscando(false);
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.conteudo}>
                <View style={styles.header}>
                    <Text style={styles.tituloPagina}>Buscar anime</Text>
                    <Text style={styles.subtitulo}>GET /api/animes/:id</Text>
                </View>

                <Text style={styles.rotulo}>Id do anime</Text>
                <View style={styles.linhaBusca}>
                    <TextInput
                        style={styles.campo}
                        value={id}
                        onChangeText={setId}
                        placeholder="Ex: 1"
                        keyboardType="numeric"
                    />
                    <Pressable style={styles.botao} onPress={buscarPorId} disabled={buscando}>
                        <Text style={styles.botaoTexto}>{buscando ? '...' : 'Buscar'}</Text>
                    </Pressable>
                </View>

                {buscando && <ActivityIndicator style={{ marginVertical: 16 }} />}
                {erro && <Text style={styles.erro}>{erro}</Text>}

                {naoEncontrado && (
                    <Text style={styles.avisoNaoEncontrado}>
                        Nenhum anime encontrado com o id "{id}".
                    </Text>
                )}

                {anime && (
                    <View style={styles.card}>
                        <Image source={{ uri: anime.imageUrl }} style={styles.imagem} />
                        <View style={styles.info}>
                            <Text style={styles.titulo}>{anime.title}</Text>
                            <Text style={styles.infos}>
                                {anime.estudio} · {anime.ano_lancamento} · {anime.genero}
                            </Text>
                            <Text style={styles.infos}>
                                Número de episódios: {anime.numero_episodios}
                            </Text>
                        </View>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#000000',
    },
    conteudo: {
        padding: 24,
        paddingBottom: 48,
    },
    header: {
        marginBottom: 16,
    },
    tituloPagina: {
        fontSize: 24,
        fontWeight: '800',
        color: '#ffffff',
    },
    subtitulo: {
        fontSize: 14,
        color: '#da1a1a',
        marginTop: 2,
    },

    rotulo: {
        fontSize: 13,
        fontWeight: '600',
        color: '#da1a1a',
        marginBottom: 4,
    },
    linhaBusca: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'flex-start',
    },
    campo: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#cbd5e1',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: 'white',
    },
    botao: {
        backgroundColor: '#a50101',
        paddingHorizontal: 18,
        paddingVertical: 11,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    botaoTexto: {
        color: 'white',
        fontWeight: '700',
    },

    erro: {
        color: '#c62828',
        marginTop: 12,
    },
    avisoNaoEncontrado: {
        color: '#9a6700',
        marginTop: 16,
        fontStyle: 'italic',
    },

    card: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 16,
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
    },
    imagem: {
        width: 128,
        height: 128,
    },
    info: {
        flex: 1,
        justifyContent: 'center',
        paddingRight: 12,
        gap: 2,
    },
    titulo: {
        fontSize: 17,
        fontWeight: '700',
    },
    infos: {
        fontSize: 13,
        color: '#913232',
    },
});
