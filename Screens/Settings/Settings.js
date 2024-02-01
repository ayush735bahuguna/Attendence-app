import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Divider } from 'react-native-paper'

export default function Settings() {
    return (
        <SafeAreaView className='px-3 pt-3'>
            <ScrollView>
                <Text className='text-3xl'>Settings</Text>
                <Divider className='my-1' />
            </ScrollView>
        </SafeAreaView>
    )
}