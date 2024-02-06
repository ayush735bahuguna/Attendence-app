import * as React from 'react';
import { Appbar, Chip } from 'react-native-paper';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons';
import SelectYear from './SelectYear'

export default function Branch({ route, navigation }) {
    const { BranchName } = route.params;
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
                <Chip icon="information" className='text-2xl'>{BranchName}</Chip>

                <SelectYear setYear={setYear} />

                {Year === null
                    ?
                    <Text className='text-xl text-center my-5'>Select a Year to display course list</Text>
                    :
                    <View>
                        {Data.map((e, i) => {
                            return <View key={i} >
                                <TouchableOpacity onPress={() => navigation.navigate('ClassPage', {
                                    BranchName: BranchName, CourseName: e.Name, Year: Year,
                                })} className='bg-gray-200 p-3 my-1 rounded-lg py-5'
                                >
                                    <View className='flex flex-row gap-2 items-center justify-between'>
                                        <Text>{i + 1}</Text>
                                        <Text >{e.Name}</Text>
                                        <View></View>
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