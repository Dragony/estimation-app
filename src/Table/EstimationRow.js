import React, {Component} from 'react';

class EstimationRow extends Component {
    updateEstimate(valueName, event){
        let obj = {};
        obj[valueName] = event.target.value;
        this.props.model.updateEstimate(obj);
    }
    render() {
        return (
            <tr>
                <td>{this.props.model.state.description}</td>
                <td><input className="App-estimation-input" defaultValue={this.props.model.state.minEst} onInput={this.updateEstimate.bind(this, "minEst")}/></td>
                <td><input className="App-estimation-input" defaultValue={this.props.model.state.optEst} onInput={this.updateEstimate.bind(this, "optEst")}/></td>
                <td><input className="App-estimation-input" defaultValue={this.props.model.state.maxEst} onInput={this.updateEstimate.bind(this, "maxEst")}/></td>
                <td className="totalEst">{this.props.model.state.totalEst}</td>
            </tr>
        );
    }
}

export default EstimationRow;