
import { useState, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList, TextInput, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function ListaEstagios({ navigation }) {
    const [estagios, setEstagios] = useState([]);
    const [busca, setBusca] = useState('');
    const [ordem, setOrdem] = useState('asc');

    const API = 'http://192.168.15.5:8080/api/estagios';

    useFocusEffect(
        useCallback(() => {
            carregarEstagios();
        }, [])
    );

    async function carregarEstagios() {
        try {
            const resposta = await fetch(API);

            if (!resposta.ok) {
                throw new Error('Não foi possível carregar os estágios.');
            }

            const dados = await resposta.json();
            setEstagios(dados);
        } catch (erro) {
            console.log('Erro ao carregar estágios:', erro);
            Alert.alert('Erro', 'Não foi possível carregar os estágios.');
        }
    }

    function formatarData(data) {
        if (!data) return '';
        return data.split('-').reverse().join('/');
    }

    function excluirEstagio(id) {
        Alert.alert(
            'Excluir estágio',
            'Deseja realmente excluir este estágio?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: () => {
                        setEstagios(lista => lista.filter(item => item.id !== id));
                        Alert.alert('Sucesso', 'Estágio removido da lista.');
                    }
                }
            ]
        );
    }

    const estagiosFiltrados = estagios.filter(item =>
        (item.empresa || '').toLowerCase().includes(busca.toLowerCase())
    );

    const estagiosOrdenados = [...estagiosFiltrados].sort((a, b) => {
        const dataA = new Date(a.dataInicio + 'T00:00:00');
        const dataB = new Date(b.dataInicio + 'T00:00:00');

        return ordem === 'asc' ? dataA - dataB : dataB - dataA;
    });

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Meus Estágios</Text>

            <TextInput
                style={styles.input}
                placeholder="Pesquisar por empresa..."
                value={busca}
                onChangeText={setBusca}
            />

            <Pressable
                style={styles.botaoOrdenar}
                onPress={() => setOrdem(ordem === 'asc' ? 'desc' : 'asc')}
            >
                <Text style={styles.textoBotao}>
                    {ordem === 'asc' ? 'Mais antigos primeiro' : 'Mais recentes primeiro'}
                </Text>
            </Pressable>

            <Pressable
                style={styles.botaoAdicionar}
                onPress={() => navigation.navigate('FormularioEstagio')}
            >
                <Text style={styles.textoBotao}>Cadastrar estágio</Text>
            </Pressable>

            <FlatList
                data={estagiosOrdenados}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.empresa}>{item.empresa}</Text>
                        <Text>Cargo: {item.cargo}</Text>
                        <Text>Status: {item.status}</Text>
                        <Text>Início: {formatarData(item.dataInicio)}</Text>
                        <Text>Fim: {formatarData(item.dataFim)}</Text>

                        <View style={styles.botoes}>
                            <Pressable
                                style={styles.botaoEditar}
                                onPress={() => navigation.navigate('FormularioEstagio', { estagio: item })}
                            >
                                <Text style={styles.textoBotao}>Editar</Text>
                            </Pressable>

                            <Pressable
                                style={styles.botaoExcluir}
                                onPress={() => excluirEstagio(item.id)}
                            >
                                <Text style={styles.textoBotao}>Excluir</Text>
                            </Pressable>
                        </View>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.vazio}>Nenhum estágio cadastrado.</Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F3FA',
        padding: 15
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#50358A',
        marginBottom: 15
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        padding: 12,
        marginBottom: 10
    },
    botaoOrdenar: {
        backgroundColor: '#6846A5',
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center'
    },
    botaoAdicionar: {
        backgroundColor: '#50358A',
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
        alignItems: 'center'
    },
    textoBotao: {
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    card: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 10,
        marginBottom: 12,
        gap: 5
    },
    empresa: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#50358A'
    },
    botoes: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 10
    },
    botaoEditar: {
        backgroundColor: '#6846A5',
        padding: 10,
        borderRadius: 6,
        flex: 1,
        alignItems: 'center'
    },
    botaoExcluir: {
        backgroundColor: '#C44545',
        padding: 10,
        borderRadius: 6,
        flex: 1,
        alignItems: 'center'
    },
    vazio: {
        textAlign: 'center',
        marginTop: 30,
        color: '#666'
    }
});
