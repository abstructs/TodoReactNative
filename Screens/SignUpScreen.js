import React from 'react';
import {
    AppRegistry,
    Text,
    Button,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';
import { StackNavigator } from 'react-navigation';

const signup_style = StyleSheet.create({
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

export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        emailValue: '',
        passwordValue: '',
        passwordConfirmationValue: '',
        error: {
            emailError: '',
            passwordError: '',
            passwordConfirmationError: ''
        }
    }
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
      var passwordConfirmationError = '';

      // test email
      if (this.state.emailValue == '') {
          if (emailError != '') emailError += '\n';
          emailError += 'Field can\'t be blank.';
      }
      else if (!email_regex.test(this.state.emailValue.trim())) {
          emailError += 'Invalid email.';
      }

      // test password
      if (this.state.passwordValue == '') {
          if (passwordError != '') passwordError += '\n';
          passwordError += 'Field can\'t be blank.';
      }
      else if (this.state.passwordValue.includes(" ")) {
          if (passwordError != '') passwordError += '\n';
          passwordError += 'Password cannot contain whitespace.';
      }
      else if (this.state.passwordValue.length < 6) {
          if (passwordError != '') passwordError += '\n';
          passwordError += 'Password must be at least 6 \ncharacters in length.';
      }

      // test password confirmation
      if (this.state.passwordConfirmationValue == '') {
          if (passwordConfirmationError != '') passwordConfirmationError += '\n';
          passwordConfirmationError += 'Field can\'t be blank.';
      }
      else if (this.state.passwordConfirmationValue != this.state.passwordValue) {
          if (passwordConfirmationError != '') passwordConfirmationError += '\n';
          passwordConfirmationError += 'Passwords don\'t match.\n';
      }

      // update error values so fields can reset 
      newErrorObj['emailError'] = emailError;
      newErrorObj['passwordError'] = passwordError;
      newErrorObj['passwordConfirmationError'] = passwordConfirmationError;

      this.setState({
          ...this.state,
          error: newErrorObj
      });

      if (emailError == '' && passwordError == '' && passwordConfirmationError == '') {
          this.submitInfo()
      }
  }

  submitInfo() {
        fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.emailValue,
                password: this.state.passwordValue,
                passwordConfirmation: this.state.passwordConfirmationValue
            })
        }).then((response)=> {
            console.log(response)
            if (response.status == 200) {
                response.json().then((data) => {
                    console.log(data);
                })
            }
            else {
                response.json().then((data) => {
                    console.log(data);
                }).catch((error) => {
                    console.log(error)
                })
            }
        });
  }

  static navigationOptions = {
    title: 'Sign Up'
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
        <View style={signup_style.container}>
            <View style={signup_style.textboxView}>
                <Text style={[signup_style.textLabel, this.textColor('emailError')]}>Email:</Text>
                <TextInput value={this.state.emailValue} style={[signup_style.textInput, this.boxColor('emailError')]} onChangeText={(text) => this.setState({ ...this.state, emailValue: text }) }></TextInput>
                <Text style={[signup_style.errorLabel, this.textColor('emailError')]}>{this.state.error.emailError}</Text>
            </View>
            <View style={signup_style.textboxView}>
                <Text style={[signup_style.textLabel, this.textColor('passwordError')]}>Password:</Text>
                <TextInput secureTextEntry={true} value={this.state.passwordValue} onChangeText={(text) => this.setState({ ...this.state, passwordValue: text }) } style={[signup_style.textInput, this.boxColor('passwordError')]}></TextInput>
                <Text style={[signup_style.errorLabel, this.textColor('passwordError')]}>{this.state.error.passwordError}</Text>
            </View>
            <View style={signup_style.textboxView}>
                <Text style={[signup_style.textLabel, this.textColor('passwordConfirmationError')]}>Confirm Password:</Text>
                <TextInput secureTextEntry={true} value={this.state.passwordConfirmationValue} onChangeText={(text) => this.setState({ ...this.state, passwordConfirmationValue: text }) } style={[signup_style.textInput, this.boxColor('passwordConfirmationError')]}></TextInput>
                <Text style={[signup_style.errorLabel, this.textColor('passwordConfirmationError')]}>{this.state.error.passwordConfirmationError}</Text>
            </View>
            <TouchableOpacity color='black' onPress={this.handleSubmit.bind(this)} title='Sign Up'>
                <View style={signup_style.submitButtonView}>
                    <Text style={signup_style.submitButtonText}>Sign Up</Text>
                </View>
            </TouchableOpacity>
        </View>
        
    );
  }
}