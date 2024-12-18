import React, {useState, useEffect} from 'react';
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

const MainScreen = ({navigation}) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState('All');
  const [sortOption, setSortOption] = useState('ID');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);

  useEffect(() => {
    fetchTodos(page);
  }, [page]);

  const fetchTodos = page => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=10`)
      .then(response => {
        return response.json(); // Parse the JSON body
      })
      .then(data => {
        const updatedData = data.map(todo => ({
          ...todo,
          created_at: new Date().toISOString(), // Add created_at timestamp
          updated_at: new Date().toISOString(), // Add updated_at timestamp
        }));
        setTodos(prevTodos => [...prevTodos, ...updatedData]);
        setHasMore(data.length > 0);
        setLoading(false);
      })
      .catch(error => {
        console.error('Fetch Error:', error); // Log any errors
        setLoading(false);
      });
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
          : todo,
      ),
    );
  };

  const handleDelete = id => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case 'Active':
        return todos.filter(todo => !todo.completed);
      case 'Done':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const getSortedTodos = filteredTodos => {
    if (sortOption === 'Recent') {
      return [...filteredTodos].reverse();
    }
    return [...filteredTodos].sort((a, b) => a.id - b.id);
  };

  const getCompletedCount = () => {
    return todos.filter(todo => todo.completed).length;
  };

  const getTotalCount = () => {
    return todos.length;
  };

  const renderItem = ({item}) => (
    <TodoItem
      todo={item}
      onToggle={() => handleToggle(item.id)}
      onDelete={() => handleDelete(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      {/* Header with Icons */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddTodoScreen')}
          style={styles.iconButton}>
          <FeatherIcon name="plus" size={24} color="black" />
          <Text style={{textAlign: 'center', color: 'black'}}>Add Todo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFilterModalVisible(true)}
          style={styles.iconButton}>
          <FeatherIcon name="filter" size={24} color="black" />
          <Text style={{textAlign: 'center', color: 'black'}}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSortModalVisible(true)}
          style={styles.iconButton}>
          <FeatherIcon name="sliders" size={24} color="black" />
          <Text style={{marginRight: 3, color: 'black'}}>SortBy Id</Text>
        </TouchableOpacity>
      </View>

      {/* Counts */}
      <View style={styles.countContainer}>
        <Text style={styles.countText}>Total Todos: {getTotalCount()}</Text>
        <Text style={styles.countText}>
          Completed Todos: {getCompletedCount()}
        </Text>
      </View>

      {/* Filter Modal */}
      <Modal
        visible={filterModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setFilterModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Filter TODOs</Text>
          <TouchableOpacity
            style={[
              styles.modalButton,
              filter === 'All' && styles.activeModalButton,
            ]}
            onPress={() => {
              setFilter('All');
              setFilterModalVisible(false);
            }}>
            <Text style={styles.modalButtonText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.modalButton,
              filter === 'Active' && styles.activeModalButton,
            ]}
            onPress={() => {
              setFilter('Active');
              setFilterModalVisible(false);
            }}>
            <Text style={styles.modalButtonText}>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.modalButton,
              filter === 'Done' && styles.activeModalButton,
            ]}
            onPress={() => {
              setFilter('Done');
              setFilterModalVisible(false);
            }}>
            <Text style={styles.modalButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Sort Modal */}
      <Modal
        visible={sortModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSortModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Sort TODOs</Text>
          <TouchableOpacity
            style={[
              styles.modalButton,
              sortOption === 'ID' && styles.activeModalButton,
            ]}
            onPress={() => {
              setSortOption('ID');
              setSortModalVisible(false);
            }}>
            <Text style={styles.modalButtonText}>Sort by ID</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.modalButton,
              sortOption === 'Recent' && styles.activeModalButton,
            ]}
            onPress={() => {
              setSortOption('Recent');
              setSortModalVisible(false);
            }}>
            <Text style={styles.modalButtonText}>Sort by Most Recent</Text>
          </TouchableOpacity>
        </View>
      </Modal>

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
  container: {
    flex: 1,
    paddingTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  iconButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
  },
  countContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  countText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  modalButton: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  activeModalButton: {
    backgroundColor: '#6200ee',
  },
  modalButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default MainScreen;
