import React, {Component} from 'react';
import './App.css';
import Page from './pages/page'
import { Route } from 'react-router-dom' 
// const axios = require('axios');

export default class App extends Component {
  state = {
    lists: [],
    items: []
  }

  componentDidMount() {
    this.getLists()
    this.getItems()
  }

  componentDidUpdate() {
    this.removeCustom()
  }

  removeCustom = () => {
    var elems = document.querySelectorAll(".customtrue");
      [].forEach.call(elems, function(el) {
       el.classList.remove("customtrue");
      });
      var elems2 = document.querySelectorAll(".customfalse");
      [].forEach.call(elems2, function(el2) {
       el2.classList.remove("customfalse");
      });
  }

  getLists = async () => {
    try {
      const promise = await fetch(`https://gregapis.herokuapp.com/lists/getLists`)
      this.setState({
        lists: await promise.json()
      })
    } catch (e) {
      console.log(e)
    }}

    getItems = async () => {
      try {
        const promise = await fetch(`https://gregapis.herokuapp.com/lists/getItems`)
        this.setState({
          items: await promise.json()
        })
      } catch (e) {
        console.log(e)
      }}

  createList = async (listitem) => {
    try {
      const apiCall = await fetch(`https://gregapis.herokuapp.com/lists/createList`, {
        method: 'POST',
        body: JSON.stringify(listitem),
        headers: { 'Content-Type': 'application/JSON', },
      })
      await apiCall
      this.getLists()
    } catch (e) {
      console.log(e)
    }
  }

  createItem = async (listitem) => {
    try {
      const apiCall = await fetch(`https://gregapis.herokuapp.com/lists/createItem`, {
        method: 'POST',
        body: JSON.stringify(listitem),
        headers: { 'Content-Type': 'application/JSON', },
      })
      await apiCall
      this.getItems()
    } catch (e) {
      console.log(e)
    }
  }

  updateList = async (name) => {
    try {
      let id = name.id
      const update = await fetch(`https://gregapis.herokuapp.com/lists/updateList/${id}`, {
        method: 'PUT',
        body: JSON.stringify(name),
        headers: { 'Content-Type': 'application/JSON', },
      })
      await update
      this.getLists()
    } catch (err) {
      console.log(err)
    }
  }

  updateItem = async (name) => {
    try {
      let id = name.id
      const update = await fetch(`https://gregapis.herokuapp.com/lists/updateItem/${id}`, {
        method: 'PUT',
        body: JSON.stringify(name),
        headers: { 'Content-Type': 'application/JSON', },
      })
      await update
      this.getItems()
    } catch (err) {
      console.log(err)
    }
  }

  deleteList = async (name) => {
    try {
      let id = name.id
      const update = await fetch(`https://gregapis.herokuapp.com/lists/deleteList/${id}`, {
        method: 'DELETE'
      })
      await update
      this.getLists()
    } catch (err) {
      console.log(err)
    }
  }

  deleteItem = async (name) => {
    try {
      let id = name.id
      const update = await fetch(`https://gregapis.herokuapp.com/lists/deleteItem/${id}`, {
        method: 'DELETE'
      })
      await update
      this.getItems()
    } catch (err) {
      console.log(err)
    }
  }

 renderPage = () => {
    return (
      <Page lists={this.state.lists} items={this.state.items} updateList={this.updateList} updateItem={this.updateItem} deleteList={this.deleteList} deleteItem={this.deleteItem} createList={this.createList} createItem={this.createItem}/>
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
