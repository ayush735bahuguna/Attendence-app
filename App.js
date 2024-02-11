import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Screens/Home/Home'
import IndivisualClassPage from './Components/Class/IndivisualClassPage'
import Branch from './Components/Branch/Branch';
import ClassPage from './Components/Class/ClassPage';
import AttendencePage from './Components/Attendence/AttendencePage';
import LoginScreen from './Screens/Auth/Login/Login';
import RegistrationScreen from './Screens/Auth/Signup/Signup';
import React from 'react';
import Loader from './Components/loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from 'react-query';
import Context from './Context/Context';


const queryClient = new QueryClient()
const Stack = createNativeStackNavigator();


export default function App() {
  const [initialRouteName, setInitialRouteName] = React.useState('');
  React.useEffect(() => { authUser() }, []);

  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem('userData');
      if (userData) {
        userData = JSON.parse(userData);
        if (userData.loggedIn) {
          setInitialRouteName('HomeScreen');
        } else {
          setInitialRouteName('LoginScreen');
        }
      } else {
        setInitialRouteName('RegistrationScreen');
      }
    } catch (error) {
      console.log(error);
      setInitialRouteName('RegistrationScreen');
    }
  };

  return (
    <PaperProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Context>
            <StatusBar animated={true} hidden={false} style='auto' />
            {!initialRouteName ? (
              <Loader visible={true} />
            ) : (
              <Stack.Navigator
                initialRouteName={initialRouteName}
                screenOptions={{ headerShown: false }}>
                <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="HomeScreen" component={Home} />

                <Stack.Screen name="Branch" component={Branch} />
                <Stack.Screen name="IndivisualClassPage" component={IndivisualClassPage} />
                <Stack.Screen name="ClassPage" component={ClassPage} />
                <Stack.Screen name="Attendence" component={AttendencePage} />
              </Stack.Navigator>
            )}
          </Context>
        </NavigationContainer>
      </QueryClientProvider>
    </PaperProvider>
  );
}
