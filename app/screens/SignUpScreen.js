// screens/SignUpScreen.js
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView, Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput, TouchableOpacity,
  View
} from 'react-native';
import { COLORS } from '../constants/theme';
import { users } from '../data/mockData';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSignUp = () => {
    if (!name || !address || !email || !phone || !cpf || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    const userExists = users.find(user => user.email.toLowerCase() === email.toLowerCase());
    if (userExists) {
      Alert.alert('Erro', 'Este e-mail já está em uso.');
      return;
    }
    const newUser = { id: users.length + 1, name, address, email, phone, cpf, password, };
    users.push(newUser);
    Alert.alert('Sucesso!', 'Sua conta foi criada. Agora você pode fazer o login.', [{ text: 'OK', onPress: () => navigation.goBack() }]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContentContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Crie sua Conta</Text>
            
            <TextInput style={styles.input} placeholder="Nome completo" value={name} onChangeText={setName} placeholderTextColor={COLORS.gray}/>
            <TextInput style={styles.input} placeholder="Endereço (Rua, Nº, Bairro)" value={address} onChangeText={setAddress} placeholderTextColor={COLORS.gray}/>
            <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholderTextColor={COLORS.gray}/>
            <TextInput style={styles.input} placeholder="Número de contato (com DDD)" value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholderTextColor={COLORS.gray}/>
            <TextInput style={styles.input} placeholder="CPF (apenas números)" value={cpf} onChangeText={setCpf} keyboardType="numeric" maxLength={11} placeholderTextColor={COLORS.gray}/>
            <View style={styles.passwordContainer}>
              <TextInput style={styles.inputField} placeholder="Crie uma senha" value={password} onChangeText={setPassword} secureTextEntry={!isPasswordVisible} placeholderTextColor={COLORS.gray} />
              <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                <Feather name={isPasswordVisible ? 'eye' : 'eye-off'} size={24} color={COLORS.gray} style={styles.eyeIcon} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.linkText}>Já tenho uma conta. Fazer Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.secondary },
  keyboardAvoidingContainer: { flex: 1 },
  scrollContentContainer: { flexGrow: 1, justifyContent: 'center' },
  innerContainer: { width: '100%', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.white, marginBottom: 40, textAlign: 'center' },
  input: { width: '100%', height: 50, backgroundColor: COLORS.white, borderRadius: 8, paddingHorizontal: 15, fontSize: 16, marginBottom: 15, borderWidth: 1, borderColor: '#ddd', color: COLORS.secondary, },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', width: '100%', backgroundColor: COLORS.white, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', marginBottom: 15, },
  inputField: { flex: 1, height: 50, paddingHorizontal: 15, fontSize: 16, color: COLORS.secondary, },
  eyeIcon: { padding: 10 },
  button: { width: '100%', height: 50, backgroundColor: COLORS.accent, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  buttonText: { color: COLORS.secondary, fontSize: 18, fontWeight: 'bold' },
  linkText: { marginTop: 20, color: COLORS.lightAccent, fontSize: 16, fontWeight: '600' },
});