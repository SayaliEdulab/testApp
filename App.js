import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import todoReducer from './src/store/todoSlice';
import Pages from './src/screens/Pages';
import {initializeApp} from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

// Configure Redux Store
const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

initializeApp();

const App = () => {
  // Test Firebase Firestore
  React.useEffect(() => {
    const testFirestore = async () => {
      try {
        const todosSnapshot = await firestore().collection('todos').get();
        console.log(
          'Fetched todos from Firestore:',
          todosSnapshot.docs.map(doc => doc.data()),
        );
      } catch (error) {
        console.error('Error connecting to Firestore:', error);
      }
    };

    testFirestore();
  }, []);
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Pages />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
