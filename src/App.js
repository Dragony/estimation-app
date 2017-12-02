import React, {Component} from 'react';
import EstimationRow from './Table/EstimationRow.js';
import EstimationCollection from './Model/EstimateCollection';
import Estimation from './Model/Estimation';
import AddEstimation from './Table/AddEstimation';
import TextExport from './TextExport/TextExport';
import './App.css';
import './TextExport/TextExport.css';

class App extends Component {
    constructor(props){
        super(props);
        let els = [
            new Estimation({ description: "Create layout" }),
            new Estimation({ description: "Programm frontend" }),
            new Estimation({ description: "Programm backend" }),
            new Estimation({ description: "Deployment" })
        ];
        this.col = new EstimationCollection(els, this.forceUpdate.bind(this));
    }
    render() {
        let estimationRows = this.col.all().map(function(estimation, k){
            return (<EstimationRow model={estimation} key={k}/>)
        });
        return (
            <div className="App">
                <header className="App-header">
                    <h2>Help estimate</h2>
                    <h1 className="App-title">New estimation App</h1>
                </header>
                <table className="App-estimation-table">
                    <thead>
                        <tr>
                            <th>Estimates</th>
                            <th>min.</th>
                            <th>opt.</th>
                            <th>max.</th>
                            <th>avg.</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {estimationRows}
                        <AddEstimation col={this.col}/>
                        <tr className="total-row">
                            <td colSpan={4}>Total</td>
                            <td className="totalEst">{this.col.getTotalEstimated()}</td>
                            <td>&nbsp;</td>
                        </tr>
                    </tbody>
                </table>
                <TextExport col={this.col}/>
            </div>
        );
    }
}

export default App;
