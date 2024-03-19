import * as React from 'react';
import { Appbar, Chip } from 'react-native-paper';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import SelectYear from './SelectYear'
import { useQuery } from 'react-query';
import { useGlobalContext } from '../../Context/Context';
import axios from 'axios';

export default function Branch({ route, navigation }) {
    const { BranchName, BranchId } = route.params;

    const [Year, setYear] = React.useState(null);
    const [BatchId, setBatchId] = React.useState(null);

    const { acessToken } = useGlobalContext();
    const [Data, setData] = React.useState([]);
    const { data, isLoading, error } = useQuery({
        queryKey: ['courseList'],
        queryFn: async () => {
            if (acessToken) {
                console.log('Branch api fetch');
                try {
                    const { data } = await axios.get(`https://attendance-app-besv.onrender.com/api/courses/`, { headers: { Authorization: `Bearer ${acessToken}` } })
                    console.log(data);
                    return data
                } catch (error) {
                    console.log(error);
                }
            }
        },
        staleTime: 5000
    });
    React.useEffect(() => { setData(data) }, [data])

    return (
        <View>
            <Appbar.Header>
                <Appbar.Content title={BranchName} />
                <Appbar.Action icon="close" onPress={() => { navigation.goBack() }} />
            </Appbar.Header>

            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} className='px-3 pt-3'>
                <Chip icon="information" className='text-2xl'>{BranchName}</Chip>
                <SelectYear setYear={setYear} setBatchId={setBatchId} />
                {Year === null
                    ?
                    <Text className='text-xl text-center my-5'>Select a Batch to display course list</Text>
                    :
                    <View>
                        {Data?.map((e, i) => {
                            return <View key={i} >
                                <TouchableOpacity onPress={() => navigation.navigate('ClassPage', {
                                    BranchName: BranchName, CourseName: e.name, Year: Year, BatchId: BatchId, courseId: e.id, BranchId: BranchId
                                })} className='bg-gray-200 p-3 my-1 rounded-lg py-5'
                                >
                                    <View className='flex flex-row gap-2 items-center justify-start
                                    '>
                                        <Text>{i + 1}</Text>
                                        <View className='flex flex-row gap-2 items-center justify-center'>
                                            {/*  */}
                                            <Text>( <Text className='font-bold'>{e.code}</Text> ) - {e.name}</Text>
                                        </View>
                                        <View></View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        })}
                    </View >
                }

            </ScrollView >
        </View >
    )
}