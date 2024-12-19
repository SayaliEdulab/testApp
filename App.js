import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import todoReducer from './src/store/todoSlice';
import Pages from './src/screens/Pages';

// Configure Redux Store
const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

const App = () => {
  // Test Firebase Firestore

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Pages />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
