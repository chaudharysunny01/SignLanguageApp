import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppSet from './navigation/AppSet';
import Progress from './navigation/Progress';
import Test from './navigation/Test';
import AlphabetScreen from './navigation/AlphabetScreen';
import AlphabetDetailScreen from './navigation/AlphabetDetailScreen';
import Home from './navigation/Home';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import TestScreen from './navigation/Test';
import WordsSentenceScreen from './navigation/WordsSentenceScreen';
import WordsDetailScreen from './navigation/WordsDetailScreen';
import MathScreen from './navigation/MathScreen';
import ScienceScreen from './navigation/ScienceScreen';
import ScienceDetailScreen from './navigation/ScienceDetailScreen';
import MathDetailScreen from './navigation/MathDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Hello, Learner" component={Home} options={{ headerShown: false }} />
    <Stack.Screen name="AlphabetScreen" component={AlphabetScreen} />
    <Stack.Screen name="AlphabetDetailScreen" component={AlphabetDetailScreen} />
    <Stack.Screen name="Test" component={Test} />
    <Stack.Screen name="WordsSentenceScreen" component={WordsSentenceScreen} />
    <Stack.Screen name="WordsDetailScreen" component={WordsDetailScreen} />
    <Stack.Screen name="MathScreen" component={MathScreen} />
    <Stack.Screen name="MathDetailScreen" component={MathDetailScreen} />
    <Stack.Screen name="ScienceScreen" component={ScienceScreen} />
    <Stack.Screen name="ScienceDetailScreen" component={ScienceDetailScreen} />
  </Stack.Navigator>
);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false); 

  return (
    <NavigationContainer>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : isLoggedIn ? (
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="home" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Progress"
            component={Progress}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="progress-check" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Test"
            component={TestScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="ab-testing" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={AppSet}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Feather name="settings" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <LoginScreen setIsLoggedIn={setIsLoggedIn} setLoading={setLoading} />
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
