import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import {useDispatch} from 'react-redux';
import {addTodo} from '../store/todoSlice';
import MainScreen from './MainScreen';

const AddTodoScreen = ({navigation}) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleAdd = async () => {
    if (text.trim()) {
      const newTodo = text.trim();
      // Store in AsyncStorage
      try {
        const existingTodos = await AsyncStorage.getItem('todos');
        const todos = existingTodos ? JSON.parse(existingTodos) : [];
        todos.push(newTodo);
        await AsyncStorage.setItem('todos', JSON.stringify(todos));
      } catch (error) {
        console.error('Error saving todo:', error);
      }
      // Dispatch to Redux store
      dispatch(addTodo(newTodo));
      navigation.navigate('MainScreen', {newTodo});
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.content}>
        <Text style={styles.title}>Add a New TODO</Text>
        <TextInput
          style={styles.input}
          placeholder="What needs to be done?"
          value={text}
          onChangeText={setText}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>Add TODO</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButton: {
    width: '100%',
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#6200ee',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddTodoScreen;
