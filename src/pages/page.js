import React, { Component } from 'react';
import List from '../components/list';
import Popup from "reactjs-popup";
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
      open: false,
      adding: "hidden",
      selected: "hidden"
    }
  this.completechange = this.completechange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
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

  clicked = (event) => {
    const id = event.target.id;
    var content = document.getElementById(`${id}` + 1);
    if (content.style.display === "block") {
      content.style.display = "none";
      content.parentElement.style="margin-bottom: 0px"
    } else {
      content.style.display = "block";
      content.parentElement.style="margin-bottom: 48px"
    }
  }

  selectList = (event) => {
    this.setState({
      listID: event.target.id,
      selected: 'nothidden'
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

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ 
      itemName: this.element.value, 
      description: this.element2.value,
      dueDate: this.element3.value, 
      open: false,
    });
    this.addItem(event)
  }

  addItem = async (event) => {
    await(this.setState({event}))
    this.props.createItem({
      listID:this.state.listID,
      itemName:this.state.itemName, 
      description:this.state.description, 
      dueDate:this.state.dueDate,
      complete: false,
    })}

    addList = () => {
      if(this.state.adding==="hidden"){
      this.setState({
        adding: "nothidden"
      })} else {
        this.setState({
          adding: "hidden"
        })
      }
    }

    submitList = () => {
      this.props.createList({
        listName:this.state.listName,
      })
      this.setState({
        adding: "hidden",
        listName: "",
      })
    }

  render() {
    const Modal = () => (
      <Popup
        trigger={<img src="plus.png" className={`plusSign2 ${this.state.selected}`} alt="add"/>}
        modal
        onClose={this.reset}
      >
        <span>
        <form onSubmit={this.handleSubmit}>
        <label className="newItem">Title:
          <input type="text" ref={el => this.element = el} />
        </label>
        <label className="newItem">Description:
          <input type="text" ref={el2 => this.element2 = el2} />
        </label>
        <label className="newItem">Due date:
          <input type="text" ref={el3 => this.element3 = el3} />
        </label>
        <input type="submit" value="Submit" />
      </form>
        </span>
      </Popup>
    );
    return (
        <div className="main">
        <section className="lists">
            {this.renderLists()}
            <div className={this.state.adding}>
            <input id="listField" value={this.state.listName} type="text" onKeyUp={(event)=>{if (event.keyCode===13){this.submitList()}}} onChange={(event)=>{this.setState({listName: event.target.value})}}/>
            <p className="enter">Hit "Enter" to Save</p>
            </div>
            <img src="plus.png" className="plusSign" alt="add" onClick={this.addList}/>
          </section>
          <section className="items">
            {this.renderItems()}
            {this.renderItems2()}
            <Modal />
          </section>
      </div>
    )
  }
}