import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { ListItem, Avatar, Button, Header } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function ContatosAtualizar({ route, navigation }) {

    const [getNome, setNome] = useState('');
    const [getEmail, setEmail] = useState('');
    const [getTelefone, setTelefone] = useState('');
    const [getId, setId] = useState();


    useEffect(() => {
        if (route.params) {
            const { nome } = route.params;
            const { email } = route.params;
            const { telefone } = route.params;
            const { id } = route.params;

            setNome(nome);
            setEmail(email);
            setTelefone(telefone);
            setId(id);
        }
    }, [])

    function alterarDados() {

        axios.put('http://professornilson.com/testeservico/clientes/' + getId,
            {
                nome: getNome,
                email: getEmail,
                telefone: getTelefone,
            }).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);

            });
    }

    function excluirDados() {
        axios.delete('http://professornilson.com/testeservico/clientes/' + getId).then(
            function (response) {
                setNome(null);
                setEmail(null);
                setTelefone(null);
                setId(null);
            }).catch(function (error) {
                console.log(error);
            });
    }

    return (
        <SafeAreaProvider>
            <Header
                barStyle="default"
                centerComponent={{
                    text: "Contato",
                    style: { color: "#fff" }
                }}
                leftComponent={{
                    icon: "arrow-left",
                    color: "#fff",
                    onPress: () => navigation.navigate('ContatosLista')

                }}
                placement="center"
            />

            <View style={styles.container}>
                <View>
                    <Text style={styles.textView}>Nome:</Text>
                    <TextInput style={styles.inputView}
                        onChangeText={text => setNome(text)}
                        value={getNome}
                    />

                    <Text style={styles.textView}>E-mail:</Text>
                    <TextInput style={styles.inputView}
                        onChangeText={text => setEmail(text)}
                        value={getEmail}
                    />

                    <Text style={styles.textView}>Telefone:</Text>
                    <TextInput style={styles.inputView}
                        onChangeText={text => setTelefone(text)}
                        value={getTelefone}
                    />
                </View>

                <Button style={styles.buttonsView}
                    buttonStyle={{ backgroundColor: '#1670f7', borderColor: '#999491', borderWidth: 1, width: 260, marginTop: 4 }}
                    titleStyle={{ fontWeight: 'bold' }}
                    title='Alterar'
                    onPress={() => alterarDados()}>
                </Button>
                <Button style={styles.buttonsView}
                    buttonStyle={{ backgroundColor: '#ff1616', borderColor: '#999491', borderWidth: 1, width: 260, marginTop: 4 }}
                    titleStyle={{ fontWeight: 'bold' }}
                    title='Excluir'
                    onPress={() => excluirDados()}>
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
    inputView: {
        backgroundColor: '#fff',
        width: 260,
        borderColor: '#999491',
        borderWidth: 1,
        padding: 10
    },
    textView: {
        alignSelf: 'flex-start',
    },
    buttonsView: {
        display: 'grid',
        gap: 10,
        width: 260,
        marginTop: 4
    },
});