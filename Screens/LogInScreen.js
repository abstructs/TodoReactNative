import React from 'react';
import {
    AppRegistry,
    Text,
    Button,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    AsyncStorage
} from 'react-native';
import { StackNavigator } from 'react-navigation';

const login_style = StyleSheet.create({
    container: {
        alignItems: 'center',
        top: 50,
        flexDirection: 'column',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    submitButton: {
        flex: 1,
        width: null,
        alignSelf: 'stretch',
        backgroundColor: 'rgba(0,0,0, 0.6)',
        marginTop: 50
    },
    submitButtonView: {
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 2,
        marginTop: 25,
        width: 250,
        // backgroundColor: 'rgba(0, 175, 255, .4)',
        // fontSize: 30,
    },
    submitButtonText: {
        letterSpacing: 2,
        fontWeight: '300',
        paddingTop: 5,
        paddingBottom: 5,
        color: 'black',
        textAlign: 'center',
        fontSize: 25,
    },
    textInput: {
        letterSpacing: 2,
        paddingTop: 5,
        paddingLeft: 15,
        paddingBottom: 5,
        textAlign: 'left',
        fontSize: 20,
        fontWeight: '300',
        height: 50,
        width: 250,
        borderRadius: 2,
        borderWidth: 2,
    },
    textLabel: {
        letterSpacing: 2,
        paddingTop: 5,
        paddingBottom: 5,
        textAlign: 'left',
        fontSize: 25,
        fontWeight: '300',
        height: 50,
        width: 250,
    },
});

export default class LogInScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        emailValue: '',
        passwordValue: '',
        error: {
            emailError: '',
            passwordError: '',
            serverError: ''
        }
    }

    console.log();
  }

  boxColor(key) {
      if (this.state.error[key] != '') return { borderColor: 'red' };
      return { borderColor: 'black' }
  }

  textColor(key) {
      if (this.state.error[key] != '') return { color: 'red' };
      return { borderColor: 'black' }
  }

  handleSubmit(event) {
      var newErrorObj = { ...this.state.error };
      const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var emailError = '';
      var passwordError = '';

      // test email
      if (this.state.emailValue == '') {
          if (emailError != '') emailError += '\n';
          emailError += 'Field can\'t be blank.';
      }

      // test password
      if (this.state.passwordValue == '') {
          if (passwordError != '') passwordError += '\n';
          passwordError += 'Field can\'t be blank.';
      }

      // update error values so fields can reset 
      newErrorObj['emailError'] = emailError;
      newErrorObj['passwordError'] = passwordError;

      if (emailError == '' && passwordError == '') {
        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.emailValue,
                password: this.state.passwordValue,
            })
        }).then((response)=> {
            console.log(response)
            if (response.status == 200) {
                response.json().then((data) => {
                    try {
                        AsyncStorage.setItem('user_id', data.user_id.toString());
                        this.props.navigation.state.params.loggedIn();
                    } catch (error) {
                        console.log(error);
                    }
                })
            }
            else {
                response.json().then((data) => {
                    console.log(data);
                }).catch((error) => {
                    console.log(error)
                })
            }
        }).catch((error) => console.log(error));

        this.setState({
          ...this.state,
          error: newErrorObj
      });
    }
  }

  static navigationOptions = {
    title: 'Log In'
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
        <View style={login_style.container}>
            <View style={login_style.textboxView}>
                <Text style={[login_style.textLabel, this.textColor('emailError')]}>Email:</Text>
                <TextInput value={this.state.emailValue} style={[login_style.textInput, this.boxColor('emailError')]} onChangeText={(text) => this.setState({ ...this.state, emailValue: text }) }></TextInput>
                <Text style={[login_style.errorLabel, this.textColor('emailError')]}>{this.state.error.emailError}</Text>
            </View>
            <View style={login_style.textboxView}>
                <Text style={[login_style.textLabel, this.textColor('passwordError')]}>Password:</Text>
                <TextInput secureTextEntry={true} value={this.state.passwordValue} onChangeText={(text) => this.setState({ ...this.state, passwordValue: text }) } style={[login_style.textInput, this.boxColor('passwordError')]}></TextInput>
                <Text style={[login_style.errorLabel, this.textColor('passwordError')]}>{this.state.error.passwordError}</Text>
            </View>
            <TouchableOpacity color='black' onPress={this.handleSubmit.bind(this)} title='Log In'>
                <View style={login_style.submitButtonView}>
                    <Text style={login_style.submitButtonText}>Log In</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
  }
}