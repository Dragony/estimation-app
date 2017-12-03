import React, {Component} from 'react';
import EstimationList from './Model/EstimationList.mjs';
import EstimationRow from './Table/EstimationRow';
import AddEstimation from './Table/AddEstimation';
import TextExport from './TextExport/TextExport';
import UpdateQueue from './Api/UpdateQueue.mjs';
import './App.css';
import './TextExport/TextExport.css';

class App extends Component {
    constructor(props){
        super(props);
        this.list = new EstimationList(this.onUpdate.bind(this));
        this.list.populate(this.props.listData);
        this.col = this.list.getCollection();
        this.queue = new UpdateQueue(this.props.listData.uuid);
    }
    onUpdate(){
        //@todo: move this somewhere else. it triggers a redownload of the state ofter every delete
        this.queue.add(this.list.toJson(), this.list.updateIds.bind(this.list));
        this.forceUpdate();
    }
    render() {
        let estimationRows = this.col.all().map(function(estimation, k){
            return (<EstimationRow model={estimation} key={k}/>)
        });
        return (
            <div className="App">
                <header className="App-header">
                    <h2>Help estimate</h2>
                    <h1 className="App-title">{this.list.title}</h1>
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
                <TextExport list={this.list}/>
            </div>
        );
    }
}

export default App;
