import React, {Component} from 'react';
import EstimationRow from './Table/EstimationRow.js';
import EstimationCollection from './Model/EstimateCollection';
import Estimation from './Model/Estimation';
import './App.css';

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
                        </tr>
                    </thead>
                    <tbody>
                        {estimationRows}
                        <tr>
                            <td colSpan={5}><input placeholder="New Item" /></td>
                        </tr>
                        <tr>
                            <td colSpan={4}>Total</td>
                            <td>{this.col.getTotalEstimated()}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default App;
