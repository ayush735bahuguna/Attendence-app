import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import SelectYear from './SelectYear'

export default function Branch({ route, navigation }) {
    const { BranchId, BranchName } = route.params;
    const [Year, setYear] = React.useState(null);
    const Data = [
        { "Name": "Digital signal processing" },
        { "Name": "Digital communication system" },
    ];
    return (
        <View>
            <Appbar.Header>
                <Appbar.Content title={BranchName} />
                <Appbar.Action icon="close" onPress={() => { navigation.goBack() }} />
            </Appbar.Header>

            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} className='px-3 pt-3'>

                <SelectYear setYear={setYear} />

                {Year === null
                    ?
                    <Text className='text-xl text-center my-5'>Select a Year to display course list</Text>
                    :
                    <View>
                        {Data.map((e, i) => {
                            return <View key={i} >
                                <TouchableOpacity onPress={() => navigation.navigate('CoursePage', {
                                    CourseName: e.Name, CourseId: 12, Year: Year,
                                })} className='bg-gray-200 p-3 my-1 rounded-lg py-5'
                                >
                                    <View className='flex flex-row gap-2 items-center justify-start'>
                                        <Text >{e.Name}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        })}
                    </View>
                }

            </ScrollView>
        </View>
    )
}