import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/screens/Home';
import SearchDrinkScreen from './src/screens/SearchDrinkScreen'
import SearchDrinkByLetter from './src/screens/SearchDrinkByLetter';


const Stack = createNativeStackNavigator()
export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Group>
          <Stack.Screen component={Home} name='Home' options={{ title: 'Home' }} />
          <Stack.Screen component={SearchDrinkScreen} name='SearchDrinkScreen' options={{ title: 'Search for a Drink' }} />
          <Stack.Screen component={SearchDrinkByLetter} name='SearchDrinkByLetter' options={{ title: 'Search for a Drink By Letter' }} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
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
