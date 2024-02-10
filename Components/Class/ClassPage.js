import * as React from 'react';
import { Appbar, Chip, TextInput } from 'react-native-paper';
import ModelComponent from '../ModalComponent'
import DialogComponent from '../DialogComponent'
import DatePickerComponent from './DatePickerComponent'
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export default function ClassPage({ route, navigation }) {
    const [visible, setVisible] = React.useState(false);
    const [opendeletedialog, setopendeletedialog] = React.useState(false);
    const { BranchName, CourseName, Year } = route.params;
    const [classDate, setclassDate] = React.useState(null);
    const [ClassToDelete, setClassToDelete] = React.useState(null);
    const [Class, setClass] = React.useState([]);
    // set correct id for adding date in flatlist


    // ---------------------------------------------------------------react-query
    const queryClient = useQueryClient();
    const [classListisloading, setclassListisloading] = React.useState(false);
    const [deleteClassDateId, setdeleteClassDateId] = React.useState(null);

    const { data, isLoading, error } = useQuery({
        queryKey: ['ClassTiming'],
        queryFn: () =>
            fetch('https://650ebde754d18aabfe996c09.mockapi.io/classdatelist').then((res) => {
                console.log("fetched");
                return res.json()
            }),
        staleTime: 5000
    });

    const AddDateToClassList = useMutation({
        mutationFn: () => {
            if (classDate !== null) {
                fetch('https://650ebde754d18aabfe996c09.mockapi.io/classdatelist', { method: 'POST' }
                    , {
                        "date": `${classDate.getDate() + '/' + classDate.getMonth() + 1 + '/' + classDate.getFullYear()}`,
                        "time": `${classDate.getHours() + ':' + classDate.getMinutes()}`,
                        "id": `${classDate.toUTCString()}`
                    }).then((res) => {
                        console.log('added');
                        return res.json()
                    }
                    )
            }
        },
        onSuccess: () => { queryClient.invalidateQueries(['ClassTiming']) }
    });

    const DeleteDateToClassList = useMutation({
        mutationFn: () => {
            if (deleteClassDateId) {
                fetch(`https://650ebde754d18aabfe996c09.mockapi.io/classdatelist/${deleteClassDateId}`, { method: 'DELETE' }).then((res) => {
                    console.log('deleted');
                    return res.json()
                }
                )
            } else {
                console.log('no class delete date id');
            }

        },
        onSuccess: () => { queryClient.invalidateQueries(['ClassTiming']) }
    });

    React.useEffect(() => { setclassListisloading(isLoading) }, [isLoading])
    React.useEffect(() => { setClass(data) }, [data])


    // ---------------------------------------------------------------react-query

    const AddDateHandler = () => {
        if (classDate !== null) {
            setClass(Class => [{ "date": `${classDate.getDate() + '/' + classDate.getMonth() + 1 + '/' + classDate.getFullYear()}`, "time": `${classDate.getHours() + ':' + classDate.getMinutes()}`, "id": `${classDate.toUTCString()}` }, ...Class])
        }
        AddDateToClassList.mutate();
        setVisible(false);
    }
    const DeleteDateHandler = (e) => {
        setdeleteClassDateId(e.id);
        setopendeletedialog(true)
        setClassToDelete(e.date + ' at ' + e.time)
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
                refreshing={classListisloading}
                onRefresh={() => { queryClient.invalidateQueries(['ClassTiming']) }}
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
                                if (deleteClassDateId) {
                                    const filterArray = Class.filter(e => e.id !== deleteClassDateId)
                                    setClass(filterArray);
                                }
                                setopendeletedialog(false);
                                DeleteDateToClassList.mutate()
                            }}
                        />
                        {classListisloading &&
                            <>
                                <View className='m-1 rounded-lg bg-slate-200 w-full p-3 flex items-start justify-center flex-row '><Text className='p-2'>Loading...</Text></View>
                                <View className='m-1 rounded-lg bg-slate-200 w-full p-3 flex items-start justify-center flex-row '><Text className='p-2'>Loading...</Text></View>
                                <View className='m-1 rounded-lg bg-slate-200 w-full p-3 flex items-start justify-center flex-row '><Text className='p-2'>Loading...</Text></View>
                            </>
                        }
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
                        <TouchableOpacity onPress={() => { DeleteDateHandler(item) }} className='p-4'>
                            <Feather name="trash-2" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                }
                keyExtractor={item => item.id}
                ListFooterComponent={Class?.length !== 0 && <Text className='mb-10 mt-5 text-center'>End of list</Text>
                }
                ListEmptyComponent={!classListisloading && <Text className='text-xl my-3 text-center'>No class added</Text>}
            />
        </View>
    )
}