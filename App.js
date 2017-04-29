import React from 'react';
import {
    AppRegistry,
    Text,
    Button,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import TodoScreen from './Screens/TodoScreen';
import SignUpScreen from './Screens/SignUpScreen';
import LogInScreen from './Screens/LogInScreen';
import LoggedInScreen from './Screens/LogInScreen';
const home_style = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    todoHeader: {
        fontSize: 36,
        color: 'white',
        // top: 250,
        backgroundColor: 'rgba(52, 52, 52, 0)'
    },
    todoBody: {
        marginLeft: 10,
        marginRight: 10,
        fontSize: 26,
        // top: 250,
        backgroundColor: 'rgba(52, 52, 52, 0)',
        color: 'white'
        // textAlign: 'center'
    },
    todoButtonView: {
        borderRadius: 5,
        borderColor: 'white',
        borderWidth: 2,
        marginTop: 25,
        width: 250,
        // backgroundColor: 'rgba(0, 175, 255, .4)',
        // fontSize: 30,
    },
    todoButtonText: {
        letterSpacing: 2,
        fontWeight: '300',
        paddingTop: 5,
        paddingBottom: 5,
        color: 'white',
        textAlign: 'center',
        fontSize: 25,
    },
    backgroundImage: {
        flex: 1,
        width: null,
        alignSelf: 'stretch',
        backgroundColor: 'rgba(0,0,0,.6)',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0, 0.4)',
    }
});

class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false,
            user_id: null
        }
    }

    componentDidMount() {
        console.log("Mount");
        // this.loggedIn();
    }

    loggedIn() {
        AsyncStorage.removeItem('user_id');
        const value = AsyncStorage.getItem('user_id');

        if (value !== null){
            // We have data!!
            console.log(value);
            this.setState({
                loggedIn: true,
                user_id: value
            })
        }
        else {
            this.setState({
                loggedIn: false
            })
        }
    }

    static navigationOptions = {
        title: 'Home'
    };
    render() {
        const { navigate } = this.props.navigation;
        // this.loggedIn()
        if(this.state.loggedIn == false) {
            return (
                <View style={home_style.container}>
                    <Image style={home_style.backgroundImage} source={require('./Images/writing.jpg')}>
                        <View style={home_style.container}>
                            <Text style={home_style.todoHeader}>Todo:</Text>
                            <TouchableOpacity style={home_style.todoButton} color='white' onPress={() => navigate('Todos')} title='Go To Your Todos'>
                                <View style={home_style.todoButtonView}>
                                    <Text style={home_style.todoButtonText}>Get Started</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={home_style.todoButton} color='white' onPress={() => navigate('SignUp')} title='Sign Up'>
                                <View style={home_style.todoButtonView}>
                                    <Text style={home_style.todoButtonText}>Sign Up</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity color='black' onPress={() => navigate('LogIn', {loggedIn: this.loggedIn.bind(this)})} title='Log In'>
                                <View style={home_style.todoButtonView}>
                                    <Text style={home_style.todoButtonText}>Log In</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Image>
                </View>
            )
        }
        else {
            return ( 
                <Text>Logged In</Text>
            );
        }
    }
};

const TodoApp = StackNavigator({
    // Home: { screen: LogInScreen },
    Home: { screen: HomeScreen },
    Todos: { screen: TodoScreen },
    SignUp: { screen: SignUpScreen },
    LogIn: { screen: LogInScreen },
    LoggedInScreen: { screen: LoggedInScreen }
});

AppRegistry.registerComponent('TodoApp', ()=> TodoApp);
