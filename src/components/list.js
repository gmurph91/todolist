  
import React, {Component} from 'react';
export default class List extends Component{
    
    render(){
        return (
                <div className="listItem">
                    <button className="itemButton" id={this.props.id2} onClick={this.props.clicked}>{this.props.itemname}</button>
                    <label className="container">
                    <input name={this.props.itemname} data-description={this.props.description} data-duedate={this.props.duedate} id={this.props.id} data-list={this.props.list} type="checkbox" checked={this.props.complete} onChange={this.props.completechange}/>
                    <span className={`checkmark ${this.props.complete}`}></span>
                    </label>
                    <div className="content" id={this.props.id2 + 1}>
                    <p>{this.props.description}</p>
                    <p>Due: {this.props.duedate}</p>
                    </div>
                </div>
        )
    }
}