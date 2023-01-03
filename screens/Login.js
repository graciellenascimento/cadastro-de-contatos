import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { ListItem, Avatar, Button, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';


export default function Login({ route, navigation }) {

  const [getEmail, setEmail] = useState('');
  const [getSenha, setSenha] = useState('');
  const [response, setResponse] = useState(null);

  function realizarLogin() {
    axios.get('https://api-login-production-b754.up.railway.app/clientes/' + getEmail + '&' + getSenha, {
      email: getEmail,
      senha: getSenha
    }).then(function (response) {
      console.log(response);
      console.log(response.data.length);
      setResponse(response.data.length)
      if (response.data.length == 1) {
        console.log('foi')
        navigation.navigate('ContatosLista')
      } else {
        console.log(':(')
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  return (
    <View style={styles.container}>
      <Icon
        raised
        name='user-circle-o'
        type='font-awesome'
        color='#000'
        size={100}
      />

      {response == 0 ? <Text style={styles.errorMessage}> E-mail ou senha incorretos.</Text> : null}

      <View style={{ width: 260 }}>
      <Text style={styles.textView}>E-mail</Text>
      <TextInput style={styles.inputView}
        onChangeText={text => setEmail(text)}
        value={getEmail}
      />

      <Text style={styles.textView}>Senha</Text>
      <TextInput style={styles.inputView}
        secureTextEntry={true}
        onChangeText={text => setSenha(text)}
        value={getSenha}
      />
      </View>

      <Button
        buttonStyle={{ backgroundColor: '#1670f7', borderColor: '#999491', borderWidth: 1, width: 260, marginTop: 4 }}
        titleStyle={{ fontWeight: 'bold' }}
        title='Login'
        onPress={() => realizarLogin()}>
      </Button>
      <Button
        buttonStyle={{ backgroundColor: '#ff1616', borderColor: '#999491', borderWidth: 1, width: 260,  marginTop: 4 }}
        titleStyle={{ fontWeight: 'bold' }}
        title='Cadastrar'
        onPress={() => navigation.navigate('Cadastro')}>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: '#e7ddd7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorMessage: {
    margin: 7,
    padding: 7,
    backgroundColor: '#ff161626',
    borderWidth: 1,
    borderColor: '#ff00006e',
    borderRadius: 4,
    color: '#cf1414',
    fontWeight: 'bold',
  },
  inputView: {
    backgroundColor: '#fff',
    width: 260,
    borderColor: '#999491',
    borderWidth: 1,
    padding: 10
  },
  textView: {
    alignSelf: 'flex-start',
    // marginLeft: 9
  },
  // buttonsView: {
  //   display: 'grid',
  //   gap: 10,
  //   width: 260,
  //   marginTop: 4
  // },
});