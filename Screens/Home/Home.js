import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';
import { Avatar, Surface } from 'react-native-paper';
import DialogComponent from '../../Components/DialogComponent';

export default function Home({ navigation }) {
    const [userDetails, setUserDetails] = React.useState();
    const [visible, setVisible] = React.useState(false);
    const [WeekDay, setWeekDay] = React.useState('');

    const Data = [
        { "Name": "AGRICULTURAL ENGINEERING", icon: <MaterialIcons name="agriculture" size={24} color="black" /> },
        { "Name": "COMPUTER ENGINEERING", icon: <MaterialIcons name="computer" size={24} color="black" />, "id": 3 },
        { "Name": "CIVIL ENGINEERING", icon: <Entypo name="compass" size={24} color="black" /> },
        { "Name": "INFORMATION TECHNOLOGY", icon: <MaterialIcons name="signal-cellular-connected-no-internet-0-bar" size={24} color="black" /> },
        { "Name": "ELECTRONICS & COMMUNICATION  ENGINEERING", icon: <Ionicons name="hardware-chip" size={24} color="black" />, "id": 1 },
        { "Name": "ELECTRICAL ENGINEERING", icon: <Ionicons name="flash" size={24} color="black" />, "id": 2 },
        { "Name": "INDUSTRIAL & PRODUCTION ENGINEERING", icon: <FontAwesome name="industry" size={24} color="black" /> },
        { "Name": "MECHANICAL ENGINEERING", icon: <FontAwesome6 name="gear" size={24} color="black" /> },

    ];
    const getUserData = async () => {
        let userData = await AsyncStorage.getItem('userData');
        if (userData) {
            setUserDetails(JSON.parse(userData));
        }
    };
    React.useEffect(() => {
        getUserData();
        const index = new Date().getDay()
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"];
        setWeekDay(dayNames[index])
    }, []);

    React.useEffect(() => {
        if (userDetails?.loggedIn === false) {
            navigation.navigate('LoginScreen')
        }
    }, [userDetails]);

    const logout = async () => {
        await AsyncStorage.setItem('userData', '');
        await AsyncStorage.setItem('acessToken', '');
        navigation.navigate('LoginScreen');
    };


    return (
        <SafeAreaView className='bg-white'>
            <ScrollView className='px-3 pt-1 pb5' showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <View className='flex items-start mt-4 justify-between flex-row'>
                    <View>
                        <Text className='text-5xl font-bold mt-3 text-slate-600'>Home</Text>
                        <Text className='text-base mb-3 text-slate-500'>Welcome {userDetails?.fullname}</Text>
                    </View>

                    <DialogComponent
                        visible={visible} setVisible={setVisible}
                        title='Are you sure?'
                        content='this will log out you from app.'
                        trigger={<Avatar.Text size={45}
                            // label={(userDetails?.fullname)?.slice(0, 2)?.toUpperCase()}
                            label={'A'}
                            className='m-3' />}
                        handlertext='Log out'
                        onPressHandler={logout}
                    />
                </View>
                <Surface elevation={1} className='m-1 h-[200px] rounded-xl mb-3'>
                    <Image
                        source={require('../../assets/banner.jpg')}
                        className='w-full h-[201px] rounded-xl object-fill'
                    />
                </Surface>
                <View className='w-full border border-sky-300 bg-sky-200/20 rounded-lg p-2 flex flex-row px-4 items-center justify-between mb-3'>
                    <View>
                        <Text className='text-base text-slate-400'>Today is</Text>
                        <Text className='text-2xl font-bold'>{WeekDay}</Text>
                    </View>
                    <FontAwesome5 name="calendar-alt" size={24} color="black" />
                </View>

                <View className='mb-7'>
                    {Data.map((e, i) => {
                        return <View key={i} >
                            <TouchableOpacity onPress={() => navigation.navigate('Branch', {
                                BranchId: e.id,
                                BranchName: e.Name,

                            })} className='bg-sky-300/10 p-3 my-1 rounded-lg py-3'
                            >
                                <View className='flex flex-row gap-3 items-center justify-start'>

                                    <Text>{e.id} </Text>
                                    <View>{e.icon}</View>
                                    <Text>{e.Name} </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

