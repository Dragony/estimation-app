class EstimateCollection{
    constructor(elements, listener){
        this.elements = elements || [];
        if(this.elements.length > 0){
            this.elements.forEach(el => el.addListener(this.updateListener.bind(this)));
        }
        this.listener = listener;
    }
    all(){
        return this.elements;
    }
    addElement(element){
        element.addListener(this.updateListener.bind(this));
        this.elements.push(element);
    }
    updateListener(){
        this.listener && this.listener();
    }
    getTotalEstimated(){
        let totalEst = 0;
        this.elements.map(el => totalEst += el.state.totalEst);
        return totalEst;
    }
}

export default EstimateCollection;