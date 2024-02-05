import * as React from 'react';
import { Appbar, Chip, TextInput } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import ModelComponent from '../ModalComponent'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'

export default function IndivisualClassPage({ route, navigation }) {
    const { BranchName, CourseName, Date, Year } = route.params;
    const [text, settext] = React.useState(null);
    const [Id, setId] = React.useState(null);
    const [PresentStudents, setPresentStudents] = React.useState(
        [
            { name: 'Ayush Bahuguna', "id": '56739' },
            { name: 'Ayush Bahuguna', "id": '356739' },
            { name: 'chota don', "id": '8743955' },
        ]);

    React.useEffect(() => {
        setPresentStudents(PresentStudents)
    }, [PresentStudents])
    const manualAttendenceHandler = () => {
        if (text !== null && Id !== null) {
            setPresentStudents([...PresentStudents, { "name": text, "id": Id }])
            // console.log(PresentStudents);
        }
    }

    function findWithAttr(array, attr, value) {
        for (var i = 0; i < array.length; i += 1) {
            if (array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    }

    return (
        <View>
            <Appbar.Header>
                <Appbar.Content title={Date} />
                <Appbar.Action icon="close" onPress={() => { navigation.goBack() }} />
            </Appbar.Header>

            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} className='px-3 pt-3'>

                <Chip icon="information" className='text-2xl my-1'>{BranchName} year</Chip>
                <Chip icon="information" className='text-2xl my-1'>{CourseName} year</Chip>
                <Chip icon="information" className='text-2xl my-1'>{Year} year</Chip>
                <Chip icon="information" className='text-2xl my-1'>{Date}</Chip>

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

                        <TouchableOpacity
                            className='p-1 my-1 mt-6 rounded-lg bg-slate-700'
                            onPress={manualAttendenceHandler}>
                            <Text className='text-white text-center text-xl m-2'
                            >Mark Present</Text>
                        </TouchableOpacity>
                    </View>}
                />

                <Text className='text-xl my-3'>Present Students List</Text>
                <View>
                    {PresentStudents?.map((e, i) => {
                        return <View key={i}
                            className='text-2xl m-1 flex flex-row items-center justify-between bg-slate-200 p-2 rounded-lg'
                        >
                            <View className='flex flex-col'>
                                <Text>{e.name}</Text>
                                <Text>{e.id}</Text>
                            </View>
                            <AntDesign name="close" size={24} color="black"
                                onPress={() => {
                                    var Array = PresentStudents;
                                    var index = findWithAttr(Array, 'id', `${e.id}`);
                                    if (index > -1) { Array.splice(index, 1) }
                                    console.log(Array, 'Array');
                                    setPresentStudents(Array)
                                    console.log(Array);
                                }} />
                        </View>
                    })}
                </View>


            </ScrollView>
        </View>
    )
}