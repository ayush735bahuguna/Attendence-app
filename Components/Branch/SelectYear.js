import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { RadioButton } from 'react-native-paper';

const SelectYear = ({ setYear }) => {
    const [Value, setValue] = React.useState(null);
    const Data = [
        { value: 'First' },
        { value: 'Second' },
        { value: 'Third' },
        { value: 'Final' },
    ]
    React.useEffect(() => {
        setYear(Value);
    }, [Value])
    return (
        <View className='mb-4'>
            <Text Text className='text-xl mt-2' > Select a year</Text >
            <View className='p-2 '>
                {
                    Data.map((e, i) => {
                        return <TouchableOpacity key={i} className={`flex gap-2 flex-row w-full ${Value === e.value && 'bg-slate-200'} mt-1 rounded-lg`}
                            onPress={() => { setValue(e.value) }}>
                            <RadioButton
                                className={``}
                                value={e.value}
                                status={Value === e.value ? 'checked' : 'unchecked'}
                                onPress={() => { setValue(e.value) }}
                            />
                            <Text>{e.value}</Text>
                        </TouchableOpacity>
                    })
                }
            </View>
        </View>
    );
};

export default SelectYear;