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
        this.listeners = [];
    }
    updateEstimate(update){
        this.state = {...this.state, ...update};
        console.log(this.state);
        this.updateValues();
    }
    addListener(listener){
        this.listeners.push(listener);
    }
    triggerListener(){
        this.listeners.map(fn => fn());
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
            totalEst: Math.round((estimates.minEst + estimates.optEst * 4 + estimates.maxEst) / 6 * 10)/10
        };
        this.triggerListener();
    }
}

export default Estimation;