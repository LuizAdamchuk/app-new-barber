import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import UserContextProvider from './src/contexts/UserContext';

import { StackNavigatorr } from './src/routes/AppStack.routes';

export default function App() {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <StatusBar />
        <StackNavigatorr />
      </NavigationContainer>
    </UserContextProvider>
  );
}
