import * as React from 'react';
import { Appbar, Chip } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'

export default function CoursePage({ route, navigation }) {
    const { CourseName, CourseId, Year } = route.params;
    const PresentStudents = [
        { name: 'Whole list is not visible' },
        { name: 'Ayush Bahuguna' },
        { name: 'Ayush Bahuguna' },
        { name: 'Ayush Bahuguna' },
        { name: 'Ayush Bahuguna' },
        { name: 'Ayush Bahuguna' },
        { name: 'Ayush Bahuguna' },
        { name: 'Ayush Bahuguna' },
        { name: 'Ayush Bahuguna' },
        { name: 'Ayush Bahuguna' },
        { name: 'Ayush Bahuguna' },
        { name: 'Ayush Bahuguna' },
        { name: 'chota don' },
        { name: 'chota don' },
        { name: 'chota don' },
        { name: 'chota don' },
        { name: 'chota don11' },
    ]
    return (
        <View>
            <Appbar.Header>
                <Appbar.Content title={CourseName} />
                <Appbar.Action icon="close" onPress={() => { navigation.goBack() }} />
            </Appbar.Header>

            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} className='px-3 pt-3'>

                <Chip icon="information" className='text-2xl'>{Year} year</Chip>

                <TouchableOpacity
                    className='m-2 rounded-lg bg-slate-300 p-4 my-10 flex items-center justify-center'
                    onPress={() => { navigation.navigate('Attendence') }}
                >
                    <Text>Take Attendence</Text>
                </TouchableOpacity>

                <Text className='text-xl my-3'>Present Students List</Text>
                <View>
                    {PresentStudents.map((e, i) => {
                        return <View key={i}
                            className='text-2xl m-1 flex flex-row items-center justify-between bg-slate-200 p-2 rounded-lg'
                        >
                            <Text>{e.name}</Text>
                            <AntDesign name="close" size={24} color="black" />
                        </View>
                    })}
                </View>


            </ScrollView>
        </View>
    )
}