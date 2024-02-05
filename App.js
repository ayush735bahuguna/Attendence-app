import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Screens/Home/Home'
import Profile from './Screens/Profile/Profile'
import { FontAwesome5 } from '@expo/vector-icons';
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

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

function StackNavigation() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (<Feather name="home" size={24} color={color} />),
        }}
      />
      <Tab.Screen name="Profile" component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (<FontAwesome5 name="user-circle" size={24} color="black" />),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [initialRouteName, setInitialRouteName] = React.useState('');

  React.useEffect(() => {
    authUser();
  }, []);

  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem('userData');
      setTimeout(() => {
        if (userData) {
          userData = JSON.parse(userData);
          console.log(userData);

          if (userData.loggedIn) {
            setInitialRouteName('HomeScreen');
          } else {
            setInitialRouteName('LoginScreen');
          }
        } else {
          setInitialRouteName('RegistrationScreen');
        }
      }, 2000);
    } catch (error) {
      console.log(error);
      setInitialRouteName('RegistrationScreen');
    }
  };

  return (
    <PaperProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="" />
        {!initialRouteName ? (
          <Loader visible={true} />
        ) : (
          <Stack.Navigator
            initialRouteName={initialRouteName}
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="HomeScreen" component={StackNavigation} />

            <Stack.Screen name="Branch" component={Branch} />
            <Stack.Screen name="IndivisualClassPage" component={IndivisualClassPage} />
            <Stack.Screen name="ClassPage" component={ClassPage} />
            <Stack.Screen name="Attendence" component={AttendencePage} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}
