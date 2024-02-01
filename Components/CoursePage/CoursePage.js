import * as React from 'react';
import { Appbar, Chip, TextInput } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import ModelComponent from '../ModalComponent'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'

export default function CoursePage({ route, navigation }) {
    const { CourseName, CourseId, Year } = route.params;
    const [text, settext] = React.useState();
    const [Id, setId] = React.useState();
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
                    className='m-2 rounded-lg bg-slate-300 p-4 my-3 flex items-center justify-center'
                    onPress={() => { navigation.navigate('Attendence') }}
                >
                    <Text>Take Attendence</Text>
                </TouchableOpacity>

                <ModelComponent
                    title='Add Manual Attendence'
                    trigger={<View className='rounded-lg bg-slate-300 p-4 m-2 mb-3 flex items-center justify-center'>
                        <Text className='text-center'>Add Manually</Text>
                    </View>}
                    content={<View>
                        <TextInput
                            label="Id of Student"
                            value={Id}
                            mode='outlined'
                            onChangeText={text => setId(text)}
                        />
                        <TextInput
                            label="Name of Student"
                            value={text}
                            mode='outlined'
                            className='mt-2'
                            onChangeText={text => settext(text)}
                        />

                        <TouchableOpacity className='p-1 my-1 mt-6 rounded-lg bg-slate-700'>
                            <Text className='text-white text-center text-xl m-2'>Mark Present</Text>
                        </TouchableOpacity>
                    </View>}
                />

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