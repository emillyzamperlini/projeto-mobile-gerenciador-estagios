
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListaEstagios from '../screens/ListaEstagios';
import FormularioEstagio from '../screens/FormularioEstagio';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName="ListaEstagios">
            <Stack.Screen
                name="ListaEstagios"
                component={ListaEstagios}
                options={{ title: 'Meus Estágios' }}
            />

            <Stack.Screen
                name="FormularioEstagio"
                component={FormularioEstagio}
                options={{ title: 'Cadastrar Estágio' }}
            />
        </Stack.Navigator>
    );
}
