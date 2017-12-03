import EstimateCollection from './EstimateCollection';
import Estimation from './Estimation';

class EstimationList{
    constructor(listener){
        this.listener = listener;
    }
    populate(backendData){
        this.title = backendData.title;
        this.uuid = backendData.uuid;
        let rows = [];
        if(backendData.estimationRow){
            backendData.estimationRow.forEach(function(estimation){
                rows.push(new Estimation(estimation));
            });
        }
        this.collection = new EstimateCollection(rows, this.listener);
        return this;
    }
    updateIds(backendData){
        let collection = this.collection;
        if(backendData.estimationRow){
            backendData.estimationRow.forEach(function(estimation, k){
                collection.elements[k].mergeValues(estimation);
            });
        }
    }
    getCollection(){
        return this.collection;
    }
    toJson(){
        let rows = this.collection.all().map((row) => row.toJson());
        return {
            title: this.title,
            uuid: this.uuid,
            estimationRow: rows
        }
    }
}

export default EstimationList