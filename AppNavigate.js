// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Screens/Home';
import SignUp from './Screens/SignUp';
import Login from './Screens/Login';
import Drawer from './Screens/Drawer';
import DrawerNavigate from './DrawerNavigate';
import Admin from './Screens/Card';
import AddToCard from './Screens/AddToCard';
import BookData from './Screens/BookData';

const Stack = createNativeStackNavigator();

function AppNavigate() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="SignUp"
          component={SignUp}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Admin"
          component={Admin}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="bookData"
          component={BookData}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="AddToCard"
          component={AddToCard}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigate;
