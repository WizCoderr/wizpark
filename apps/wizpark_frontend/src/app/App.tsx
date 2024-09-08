import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';

// Import your screens
import SignInScreen from './screens/UserSignin';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
    </Stack.Navigator>
  );
};

export default Navigation;