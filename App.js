import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Screens/Home/Home'
import Settings from './Screens/Settings/Settings'
import CoursePage from './Components/CoursePage/CoursePage'
import Branch from './Components/Branch/Branch';
import AttendencePage from './Components/Attendence/AttendencePage';

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
      <Tab.Screen name="Settings" component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => (<Feather name="settings" size={24} color={color} />),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="StackNavigation"
            component={StackNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Branch" component={Branch} options={{ headerShown: false }} />
          <Stack.Screen name="CoursePage" component={CoursePage} options={{ headerShown: false }} />
          <Stack.Screen name="Attendence" component={AttendencePage} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
