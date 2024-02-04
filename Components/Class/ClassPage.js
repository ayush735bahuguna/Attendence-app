import * as React from 'react';
import { Appbar, Chip, TextInput } from 'react-native-paper';
import ModelComponent from '../ModalComponent'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'

export default function ClassPage({ route, navigation }) {
    const { BranchName, CourseName, Year } = route.params;
    const [Date, setDate] = React.useState(null);
    const [Class, setClass] = React.useState([
        { "date": '20-2-2024' },
        { "date": '21-2-2024' },
        { "date": '22-2-2024' },
        { "date": '23-2-2024' },
    ]);

    const AddDateHandler = () => {
        if (Date !== null) {
            setClass([...Class, { "date": Date }]);
        }
    }
    return (
        <View>
            <Appbar.Header>
                <Appbar.Content title={CourseName} />
                <Appbar.Action icon="close" onPress={() => { navigation.goBack() }} />
            </Appbar.Header>

            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} className='px-3 pt-3'>

                <Chip icon="information" className='text-2xl my-1'>{BranchName}</Chip>
                <Chip icon="information" className='text-2xl my-1'>{CourseName}</Chip>
                <Chip icon="information" className='text-2xl my-1'>{Year} year</Chip>


                <ModelComponent
                    title='Add Class'
                    trigger={<View className='rounded-lg bg-slate-300 p-4 m-2 mb-3 flex items-center justify-center'>
                        <Text className='text-center'>Add class</Text>
                    </View>}
                    content={<View>
                        <TextInput
                            label="Enter a date"
                            value={Date}
                            mode='outlined'
                            onChangeText={text => setDate(text)}
                        />

                        <TouchableOpacity
                            className='p-1 my-1 mt-6 rounded-lg bg-slate-700'
                            onPress={AddDateHandler}>
                            <Text className='text-white text-center text-xl m-2'
                            >Add</Text>
                        </TouchableOpacity>
                    </View>}
                />

                <View>
                    {Class?.length === 0 ? <Text className='text-xl my-3 text-center'>No class added</Text> :
                        <>
                            {Class?.map((e, i) => {
                                return <TouchableOpacity key={i}
                                    className='m-1 rounded-lg bg-slate-200 p-4 flex items-start justify-center'
                                    onPress={() => {
                                        navigation.navigate('IndivisualClassPage', {
                                            BranchName: BranchName, CourseName: CourseName,
                                            Date: e.date, Year: Year
                                        })
                                    }}
                                >
                                    <View className='flex flex-row gap-2'>
                                        <Text className='font-bold'>{i + 1}</Text>
                                        <Text>{e.date}</Text>
                                    </View>
                                </TouchableOpacity>
                            })}
                        </>}

                </View>


            </ScrollView>
        </View>
    )
}