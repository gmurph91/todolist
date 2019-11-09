  
import React, {Component} from 'react';
// import propTypes from 'prop-types';
export default class List extends Component{
    
    render(){
        return (
                <div>
                    <button className="List" onClick={this.props.clicked}>{this.props.name}</button>
                    <input name={this.props.name} description={this.props.description} id={this.props.id} className={this.props.list} type="checkbox" checked={this.props.complete} onChange={this.props.completechange}/>
                </div>
        )
    }
}