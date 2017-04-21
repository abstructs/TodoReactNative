import React from 'react';
import {
    AppRegistry,
    Text,
    Button,
    View,
    StyleSheet
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import TodoScreen from './Screens/TodoScreen';

const home_style = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    todoHeader: {
        fontSize: 26
    },
    todoBody: {
        marginLeft: 10,
        marginRight: 10,
        fontSize: 16,
        // textAlign: 'center'
    }
});

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home'
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={home_style.container}>
                <Text style={home_style.todoHeader}>Welcome</Text>
                <Text style={home_style.todoBody}>Todos is the completely non revolutionary way to manage your todo lists!</Text>
                <Button onPress={() => navigate('Todos')} title='Go To Your Todos'/>
            </View>
        );
    }
};

const TodoApp = StackNavigator({
    Home: { screen: HomeScreen },
    Todos: { screen: TodoScreen }
});

AppRegistry.registerComponent('TodoApp', ()=> TodoApp);
