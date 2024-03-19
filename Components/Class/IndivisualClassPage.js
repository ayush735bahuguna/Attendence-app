import * as React from 'react';
import { Appbar, Button, Chip, TextInput } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import ModelComponent from '../ModalComponent'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import Loader from '../loader';
import { useGlobalContext } from '../../Context/Context';
import axios from 'axios';

export default function IndivisualClassPage({ route, navigation }) {
    const { BranchName, CourseName, Date, Year, classId } = route.params;
    const [visible, setVisible] = React.useState(false);
    const [text, settext] = React.useState(null);
    const [Id, setId] = React.useState(null);
    const [ExteData, setExteData] = React.useState(null);
    const [Doneloader, setDoneloader] = React.useState(false);
    const { StudentArrayFromAttendencePage, setStudentArrayFromAttendencePage } = useGlobalContext();
    const [PresentStudentsArray, setPresentStudentsArray] = React.useState(StudentArrayFromAttendencePage);

    React.useEffect(() => { setPresentStudentsArray(StudentArrayFromAttendencePage) }, [StudentArrayFromAttendencePage])
    React.useEffect(() => {
        setPresentStudentsArray(PresentStudentsArray)
    }, [PresentStudentsArray])

    const manualAttendenceHandler = () => {
        if (text !== null && Id !== null) {
            setExteData(
                // {"name": text, "id":
                Id
                // }
            )
            setPresentStudentsArray([
                // { "name": text, "id":
                Id
                // }
                , ...PresentStudentsArray])
            setStudentArrayFromAttendencePage([
                // { "name": text, "id":
                Id
                // }
                , ...PresentStudentsArray])
            // alert(`Added student name:${text} , id:${Id}`);
        }
        setVisible(false);
    }

    const AddAttendencehandler = async () => {
        setDoneloader(true)
        try {
            await axios.post(`https://attendance-app-besv.onrender.com/api/markattendence/${classId} `, PresentStudentsArray)
        } catch (error) {
            console.log(error);
        }
        navigation.navigate('ClassPage', { BranchName: BranchName, CourseName: CourseName, Date: Date, Year: Year });
        setStudentArrayFromAttendencePage([]);
        setDoneloader(false)
    }

    return (
        <>
            <Loader visible={Doneloader} />
            <View>
                <Appbar.Header>
                    <Appbar.Content title={Date} />
                    <Appbar.Action icon="close" onPress={() => { navigation.goBack() }} />
                </Appbar.Header>
                <FlatList
                    className='px-3 pt-3 mb-24'
                    data={PresentStudentsArray}
                    extraData={ExteData}
                    ListHeaderComponent={
                        <>
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
                                visible={visible} setVisible={setVisible}
                                title='Add Manual Attendence'
                                trigger={<View className='rounded-lg bg-slate-300 p-4 m-2 mb-3 flex items-center justify-center'>
                                    <Text className='text-center'>Add Manually</Text>
                                </View>}
                                content={<View>
                                    <TextInput
                                        label="Name of Student"
                                        value={text}
                                        mode='outlined'
                                        className='mt-2'
                                        onChangeText={text => settext(text)}
                                    />
                                    <TextInput
                                        label="Id of Student"
                                        value={Id}
                                        mode='outlined'
                                        keyboardType="numeric"
                                        onChangeText={text => setId(text)}
                                    />

                                    <TouchableOpacity
                                        className='p-1 my-1 mt-6 rounded-lg bg-slate-700'
                                        onPress={manualAttendenceHandler}>
                                        <Text className='text-white text-center text-xl m-2'
                                        >Mark Present</Text>
                                    </TouchableOpacity>
                                </View>}
                            />
                            {PresentStudentsArray?.length !== 0 &&
                                <Text className='text-xl mt-3'>Present Students List : ({PresentStudentsArray?.length})</Text>
                            }
                        </>}
                    renderItem={({ item }) =>
                        <View className='text-2xl m-1 flex flex-row items-center justify-between bg-slate-200 p-2 rounded-lg'
                        >
                            <View className='flex flex-col'>
                                {/* <Text>{item.name}</Text> */}
                                {/* <Text>{item.id}</Text> */}
                                <Text>{item}</Text>
                            </View>
                            <AntDesign name="close" size={24} color="black"
                                onPress={() => {
                                    // const filterArray = PresentStudentsArray.filter(e => e.id !== item.id)
                                    const filterArray = PresentStudentsArray.filter(e => e !== item)
                                    setPresentStudentsArray(filterArray);
                                }} />
                        </View>
                    }
                    ListFooterComponent={
                        <>
                            <View className='flex flex-row w-full items-center justify-evenly my-5'>
                                {PresentStudentsArray?.length !== 0 &&
                                    <>
                                        <TouchableOpacity
                                            className='m-2 rounded-lg bg-slate-300 p-4 my-3 flex items-center justify-center w-1/3'
                                            onPress={AddAttendencehandler}
                                        >
                                            <Text>Done</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            className='m-2 rounded-lg bg-slate-300 p-4 my-3 flex items-center w-1/3 justify-center'
                                            onPress={() => { setPresentStudentsArray([]) }}
                                        >
                                            <Text>Reset</Text>
                                        </TouchableOpacity>
                                    </>
                                }
                            </View>
                        </>
                    }
                    keyExtractor={item => item.id}
                />
            </View>
        </>
    )
}