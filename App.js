import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import todoReducer from './src/store/todoSlice';
import {MainScreen} from './src/screens/MainScreen';
import AddTodoScreen from './src/screens/AddTodoScreen';
import Pages from './src/screens/Pages';

// Configure Redux Store
const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

// Create Navigation Stack
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Pages />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
