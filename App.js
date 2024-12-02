import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const MainComponent = () => (
  <View style={styles.componentContainer}>
    <Text style={styles.text}>This is the Main Component</Text>
  </View>
);

const ComponentOne = () => (
  <View style={styles.componentContainer}>
    <Text style={styles.text}>This is Component One</Text>
  </View>
);

const ComponentTwo = () => (
  <View style={styles.componentContainer}>
    <Text style={styles.text}>This is Component Two</Text>
  </View>
);

const App = () => {
  const [selectedComponent, setSelectedComponent] = useState('main'); // Track the selected component

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'main':
        return <MainComponent />;
      case 'one':
        return <ComponentOne />;
      case 'two':
        return <ComponentTwo />;
      default:
        return <MainComponent />;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Component Navigation Example</Text>
      <View style={styles.radioGroup}>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setSelectedComponent('main')}>
          <View style={styles.outerCircle}>
            {selectedComponent === 'main' && (
              <View style={styles.innerCircle} />
            )}
          </View>
          <Text style={styles.radioText}>Main</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setSelectedComponent('one')}>
          <View style={styles.outerCircle}>
            {selectedComponent === 'one' && <View style={styles.innerCircle} />}
          </View>
          <Text style={styles.radioText}>Component One</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setSelectedComponent('two')}>
          <View style={styles.outerCircle}>
            {selectedComponent === 'two' && <View style={styles.innerCircle} />}
          </View>
          <Text style={styles.radioText}>Component Two</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.dynamicComponent}>{renderComponent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  radioGroup: {
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  radioButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    flexDirection: 'row',
    marginTop: 10,
  },
  radioText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  outerCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'black',
  },
  dynamicComponent: {
    marginTop: 20,
    alignItems: 'center',
  },
  componentContainer: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: 'green',
  },
});

export default App;

// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import OTPVerification from './src/countdown';

// const Stack = createStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="OTPVerification"
//           component={OTPVerification}
//           options={{headerShown: false}}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;
