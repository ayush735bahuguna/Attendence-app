import { Camera, CameraType } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import * as FaceDetector from 'expo-face-detector';
import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useGlobalContext } from '../../Context/Context';

export default function AttendencePage() {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [faceID, setfaceId] = useState();
    const cameraref = useRef(Camera);
    const [img, setimg] = useState();
    const { setStudentArrayFromAttendencePage } = useGlobalContext();

    useEffect(() => {
        setStudentArrayFromAttendencePage([{ name: 'Ayush Bahuguna', id: '57531' }, { name: 'Ayush ', id: '5753d1' }])
    }, [])

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <SafeAreaView className='flex-1 justify-center items-center' style={styles.container}>
                <Text style={{ textAlign: 'center' }} className='text-xl m-3'>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" style={{ margin: 20 }} />
            </SafeAreaView>
        );
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    async function takePicture() {
        try {
            const options = { quality: 0.5, base64: true };
            const data = await cameraref?.current?.takePictureAsync(options);
            // console.log(data?.base64); // sent to server
            setimg(data?.uri);
        } catch (error) {
            console.log(error, "ERROR <<<<<<<<<<<<<")
        }
    }

    const handleFacesDetected = async ({ faces, image }) => {
        setfaceId(faces[0]?.faceID);
        if (faceID !== faces[0]?.faceID && faceID !== undefined) {
            takePicture();
        }
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            <Camera
                ref={cameraref}
                style={styles.camera}
                type={type}
                onFacesDetected={handleFacesDetected}
                faceDetectorSettings={{
                    mode: FaceDetector.FaceDetectorMode.fast,
                    detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
                    runClassifications: FaceDetector.FaceDetectorClassifications.none,
                    minDetectionInterval: 200,
                    tracking: true,
                }}
            >
                <View className='absolute bottom-5 w-full'>
                    <View className='flex items-center justify-center w-full gap-2 flex-row'>
                        <TouchableOpacity onPress={toggleCameraType} className='bg-slate-700 rounded-full w-[50px] h-[50px] flex justify-center items-center'>
                            <MaterialIcons name="flip-camera-ios" size={30} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={takePicture} className='bg-slate-700 rounded-full w-[50px] h-[50px] flex justify-center items-center'>
                            <MaterialIcons name="camera" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Camera>
            <View style={styles.container} className='p-3'>
                {img ?
                    <View style={{ paddingBottom: 20 }}>
                        <Text>File urls : {img}</Text>
                        <Image
                            source={{ uri: `${img}` }}
                            style={{ width: 200, height: 400 }}
                        />
                    </View>
                    :
                    <Text className='text-2xl text-center m-3'>Show faces</Text>
                }
            </View >
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        height: 450,
        objectFit: 'fill'
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});
