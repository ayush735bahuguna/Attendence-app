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
            <Text Text className='text-xl my-2' > Select a year</Text >
            {
                Data.map((e, i) => {
                    return <TouchableOpacity key={i} className={`flex gap-2 flex-row w-full`}
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

            {/* < RadioButton
                value="second"
                status={checked === 'second' ? 'checked' : 'unchecked'
                }
                onPress={() => setChecked('second')}
            />
            < RadioButton
                value="Third"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Third')}
            />
            < RadioButton
                value="Final"
                status={checked === 'second' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('Final')}
            /> */}
        </View>
    );
};

export default SelectYear;