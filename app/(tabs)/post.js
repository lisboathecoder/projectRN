import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

const API_KEY = 'cv_TQBPOM6hYvO_NCzpyh8A0Cr_l6wQFo71wH3lHewIHs6bo_OaDXjaLNAGqtld51HK';
const api = axios.create({
    baseURL: 'https://api-ds.codeverse.dev.br',
    headers: {
        'x-api-key': API_KEY,
    },
});

export default function AnimesCriarScreen() {
    const [titulo, setTitulo] = useState('');
    const [imagemUrl, setImagemUrl] = useState('');
    const [estudio, setEstudio] = useState('');
    const [genero, setGenero] = useState('');
    const [ano_lancamento, setAno_lancamento] = useState('');
    const [numero_de_episodios, setNumero_de_episodios] = useState('');
    const [enviando, setEnviando] = useState(false);

    async function criarAnime() {
        if (!titulo) {
            Alert.alert('Preencha pelo menos o título.');
            return;
        }

        setEnviando(true);
        try {
            const resposta = await api.post('/api/animes', {
                title: titulo,
                imageUrl: imagemUrl,
                estudio,
                genero: genero,
                ano_lancamento: ano_lancamento,
                numero_de_episodios: 0,
            });

            Alert.alert('Anime criado!', resposta.data.title);
            setTitulo('');
            setImagemUrl('');
            setEstudio('');
            setGenero('');
            setAno_lancamento('');
            setNumero_de_episodios('');
        } catch (e) {
            Alert.alert(
                'Não deu pra criar o anime',
                'A API respondeu com erro. Confere se todos os campos estão certinhos e tenta de novo.',
            );
        } finally {
            setEnviando(false);
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.conteudo}>
                <View style={styles.header}>
                    <Text style={styles.tituloPagina}>Criar anime</Text>
                    <Text style={styles.subtitulo}>POST /api/animes</Text>
                </View>

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

                <Text style={styles.secao}>Campos específicos do tema animes</Text>

                <Text style={styles.rotulo}>Estudio</Text>
                <TextInput
                    style={styles.campo}
                    value={estudio}
                    onChangeText={setEstudio}
                    placeholder="Ex: Toei Animation"
                />

                <Text style={styles.rotulo}>Gênero</Text>
                <TextInput
                    style={styles.campo}
                    value={genero}
                    onChangeText={setGenero}
                    placeholder="Ex: Shounen"
                />
                <Text style={styles.rotulo}>Ano de lançamento</Text>
                <TextInput
                    style={styles.campo}
                    value={ano_lancamento}
                    onChangeText={setAno_lancamento}
                    placeholder="Ex: 2026"
                />
                <Text style={styles.rotulo}>Número de episódios</Text>
                <TextInput
                    style={styles.campo}
                    value={numero_de_episodios}
                    onChangeText={setNumero_de_episodios}
                    placeholder="Ex: 24"
                />

                <Pressable style={styles.botao} onPress={criarAnime} disabled={enviando}>
                    <Text style={styles.botaoTexto}>
                        {enviando ? 'Enviando...' : 'Criar anime'}
                    </Text>
                </Pressable>
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
        marginBottom: 10,
    },
    tituloPagina: {
        fontSize: 24,
        fontWeight: '800',
        color: '#fafafa',
    },
    subtitulo: {
        fontSize: 14,
        color: '#da1a1a',
        marginTop: 2,
    },
    secao: {
        fontSize: 14,
        fontWeight: '700',
        color: '#da1a1a',
        marginTop: 8,
        marginBottom: 8,
    },

    rotulo: {
        fontSize: 13,
        fontWeight: '600',
        color: '#fafafa',
        marginBottom: 4,
    },
    campo: {
        borderWidth: 1,
        borderColor: '#e1cbcb',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 12,
        backgroundColor: 'white',
    },
    botao: {
        backgroundColor: '#c01515',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
    botaoTexto: { color: 'white', fontWeight: '700' },
});
