import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useQuery } from 'react-query';
import { useGlobalContext } from '../../Context/Context'
import axios from 'axios';


const SelectYear = ({ setYear, setBatchId }) => {
    const [Value, setValue] = React.useState(null);
    const [Data, setData] = React.useState([]);
    const [loading, setloading] = React.useState(false);
    const { acessToken } = useGlobalContext();

    const { data, isLoading, error } = useQuery({
        queryKey: ['Batch'],
        queryFn: async () => {
            if (acessToken) {
                console.log('year api fetch');
                const { data } = await axios.get(`https://attendance-app-besv.onrender.com/api/batches/`, { headers: { Authorization: `Bearer ${acessToken}` } })
                console.log(data);
                return data
            }
        },
        staleTime: 5000
    });

    React.useEffect(() => { setData(data) }, [data])
    React.useEffect(() => { setloading(isLoading) }, [isLoading])
    React.useEffect(() => { setYear(Value) }, [Value])
    return (
        <View className='mb-4'>
            <Text Text className='text-xl mt-2' > Select a Batch</Text >
            {loading ? <Text className='text-center mt-5'>Please wait for a while.</Text> :
                <View className='p-2 '>
                    {
                        Data?.map((e, i) => {
                            return <TouchableOpacity key={i} className={`flex gap-2 flex-row w-full ${Value === e.name && 'bg-slate-200'} mt-1 rounded-lg`}
                                onPress={() => {
                                    setValue(e.name);
                                    setBatchId(e.id);
                                }}>
                                <RadioButton
                                    className={``}
                                    value={e.name}
                                    status={Value === e.name ? 'checked' : 'unchecked'}
                                    onPress={() => { setValue(e.name) }}
                                />
                                <Text>{e.name}</Text>
                            </TouchableOpacity>
                        })
                    }
                </View>
            }
        </View>
    );
};

export default SelectYear;