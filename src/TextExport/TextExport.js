import React, {Component} from 'react';

class TextExport extends Component {
    constructor(props){
        super(props);
        this.state = {
            unit: "h"
        };
        this.col = this.props.list.getCollection();
    }
    formSubmit(event){
        this.setState({
            unit: event.target.value
        });
    }
    render() {
        let textContent = ``;
        let parent = this;
        this.col.all().forEach(function(el){
            textContent += `${el.state.description}: ${el.state.totalEst}${parent.state.unit}\n`;
        });
        textContent += `Total: ${this.col.getTotalEstimated()}${this.state.unit}`;
        return (
            <div className="text-export">
                <form>
                    <label htmlFor="unit">Unit</label>
                    <select id="unit" onChange={this.formSubmit.bind(this)}>
                        <option value="h">Hours</option>
                        <option value="d">Days</option>
                    </select>
                    <textarea id="textExport" readOnly value={textContent}/>
                </form>
            </div>
        )
    }
}

export default TextExport