import * as React from 'react';
import { Appbar, Chip, TextInput } from 'react-native-paper';
import ModelComponent from '../ModalComponent'
import DialogComponent from '../DialogComponent'
import DatePickerComponent from './DatePickerComponent'
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import { Feather } from '@expo/vector-icons';

export default function ClassPage({ route, navigation }) {
    const [visible, setVisible] = React.useState(false);
    const [opendeletedialog, setopendeletedialog] = React.useState(false);
    const { BranchName, CourseName, Year } = route.params;
    const [classDate, setclassDate] = React.useState(null);
    const [ClassToDelete, setClassToDelete] = React.useState(null);
    const [ClassToDeleteId, setClassToDeleteId] = React.useState(null);
    const [Class, setClass] = React.useState([
        // { "date": '20/2/2024', "time": '12:00', id: 'hfh' },
    ]);
    // set correct id for adding date in flatlist

    const AddDateHandler = () => {
        if (classDate !== null) {
            setClass(Class => [...Class, { "date": `${classDate.getDate() + '/' + classDate.getMonth() + 1 + '/' + classDate.getFullYear()}`, "time": `${classDate.getHours() + ':' + classDate.getMinutes()}`, "id": `${classDate.toUTCString()}` }])
        }
        setVisible(false);
    }
    return (
        <View>
            <Appbar.Header>
                <Appbar.Content title={CourseName} />
                <Appbar.Action icon="close" onPress={() => { navigation.goBack() }} />
            </Appbar.Header>

            <FlatList
                className='px-3 pt-3 mb-24'
                data={Class}
                ListHeaderComponent={
                    <>
                        <Chip icon="information" className='text-2xl my-1'>{BranchName}</Chip>
                        <Chip icon="information" className='text-2xl my-1'>{CourseName}</Chip>
                        <Chip icon="information" className='text-2xl my-1'>{Year} year</Chip>

                        <ModelComponent
                            visible={visible} setVisible={setVisible}
                            title='Add Class'
                            trigger={<View className='rounded-lg bg-slate-300 p-4 m-2 flex items-center justify-center mt-6'>
                                <Text className='text-center'>Add class</Text>
                            </View>}
                            content={<View>
                                <DatePickerComponent setclassDate={setclassDate} />

                                <TouchableOpacity
                                    className='p-1 my-1 mt-6 rounded-lg bg-zinc-500 '
                                    onPress={AddDateHandler}>
                                    <Text className='text-white text-center text-xl m-2'
                                    >Add</Text>
                                </TouchableOpacity>
                            </View>}
                        />

                        <DialogComponent
                            visible={opendeletedialog} setVisible={setopendeletedialog}
                            title='Are you sure?'
                            content={`This will delete data of class held on ${ClassToDelete} from database.`}
                            trigger={<Text></Text>}
                            handlertext='Delete'
                            onPressHandler={() => {
                                if (ClassToDeleteId !== null) {
                                    const filterArray = Class.filter(e => e.id !== ClassToDeleteId)
                                    setClass(filterArray);
                                }
                                setopendeletedialog(false)
                            }}
                        />

                    </>}
                renderItem={({ item }) =>
                    <View className='m-1 rounded-lg bg-slate-200  flex items-start justify-between flex-row'>
                        <TouchableOpacity
                            className='w-3/4'
                            onPress={() => {
                                navigation.navigate('IndivisualClassPage', {
                                    BranchName: BranchName, CourseName: CourseName,
                                    Date: item.date, Year: Year
                                })
                            }}
                        >
                            <Text className='p-4 text-base'>{item.date} : ({item.time})</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setopendeletedialog(true)
                                setClassToDelete(item.date + ' at ' + item.time)
                                setClassToDeleteId(item.id);

                            }} className='p-4'>
                            <Feather name="trash-2" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                }
                keyExtractor={item => item.id}
                ListFooterComponent={
                    <>{Class?.length !== 0 &&
                        <Text className='mb-10 mt-5 text-center'>End of list</Text>}
                    </>
                }
                ListEmptyComponent={<Text className='text-xl my-3 text-center'>No class added</Text>}
            />
        </View>
    )
}