import * as React from 'react';
import { View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Cadastro from './screens/Cadastro';
import ContatosLista from './screens/ContatosLista';
import ContatosCadastro from './screens/ContatosCadastro';
import ContatosAtualizar from './screens/ContatosAtualizar';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login}
          options={{ headerShown: false }} />

        <Stack.Screen name="Cadastro" component={Cadastro}
          options={{ headerShown: false }} />

        <Stack.Screen name="ContatosLista" component={ContatosLista}
          options={{ headerShown: false }} />

        <Stack.Screen name="ContatosCadastro" component={ContatosCadastro}
          options={{ headerShown: false }} />

        <Stack.Screen name="ContatosAtualizar" component={ContatosAtualizar}
          options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;