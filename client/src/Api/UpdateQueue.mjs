import Backend from './Backend.mjs';

class UpdateQueue{
    constructor(uuid){
        this.uuid = uuid;
        this.state = {};
        this.isChanged = false;
        this.interval = setInterval(this.send.bind(this), 1000);
        this.callbacks = [];
    }
    add(state, cb){
        this.state = state;
        this.isChanged = true;
        if(typeof cb === 'function'){
            this.callbacks.push(cb);
        }
    }
    async send(){
        if(this.isChanged){
            this.isChanged = false;
            let newState = await Backend.postEstimationState(this.uuid, this.state);
            // Only callback with the new state if the app hasn't already changed the state again
            // The best strategy is to merge the changes, but that isn't simple
            this.callbacks.forEach((cb) => this.isChanged ? cb(newState) : null);
        }
    }
}

export default UpdateQueue;