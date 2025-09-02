// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddVehicleScreen from './screens/AddVehicleScreen';
import AppointmentDetailScreen from './screens/AppointmentDetailScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import EditVehicleScreen from './screens/EditVehicleScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import MyAppointmentsScreen from './screens/MyAppointmentsScreen';
import MyVehiclesScreen from './screens/MyVehiclesScreen';
import NewAppointmentScreen from './screens/NewAppointmentScreen';
import SelectDateTimeScreen from './screens/SelectDateTimeScreen';
import SelectServicesScreen from './screens/SelectServicesScreen';
import SignUpScreen from './screens/SignUpScreen';
import StoreScreen from './screens/StoreScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Cadastro' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Página Inicial' }} />
        <Stack.Screen name="NewAppointment" component={NewAppointmentScreen} options={{ title: 'Fazer Agendamento' }} />
        <Stack.Screen name="AddVehicle" component={AddVehicleScreen} options={{ title: 'Adicionar Veículo' }} />
        <Stack.Screen name="MyVehicles" component={MyVehiclesScreen} options={{ title: 'Meus Veículos' }} />
        <Stack.Screen name="EditVehicle" component={EditVehicleScreen} options={{ title: 'Editar Veículo' }} />
        <Stack.Screen name="MyAppointments" component={MyAppointmentsScreen} options={{ title: 'Meus Agendamentos' }} />
        <Stack.Screen name="AppointmentDetail" component={AppointmentDetailScreen} options={{ title: 'Detalhes do Agendamento' }} />
        <Stack.Screen name="SelectServices" component={SelectServicesScreen} options={{ title: 'Passo 2: Serviços' }} />
        <Stack.Screen name="SelectDateTime" component={SelectDateTimeScreen} options={{ title: 'Passo 3: Data e Hora' }} />
        <Stack.Screen name="Confirmation" component={ConfirmationScreen} options={{ title: 'Passo 4: Confirmação' }} />
        <Stack.Screen name="Store" component={StoreScreen} options={{ title: 'Loja' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}