import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const TodoItem = ({todo, onToggle, onDelete, onEdit, onSave}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.title);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editedText}
            onChangeText={setEditedText}
          />
        ) : (
          <Text style={todo.completed ? styles.completed : styles.text}>
            {todo.title}
          </Text>
        )}

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              todo.completed ? styles.undoButton : styles.doneButton,
            ]}
            onPress={onToggle}>
            <Text style={styles.buttonText}>
              {todo.completed ? 'Active' : 'Done'}
            </Text>
          </TouchableOpacity>

          {isEditing ? (
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                onSave(todo.id, editedText);
                setIsEditing(false);
              }}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditing(true)}>
              <Text style={styles.deleteButtonText}>Edit</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>
            Created at: {new Date(todo.created_at).toLocaleString()}
          </Text>
          <Text style={styles.dateText}>
            Updated at: {new Date(todo.updated_at).toLocaleString()}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Add an input style
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
    fontSize: 16,
  },
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
    elevation: 5,
  },
  editButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: '#4CAF50',
  },
  undoButton: {
    backgroundColor: '#FF9800',
  },
  deleteButton: {
    backgroundColor: '#FF5722',
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
  saveButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  dateContainer: {
    marginTop: 10,
  },
  dateText: {
    fontSize: 12,
    color: '#777',
  },
});

export default TodoItem;
