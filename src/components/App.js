import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import TodosList from './TodosList';
import EditTodo from './EditTodo';
import CreateTodo from './CreateTodo';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="https://www.google.com" target="_blank" rel="noopener noreferrer">
              <img src={"https://i1.wp.com/upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/256px-Google_%22G%22_Logo.svg.png?w=256&ssl=1"} width="30" height="30" alt="Google" />
            </a>
            <Link to="/" className="navbar-brand">MERN-Stack Todo App</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Todos</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Todo</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br />
          <Route path="/" exact component={TodosList} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />
        </div>
      </Router>
    );
  }
}
