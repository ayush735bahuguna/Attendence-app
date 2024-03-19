import React from 'react';
import { View, Text, SafeAreaView, Keyboard, Alert } from 'react-native';
import COLORS from '../../../Components/colors';
import Button from '../../../Components/Button';
import Input from '../../../Components/input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../Components/loader';
import axios from 'axios';
import { useGlobalContext } from '../../../Context/Context';

const LoginScreen = ({ navigation }) => {
    const [inputs, setInputs] = React.useState({ email: '', password: '' });
    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const { setacessToken } = useGlobalContext();


    const authhandler = async () => {
        if (!inputs.email) {
            handleError('Please input email', 'email');
            return
        }
        if (!inputs.password) {
            handleError('Please input password', 'password');
            return
        }
        setLoading(true);
        const { data } = await axios.post(`https://attendance-app-besv.onrender.com/auth/login/`, { "email": inputs.email, "password": inputs.password })
        // console.log(data?.token?.access);
        setacessToken(data?.token?.access);
        await AsyncStorage.setItem('userData', JSON.stringify(data?.token));
        await AsyncStorage.setItem('acessToken', data?.token?.access)
        setLoading(false);
        navigation.navigate('HomeScreen');
    }


    const handleOnchange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };

    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };
    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <Loader visible={loading} />
            <View style={{ paddingTop: 50, paddingHorizontal: 20 }}>
                <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: 'bold' }}>
                    Log In
                </Text>
                <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
                    Enter Your Details to Login
                </Text>
                <View style={{ marginVertical: 20 }}>
                    <Input
                        onChangeText={text => handleOnchange(text, 'email')}
                        onFocus={() => handleError(null, 'email')}
                        iconName="email-outline"
                        label="Email"
                        placeholder="Enter your email address"
                        error={errors.email}
                    />
                    <Input
                        onChangeText={text => handleOnchange(text, 'password')}
                        onFocus={() => handleError(null, 'password')}
                        iconName="lock-outline"
                        label="Password"
                        placeholder="Enter your password"
                        error={errors.password}
                        password
                    />
                    <Button title="Log In" onPress={authhandler} />
                    <Text
                        onPress={() => navigation.navigate('RegistrationScreen')}
                        style={{
                            color: COLORS.black,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize: 16,
                        }}>
                        Don't have account ?Register
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;