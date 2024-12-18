import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';

const TodoItem = ({todo, onToggle, onDelete}) => (
  <View style={styles.cardContainer}>
    <View style={styles.card}>
      <Text style={todo.completed ? styles.completed : styles.text}>
        {todo.title}
      </Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            todo.completed ? styles.undoButton : styles.doneButton,
          ]}
          onPress={onToggle}>
          <Text style={styles.buttonText}>
            {todo.completed ? 'Undo' : 'Done'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 15,
    marginHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 3},
    elevation: 5, // Android shadow
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  completed: {
    fontSize: 16,
    color: 'grey',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneButton: {
    backgroundColor: '#4CAF50', // Green for Done
  },
  undoButton: {
    backgroundColor: '#FF9800', // Orange for Undo
  },
  deleteButton: {
    backgroundColor: '#FF5722', // Red for Delete
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default TodoItem;
