import { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    Alert,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

const API_KEY = 'cv_TQBPOM6hYvO_NCzpyh8A0Cr_l6wQFo71wH3lHewIHs6bo_OaDXjaLNAGqtld51HK';

const api = axios.create({
    baseURL: 'https://api-ds.codeverse.dev.br',
    headers: {
        'x-api-key': API_KEY,
    },
});

export default function AnimesEditarScreen() {
    const [animes, setanimes] = useState([]);
    const [selecionado, setSelecionado] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(null);
    const [salvando, setSalvando] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [imagemUrl, setImagemUrl] = useState('');
    const [estudio, setEstudio] = useState('');
    const [genero, setGenero] = useState('');
    const [ano, setAno] = useState('');
    const [baseado_em_manga, setBaseado_em_manga] = useState('');

    async function buscarAnimes() {
        setCarregando(true);
        setErro(null);
        try {
            const resposta = await api.get('/api/animes', {
                params: { limit: 50 },
            });
            setanimes(resposta.data.data);
        } catch (e) {
            setErro('Não foi possível carregar os animes. Tenta de novo em instantes.');
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        buscarAnimes();
    }, []);

    function selecionarAnime(anime) {
        setSelecionado(anime);
        setTitulo(anime.title ?? '');
        setImagemUrl(anime.imageUrl ?? '');
        setEstudio(anime.estudio ?? '');
        setGenero(anime.genero ?? '');
        setAno(anime.ano ?? '');
        setBaseado_em_manga(anime.baseado_em_manga ?? '');
    }

    async function salvarEdicao() {
        if (!selecionado) return;
        if (!titulo) {
            Alert.alert('Preencha pelo menos o título.');
            return;
        }

        setSalvando(true);
        try {
            const resposta = await api.put(`/api/animes/${selecionado.id}`, {
                title: titulo,
                imageUrl: imagemUrl,
                estudio: estudio,
                genero: genero,
                ano: ano,
                baseado_em_manga: baseado_em_manga,
            });

            Alert.alert('Anime atualizado!', resposta.data.data.title);

            setSelecionado(null);
            buscarAnimes();
        } catch (e) {
            Alert.alert(
                'Não deu pra atualizar o anime',
                'A API respondeu com erro. Confere se todos os campos estão certinhos e tenta de novo.',
            );
        } finally {
            setSalvando(false);
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.conteudo}>
                <View style={styles.header}>
                    <Text style={styles.tituloPagina}>Editar anime</Text>
                    <Text style={styles.subtitulo}>PUT /api/animes/:id</Text>
                </View>

                {!selecionado && (
                    <>
                        <Text style={styles.instrucao}>Toque em um anime pra editar:</Text>

                        {carregando && <ActivityIndicator style={{ marginVertical: 16 }} />}
                        {erro && <Text style={styles.erro}>{erro}</Text>}

                        {!carregando &&
                            animes.map((item) => (
                                <Pressable
                                    key={item.id}
                                    style={styles.linha}
                                    onPress={() => selecionarAnime(item)}>
                                    <Text style={styles.linhaTitulo}>{item.title}</Text>
                                    <Text style={styles.linhaSeta}>Editar</Text>
                                </Pressable>
                            ))}
                    </>
                )}

                {selecionado && (
                    <>
                        <Pressable onPress={() => setSelecionado(null)} style={styles.voltar}>
                            <Text style={styles.voltarTexto}>‹ voltar pra lista</Text>
                        </Pressable>

                        <Text style={styles.rotulo}>Título</Text>
                        <TextInput
                            style={styles.campo}
                            value={titulo}
                            onChangeText={setTitulo}
                            placeholder="Ex: Naruto"
                        />

                        <Text style={styles.rotulo}>URL da imagem</Text>
                        <TextInput
                            style={styles.campo}
                            value={imagemUrl}
                            onChangeText={setImagemUrl}
                            placeholder="Ex: https://exemplo.com/naruto.jpg"
                        />

                        <Text style={styles.rotulo}>Estúdio</Text>
                        <TextInput
                            style={styles.campo}
                            value={estudio}
                            onChangeText={setEstudio}
                            placeholder="Ex: Studio Ghibli"
                        />

                        <Text style={styles.rotulo}>Gênero</Text>
                        <TextInput
                            style={styles.campo}
                            value={genero}
                            onChangeText={setGenero}
                            placeholder="Ex: Ação"
                        />

                        <Text style={styles.rotulo}>Ano</Text>
                        <TextInput
                            style={styles.campo}
                            value={String(ano)}
                            onChangeText={setAno}
                            placeholder="Ex: 2026"
                            keyboardType="numeric"
                        />

                        <Text style={styles.rotulo}>Baseado em mangá</Text>
                        <TextInput
                            style={styles.campo}
                            value={String(baseado_em_manga)}
                            onChangeText={setBaseado_em_manga}
                            placeholder="Sim ou não"
                        />

                        <Pressable style={styles.botao} onPress={salvarEdicao} disabled={salvando}>
                            <Text style={styles.botaoTexto}>
                                {salvando ? 'Salvando...' : 'Salvar alterações'}
                            </Text>
                        </Pressable>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#070606' },
    conteudo: { padding: 24, paddingBottom: 48 },
    header: { marginBottom: 16 },
    tituloPagina: { fontSize: 24, fontWeight: '800', color: '#fafafa' },
    subtitulo: { fontSize: 14, color: '#913232', marginTop: 2 },

    instrucao: { fontSize: 14, color: '#fafafa', marginBottom: 8 },
    erro: { color: '#fafafa', marginTop: 12 },

    linha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 14,
        marginBottom: 8,
    },
    linhaTitulo: { fontSize: 15, fontWeight: '700', color: '#102542' },
    linhaSeta: {
        fontSize: 13,
        fontWeight: '700',
        color: '#fafafa',
        backgroundColor: '#c62828',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 8,
    },

    voltar: { marginBottom: 16 },
    voltarTexto: { color: '#c62828', fontWeight: '700' },

    rotulo: { fontSize: 13, fontWeight: '600', color: '#334155', marginBottom: 4 },

    campo: {
        borderWidth: 1,
        borderColor: '#cbd5e1',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 12,
        backgroundColor: 'white',
    },
    botao: {
        backgroundColor: '#c62828',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 4,
    },
    botaoTexto: {
        color: 'white',
        fontWeight: '700',
        fontSize: 13,
    },
});
