import * as React from 'react';
import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Admin from './Screens/Card';
import BookData from './Screens/BookData';

const Drawer = createDrawerNavigator();
export default function DrawerNavigate() {
  return (
    <>
      <Drawer.Navigator>
        <Drawer.Screen
          options={{headerShown: false}}
          name="Admin"
          component={Admin}
        />
        <Drawer.Screen
          options={{headerShown: false}}
          name="BookData"
          component={BookData}
        />
      </Drawer.Navigator>
    </>
  );
}
