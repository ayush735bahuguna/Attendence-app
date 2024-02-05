import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export default function Home({ navigation }) {

    const Data = [
        { "Name": "AGRICULTURAL ENGINEERING", icon: <MaterialIcons name="agriculture" size={24} color="black" /> },
        { "Name": "COMPUTER ENGINEERING", icon: <MaterialIcons name="computer" size={24} color="black" /> },
        { "Name": "CIVIL ENGINEERING", icon: <Entypo name="compass" size={24} color="black" /> },
        { "Name": "INFORMATION TECHNOLOGY", icon: <MaterialIcons name="signal-cellular-connected-no-internet-0-bar" size={24} color="black" /> },
        { "Name": "ELECTRONICS & COMMUNICATION  ENGINEERING", icon: <Ionicons name="hardware-chip" size={24} color="black" /> },
        { "Name": "ELECTRICAL ENGINEERING", icon: <Ionicons name="flash" size={24} color="black" /> },
        { "Name": "INDUSTRIAL & PRODUCTION ENGINEERING", icon: <FontAwesome name="industry" size={24} color="black" /> },
        { "Name": "MECHANICAL ENGINEERING", icon: <FontAwesome6 name="gear" size={24} color="black" /> },

    ];


    return (
        <SafeAreaView className='px-3 pt-3'>
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <Text className='text-3xl'>Home</Text>
                <Text className='text-sm my-3'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, quod. Ullam consequuntur sequi eos. Minima ab saepe veniam ea tempora fugiat nobis officiis dolores? Nobis, magni quod! Voluptatibus, assumenda beatae.</Text>

                <View>
                    {Data.map((e, i) => {
                        return <View key={i}>
                            <TouchableOpacity onPress={() => navigation.navigate('Branch', {
                                BranchId: 86,
                                BranchName: e.Name,
                            })} className='bg-gray-100 p-3 my-1 rounded-lg py-3'
                            >
                                <View className='flex flex-row gap-3 items-center justify-start'>
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