import React, { Component } from 'react';
import axios from 'axios';

//const url = 'https://mern-backend-netlify-practice.herokuapp.com/';
const url = 'https://mern-backend-netlify-practice.herokuapp.com/';
export default class EditTodo extends Component {
  state = {
    todo_description: '',
    todo_responsible: '',
    todo_priority: '',
    todo_completed: false
  }


  async componentDidMount() {
    const response = await axios.get(url+this.props.match.params.id);
    this.setState({
      todo_description: response.data.todo_description,
      todo_responsible: response.data.todo_responsible,
      todo_priority: response.data.todo_priority,
      todo_completed: response.data.todo_completed
    });
  }

  onChangeTodoDescription = (e) => {
    this.setState({
      todo_description: e.target.value
    });
  }

  onChangeTodoResponsible = (e) => {
    this.setState({
      todo_responsible: e.target.value
    });
  }

  onChangeTodoPriority = (e) => {
    this.setState({
      todo_priority: e.target.value
    });
  }

  onChangeTodoCompleted = (e) => {
    this.setState({
      todo_completed: !this.state.todo_completed
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const updatedTodo = {
      todo_description: this.state.todo_description,
      todo_responsible: this.state.todo_responsible,
      todo_priority: this.state.todo_priority,
      todo_completed: this.state.todo_completed
    };

    console.log('Updated todo to post: ', updatedTodo);
    axios.post(url+'update/'+this.props.match.params.id, updatedTodo)
      .then(res => {
        console.log('Updated Todo response: ', res.data)
      });

      this.props.history.push('/');
  }

  handleDelete = (e) => {
    e.preventDefault();
    //console.log('params id: ', this.props.match.params.id);
    axios.get(url+'delete/'+this.props.match.params.id)
      .then(console.log('Deleted from frontend'))
      .catch(err => {
        console.log('error deleting from frontend: ', err)
      })
      this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <h3 align="center">Update Todo</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.todo_description}
              onChange={this.onChangeTodoDescription}
            />
          </div>
          <div className="form-group">
            <label>Responsible: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.todo_responsible}
              onChange={this.onChangeTodoResponsible}
            />
          </div>
          <div className="form-group">
            <label>Priority: </label>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityLow"
                value="Low"
                checked={this.state.todo_priority === 'Low'}
                onChange={this.onChangeTodoPriority}
              />
              <label className="form-check-label">Low</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityMedium"
                value="Medium"
                checked={this.state.todo_priority === 'Medium'}
                onChange={this.onChangeTodoPriority}
              />
              <label className="form-check-label">Medium</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityHigh"
                value="High"
                checked={this.state.todo_priority === 'High'}
                onChange={this.onChangeTodoPriority}
              />
              <label className="form-check-label">High</label>
            </div>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              id="completedCheckbox"
              type="checkbox"
              name="completedCheckbox"
              onChange={this.onChangeTodoCompleted}
              checked={this.state.todo_completed}
              value={this.state.todo_completed}
            />
            <label className="form-check-label" htmlFor="completedCheckbox">
              Completed
            </label>
          </div>

          <br />
          <div className="form-group">
            <input
              className="btn btn-primary"
              type="submit"
              value="Update Todo"
            />
            <button
              className="btn btn-primary"
              onClick={this.handleDelete}
            >Delete
            </button>
          </div>
        </form>
      </div>
    )
  }
}
