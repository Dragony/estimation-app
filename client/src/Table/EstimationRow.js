import React, {Component} from 'react';

class EstimationRow extends Component {
    updateEstimate(valueName, event){
        let obj = {};
        obj[valueName] = event.target.value;
        this.props.model.updateEstimate(obj);
    }
    componentDidMount(){
        this.firstInput && this.firstInput.focus();
    }
    render() {
        return (
            <tr>
                <td>{this.props.model.state.description}</td>
                <td>
                    <input
                        className="App-estimation-input"
                        defaultValue={this.props.model.state.minEst}
                        onInput={this.updateEstimate.bind(this, "minEst")}
                        ref={(input) => {this.firstInput = input}}
                    />
                </td>
                <td><input className="App-estimation-input" defaultValue={this.props.model.state.optEst} onInput={this.updateEstimate.bind(this, "optEst")}/></td>
                <td><input className="App-estimation-input" defaultValue={this.props.model.state.maxEst} onInput={this.updateEstimate.bind(this, "maxEst")}/></td>
                <td className="totalEst">{this.props.model.state.totalEst}</td>
                <td><img src="trash.png" alt="delete" className="estimation-delete" width="16" onClick={this.props.model.remove.bind(this.props.model)} /></td>
            </tr>
        );
    }
}

export default EstimationRow;