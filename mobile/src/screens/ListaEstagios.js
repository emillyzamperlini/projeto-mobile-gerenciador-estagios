
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function ListaEstagios({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Meus Estágios</Text>

            <Text>Nenhum estágio cadastrado.</Text>

            <Pressable
                style={styles.botao}
                onPress={() => navigation.navigate('FormularioEstagio')}
            >
                <Text style={styles.textoBotao}>Cadastrar estágio</Text>
            </Pressable>
        </View>
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
        marginBottom: 20,
    },
    botao: {
        backgroundColor: '#6846A5',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    textoBotao: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
