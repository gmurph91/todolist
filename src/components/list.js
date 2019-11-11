  
import React, {Component} from 'react';
// import propTypes from 'prop-types';
export default class List extends Component{
    
    render(){
        return (
                <div>
                    <button className="List" id={this.props.id2} onClick={this.props.clicked}>{this.props.name}</button>
                    <input name={this.props.name} data-description={this.props.description} data-duedate={this.props.duedate} id={this.props.id} data-list={this.props.list} type="checkbox" checked={this.props.complete} onChange={this.props.completechange}/>
                    <div className="content" id={this.props.id2 + 1}>
                    <p>{this.props.description}</p>
                    <p>Due: {this.props.duedate}</p>
                    </div>
                </div>
        )
    }
}