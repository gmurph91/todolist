import React, {Component} from 'react';
import './App.css';
import Page from './pages/page'
import { Route } from 'react-router-dom' 
export default class App extends Component {
  state = {
    list: [],
  }

  componentDidMount() {
    this.renderList()
  }

  renderList = async () => {
    try {
      const promise = await fetch(`https://gregtodolistapi.herokuapp.com/get`)
      this.setState({
        list: await promise.json()
      })
    } catch (e) {
      console.log(e)
    }}

  saveNew = async (listitem) => {
    try {
      const apiCall = await fetch(`https://gregtodolistapi.herokuapp.com/post`, {
        method: 'POST',
        body: JSON.stringify(listitem),
        headers: { 'Content-Type': 'application/JSON', },
      })
      await apiCall
      this.renderList()
    } catch (e) {
      console.log(e)
    }
  }

  update = async (name) => {
    try {
      let id = name.id
      const update = await fetch(`https://gregtodolistapi.herokuapp.com/update/${id}`, {
        method: 'PUT',
        body: JSON.stringify(name),
        headers: { 'Content-Type': 'application/JSON', },
      })
      await update
      this.renderList()
    } catch (err) {
      console.log(err)
    }
  }

 renderPage = () => {
    return (
      <Page list={this.state.list} update={this.update} saveNew={this.saveNew} />
    )
  }

  render() {
    return (
      <div className="App">
        <Route exact path='/' render={this.renderPage} />
      </div>
    );
  }
}
