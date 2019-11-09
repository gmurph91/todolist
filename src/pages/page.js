import React, {Component} from 'react';
import List from '../components/list';
// import propTypes from 'prop-types';
export default class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
          complete: false,
          name: "",
          default: false,
        };
    
        this.completechange = this.completechange.bind(this);
      }

    completechange = async (event) => {
        const id = event.target.id;
        const target = event.target;
        var x = document.getElementById(`${id}`)
        console.log(x.className)
         const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
      complete: value,
      name: event.target.name,
      description: event.target.description,
      id: event.target.id,
      list: x.className,
    });
    await (this.setState)
    this.update(this.state.id)
    console.log(this.state)
    }

    clicked = () => {
        console.log("this clicked")
    }

    renderLists = () => {
        try{
        let array = this.props.list
        const unique = [...new Set(array.map(item => item.list))];
        return unique.map((item, i) => {
            return (
            <div key={i} className="todolist">
                <h2 className="listheader">To Do:</h2>
                        {this.renderList(unique[i])}
                <h2 className="listheader">Complete:</h2>
                        {this.renderList2(unique[i])}
            </div>)
    })} catch (e) {
    console.log(e)
}}
      

    renderList = (listID) => {
        try{
        let list = this.props.list.filter(toDo => toDo.complete === false && toDo.list === listID)
        return list.map((item, i) => {
          return <List key={i} id={list[i]._id} name={list[i].name} description={list[i].description} complete={this.state.default} clicked={this.clicked} list={list[i].list} completechange={this.completechange}/>
        })} catch (e) {
            console.log(e)
        }}

        renderList2 = (listID) => {
            try{
            let list = this.props.list.filter(toDo => toDo.complete === true && toDo.list === listID)
            return list.map((item, i) => {
              return <List key={i} id={list[i]._id} name={list[i].name} description={list[i].description} complete={list[i].complete} clicked={this.clicked} list={list[i].list} completechange={this.completechange}/>
            })} catch (e) {
                console.log(e)
            }}

        save = () => {
            this.props.saveNew({
              name:this.state.name, 
              description:this.state.description,
              list:this.state.list,
              complete: false,
            })
          }

          update = (id) => {
            this.props.update({
              name:this.state.name, 
              description:this.state.description,
              list: this.state.list,
              complete: this.state.complete,
              id: id
            })
          }


    render (){
        return (
        <div className="App">
              <div className="main">
              <section className="lists">
                {this.renderLists()}
                </section>
              </div>
              <form>
                  <label htmlFor="To Do">To Do:</label>
                  <input id = "To Do" type = "text" value={this.state.name} onChange={(e)=>{
                      this.setState({
                          name: e.target.value
                      })
                  }}/>
                  <label htmlFor="Description">Description:</label>
                  <input id = "Description" type = "text" value={this.state.description} onChange={(e)=>{
                      this.setState({
                        description: e.target.value
                      })
                  }}/>
                  <label htmlFor="list">List:</label>
                  <input id = "list" type = "text" value={this.state.list} onChange={(e)=>{
                      this.setState({
                        list: e.target.value
                      })
                  }}/>
                  <input type="button" onClick={this.save} value="Submit"/>
              </form>
            </div>
        )
        }
        }