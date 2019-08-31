import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './TodosList.css';


const url = 'https://mern-backend-netlify-practice.herokuapp.com/';

const Todo = (props) => {
  return (
    <tr>
      <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
      <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
      <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
      <td>
        <Link to={"/edit/"+props.todo._id}>Edit</Link>
      </td>
    </tr>
  )
}

export default class TodosList extends Component {
  state = {
    todos: []
  }

  async componentDidMount() {
    const response = await axios.get(url);
    if (response.data.length > 0) {
      this.setState({
        todos: response.data
      });
    } else {
      console.log('Error getting todos')
    }
  }

  todoList = (todos) => {
    return todos.map((todo) => {
      return <Todo todo={todo} key={todo._id} />;
    })
  }

  render() {
    const { todos } = this.state;
    return (
      <div>
        <h3>Todos List</h3>
        <table className="table table-striped" style={{marginTop: 20}}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Responsible</th>
              <th>Priority</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.todoList(todos)}
          </tbody>
        </table>
      </div>
    )
  }
}
