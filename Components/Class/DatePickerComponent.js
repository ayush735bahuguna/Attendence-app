import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Button, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

export default function DatePickerComponent({ setclassDate }) {
    const [date, setDate] = useState(new Date());
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
        setclassDate(currentDate)
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <>
            <TouchableOpacity onPress={showDatepicker} className='rounded-lg m-1 p-2 py-2  bg-slate-300 '>
                <Text className='text-base text-center'>Select date</Text></TouchableOpacity>
            <TouchableOpacity onPress={showTimepicker} className='rounded-lg m-1 p-2 py-2  bg-slate-300 '>
                <Text className='text-base text-center'>Select time</Text></TouchableOpacity>
            <Text className='text-xl text-center my-2'>Selected Date and Time {date.toLocaleString()}</Text>
        </>
    );
};