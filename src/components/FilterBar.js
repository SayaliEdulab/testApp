import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const FilterBar = ({filter, setFilter}) => {
  return (
    <View style={styles.filterContainer}>
      <Button
        title="All"
        onPress={() => setFilter('All')}
        color={filter === 'All' ? 'blue' : 'gray'} // Highlight active filter
      />
      <Button
        title="Active"
        onPress={() => setFilter('Active')}
        color={filter === 'Active' ? 'blue' : 'gray'}
      />
      <Button
        title="Done"
        onPress={() => setFilter('Done')}
        color={filter === 'Done' ? 'blue' : 'gray'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default FilterBar;
