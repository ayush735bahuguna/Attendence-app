import { StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import Home from './Screens/Home/Home'
import Settings from './Screens/Settings/Settings'

const Tab = createMaterialBottomTabNavigator();
export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>

        <Tab.Navigator
          initialRouteName="Home"
        // activeColor="#f0edf6"
        // inactiveColor="#3e2465"
        // barStyle={{ backgroundColor: '#694fad' }}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>

      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
