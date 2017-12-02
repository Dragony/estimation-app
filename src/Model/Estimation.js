class Estimation{
    constructor(defaults){
        this.state = {
            description: "default",
            minEst: "",
            optEst: "",
            maxEst: "",
            totalEst: 0,
            ...defaults
        };
        this.listeners = {};
    }
    updateEstimate(update){
        this.state = {...this.state, ...update};
        this.updateValues();
    }
    addListener(type, listener){
        if(this.listeners[type] === undefined){
            this.listeners[type] = [];
        }
        this.listeners[type].push(listener);
    }
    triggerListener(type){
        if(this.listeners[type] === undefined){
            return;
        }
        this.listeners[type].map(fn => fn(this));
    }
    updateValues(){
        let estimates = {
            minEst: parseFloat(this.state.minEst, 10) || 0,
            optEst: parseFloat(this.state.optEst, 10) || 0,
            maxEst: parseFloat(this.state.maxEst, 10) || 0
        };

        this.state = {
            ...this.state,
            ...estimates,
            totalEst: Math.round((estimates.minEst + estimates.optEst * 2 + estimates.maxEst) / 4 * 10)/10
        };
        this.triggerListener('update');
    }
    remove(){
        this.triggerListener('remove');
    }
}

export default Estimation;