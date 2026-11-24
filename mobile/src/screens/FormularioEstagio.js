
import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, Alert } from 'react-native';

export default function FormularioEstagio({ navigation, route }) {
    const estagio = route.params?.estagio;

    const [empresa, setEmpresa] = useState('');
    const [cargo, setCargo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [status, setStatus] = useState('');

    function formatarData(data) {
        if (!data) {
            return '';
        }

        return data.split('-').reverse().join('/');
    }

    function converterData(data) {
        if (!data) {
            return null;
        }

        return data.split('/').reverse().join('-');
    }

    useEffect(() => {
        if (estagio) {
            setEmpresa(estagio.empresa || '');
            setCargo(estagio.cargo || '');
            setDescricao(estagio.descricao || '');
            setDataInicio(formatarData(estagio.dataInicio));
            setDataFim(formatarData(estagio.dataFim));
            setStatus(estagio.status || '');
        }
    }, [estagio]);

    async function salvarEstagio() {
        if (!empresa || !cargo || !dataInicio || !status) {
            Alert.alert('Atenção', 'Preencha todos os campos obrigatórios.');
            return;
        }

        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dataInicio)) {
            Alert.alert('Atenção', 'Digite a data de início no formato DD/MM/AAAA.');
            return;
        }

        if (dataFim && !/^\d{2}\/\d{2}\/\d{4}$/.test(dataFim)) {
            Alert.alert('Atenção', 'Digite a data de fim no formato DD/MM/AAAA.');
            return;
        }

        const dadosEstagio = {
            empresa: empresa,
            cargo: cargo,
            descricao: descricao,
            dataInicio: converterData(dataInicio),
            dataFim: converterData(dataFim.trim()),
            status: status
        };

        try {
            const resposta = await fetch(
                estagio
                    ? `http://172.16.33.3:8080/api/estagios/${estagio.id}`
                    : 'http://172.16.33.3:8080/api/estagios',
                {
                    method: estagio ? 'PUT' : 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dadosEstagio)
                }
            );

            if (!resposta.ok) {
                Alert.alert('Erro', 'Não foi possível salvar o estágio.');
                return;
            }

            Alert.alert(
                'Sucesso!',
                estagio ? 'Estágio atualizado com sucesso!' : 'Estágio cadastrado com sucesso!',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.goBack()
                    }
                ]
            );
        } catch (erro) {
            Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
            console.log(erro);
        }
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.titulo}>
                {estagio ? 'Editar Estágio' : 'Cadastrar Estágio'}
            </Text>

            <Text>Empresa *</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome da empresa"
                value={empresa}
                onChangeText={setEmpresa}
            />

            <Text>Cargo *</Text>
            <TextInput
                style={styles.input}
                placeholder="Cargo"
                value={cargo}
                onChangeText={setCargo}
            />

            <Text>Descrição</Text>
            <TextInput
                style={styles.input}
                placeholder="Descrição do estágio"
                value={descricao}
                onChangeText={setDescricao}
                multiline
            />

            <Text>Data de início * (DD/MM/AAAA)</Text>
            <TextInput
                style={styles.input}
                placeholder="DD/MM/AAAA"
                value={dataInicio}
                onChangeText={(valor) => {
                    const numeros = valor.replace(/\D/g, '').slice(0, 8);
                    let data = numeros;

                    if (numeros.length > 2) {
                        data = numeros.slice(0, 2) + '/' + numeros.slice(2);
                    }

                    if (numeros.length > 4) {
                        data = numeros.slice(0, 2) + '/' + numeros.slice(2, 4) + '/' + numeros.slice(4);
                    }

                    setDataInicio(data);
                }}
                keyboardType="numeric"
            />

            <Text>Data de fim (DD/MM/AAAA)</Text>
            <TextInput
                style={styles.input}
                placeholder="DD/MM/AAAA"
                value={dataFim}
                onChangeText={(valor) => {
                    const numeros = valor.replace(/\D/g, '').slice(0, 8);
                    let data = numeros;

                    if (numeros.length > 2) {
                        data = numeros.slice(0, 2) + '/' + numeros.slice(2);
                    }

                    if (numeros.length > 4) {
                        data = numeros.slice(0, 2) + '/' + numeros.slice(2, 4) + '/' + numeros.slice(4);
                    }

                    setDataFim(data);
                }}
                keyboardType="numeric"
            />

            <Text>Status *</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: Em andamento, Concluído"
                value={status}
                onChangeText={setStatus}
            />

            <Pressable style={styles.botao} onPress={salvarEstagio}>
                <Text style={styles.textoBotao}>
                    {estagio ? 'Salvar alterações' : 'Cadastrar estágio'}
                </Text>
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F3FA',
        padding: 20
    },
    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#50358A',
        marginBottom: 20
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        padding: 12,
        marginTop: 5,
        marginBottom: 15
    },
    botao: {
        backgroundColor: '#50358A',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 25
    },
    textoBotao: {
        color: '#FFFFFF',
        fontWeight: 'bold'
    }
});
