import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput
} from 'react-native';

export default class TodoScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todoList: [],
      value: ''
    }

    this.todoId = 0;
  }

  handleChangeText(event) {
    this.setState({
      ...this.state,
      value: event
    })
  }

  addTodo() {
    var newTodoList = this.state.todoList.concat([
      {
        id: ++this.todoId,
        item: this.state.value
      }
    ]);

    this.setState({
      ...this.state,
      todoList: newTodoList,
      value: ''
    });
  }

  editTodo(newValue, id) {
    // console.log("Value: " + newValue);
    // console.log(id);

    var newTodoList = this.state.todoList.slice();

    for(var i in newTodoList) {
      if (newTodoList[i].id == id) {
        newTodoList[i].item = newValue;
        break;
      }
    }

    this.setState({
      todoList: newTodoList,
      ...this.state
    });
  }

  deleteTodo(id) {
    var newTodoList = this.state.todoList;
    newTodoList = newTodoList.filter(function(x){
      return x.id !== id;
    });

    this.setState({
      todoList: newTodoList,
      value: ''
    });
  }
  static navigationOptions = {
    title: 'Your Todos'
  };
  render() {
    return (
      <View style={todo_style.main}>
        <TextInput placeholder='ADD' style={todo_style.textInput} onChangeText={this.handleChangeText.bind(this)} value={this.state.value}></TextInput>
        <Button style={todo_style.addButton} title='Add Todo' onPress={this.addTodo.bind(this)}></Button>
        <View style={todo_style.todosBox}>
        {this.state.todoList.map(function(todo) {
          return <Todo id={todo.id} key={todo.id} deleteTodo={this.deleteTodo.bind(this)} editTodo={this.editTodo.bind(this)} todo={todo}></Todo>; 
        }.bind(this))}
        </View>
      </View>
    );
  }
}

class Todo extends Component  {
  constructor(props) {
    super(props)

    this.state = {
      todo: this.props.todo,
      editMode: false,
      value: this.props.todo.item,
      checked: false
    }
  }

  toggleEditMode() {
    if(this.state.editMode) {
      this.setState({
        ...this.state,
        editMode: false,
        value: this.props.todo.item
      })
    }
    else {
      this.setState({
        ...this.state,
        editMode: true
      })
    }
  }
  
  confirmEdit() {
    this.props.editTodo(this.state.value, this.props.id);
    this.setState({
      ...this.state,
      editMode: false
    })
  }

  handleEdit(event) {
    this.toggleEditMode();
  }

  handleDelete() {
    this.props.deleteTodo(this.props.id);
  }

  handleChangeText(event) {
    this.setState({
      ...this.state,
      value: event
    })
  }

  strikeThroughText() {
    if (this.state.checked) return { textDecorationLine: 'line-through' };
  }

  checkTodo() {
    var newChecked = this.state.checked ? false : true;
    this.setState({
      ...this.state,
      checked: newChecked
    });
  }

  render() {
    if(this.state.editMode) {
      return (
        <View style={todo_style.todoContainer}>
          <TextInput style={todo_style.textInput} onChangeText={this.handleChangeText.bind(this)} placeholder='EDIT' value={this.state.value}></TextInput>
          <Button title='Confirm Changes' style={todo_style.editButton} onPress={this.confirmEdit.bind(this)}></Button>
          <Button title='Cancel' style={todo_style.editButton} onPress={this.handleEdit.bind(this)}></Button>
          <Button title='Delete Todo' style={todo_style.deleteButton} onPress={this.handleDelete.bind(this)}></Button>
        </View>
      );
    }
    else {
      return (
        <View style={todo_style.todoContainer}>
          <Text style={[todo_style.todoItem, this.strikeThroughText()]} onPress={this.checkTodo.bind(this)}>{this.state.todo.item}</Text>
          <Button title='Edit Todo' onPress={this.handleEdit.bind(this)}></Button>
          <Button title='Delete Todo' style={todo_style.deleteButton} onPress={this.handleDelete.bind(this)}></Button>
        </View>
      );
    }
  }
}

const todo_style = StyleSheet.create({
  main: {
    // backgroundColor: '#4C79FF',
    height: '100%'
  },
  todoContainer: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da'
  },
  todoItem: {
    fontSize: 20,
    marginLeft: 20,
    height: 40
  },
  editButton: {
    // position: 'relative'
  },
  deleteButton: {
    color: 'red'
  },
  textInput: {
    fontSize: 20,
    marginLeft: 20,
    height: 40,
    justifyContent: 'center',
    // backgroundColor: 'steelblue',
    color: 'black'
  },
  addButton: {
    // flex: 1,
    // height: 50
    color: 'white'
  }
});


