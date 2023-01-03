import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Avatar, Button, Header } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';


export default function ContatosLista({ route, navigation }) {
    const refresh = useIsFocused();
    const [list, setList] = useState([]);

    useEffect(() => {
        function consultarDados() {
            axios.get('http://professornilson.com/testeservico/clientes')
                .then(function (response) {
                    setList(response.data);
                }).catch(function (error) {
                    console.log(error);
                });
        }
        consultarDados();
    }, [refresh])

    return (
        <View>
            <Header
                centerComponent={{ text: 'Lista de Contatos', style: { color: '#fff' } }}
                rightComponent={{
                    text: "+",
                    style: {
                        color: '#2089dc', backgroundColor: '#fff', textAlign: 'center', fontWeight: 'bold',
                        width: 20, height: 20, borderRadius: 50
                    },
                    onPress: () => navigation.navigate('ContatosCadastro')

                }}
            />
            <ScrollView>
                {
                    list.map((l, i) => (
                        <ListItem key={i} bottomDivider onPress={() => navigation.navigate('ContatosAtualizar', {
                            nome: l.nome,
                            email: l.email,
                            telefone: l.telefone,
                            id: l.id
                        })}>
                            <Avatar source={{ uri: "https://img.myloview.com.br/quadros/avatar-icone-vector-usuario-usuario-pessoa-perfil-simbolo-no-circulo-cor-plana-glifo-pictograma-ilustracao-400-142234592.jpg" }} />
                            <ListItem.Content>
                                <ListItem.Title>{l.nome}</ListItem.Title>
                                <ListItem.Title>{l.email}</ListItem.Title>
                                <ListItem.Subtitle>{l.telefone}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    ))
                }
            </ScrollView>
        </View>
    )
}