import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { ListItem, Avatar, Button, Header } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Cadastro({ route, navigation }) {

    const [getEmail, setEmail] = useState('');
    const [getSenha, setSenha] = useState('');
    const [response, setResponse] = useState(null);
    const [invalido, setInvalido] = useState(false);


    async function inserirDados() {
        await axios.post('https://api-login-production-b754.up.railway.app/clientes/post', {
            email: getEmail,
            senha: getSenha
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });

        navigation.navigate('Login')
    }

    function verificarEmail() {
        axios.get('https://api-login-production-b754.up.railway.app/clientes/' + getEmail, {
            email: getEmail,
        }).then(function (response) {
            console.log(response);
            setResponse(response.data.length);
            const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

            if (getEmail.match(isValidEmail)) {
                if (response.data.length == 0 && getSenha !== '') {
                    inserirDados()
                } else {
                    console.log(response.data.length);
                }
            } else {
                setInvalido(true)
                console.log('nao match')
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <SafeAreaProvider>
            <Header
                barStyle="default"
                centerComponent={{
                    text: "Usuário",
                    style: { color: "#fff" }
                }}
                leftComponent={{
                    icon: "arrow-left",
                    color: "#fff",
                    onPress: () => navigation.navigate('Login')

                }}
                placement="center"
            />
            <View style={styles.container}>

                {response == 1 ? <Text style={styles.errorMessage}> E-mail já existente no sistema.</Text> : null}
                {invalido == true ? <Text style={styles.errorMessage}> E-mail inválido ou senha vazia.</Text> : null}

                <View style={{ width: 260 }}>
                    <Text style={styles.textView}>E-mail:</Text>
                    <TextInput style={styles.inputView}
                        onChangeText={text => setEmail(text)}
                        value={getEmail}
                    />

                    <Text style={styles.textView}>Senha:</Text>
                    <TextInput style={styles.inputView}
                        secureTextEntry={true}
                        label={'Email'}
                        onChangeText={text => setSenha(text)}
                        value={getSenha}
                    />
                </View>

                <Button
                    buttonStyle={{ backgroundColor: '#1670f7', borderColor: '#999491', borderWidth: 1, width: 260, marginTop: 4 }}
                    titleStyle={{ fontWeight: 'bold' }}
                    title='Salvar'
                    onPress={() => verificarEmail()}>
                </Button>
            </View>
        </SafeAreaProvider>
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
    heading: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    textView: {
        alignSelf: 'flex-start',
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
    buttonsView: {
        display: 'grid',
        gap: 10,
        width: 260,
        marginTop: 4
    },
});
