/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
} from 'react-native';
import TodoItem from '../components/TodoItem';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainScreen = ({ navigation, route }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState('All');
  const [sortOption, setSortOption] = useState('ID');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);

  useEffect(() => {
    // Load initial data when the component mounts
    loadData();
  }, [page]);

  useEffect(() => {
    // Check for updates in route.params
    if (route.params?.newTodo) {
      const newTodo = {
        id: `local-${Date.now()}`, // Unique ID for the new todo
        title: route.params.newTodo,
        completed: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        isLocal: true,
      };
      setTodos(prevTodos => {
        const updatedTodos = [newTodo, ...prevTodos];
        saveTodosToStorage(updatedTodos);
        return updatedTodos;
      });
    }
  }, [route.params]);

  const fetchTodos = async (currentPage) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos?_page=${currentPage}&_limit=10`
      );
      const data = await response.json();
      return data.map(todo => ({
        ...todo,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        isLocal: false,
      }));
    } catch (error) {
      console.error('Fetch Error:', error);
      return [];
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const storedTodos = await getTodosFromStorage();
      const apiData = await fetchTodos(page);
      setTodos(prevTodos => [...storedTodos, ...apiData]);
      setHasMore(apiData.length > 0);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveTodosToStorage = async (todosList) => {
    try {
      const jsonValue = JSON.stringify(todosList);
      await AsyncStorage.setItem('@todos', jsonValue);
    } catch (e) {
      console.error('Error saving todos to AsyncStorage:', e);
    }
  };

  const getTodosFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@todos');
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error('Error fetching todos from AsyncStorage:', e);
      return [];
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleToggle = id => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              updated_at: new Date().toISOString(),
            }
          : todo
      )
    );
    updateTodoInStorage(id, 'completed');
  };

  const handleDelete = id => {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.filter(todo => todo.id !== id);
      saveTodosToStorage(updatedTodos);
      return updatedTodos;
    });
  };

  const handledit = (id, newTitle) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? {...todo, title: newTitle, updated_at: new Date()} : todo
      )
    );
  };

  const handleSave = (id, newTitle) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, title: newTitle, updated_at: new Date() } : todo
      )
    );
    updateTodoInStorage(id, 'title', newTitle);
  };

  const updateTodoInStorage = async (id, field, newValue) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, [field]: newValue || todo[field] } : todo
    );
    saveTodosToStorage(updatedTodos);
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case 'Active':
        return todos.filter(todo => todo.completed);
      case 'Done':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  };

  const getSortedTodos = filteredTodos => {
    if (sortOption === 'Recent') {
      return [...filteredTodos].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    }
    return [...filteredTodos].sort((a, b) => parseInt(a.id) - parseInt(b.id));
  };

  const renderItem = ({ item }) => (
    <TodoItem
      todo={item}
      onToggle={() => handleToggle(item.id)}
      onDelete={() => handleDelete(item.id)}
      onEdit={() => handledit(item.id)}
      onSave={(id, newTitle) => handleSave(id, newTitle)}
    />
  );

  return (
    <View style={styles.container}>
      {/* Header with Icons */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddTodoScreen')}
          style={styles.iconButton}
        >
          <FeatherIcon name="plus" size={24} color="black" />
          <Text style={styles.iconText}>Add Todo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilterModalVisible(true)}
          style={styles.iconButton}
        >
          <FeatherIcon name="filter" size={24} color="black" />
          <Text style={styles.iconText}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSortModalVisible(true)}
          style={styles.iconButton}
        >
          <FeatherIcon name="sliders" size={24} color="black" />
          <Text style={styles.iconText}>Sort</Text>
        </TouchableOpacity>
      </View>

      {/* Counts */}
      <View style={styles.countContainer}>
        <Text style={styles.countText}>Total Todos: {todos.length}</Text>
        <Text style={styles.countText}>
          Completed Todos: {todos.filter(todo => todo.completed).length}
        </Text>
      </View>

      {/* Filter Modal */}
      <Modal
        visible={filterModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setFilterModalVisible('filter', false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Filter TODOs</Text>
          {['All', 'Active', 'Done'].map(option => (
            <TouchableOpacity
              key={option}
              style={[
                styles.modalButton,
                filter === option && styles.activeModalButton,
              ]}
              onPress={() => {
                setFilter(option);
                setFilterModalVisible('filter', false);
              }}
            >
              <Text style={styles.modalButtonText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      {/* Sort Modal */}
      <Modal
        visible={sortModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSortModalVisible('sort', false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Sort TODOs</Text>
          {['ID', 'Recent'].map(option => (
            <TouchableOpacity
              key={option}
              style={[
                styles.modalButton,
                sortOption === option && styles.activeModalButton,
              ]}
              onPress={() => {
                setSortOption(option);
                setSortModalVisible('sort', false);
              }}
            >
              <Text style={styles.modalButtonText}>Sort by {option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      {/* Todos List */}
      <FlatList
        data={getSortedTodos(getFilteredTodos())}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  iconButton: { alignItems: 'center' },
  iconText: { textAlign: 'center', color: 'black' },
  countContainer: {
    padding: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  countText: { fontSize: 16, fontWeight: 'bold' },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    margin: 90,
    marginTop: 290,
  },
  modalTitle: { fontSize: 20, marginBottom: 20, color: '#fff' },
  modalButton: {
    padding: 10,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  activeModalButton: { backgroundColor: '#87ceeb' },
  modalButtonText: { fontSize: 16 },
});

export default MainScreen;
