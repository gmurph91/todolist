import React, {Component} from 'react';
import List from '../components/list';
// import propTypes from 'prop-types';
export default class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
          complete: false,
          name: "",
          duedate: "",
          description: "",
          list: "",
          default: false,
        };
    
        this.completechange = this.completechange.bind(this);
      }

    completechange = async (event) => {
        const id = event.target.id;
        const target = event.target;
        var x = document.getElementById(`${id}`)
         const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
      complete: value,
      name: event.target.name,
      description: x.dataset.description,
      duedate: x.dataset.duedate,
      id: event.target.id,
      list: x.dataset.list,
    });
    await (this.setState)
    this.update(this.state.id)
    this.setState({
        complete: false,
        name: "",
        duedate: "",
        description: "",
        list: "",
    })
    }

    clicked = (event) => {
         const id = event.target.id;
          var content = document.getElementById(`${id}`+1);
          if (content.style.display === "block") {
            content.style.display = "none";
          } else {
            content.style.display = "block";
          }
    }

    renderLists = () => {
        try{
        let array = this.props.list
        const unique = [...new Set(array.map(item => item.list))];
        return unique.map((item, i) => {
            return (
            <div key={i} className="todolist">
              <h2 className="listheader">{unique[i]}</h2>
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
          let id2=list[i]._id
          let id3 = id2.replace(/\D/g,'');
          return <List key={i} id={list[i]._id} id2={id3} name={list[i].name} description={list[i].description} duedate={list[i].duedate} complete={this.state.default} clicked={this.clicked} list={list[i].list} completechange={this.completechange}/>
        })} catch (e) {
            console.log(e)
        }}

        renderList2 = (listID) => {
            try{
            let list = this.props.list.filter(toDo => toDo.complete === true && toDo.list === listID)
            return list.map((item, i) => {
              let id2=list[i]._id
              let id3 = id2.replace(/\D/g,'');
              return <List key={i} id={list[i]._id} id2={id3} name={list[i].name} description={list[i].description} duedate={list[i].duedate} complete={list[i].complete} clicked={this.clicked} list={list[i].list} completechange={this.completechange}/>
            })} catch (e) {
                console.log(e)
            }}

        save = () => {
            this.props.saveNew({
              name:this.state.name, 
              description:this.state.description,
              duedate:this.state.duedate,
              list:this.state.list,
              complete: false,
            })
          }

          update = (id) => {
            this.props.update({
              name:this.state.name, 
              description:this.state.description,
              duedate: this.state.duedate,
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
                <h2>New To Do Item</h2>
              <div className="field">
                  <label htmlFor="To Do">Title:</label>
                  <input id = "To Do" type = "text" value={this.state.name} onChange={(e)=>{
                      this.setState({
                          name: e.target.value
                      })
                  }}/>
                  </div>
                  <div className="field">
                  <label htmlFor="Description">Description:</label>
                  <input id = "Description" type = "text" value={this.state.description} onChange={(e)=>{
                      this.setState({
                        description: e.target.value
                      })
                  }}/>
                  </div>
                  <div className="field">
                  <label htmlFor="due">Due Date:</label>
                  <input id = "due" type = "text" value={this.state.duedate} onChange={(e)=>{
                      this.setState({
                        duedate: e.target.value
                      })
                  }}/>
                  </div>
                  <div className="field">
                  <label htmlFor="list">List Name:</label>
                  <input id = "list" type = "text" value={this.state.list} onChange={(e)=>{
                      this.setState({
                        list: e.target.value
                      })
                  }}/>
                  </div>
                  <input type="button" onClick={this.save} value="Submit"/>
              </form>
            </div>
        )
        }
        }