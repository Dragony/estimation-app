import React, {Component} from 'react';
import Estimation from '../Model/Estimation';

class AddEstimation extends Component {
    addItem(event){
        event.preventDefault();
        this.props.col.addElement(new Estimation({ description: event.target.querySelector('input').value }));
        event.target.querySelector('input').value = '';
    }
    render(){
        return (
            <tr>
                <td colSpan={6}>
                    <form onSubmit={this.addItem.bind(this)}>
                        <input placeholder="New Item" />
                    </form>
                </td>
            </tr>
        );
    }
}

export default AddEstimation