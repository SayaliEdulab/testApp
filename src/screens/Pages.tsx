import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from './MainScreen';
import AddTodoScreen from './AddTodoScreen';

// Create Navigation Stack
const Stack = createNativeStackNavigator();

const Pages = () => {
  return (
    // <Provider store={store}>
    <Stack.Navigator initialRouteName="MainScreen">
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{title: 'TODO List'}}
      />
      <Stack.Screen
        name="AddTodoScreen"
        component={AddTodoScreen}
        options={{title: 'Add TODO'}}
      />
    </Stack.Navigator>
    // </Provider>
  );
};

export default Pages;
