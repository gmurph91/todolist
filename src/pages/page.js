import React, { Component } from 'react';
import List from '../components/list';
// import propTypes from 'prop-types';
export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
      listName: "",
      listID: "",
      itemName: "",
      itemID: "",
      dueDate: "",
      description: "",
      default: false,
    }
  this.completechange = this.completechange.bind(this);
}

createList = () => {
  this.props.createList({
    listName: this.state.listName,
  })
}

createItem = () => {
  this.props.createItem({
    listID: this.state.listID,
    itemName: this.state.itemName,
    dueDate: this.state.dueDate,
    description: this.state.description,
    complete: false,
  })
}

updateList = (id) => {
  this.props.updateList({
    listName: this.state.listName,
    id: id,
  })
}

updateItem = (id) => {
  this.props.updateItem({
    listID: this.state.listID,
    itemName: this.state.itemName,
    dueDate: this.state.dueDate,
    description: this.state.description,
    complete: this.state.complete,
    id: id
  })
}

  completechange = async (event) => {
    const id = event.target.id;
    const target = event.target;
    var x = document.getElementById(`${id}`)
    const value = target.type === 'checkbox' ? target.checked : target.value;
    if(value === true){
      x.nextSibling.classList.add("customtrue")
      x.nextSibling.classList.remove("customfalse")
    }
    else if(value === false){
      x.nextSibling.classList.remove("customtrue")
      x.nextSibling.classList.remove("true")
      x.nextSibling.classList.add("customfalse")
    }
    this.setState({
      complete: value,
      itemName: event.target.name,
      description: x.dataset.description,
      dueDate: x.dataset.duedate,
      id: event.target.id,
    });
    await (this.setState)
    this.updateItem(id)
    this.setState({
      complete: false,
      listName: "",
      itemName: "",
      dueDate: "",
      description: "",
      default: false,
    })
  }

  clicked = (event) => {
    const id = event.target.id;
    var content = document.getElementById(`${id}` + 1);
    if (content.style.display === "block") {
      content.style.display = "none";
      content.parentElement.style="margin-bottom: 0px"
    } else {
      content.style.display = "block";
      content.parentElement.style="margin-bottom: 36px"
    }
  }

  selectList = (event) => {
    this.setState({
      listID: event.target.id
    })
  }

  renderLists = () => {
    try {
      let array = this.props.lists
      return array.map((item, i) => {
        return (<button className="listButton" id={item._id} onClick={this.selectList} key={i}>{item.listName}</button>)
      })
    } catch (e) {
      console.log(e)
    }
  }

  renderItems = () => {
    try {
      let list = this.props.items.filter(toDo => toDo.complete === false && toDo.listID === this.state.listID)
      return list.map((item, i) => {
        let id2 = item._id.replace(/\D/g, '');
        return <List key={i} id={item._id} id2={id2} itemname={item.itemName} description={item.description} duedate={item.dueDate} complete={this.state.default} clicked={this.clicked} completechange={this.completechange} />
      })
    } catch (e) {
      console.log(e)
    }
  }

  renderItems2 = () => {
    try {
      let list = this.props.items.filter(toDo => toDo.complete === true && toDo.listID === this.state.listID)
      return list.map((item, i) => {
        let id2 = item._id.replace(/\D/g, '');
        return <List key={i} id={item._id} id2={id2} itemname={item.itemName} description={item.description} duedate={item.dueDate} complete={item.complete} clicked={this.clicked} completechange={this.completechange} />
      })
    } catch (e) {
      console.log(e)
    }
  }


  render() {
    return (
        <div className="main">
        <section className="lists">
          <h3>Lists</h3>
            {this.renderLists()}
            <img src="plus.png" className="plusSign" alt="add"/>
          </section>
          <section className="items">
            {this.renderItems()}
            {this.renderItems2()}
            <img src="plus.png" className="plusSign2" alt="add"/>
          </section>
        {/* <form>
          <h2 className="newItem">New To Do Item</h2>
          <div className="field">
            <label htmlFor="To Do">Title:</label>
            <input id="To Do" type="text" value={this.state.itemName} onChange={(e) => {
              this.setState({
                itemName: e.target.value
              })
            }} />
          </div>
          <div className="field">
            <label htmlFor="Description">Description:</label>
            <input id="Description" type="text" value={this.state.description} onChange={(e) => {
              this.setState({
                description: e.target.value
              })
            }} />
          </div>
          <div className="field">
            <label htmlFor="due">Due Date:</label>
            <input id="due" type="text" value={this.state.dueDate} onChange={(e) => {
              this.setState({
                dueDate: e.target.value
              })
            }} />
          </div>
          <input type="button" onClick={this.save} value="Submit" />
        </form> */}
      </div>
    )
  }
}