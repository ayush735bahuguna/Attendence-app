import { View, Text, ScrollView, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import DialogComponent from '../../Components/DialogComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({ navigation }) {
    const [userDetails, setUserDetails] = React.useState();
    const [visible, setVisible] = React.useState(false);


    React.useEffect(() => {
        getUserData();
    }, []);

    React.useEffect(() => {
        if (userDetails?.loggedIn === false) {
            navigation.navigate('LoginScreen')
        }
    }, [userDetails]);

    const getUserData = async () => {
        let userData = await AsyncStorage.getItem('userData');
        if (userData) {
            setUserDetails(JSON.parse(userData));
        }

    };

    const logout = () => {
        AsyncStorage.setItem('userData', JSON.stringify({ ...userDetails, loggedIn: false }));
        navigation.navigate('LoginScreen');
    };

    return (
        <SafeAreaView className='px-3 pt-3'>
            <ScrollView>
                <View className='flex justify-center items-center mt-4 gap-1'>
                    <Avatar.Text size={80} label="A" />
                    <View className='flex flex-row gap-3'>
                        <Text className='text-2xl'>{userDetails?.fullname}</Text>
                        <DialogComponent
                            visible={visible} setVisible={setVisible}
                            title='Are you sure?'
                            content='this will log out you from app.'
                            trigger={<MaterialIcons name="exit-to-app" size={30}
                                color="red" />}
                            handlertext='Log out'
                            onPressHandler={logout}
                        />
                    </View>
                </View>
                <View className='bg-slate-100 mt-5 p-2 rounded-lg'>
                    <Text className='text-base'>Features :</Text>
                    <Text className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde quas autem, quia dolor incidunt voluptate sit commodi, a obcaecati pariatur voluptates ipsum ipsam facilis, amet assumenda possimus reiciendis eos. Autem!</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}