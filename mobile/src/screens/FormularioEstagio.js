
import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, Alert } from 'react-native';

export default function FormularioEstagio({ navigation }) {
    const [empresa, setEmpresa] = useState('');
    const [cargo, setCargo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [status, setStatus] = useState('');


async function salvarEstagio() {
    if (!empresa || !cargo || !dataInicio || !status) {
        Alert.alert('Atenção', 'Preencha todos os campos obrigatórios.');
        return;
    }

    const estagio = {
        empresa: empresa,
        cargo: cargo,
        descricao: descricao,
        dataInicio: dataInicio,
        dataFim: dataFim.trim() === '' ? null : dataFim,
        status: status
    };

    try {
        const resposta = await fetch('http://192.168.2.106:8080/api/estagios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(estagio)
        });

        if (!resposta.ok) {
            const mensagem = await resposta.text();
            console.log('Erro do Backend:', resposta.status, mensagem);
            throw new Error(`Erro ${resposta.status}: ${mensagem}`);
        }

        Alert.alert('Sucesso!', 'Estágio cadastrado com sucesso!');

    } catch (erro) {
        console.log('Erro ao cadastrar:', erro);
        Alert.alert('Erro', erro.message);
    }
}


    return (
        <ScrollView style={styles.container}>
            <Text style={styles.titulo}>Cadastrar Estágio</Text>

            <Text style={styles.label}>Empresa *</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome da empresa"
                value={empresa}
                onChangeText={setEmpresa}
            />

            <Text style={styles.label}>Cargo *</Text>
            <TextInput
                style={styles.input}
                placeholder="Cargo do estágio"
                value={cargo}
                onChangeText={setCargo}
            />

            <Text style={styles.label}>Descrição</Text>
            <TextInput
                style={[styles.input, styles.descricao]}
                placeholder="Descrição das atividades"
                value={descricao}
                onChangeText={setDescricao}
                multiline
            />

            <Text style={styles.label}>Data de início *</Text>
            <TextInput
                style={styles.input}
                placeholder="AAAA-MM-DD"
                value={dataInicio}
                onChangeText={setDataInicio}
            />

            <Text style={styles.label}>Data de fim</Text>
            <TextInput
                style={styles.input}
                placeholder="AAAA-MM-DD"
                value={dataFim}
                onChangeText={setDataFim}
            />

            <Text style={styles.label}>Status *</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex.: Em andamento"
                value={status}
                onChangeText={setStatus}
            />

            <Pressable style={styles.botao} onPress={salvarEstagio}>
                <Text style={styles.textoBotao}>Salvar estágio</Text>
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F3FA',
        padding: 20,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#50358A',
        marginBottom: 25,
    },
    label: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#50358A',
        marginBottom: 7,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D8CFE8',
        borderRadius: 8,
        padding: 12,
        marginBottom: 18,
        fontSize: 15,
    },
    descricao: {
        height: 90,
        textAlignVertical: 'top',
    },
    botao: {
        backgroundColor: '#6846A5',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 30,
    },
    textoBotao: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
